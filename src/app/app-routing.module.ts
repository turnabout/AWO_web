import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NavMenuComponent } from "./nav-menu/nav-menu.component";

const routes: Routes = [
    { path: "", component: NavMenuComponent },
    { path: "design-room", component: NavMenuComponent },
];

/*
const routes: Routes = [
    { path: "", redirectTo: "/dashboard", pathMatch: "full" },
    { path: "", component: DashboardComponent },
    { path: "heroes", component: HeroesComponent },
    { path: "detail/:id", component: HeroDetailComponent }
];
*/

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
