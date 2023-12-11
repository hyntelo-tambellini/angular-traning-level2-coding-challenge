import { Component, OnInit } from "@angular/core";
import { COUNTRIES } from "./shared/data/countries";
import { FootballService } from "./shared/services/football.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  countryList = Object.entries(COUNTRIES);

  constructor(private football: FootballService) {}

  ngOnInit(): void {
    this.football.getCurrentSeasonLeagues("IT").subscribe();
  }
}
