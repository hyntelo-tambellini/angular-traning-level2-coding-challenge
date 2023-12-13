import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Subject, Subscription, takeUntil } from "rxjs";
import { ScoresTableComponent } from "src/app/shared/components/scores-table/scores-table.component";
import { COUNTRIES } from "src/app/shared/data/countries";
import { FootballService } from "src/app/shared/services/football.service";
import { ResponsePayload, Standing, Team } from "src/app/shared/types/api-football";

@Component({
  selector: "app-leagues",
  standalone: true,
  imports: [CommonModule, ScoresTableComponent],
  templateUrl: "./leagues.component.html",
  styleUrls: ["./leagues.component.scss"]
})
export class LeaguesComponent implements OnInit, OnDestroy {
  data$ = new BehaviorSubject<ResponsePayload | null>(null);
  dataSource = new BehaviorSubject<Standing[]>([]);
  unsupportedCountry = false;

  private subs: Subscription[] = [];
  private destroy$ = new Subject<boolean>();

  constructor(
    private football: FootballService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subs.push(this.route.params.pipe(takeUntil(this.destroy$)).subscribe(() => this.loadLeagueData()));
  }

  ngOnDestroy() {
    if (this.subs.length > 0) {
      this.subs.forEach((sub) => sub.unsubscribe());
    }

    this.destroy$.next(true);
    this.destroy$.complete();
  }

  loadLeagueData() {
    const param = this.route.snapshot.paramMap.get("country");

    if (!param) {
      this.router.navigate(["/"]);
    } else {
      const countryCode = param.toUpperCase();
      const countryCodes = Object.keys(COUNTRIES);

      if (countryCodes.includes(countryCode)) {
        this.retrieveLeagueStanding(countryCode);

        const sub = this.data$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
          if (res?.league.standings) {
            this.dataSource.next(res.league.standings[0]);
          } else {
            console.error("Error retrieving data");
          }
        });

        this.subs.push(sub);
      } else {
        this.unsupportedCountry = true;
      }
    }
  }

  retrieveLeagueStanding(countryCode: string) {
    const leagueId = this.football.getLeagueFromCountry(countryCode);

    const sub = this.football.getLeagueStandings(leagueId).subscribe((res) => {
      if (res.response) {
        this.data$.next(res.response[0]);
      }
    });

    this.subs.push(sub);
  }

  openTeamInfo(team: Team) {
    this.router.navigate(["team", team.id]);
  }
}
