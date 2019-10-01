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

    // External references to the app's main component & its zone
    public static mainAppComponentRef: AngularComponentRef;

    // Module object generated and used by emscripten as an interface to the outside world.
    // Can be used to speak with emscripten and use its interfaces.
    public static emModuleObj: any;

    // Launch AWO game instance and stores pointer to the initialized Game object.
    public init() {
        // window.ccall("init_AWO"
        // Game* init_AWO()
    }
}
