import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { LoadingComponent } from "./loading/loading.component";
import { AppRoutingModule } from "./app-routing.module";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { MessageBoxComponent } from "./message-box/message-box.component";
import { PageMainComponent } from "./page-main/page-main.component";
import { PageDesignRoomComponent } from "./page-design-room/page-design-room.component";
import { GameComponent } from "./game/game.component";
import { EditorToolsComponent } from "./page-design-room/editor-tools/editor-tools.component";

@NgModule({
    declarations: [
        AppComponent,
        LoadingComponent,
        NavMenuComponent,
        MessageBoxComponent,
        PageMainComponent,
        PageDesignRoomComponent,
        GameComponent,
        EditorToolsComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
