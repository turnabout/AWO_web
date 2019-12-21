import { AWOState } from "./AWO.interface.state-enum";
import { AWOInterfaceState } from "./AWO.interface.state";

/**
 * Interface containing all initialization entry points with the AWO core game program.
 */
export class AWOInitializationInterface {

    constructor(private interfaceState: AWOInterfaceState) {}

    /**
     * Initializes the game's base components.
     *
     * @param state The expected AWO game interface state at this point.
     * @param windowWidth The window's width.
     * @param windowHeight The window's height.
     * @returns The initialized game's pointer, or null if an error happened.
     */
    initializeGame(
        // state: AWOState,
        // windowWidth: number,
        // windowHeight: number,
    ): number {
        this.interfaceState.state = AWOState.Game_Ready;

        /*
        if (!AWOInterfaceHelper.isInitStateExpected(state, AWOState.Interface_Initialized)) {
            return null;
        }

        return this.emModuleObj.ccall(
            "init_AWO",
            "number",
            ["number", "number"],
            [windowWidth, windowHeight]
        );
        */
        return 0;
    }

    testy() {
        console.log(this.interfaceState.state);
    }

}
