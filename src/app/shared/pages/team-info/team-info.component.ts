import { Component, OnInit } from "@angular/core";
import { CommonModule, Location } from "@angular/common";
import { FootballService } from "../../services/football.service";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
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
export class TeamInfoComponent implements OnInit {
  teamData$ = new BehaviorSubject<ResponsePayload[] | null>(null);

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private football: FootballService
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get("teamId");

    if (param) {
      const teamId = parseInt(param);

      this.football.getLastTeamResults(teamId).subscribe((data) => {
        this.teamData$.next(data);
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
