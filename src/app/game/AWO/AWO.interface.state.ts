import { AWOState } from "./AWO.interface.state-enum";
export { AWOState } from "./AWO.interface.state-enum";

/**
 * State shared across all AWO interface classes.
 */
export class AWOInterfaceState {

    // Path to emscripten-generated files
    public static emDirPath = "assets/";

    // Emscripten module object used as an interface to the AWO core game program.
    public emModuleObj: any;

    // Pointer to the current AWO game instance.
    public gamePtr: number;

    // AWO interfaces's current state.
    public state: AWOState;

    constructor() {
        this.state = AWOState.Uninitialized;
    }
}
