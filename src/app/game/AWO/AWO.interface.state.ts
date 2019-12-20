/**
 * All possible states for the AWO game program.
 */
export enum AWOState {

    /**
     * Completely uninitialized.
     * Starting state. The Emscripten module must be initialized before anything can be done.
     */
    Uninitialized,

    /**
     * Interface is initialized and ready to use.
     * At this stage, the game itself must be initialized before we can prepare for actual gameplay.
     */
    Interface_Initialized,

    /**
     * Game's base components are initialized.
     * At this stage, the game is not yet ready to play, but is ready to prepare for a match between players.
     */
    Game_Initialized,

    /**
     * Game is ready for play.
     * At this stage, the game is initialized and fully ready for a match between players.
     */
    Game_Ready,

    /**
     * Game is running and playing a match between players.
     */
    Game_Running,
}
