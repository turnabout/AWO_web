import { NgZone } from "@angular/core";

interface AngularComponentRef {
    component: any;
    zone: NgZone;
}

export class AWO {
    // Pointer to the main AWO Game instance.
    public static gamePtr: number;

    // Path to emscripten-generated files
    public static emDirPath: string = "assets/";

    // Module object generated and used by emscripten as an interface to the outside world.
    // Can be used to speak with emscripten and use its interfaces.
    public static emModuleObj: any;

    // External references to the app's main component & its zone
    public static mainAppComponentRef: AngularComponentRef;

    // Launch AWO game instance and stores pointer to the initialized Game object.
    public static init(canvas: HTMLCanvasElement) {
        // Get width/height of user's window to pass to game
        const width: number  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const height: number = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;

        // Initialize and run game
        // TODO: Height should compensate for additional UI at bottom of screen
        AWO.gamePtr = AWO.emModuleObj.ccall("init_AWO", "number", ["number", "number"], [width, height]);

        // Add small delay before running game, for a smoother transition
        setTimeout(() => {
            // document.getElementById("canvas").classList.add("show");
            AWO.emModuleObj.ccall("run_AWO", null, ["number"], [AWO.gamePtr]);
        }, 100);
    }
}
