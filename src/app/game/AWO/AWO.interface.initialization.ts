import { AWOState } from "./AWO.interface.state-enum";
import { AWOInterfaceState } from "./AWO.interface.state";
import { getEmscriptenModule } from "./AWO.interface.get-emscripten-module";

/**
 * Interface containing all initialization entry points with the AWO core game program.
 */
export class AWOInitializationInterface {

    constructor(private interfaceState: AWOInterfaceState) {}

    /**
     * Initializes the interface by internally initializing Emscripten.
     * Updates state: Uninitialized -> Interface_Initialized
     *
     * @param gameCanvas Canvas element used by the game.
     * @param loadStartCB Called when the AWO interface's Emscripten module loading begins.
     * @param progressUpdateCB Called when the AWO interface's Emscripten module loading updates.
     * @param loadEndCB Called when the AWO interface's Emscripten module loading finishes.
     */
    initializeInterface(
        gameCanvas: HTMLCanvasElement,
        loadStartCB: () => void,
        progressUpdateCB: (progress: number, progressStr: string) => void,
        loadEndCB: () => void,
    ): void {
        if (!this.interfaceState.isState(AWOState.Uninitialized)) {
            return;
        }

        loadStartCB();

        this.interfaceState.emModuleObj = getEmscriptenModule(
            gameCanvas,
            AWOInterfaceState.emDirPath,
            progressUpdateCB,
            () => {
                this.interfaceState.state = AWOState.Interface_Initialized;
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
    initializeGame(windowWidth: number, windowHeight: number): void {
        if (!this.interfaceState.isState(AWOState.Interface_Initialized)) {
            return;
        }

        this.interfaceState.emModuleObj.ccall(
            "init_AWO",
            "number",
            ["number", "number"],
            [windowWidth, windowHeight]
        );

        this.interfaceState.state = AWOState.Game_Initialized;
    }

    /**
     * Prepares the game for a match between players.
     * Updates state: Game_Initialized -> Game_Ready
     */
    prepareGame(): void {
        if (!this.interfaceState.isState(AWOState.Game_Initialized)) {
            return;
        }

        // TODO
        this.interfaceState.state = AWOState.Game_Ready;
    }

    /**
     * Begins running the prepared game.
     * Updates state: Game_Ready -> Game_Running
     */
    runGame(): void {
        if (!this.interfaceState.isState(AWOState.Game_Ready)) {
            return;
        }

        // Start running the game
        setTimeout(() => {
            this.interfaceState.emModuleObj.ccall("run_AWO", null, ["number"], [this.interfaceState.gamePtr]);
        });

        this.interfaceState.state = AWOState.Game_Running;
    }
}
