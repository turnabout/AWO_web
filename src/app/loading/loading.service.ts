import { ChangeDetectorRef, Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class LoadingService {
    public loading = false;
    public progress = 0;
    public message = "";

    constructor() { }

    /**
     * Start loading.
     */
    public start(msg: string) {
        this.loading = true;
        this.progress = 0;
        this.message = msg;
    }

    /**
     * Set new progress & message.
     */
    public update(progress: number, msg?: string) {
        this.progress = progress;

        if (msg) {
            this.message = msg;
        }
    }

    /**
     * Stop loading.
     */
    public stop() {
        this.loading = false;
        this.progress = 0;
        this.message = "";
    }
}
