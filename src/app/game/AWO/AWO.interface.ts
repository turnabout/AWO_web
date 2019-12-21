import { AWOState } from "./AWO.interface.state-enum";
import { AWOInterfaceHelper } from "./AWO.interface.helper";
import { getEmscriptenModule } from "./AWO.interface.get-emscripten-module";
import { TileTypeData, TileVariationData } from "./AWO.interface.interfaces";

export { AWOState } from "./AWO.interface.state-enum";

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
        if (!AWOInterfaceHelper.isInitStateExpected(this, AWOState.Uninitialized, "initializeInterface")) {
            return;
        }

        loadStartCB();

        this.emModuleObj = getEmscriptenModule(
            this.gameCanvas,
            AWOInterface.emDirPath,
            progressUpdateCB,
            () => {
                this.internalState = AWOState.Interface_Initialized;
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
        if (!AWOInterfaceHelper.isInitStateExpected(this, AWOState.Interface_Initialized, "initializeGame")) {
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
    prepareGame(): void {
        if (!AWOInterfaceHelper.isInitStateExpected(this, AWOState.Game_Initialized, "prepareGame")) {
            return;
        }

        // TODO
        this.internalState = AWOState.Game_Ready;
    }

    /**
     * Begins running the prepared game.
     * Updates state: Game_Ready -> Game_Running
     */
    runGame(): void {
        if (!AWOInterfaceHelper.isInitStateExpected(this, AWOState.Game_Ready, "runGame")) {
            return;
        }

        setTimeout(() => {
            this.emModuleObj.ccall("run_AWO", null, ["number"], [this.gamePtr]);
        });

        this.internalState = AWOState.Game_Running;
    }

    /**
     * Updates the game's internal size. Must be called whenever the user's window is resized.
     *
     * @param width The new window's width.
     * @param height The new window's height.
     */
    updateSize(width: number, height: number): void {
        this.emModuleObj.ccall(
            "update_game_size",
            "void",
            ["number", "number"],
            [width, height],
        );
    }

    /**
     * Gets basic data for all neutral tiles (values and names).
     * An array containing data on every individual tile type, which also contains an array with every tile variation.
     *
     * @returns The generated tile data array.
     */
    getTileData(): TileTypeData[] {
        let result: TileTypeData[] = [];

        // Wrap function to get tile variations' data
        let get_next_tile_var: any = this.emModuleObj.cwrap(
            "editor_get_next_tile_var",
            "string",
            ["number", "number", "number"]
        );

        // Loop every tile type
        let tileTypeString: string;
        let tileTypeValue: number = 0;
        let varValuePtr: any = this.emModuleObj._malloc(1);

        while (tileTypeString = this.emModuleObj.ccall("editor_get_next_tile_type", "string", [])) {

            // Create this tile type object
            let tileTypeData: TileTypeData = {
                value: tileTypeValue,
                name: tileTypeString,
                variations: []
            };


            // Loop and record all of this tile type's variations
            let variationStr: string;
            while (variationStr = get_next_tile_var(this.gamePtr, tileTypeValue, varValuePtr)) {
               tileTypeData.variations.push({
                    name: variationStr,
                    value: this.emModuleObj.getValue(varValuePtr, "i8")
                });
            }

            result.push(tileTypeData);
            tileTypeValue++;
        }

        this.emModuleObj._free(varValuePtr);
        return result;
    }
}
