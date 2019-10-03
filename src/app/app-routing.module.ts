import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PageMainComponent } from "./page-main/page-main.component";
import { PageDesignRoomComponent } from "./page-design-room/page-design-room.component";

const routes: Routes = [
    { path: "", component: PageMainComponent },
    { path: "design-room", component: PageDesignRoomComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
