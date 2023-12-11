import { Component, OnDestroy, OnInit } from "@angular/core";
import { COUNTRIES } from "./shared/data/countries";
import { FootballService } from "./shared/services/football.service";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { BehaviorSubject, Observable, Subject, Subscriber, Subscription, takeUntil } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  countryList = Object.entries(COUNTRIES);
  leagues = new BehaviorSubject<object>([]);

  private sub: Subscription | null = null;
  private destroy$ = new Subject<boolean>();

  constructor(private football: FootballService) {}

  ngOnInit(): void {
    this.football.getCurrentSeasonLeagues("IT").pipe(takeUntil(this.destroy$)).subscribe();
  }

  tabChanged($event: MatTabChangeEvent) {
    const countryCode = this.countryList[$event.index][0] as keyof typeof COUNTRIES;

    this.sub = this.football.getCurrentSeasonLeagues(countryCode).subscribe((res) => {
      console.log(res);
      this.leagues.next(res);
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
