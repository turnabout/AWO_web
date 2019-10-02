import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MainMenuComponent } from "./main-menu/main-menu.component";

const routes: Routes = [
    { path: "", component: MainMenuComponent },
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
