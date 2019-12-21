import { AWOInterfaceState } from "./AWO.interface.state";
import { AWOState } from "./AWO.interface.state-enum";

/**
 * Entry points used to communicate with the running game.
 */
export class AWOGameInterface {

    constructor(private interfaceState: AWOInterfaceState) {}

    /**
     * Updates the game's internal size. Must be called whenever the user's window is resized.
     *
     * @param width The new window's width.
     * @param height The new window's height.
     */
    updateSize(width: number, height: number): void {
        if (!this.interfaceState.checkState(AWOState.Game_Running)) {
            return;
        }

        this.interfaceState.emModuleObj.ccall(
            "update_game_size",
            "void",
            ["number", "number"],
            [width, height],
        );
    }
}

