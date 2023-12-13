import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Location } from "@angular/common";

@Component({
  selector: "app-team-info",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./team-info.component.html",
  styleUrls: ["./team-info.component.scss"]
})
export class TeamInfoComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
