import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatTabChangeEvent, MatTabsModule } from "@angular/material/tabs";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { ScoresTableComponent } from "../../components/scores-table/scores-table.component";
import { COUNTRIES } from "../../data/countries";
import { FootballService } from "../../services/football.service";
import { NumberInput } from "@angular/cdk/coercion";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, MatTabsModule, ScoresTableComponent, RouterModule],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  countryList = Object.entries(COUNTRIES);
  selectedIndex: NumberInput = 0;

  constructor(
    private football: FootballService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const param = this.route.firstChild?.snapshot.paramMap.get("country");

    if (param) {
      const country = param.toUpperCase();
      const countryCodes = Object.keys(COUNTRIES);

      const selectedIndex = countryCodes.indexOf(country);

      if (selectedIndex !== -1) {
        this.selectedIndex = selectedIndex;
      }
    }
  }

  tabChanged($event: MatTabChangeEvent) {
    const country = this.countryList[$event.index][0].toLowerCase();

    this.router.navigate([country], { relativeTo: this.route });
  }
}
