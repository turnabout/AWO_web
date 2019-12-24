import { AWOInterfaceState } from "./AWO.interface.state";
import { SelectedEntityKind } from "./AWO.interface.data.types";
import { AWOState } from "./AWO.interface.state-enum";

/**
 * Interface containing all entry points used for the AWO game editor.
 */
export class AWOEditorInterface {

    constructor(private state: AWOInterfaceState) {}

    /**
     * Updates the game editor's selected tile type and variation.
     * An array containing data on every individual tile type, which also contains an array with every tile variation.
     *
     * @param kind The kind of the entity to update to. Tile or unit.
     * @param type The type of the entity to update to.
     * @param variation The variation of the entity to update to. -1 for none specified.
     */
    updateEditorSelectedEntity(kind: SelectedEntityKind, type: number, variation: number): void {
        this.state.emscripten.ccall(
            "update_game_editor_selected_entity",
            null,
            ["number", "number", "number", "number"],
            [this.state.gamePtr, kind, type, variation]
        );
    }
}
