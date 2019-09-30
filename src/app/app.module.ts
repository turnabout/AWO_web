import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { LoadingBarComponent } from "./loading-bar/loading-bar.component";

@NgModule({
    declarations: [
        AppComponent,
        LoadingBarComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
