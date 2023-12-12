import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { BehaviorSubject, Subject, Subscription, takeUntil } from "rxjs";
import { COUNTRIES } from "./shared/data/countries";
import { FootballService } from "./shared/services/football.service";
import { ResponsePayload } from "./shared/types/api-football";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  countryList = Object.entries(COUNTRIES);
  league$ = new BehaviorSubject<ResponsePayload | null>(null);
  dataSource = new BehaviorSubject<any>(null);

  private sub: Subscription | null = null;
  private destroy$ = new Subject<boolean>();

  constructor(private football: FootballService) {}

  ngOnInit(): void {
    const countryCode = this.countryList[0][0];

    this.retrieveLeagueStanding(countryCode);

    this.league$.pipe(takeUntil(this.destroy$)).subscribe((league) => this.dataSource.next(league?.league.standings));
  }

  tabChanged($event: MatTabChangeEvent) {
    const countryCode = this.countryList[$event.index][0];

    this.retrieveLeagueStanding(countryCode);
  }

  retrieveLeagueStanding(countryCode: string) {
    const leagueId = this.football.getLeagueFromCountry(countryCode);

    this.sub = this.football.getLeagueStandings(leagueId).subscribe((res) => {
      if (res.response) {
        this.league$.next(res.response[0]);
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
