import { AWOInterfaceState } from "./AWO.interface.state";
import { TileTypeData, TileVariationData } from "./AWO.interface.editor.types";
import { AWOState } from "./AWO.interface.state-enum";

/**
 * Interface containing all entry points used for the AWO game editor.
 */
export class AWOEditorInterface {

    constructor(private interfaceState: AWOInterfaceState) {}

    /**
     * Gets basic data for all neutral tiles (values and names).
     * An array containing data on every individual tile type, which also contains an array with every tile variation.
     *
     * @returns The generated tile data array.
     */
    getTileData(): TileTypeData[] {

        if (!this.interfaceState.checkStateMinimum(AWOState.Interface_Initialized)) {
            return null;
        }

        const result: TileTypeData[] = [];

        // Wrap function to get tile variations' data
        const getNextTileVar: any = this.interfaceState.emModuleObj.cwrap(
            "editor_get_next_tile_var",
            "string",
            ["number", "number", "number"]
        );

        // Loop every tile type
        let tileTypeString: string;
        let tileTypeValue: number = 0;
        const varValuePtr: any = this.interfaceState.emModuleObj._malloc(1);

        while (tileTypeString = this.interfaceState.emModuleObj.ccall("editor_get_next_tile_type", "string", [])) {

            // Create this tile type object
            const tileTypeData: TileTypeData = {
                value: tileTypeValue,
                name: tileTypeString,
                variations: []
            };


            // Loop and record all of this tile type's variations
            let variationStr: string;
            while (variationStr = getNextTileVar(this.interfaceState.gamePtr, tileTypeValue, varValuePtr)) {
               tileTypeData.variations.push({
                    name: variationStr,
                    value: this.interfaceState.emModuleObj.getValue(varValuePtr, "i8")
                });
            }

            result.push(tileTypeData);
            tileTypeValue++;
        }

        this.interfaceState.emModuleObj._free(varValuePtr);
        return result;
    }

    /**
     * Updates the game editor's selected tile type and variation.
     * An array containing data on every individual tile type, which also contains an array with every tile variation.
     *
     * @returns The generated tile data array.
     */
    updateEditorSelectedTile(type: number, variation: number): void {
        this.interfaceState.emModuleObj.ccall(
            "editor_update_selected_tile",
            null,
            ["number", "number", "number"],
            [this.interfaceState.gamePtr, type, variation]
        );
    }
}
