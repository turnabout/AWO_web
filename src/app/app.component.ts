import { Component, ViewChild, ElementRef, NgZone } from "@angular/core";
import { AWO } from "../AWO/AWO";
import { loadAWO } from "../AWO/AWO-load";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    title: string = "AWO-web";

    @ViewChild("gameCanvas", {static: false}) gameCanvas: ElementRef;

    constructor(public zone: NgZone) {
        AWO.mainAppComponentRef = {
            component: this,
            zone: zone
        };
    }

    // Loading bar support
    private loading: boolean = false;
    private loadingProgress: number = 0;
    private loadingStatus: string = "";

    /**
     * Sets the new AWO loading state.
     */
    public setLoading(newLoading: boolean) {
        this.loading = newLoading;
    }

    /**
     * Sets the new loading progress percentage.
     */
    public setLoadingProgress(newProgress: number) {
        this.loadingProgress = newProgress;
    }

    /**
     * Sets the new loading status message.
     */
    public setLoadingStatus(newStatus: string) {
        this.loadingStatus = newStatus;
    }

    ngAfterViewInit() {
        loadAWO(
            this.gameCanvas.nativeElement as HTMLCanvasElement,
            () => {
                AWO.init();
            }
        );
    }
}
