import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { LoadingComponent } from "./loading/loading.component";
import { AppRoutingModule } from "./app-routing.module";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { MessageBoxComponent } from "./message-box/message-box.component";
import { PageMainComponent } from "./page-main/page-main.component";
import { PageDesignRoomComponent } from "./page-design-room/page-design-room.component";

@NgModule({
    declarations: [
        AppComponent,
        LoadingComponent,
        NavMenuComponent,
        MessageBoxComponent,
        PageMainComponent,
        PageDesignRoomComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
