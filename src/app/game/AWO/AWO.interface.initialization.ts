import { AWOState } from "./AWO.interface.state-enum";
import { AWOInterfaceState } from "./AWO.interface.state";
import { getEmscriptenModule } from "./AWO.interface.get-emscripten-module";

/**
 * Interface containing all initialization entry points with the AWO core game program.
 */
export class AWOInitializationInterface {

    constructor(private state: AWOInterfaceState) {}

    /**
     * Initializes the interface by internally initializing Emscripten.
     * Updates status: Uninitialized -> Interface_Initialized
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
        if (!this.state.checkState(AWOState.Uninitialized)) {
            return;
        }

        loadStartCB();

        this.state.emscripten = getEmscriptenModule(
            gameCanvas,
            AWOInterfaceState.emDirPath,
            progressUpdateCB,
            () => {
                this.state.status = AWOState.Interface_Initialized;
                loadEndCB();
        });
    }

    /**
     * Initializes the game's base components.
     * Updates status: Interface_Initialized -> Game_Initialized
     *
     * @param width The game's width.
     * @param height The game's height.
     */
    initializeGame(width: number, height: number): void {
        if (!this.state.checkState(AWOState.Interface_Initialized)) {
            return;
        }

        this.state.gamePtr = this.state.emscripten.ccall(
            "create_game",
            "number",
            ["number", "number"],
            [width, height]
        );

        if (this.state.gamePtr === 0) {
            console.error(`initializeGame error: create_game returned NULL`);
            // TODO: print error(s) from AWO

            return;
        }

        this.state.status = AWOState.Game_Initialized;
    }

    /**
     * Prepares the game for a match between players.
     * Updates status: Game_Initialized -> Game_Ready
     */
    prepareDesignRoomGame(): void {
        if (!this.state.checkState(AWOState.Game_Initialized)) {
            return;
        }

        if (!this.state.emscripten.ccall(
            "prepare_design_room_game",
            "number",
            ["number"],
            [this.state.gamePtr]
        )) {
            console.error(`prepareDesignRoomGame error: prepare_design_room_game returned negative result`);
            // TODO: print error(s) from AWO

            return;
        }

        this.state.status = AWOState.Game_Ready;
    }

    /**
     * Begins running the prepared game.
     * Updates status: Game_Ready -> Game_Running
     */
    runGame(): void {
        if (!this.state.checkState(AWOState.Game_Ready)) {
            return;
        }

        // Start running the game
        setTimeout(() => {
            this.state.emscripten.ccall("run_game", null, ["number"], [this.state.gamePtr]);
        });

        this.state.status = AWOState.Game_Running;
    }
}
