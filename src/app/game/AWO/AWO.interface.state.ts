import { AWOState, AWOStateStr } from "./AWO.interface.state-enum";
export { AWOState } from "./AWO.interface.state-enum";

/**
 * State shared across all AWO interface classes.
 */
export class AWOInterfaceState {

    // Path to emscripten-generated files
    public static emDirPath = "assets/";

    // Emscripten module object used as an interface to the AWO core game program.
    public emscripten: any;

    // Pointer to the current AWO game instance.
    public gamePtr: number;

    // AWO interfaces's current status.
    public status: AWOState;

    constructor() {
        this.status = AWOState.Uninitialized;
    }

    /**
     * Confirms the AWO status is as expected and prints an error message if it isn't.
     *
     * @param expected The expected status.
     * @returns Whether the status is as expected.
     */
    checkState(expected: AWOState): boolean {

        if (this.status === expected) {
            return true;
        }

        console.error(
            `expected state to be '${AWOStateStr[expected]}', was '${AWOStateStr[this.status]}' 
            ${(new Error).stack}`
        );

        return false;
    }

    /**
     * Confirms the AWO status is one of expected states and prints an error message if it isn't.
     *
     * @param expected List of possible expected states.
     * @returns Whether the status is as expected.
     */
    checkStateOneOf(...expected: AWOState[]): boolean {

        // Return positive result if one of the expected states was found
        for (const expectedState of expected) {
            if (this.status === expectedState) {
                return true;
            }
        }

        // Expected status not found, build up error string & print
        let expectedStatesStr = "";

        for (const expectedState of expected) {
            expectedStatesStr += (AWOStateStr[expectedState] + " ");
        }

        console.error(
            `AWO state was ${AWOStateStr[this.status]}, expected it to be one of [${expectedStatesStr}]
            ${(new Error).stack}`
        );

        return false;
    }

    /**
     * Confirms the AWO status is equal to or greater than the given status and prints an error message if it isn't.
     *
     * @param expectedMin Minimum expected status.
     * @returns Whether the status is as expected.
     */
    checkStateMinimum(expectedMin: AWOState): boolean {

        if (this.status >= expectedMin) {
            return true;
        }

        console.error(
            `expected state to be at minimum ${expectedMin} ('${AWOStateStr[expectedMin]}'), 
            was ${this.status} ('${AWOStateStr[this.status]}')`
        );

        return false;
    }

}
