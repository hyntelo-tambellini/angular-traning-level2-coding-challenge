import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatTabChangeEvent, MatTabsModule } from "@angular/material/tabs";
import { BehaviorSubject, Subject, Subscription, takeUntil } from "rxjs";
import { ScoresTableComponent } from "../../components/scores-table/scores-table.component";
import { COUNTRIES } from "../../data/countries";
import { FootballService } from "../../services/football.service";
import { ResponsePayload, Standing, Team } from "../../types/api-football";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, MatTabsModule, ScoresTableComponent],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, OnDestroy {
  countryList = Object.entries(COUNTRIES);
  data$ = new BehaviorSubject<ResponsePayload | null>(null);
  dataSource = new BehaviorSubject<Standing[]>([]);

  private sub: Subscription | null = null;
  private destroy$ = new Subject<boolean>();

  constructor(
    private football: FootballService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const countryCode = this.countryList[0][0];

    this.retrieveLeagueStanding(countryCode);

    this.data$
      .pipe(takeUntil(this.destroy$))
      .subscribe((league) => this.dataSource.next(league?.league.standings![0]!));
  }

  tabChanged($event: MatTabChangeEvent) {
    const countryCode = this.countryList[$event.index][0];

    this.retrieveLeagueStanding(countryCode);
  }

  retrieveLeagueStanding(countryCode: string) {
    const leagueId = this.football.getLeagueFromCountry(countryCode);

    this.sub = this.football.getLeagueStandings(leagueId).subscribe((res) => {
      if (res.response) {
        this.data$.next(res.response[0]);
      }
    });
  }

  openTeamInfo(team: Team) {
    // this.football.getLastTeamResults(team.id).subscribe(console.log);
    this.router.navigate(["team", team.id]);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
