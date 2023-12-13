import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/home"
  },
  {
    path: "home",
    loadComponent: () => import("./shared/pages/home/home.component").then((m) => m.HomeComponent)
  },
  {
    path: "team/:id",
    loadComponent: () => import("./shared/pages/team-info/team-info.component").then((m) => m.TeamInfoComponent)
  },

  { path: "**", redirectTo: "/home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
