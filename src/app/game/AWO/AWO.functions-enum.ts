/**
 * Enumeration of every function exported by the game.
 */
export enum AWOFunctions {
    /**
     * Updates the game's internal size. Must be called whenever the user's window is resized.
     *
     * @param width The new window's width.
     * @param height The new window's height.
     */
    UpdateSize,
}

export enum AWOFunctionStrings {
    UpdateSize = "update_game_size",
}
