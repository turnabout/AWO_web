import { Component, ViewChild, ElementRef } from "@angular/core";

import { LoadingService } from "./loading/loading.service";
import { loadAWO } from "../AWO/AWO-load";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    @ViewChild("gameCanvas", {static: false}) gameCanvas: ElementRef;

    constructor(public loadingService: LoadingService) {}

    /**
     * Load the game once the view has been initialized.
     */
    ngAfterViewInit() {
        setTimeout(() => {
            this.loadingService.start("Loading...");

            loadAWO(
                this.gameCanvas.nativeElement as HTMLCanvasElement,
                () => {
                }
            );
        });
    }
}
