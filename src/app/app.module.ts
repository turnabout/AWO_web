import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { LoadingBarComponent } from "./loading-bar/loading-bar.component";
import { AppRoutingModule } from "./app-routing.module";
import { MainMenuComponent } from "./main-menu/main-menu.component";
import { MessageBoxComponent } from "./message-box/message-box.component";

@NgModule({
    declarations: [
        AppComponent,
        LoadingBarComponent,
        MainMenuComponent,
        MessageBoxComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
