import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { MatRippleModule } from "@angular/material/core";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ResponsePayload } from "../../types/api-football";

@Component({
  selector: "app-team-info-table",
  standalone: true,
  imports: [CommonModule, MatTableModule, MatRippleModule, MatTooltipModule],
  templateUrl: "./team-info-table.component.html",
  styleUrls: ["./team-info-table.component.scss"]
})
export class TeamInfoTableComponent {
  displayedColumns: string[] = [
    "homeTeamLogo",
    "homeTeamName",
    "homeTeamGoals",

    "separator",

    "awayTeamGoals",
    "awayTeamName",
    "awayTeamLogo"
  ];

  @Input({ required: true }) dataSource: ResponsePayload[] = [];
}
