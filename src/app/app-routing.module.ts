import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/home/en"
  },
  {
    path: "home",
    loadChildren: () => import("./shared/pages/home/home.module").then((m) => m.HomeModule)
  },
  {
    path: "team/:teamId",
    loadComponent: () => import("./shared/pages/team-info/team-info.component").then((m) => m.TeamInfoComponent)
  },

  { path: "**", redirectTo: "/home/en" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
