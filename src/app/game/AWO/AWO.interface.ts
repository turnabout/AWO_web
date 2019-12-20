// import AWO_EM_MODULE from "assets/AWO.js";
import { AWOFunctions, AWOFunctionStrings } from "./AWO.functions-enum";
import { AWOState } from "./AWO.interface.state";
import { getEmscriptenModule } from "./AWO.interface.get-emscripten-module";

export { AWOFunctions } from "./AWO.functions-enum";
export { AWOState } from "./AWO.interface.state";

/**
 * Class used as an interface for all communications with the AWO core game program.
 */
export class AWOInterface {

    // Path to emscripten-generated files
    private static emDirPath = "assets/";

    // Emscripten module object used as an interface to the AWO core game program.
    private emModuleObj: any;

    // Pointer to the current AWO game instance.
    private gamePtr: number;

    // AWO's current state.
    private internalState: AWOState;

    // Functions used to interact with AWO.
    private functions: {(...any): any}[];

    /**
     * @param gameCanvas Canvas element used by the game.
     */
    constructor(private gameCanvas: HTMLCanvasElement) { this.internalState = AWOState.Uninitialized; }

    public get state(): AWOState {
        return this.internalState;
    }

    /**
     * Initializes the interface by internally initializing Emscripten.
     * Updates state: Uninitialized -> Interface_Initialized
     *
     * @param loadStartCB Called when the AWO interface's Emscripten module loading begins.
     * @param progressUpdateCB Called when the AWO interface's Emscripten module loading updates.
     * @param loadEndCB Called when the AWO interface's Emscripten module loading finishes.
     */
    initializeInterface(
        loadStartCB: () => void,
        progressUpdateCB: (progress: number, progressStr: string) => void,
        loadEndCB: () => void,
    ): void {
        if (this.internalState !== AWOState.Uninitialized) {
            console.error(`initializeInterface: expected state to be ${AWOState.Uninitialized}, was ${this.internalState}`);
            return;
        }

        loadStartCB();

        this.emModuleObj = getEmscriptenModule(
            this.gameCanvas,
            AWOInterface.emDirPath,
            progressUpdateCB,
            () => {
                this.internalState = AWOState.Interface_Initialized;
                this.initializeFunctions();
                loadEndCB();
        });
    }

    /**
     * Initializes the game's base components.
     * Updates state: Interface_Initialized -> Game_Initialized
     *
     * @param windowWidth The window's width.
     * @param windowHeight The window's height.
     */
    initializeGame(windowWidth: number, windowHeight: number) {
        if (this.internalState !== AWOState.Interface_Initialized) {
            console.error(`initializeGame: expected state to be ${AWOState.Interface_Initialized}, was ${this.internalState}`);
            return;
        }

        this.gamePtr = this.emModuleObj.ccall(
            "init_AWO",
            "number",
            ["number", "number"],
            [windowWidth, windowHeight]
        );
        this.internalState = AWOState.Game_Initialized;
    }

    /**
     * Prepares the game for a match between players.
     * Updates state: Game_Initialized -> Game_Ready
     */
    prepareGame() {
        if (this.internalState !== AWOState.Game_Initialized) {
            console.error(`prepareGame: expected state to be ${AWOState.Game_Initialized}, was ${this.internalState}`);
            return;
        }

        // TODO
        this.internalState = AWOState.Game_Ready;
    }

    /**
     * Begins running the prepared game.
     * Updates state: Game_Ready -> Game_Running
     */
    runGame() {
        if (this.internalState !== AWOState.Game_Ready) {
            console.error(`runGame: expected state to be ${AWOState.Game_Ready}, was ${this.internalState}`);
            return;
        }

        this.emModuleObj.ccall("run_AWO", null, ["number"], [this.gamePtr]);
        this.internalState = AWOState.Game_Running;
    }

    /**
     * Initializes the array of all exported functions that can be used to interact with the game.
     * Done during interface initialization.
     */
    private initializeFunctions() {
        // TODO
    }

}
