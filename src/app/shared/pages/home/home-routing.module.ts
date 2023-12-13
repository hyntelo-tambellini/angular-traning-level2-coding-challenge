import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LeaguesComponent } from "../leagues/leagues.component";
import { HomeComponent } from "./home.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: ":country",
        component: LeaguesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
