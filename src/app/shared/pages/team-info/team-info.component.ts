import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule, Location } from "@angular/common";
import { FootballService } from "../../services/football.service";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Subject, Subscription, takeUntil } from "rxjs";
import { ResponsePayload } from "../../types/api-football";
import { TeamInfoTableComponent } from "../../components/team-info-table/team-info-table.component";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-team-info",
  standalone: true,
  imports: [CommonModule, TeamInfoTableComponent, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: "./team-info.component.html",
  styleUrls: ["./team-info.component.scss"]
})
export class TeamInfoComponent implements OnInit, OnDestroy {
  teamData$ = new BehaviorSubject<ResponsePayload[] | null>(null);

  private subs: Subscription[] = [];
  private destroy$ = new Subject<boolean>();

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private football: FootballService
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get("teamId");

    if (param) {
      const teamId = parseInt(param);

      const sub = this.football
        .getLastTeamResults(teamId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => this.teamData$.next(data));

      this.subs.push(sub);
    }
  }

  ngOnDestroy() {
    if (this.subs.length > 0) {
      this.subs.forEach((sub) => sub.unsubscribe());
    }

    this.destroy$.next(true);
    this.destroy$.complete();
  }

  goBack() {
    this.location.back();
  }
}
