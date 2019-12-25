import { AWOInterfaceState } from "./AWO.interface.state";
import {
    TileTypeData, TileVariationData, SelectedEntityKind, EntityKind, Weather,
    EntityImage
} from "./AWO.interface.data.types";
import { AWOState } from "./AWO.interface.state-enum";


/**
 * Interface containing all entry points used for fetching game data.
 */
export class AWODataInterface {
    // Private canvas & context used to generate base-64 encoded images for entities.
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    // Module used for reading texture data from game entities.
    private entityTextureReader: number;

    // C-wrapped function used to read texture data for game entities
    private readGameEntityTexture: any;

    constructor(private state: AWOInterfaceState) {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.entityTextureReader = 0;
    }

    /**
     * Internally sets the entity texture reader. Game must be initialized.
     */
    private setEntityTextureReader() {
        if (!this.state.checkStateMinimum(AWOState.Game_Initialized) || this.entityTextureReader !== 0) {
            return;
        }

        this.entityTextureReader = this.state.emscripten.ccall(
            "create_game_entity_texture_reader",
            "number",
            ["number"],
            [this.state.gamePtr]
        );

        this.readGameEntityTexture = this.state.emscripten.cwrap(
            "read_game_entity_texture",
            "number",
            ["number", "number", "number", "number", "number", "number", "number"]
        );
    }

    /**
     * Generates an image data URL for the given entity.
     *
     * @param kind The entity kind of the entity to get the image data URL for.
     * @param type The type of the entity to get the image data URL for.
     * @param variation The variation of the entity. Determines the visual style.
     * @param paletteVariation The palette variation of the entity. Determines the colors applied.
     * @returns The generated image data URL string.
     */
    private getEntityImage(
        kind: EntityKind,
        type: number,
        variation: number,
        paletteVariation: number
    ): EntityImage {

        if (!this.state.checkStateMinimum(AWOState.Game_Initialized)) {
            return {dataURL: "", width: 0, height: 0};
        }

        // Get buffer filled with pixel data of entity from AWO core
        const widthPtr: any = this.state.emscripten._malloc(4);
        const heightPtr: any = this.state.emscripten._malloc(4);

        const textureBuffer: any = this.readGameEntityTexture(
            this.entityTextureReader,
            kind,
            type,
            variation,
            paletteVariation,
            widthPtr,
            heightPtr
        );

        // Transfer buffer length
        const width: number = this.state.emscripten.getValue(widthPtr, "i32");
        const height: number = this.state.emscripten.getValue(heightPtr, "i32");
        const bufferLen: number = width * height * 4;

        // Transfer buffer's bytes into array for ease of use
        const buffer = new Uint8ClampedArray(bufferLen);

        for (let i = 0; i < bufferLen; i++) {
            // The AND operation is so values get interpreted as unsigned
            // TODO: AND might not be needed
            buffer[i] = this.state.emscripten.getValue(textureBuffer + i, "i8") & 0xFF;
        }

        // Free allocated buffers
        this.state.emscripten._free(textureBuffer);
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

        return {
            dataURL: this.canvas.toDataURL("image/png"),
            width,
            height,
        };
    }

    /**
     * Gets basic data for all neutral tiles (values and names).
     * An array containing data on every individual tile type, which also contains an array with every tile variation.
     *
     * @returns The generated tile data array.
     */
    getTileData(): TileTypeData[] {

        if (!this.state.checkStateMinimum(AWOState.Game_Initialized)) {
            return [];
        }

        // Ensure the entity texture reader is set
        this.setEntityTextureReader();

        // Wrap function used to get tile variations' data
        const getNextTileType: any = this.state.emscripten.cwrap(
            "get_next_game_tile_type",
            "string",
            ["number"]
        );

        const typeValuePtr: any = this.state.emscripten._malloc(1);

        const getNextTileVar: any = this.state.emscripten.cwrap(
            "get_next_game_tile_var",
            "string",
            ["number", "number", "number"]
        );
        const varValuePtr: any = this.state.emscripten._malloc(1);

        // Loop every tile type to gather result
        const result: TileTypeData[] = [];
        let tileTypeString: string;

        while (tileTypeString = getNextTileType(typeValuePtr)) {
            let tileTypeValue: number = this.state.emscripten.getValue(typeValuePtr, "i8");

            // Create this tile type object
            const tileTypeData: TileTypeData = {
                value: tileTypeValue,
                name: tileTypeString,
                variations: []
            };

            // Loop and record all of this tile type's variations
            let variationStr: string;
            while (variationStr = getNextTileVar(this.state.gamePtr, tileTypeValue, varValuePtr)) {

                let varValue: number = this.state.emscripten.getValue(varValuePtr, "i8");

                tileTypeData.variations.push({
                    name: variationStr,
                    value: varValue,
                    image: this.getEntityImage(
                        EntityKind.NeutralTile,
                        tileTypeValue,
                        varValue,
                        Weather.Clear
                    )
                });
            }

            result.push(tileTypeData);
        }

        this.state.emscripten._free(varValuePtr);
        return result;
    }
}
