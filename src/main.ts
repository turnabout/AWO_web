import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

import { AWO } from "./AWO/AWO";
import loadAWO from "./AWO/AWO-load";

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err))
    .then(() => {

        // Load AWO runtime & update progress bar as it goes
        loadAWO(
            // Progress updated
            (percentComplete: number) => {
                AWO.mainAppComponentRef.zone.run(() => {
                    AWO.mainAppComponentRef.component.setLoadingProgress(percentComplete);
                });
            },

            // Status message updated
            (status: string) => {
                AWO.mainAppComponentRef.zone.run(() => {
                    AWO.mainAppComponentRef.component.setLoadingStatus(status);
                });
            },

            // Fully loaded & initialized
            () => {
                AWO.mainAppComponentRef.zone.run(() => {
                    // Hide loading bar, wait 10ms so it animates if loading too fast
                    setTimeout(() => {
                        AWO.mainAppComponentRef.component.setLoading(false);

                        // TODO: Launch AWO, attach data to `AWO` class
                    }, 10);
                });
            }
        );

    });
