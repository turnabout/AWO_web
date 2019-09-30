import { NgZone } from "@angular/core";

interface AngularComponentRef {
    component: any;
    zone: NgZone;
}

export class AWO {
    // Pointer to the game instance.
    public static gamePtr: number;

    // Path to AWO.js
    public static dirPath: string = "assets/";
    public static path: string = AWO.dirPath + "AWO.js";

    // External references to the app's main component & its zone
    public static mainAppComponentRef: AngularComponentRef;
}
