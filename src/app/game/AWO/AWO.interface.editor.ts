import { AWOInterfaceState } from "./AWO.interface.state";
import { TileTypeData, TileVariationData, SelectedEntityKind } from "./AWO.interface.editor.types";
import { AWOState } from "./AWO.interface.state-enum";

/**
 * Interface containing all entry points used for the AWO game editor.
 */
export class AWOEditorInterface {

    // Private canvas & context used to generate base-64 encoded images for entities.
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(private state: AWOInterfaceState) {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    /**
     * Gets basic data for all neutral tiles (values and names).
     * An array containing data on every individual tile type, which also contains an array with every tile variation.
     *
     * @returns The generated tile data array.
     */
    getTileData(): TileTypeData[] {

        if (!this.state.checkStateMinimum(AWOState.Interface_Initialized)) {
            return null;
        }

        const result: TileTypeData[] = [];

        // Wrap function to get tile variations' data
        const getNextTileVar: any = this.state.emscripten.cwrap(
            "editor_get_next_tile_var",
            "string",
            ["number", "number", "number"]
        );

        // Loop every tile type
        let tileTypeString: string;
        let tileTypeValue: number = 0;
        const varValuePtr: any = this.state.emscripten._malloc(1);

        while (tileTypeString = this.state.emscripten.ccall("editor_get_next_tile_type", "string", [])) {

            // Create this tile type object
            const tileTypeData: TileTypeData = {
                value: tileTypeValue,
                name: tileTypeString,
                variations: []
            };


            // Loop and record all of this tile type's variations
            let variationStr: string;
            while (variationStr = getNextTileVar(this.state.gamePtr, tileTypeValue, varValuePtr)) {
                tileTypeData.variations.push({
                    name: variationStr,
                    value: this.state.emscripten.getValue(varValuePtr, "i8"),
                    imageDataURL: this.getEntityImageDataURL()
                });
            }

            result.push(tileTypeData);
            tileTypeValue++;
        }

        this.state.emscripten._free(varValuePtr);
        return result;
    }

    /**
     * Updates the game editor's selected tile type and variation.
     * An array containing data on every individual tile type, which also contains an array with every tile variation.
     *
     * @param kind The kind of the entity to update to. Tile or unit.
     * @param type The type of the entity to update to.
     * @param variation The variation of the entity to update to.
     */
    updateEditorSelectedTile(kind: SelectedEntityKind, type: number, variation: number): void {
        this.state.emscripten.ccall(
            "editor_update_selected_tile",
            null,
            ["number", "number", "number", "number"],
            [this.state.gamePtr, kind, type, variation]
        );
    }

    /**
     * Generates an image data URL for the given entity.
     * TODO
     *
     * @param kind The kind of the entity to get the image data URL for.
     * @param type The type of the entity to get the image data URL for.
     * @param variation The variation of the entity.
     * @returns The generated image data URL string.
     */
    private getEntityImageDataURL(): string {

        // Get buffer filled with pixel data of entity from AWO core
        const lenPtr: any = this.state.emscripten._malloc(4);
        const widthPtr: any = this.state.emscripten._malloc(4);
        const heightPtr: any = this.state.emscripten._malloc(4);

        let tempBuffer: any = this.state.emscripten.ccall(
            "testy",
            "number",
            ["number", "number"],
            [this.state.gamePtr, lenPtr]
        );

        // Transfer buffer length
        const bufferLen: number = this.state.emscripten.getValue(lenPtr, "i32");
        // const width: number = this.interfaceState.emscripten.getValue(widthPtr, "i32");
        // const height: number = this.interfaceState.emscripten.getValue(heightPtr, "i32");

        const width = 20;
        const height = 20;

        // Transfer buffer's bytes into array for ease of use
        let buffer = new Uint8ClampedArray(bufferLen);

        for (let i = 0; i < bufferLen; i++) {
            // The AND operation is so values get interpreted as unsigned
            buffer[i] = this.state.emscripten.getValue(tempBuffer + i, "i8") & 0xFF;
        }

        // Free allocated buffers
        this.state.emscripten._free(lenPtr);
        this.state.emscripten._free(tempBuffer);
        this.state.emscripten._free(widthPtr);
        this.state.emscripten._free(heightPtr);

        // Convert buffer data to an image data URL & return
        this.canvas.width = width;
        this.canvas.height = height;

        this.ctx.putImageData(
            new ImageData(buffer, width, height),
            0,
            0
        );

        return this.canvas.toDataURL("image/png");
    }
}
