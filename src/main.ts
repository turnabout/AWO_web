import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import loadAWO from "./AWO/AWO-load";

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));

console.log("-");

loadAWO(
    (percentComplete: number) => {
        console.log("progressUpdateCb: " + percentComplete);
    },
    (status: string) => {
        console.log("statusUpdateCb: " + status);
    },
    () => {
        console.log("runtimeInitialized");
    }
);
