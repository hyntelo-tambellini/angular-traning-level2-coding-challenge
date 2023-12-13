import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { Standing, Team } from "../../types/api-football";
import { MatRippleModule } from "@angular/material/core";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FootballService } from "../../services/football.service";

@Component({
  selector: "app-scores-table",
  standalone: true,
  imports: [CommonModule, MatTableModule, MatRippleModule, MatTooltipModule],
  templateUrl: "./scores-table.component.html",
  styleUrls: ["./scores-table.component.scss"]
})
export class ScoresTableComponent {
  displayedColumns: string[] = ["rank", "logo", "name", "games", "wins", "losses", "draws", "goalsDiff", "points"];

  @Input({ required: true }) dataSource: Standing[] = [];
  @Output() teamNameClicked = new EventEmitter<Team>();

  constructor(private footballService: FootballService) {}

  manageTeamNameClick(standing: Standing) {
    this.teamNameClicked.emit(standing.team);
  }
}
