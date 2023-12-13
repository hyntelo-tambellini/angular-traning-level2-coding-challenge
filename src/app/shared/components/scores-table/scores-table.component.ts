import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatRippleModule } from "@angular/material/core";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Standing, Team } from "../../types/api-football";

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

  manageTeamNameClick(standing: Standing) {
    this.teamNameClicked.emit(standing.team);
  }
}
