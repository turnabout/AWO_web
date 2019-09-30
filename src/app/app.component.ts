import { Component, NgZone } from "@angular/core";
import { AWO } from "../AWO/AWO";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    title: string = "AWO-web";

    constructor(public zone: NgZone) {
        AWO.mainAppComponentRef = {
            component: this,
            zone: zone
        };
    }

    // Loading bar support
    private loading: boolean = true;
    private loadingProgress: number = 0;
    private loadingStatus: string = "Loading...";

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
}
