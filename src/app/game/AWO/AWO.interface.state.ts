import { AWOState, AWOStateStr } from "./AWO.interface.state-enum";
export { AWOState } from "./AWO.interface.state-enum";

/**
 * State shared across all AWO interface classes.
 */
export class AWOInterfaceState {

    // Path to emscripten-generated files
    public static emDirPath = "assets/";

    // Emscripten module object used as an interface to the AWO core game program.
    public emModuleObj: any;

    // Pointer to the current AWO game instance.
    public gamePtr: number;

    // AWO interfaces's current state.
    public state: AWOState;

    constructor() {
        this.state = AWOState.Uninitialized;
    }

    /**
     * Confirms the AWO state is as expected and prints an error message if it isn't.
     *
     * @param expected The expected state.
     * @returns Whether the state is as expected.
     */
    checkState(expected: AWOState): boolean {

        if (this.state === expected) {
            return true;
        }

        console.error(
            `expected state to be '${AWOStateStr[expected]}', was '${AWOStateStr[this.state]}' 
            ${(new Error).stack}`
        );

        return false;
    }

    /**
     * Confirms the AWO state is one of expected states and prints an error message if it isn't.
     *
     * @param expected List of possible expected states.
     * @returns Whether the state is as expected.
     */
    checkStateOneOf(...expected: AWOState[]): boolean {

        // Return positive result if one of the expected states was found
        for (const expectedState of expected) {
            if (this.state === expectedState) {
                return true;
            }
        }

        // Expected state not found, build up error string & print
        let expectedStatesStr = "";

        for (const expectedState of expected) {
            expectedStatesStr += (AWOStateStr[expectedState] + " ");
        }

        console.error(
            `AWO state was ${AWOStateStr[this.state]}, expected it to be one of [${expectedStatesStr}]
            ${(new Error).stack}`
        );

        return false;
    }

    /**
     * Confirms the AWO state is equal to or greater than the given state and prints an error message if it isn't.
     *
     * @param expectedMin Minimum expected state.
     * @returns Whether the state is as expected.
     */
    checkStateMinimum(expectedMin: AWOState): boolean {

        if (this.state >= expectedMin) {
            return true;
        }

        console.error(
            `expected state to be at minimum ${expectedMin} ('${AWOStateStr[expectedMin]}'), 
            was ${this.state} ('${AWOStateStr[this.state]}')`
        );

        return false;
    }

}
