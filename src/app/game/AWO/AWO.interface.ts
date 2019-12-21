import { AWOState } from "./AWO.interface.state-enum";
import { getEmscriptenModule } from "./AWO.interface.get-emscripten-module";
import { TileTypeData, TileVariationData } from "./AWO.interface.types";
import { AWOInitializationInterface } from "./AWO.interface.initialization";
import { AWOInterfaceState } from "./AWO.interface.state";

export * from "./AWO.interface.state-enum";
export * from "./AWO.interface.types";

/**
 * Main AWO interface class used as an entry point for all communications with the AWO core game program.
 */
export class AWOInterface {

    // Reference to the current AWO interface state.
    private interfaceState: AWOInterfaceState;

    // Child interfaces
    // Initialization interface
    public init: AWOInitializationInterface;

    // The current AWO interface state.
    public get state(): AWOState {
        return this.interfaceState.state;
    }

    constructor() {
        this.interfaceState = new AWOInterfaceState();
        this.init = new AWOInitializationInterface(this.interfaceState);
    }

    /**
     * Updates the game's internal size. Must be called whenever the user's window is resized.
     *
     * @param width The new window's width.
     * @param height The new window's height.
     */
    updateSize(width: number, height: number): void {
        /*
        this.emModuleObj.ccall(
            "update_game_size",
            "void",
            ["number", "number"],
            [width, height],
        );
        */
    }

    /**
     * Gets basic data for all neutral tiles (values and names).
     * An array containing data on every individual tile type, which also contains an array with every tile variation.
     *
     * @returns The generated tile data array.
     */
    getTileData(): TileTypeData[] {
        /*
        if (!AWOInterfaceHelper.expectStateMinimum(this, AWOState.Interface_Initialized)) {
            return;
        }

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
        */
        return null;
    }
}
