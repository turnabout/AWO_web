import { Injectable } from "@angular/core";

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
    public update(progress?: number, msg?: string) {
        if (progress !== undefined) {
            this.progress = progress;
        }

        if (msg !== undefined) {
            this.message = msg;
        }
    }

    /**
     * Stop loading.
     */
    public end() {
        this.loading = false;
        this.progress = 0;
        this.message = "";
    }
}
