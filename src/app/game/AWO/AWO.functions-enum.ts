/**
 * Enumeration of every function exported by the game.
 */
export enum AWOFunctions {
    /**
     * Updates the game's internal size. Must be called whenever the user's window is resized.
     *
     * @param number width The new window's width.
     * @param number height The new window's height.
     */
    UpdateSize,

    /**
     * Gets the next basic tile type string.
     * Must be called continuously until it returns NULL.
     *
     * @returns string The next tile type's string representation.
     */
    GetNextEditorTileType,

    /**
     * Gets the next variation belonging to the given tile type.
     * Must be called continuously until it returns NULL.
     *
     * @param number type The tile type for which to fetch variations.
     * @param number var_val[out] The tile variation's value.
     * @returns string The next tile variation's string representation.
     */
    GetNextEditorTileVar,

    /**
     * Updates the game editor's active tile type.
     *
     * @param number type The tile type to update to.
     */
    UpdateEditorTileType,
}

export let AWOFunctionStrings = [
    "update_game_size",
    "editor_get_next_tile_type",
    "editor_get_next_tile_var",
    "editor_update_tile_type",
];
