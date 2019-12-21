import { AWOInterface } from "./AWO.interface";
import { AWOState, AWOStateStr } from "./AWO.interface.state-enum";

/**
 * Class used as an interface for all communications with the AWO core game program.
 */
export class AWOInterfaceHelper {

    /**
     * Confirms the state is as expected and prints an error message if it isn't.
     *
     * @param state The current AWO interface state.
     * @param expected The expected state.
     * @returns Whether the state is as expected.
     */
    static isInitStateExpected(state: AWOState, expected: AWOState): boolean {

        if (state === expected) {
            return true;
        }

        console.error(
            `expected state to be '${AWOStateStr[expected]}', was '${AWOStateStr[state]}' 
            ${(new Error).stack}`
        );

        return false;
    }

    /**
     * Confirms the state is one of expected states and prints an error message if it isn't.
     *
     * @param state The current AWO interface state.
     * @param expected List of possible expected states.
     * @returns Whether the state is as expected.
     */
    static expectStateOneOf(state: AWOState, ...expected: AWOState[]): boolean {

        // Return positive result if one of the expected states was found
        for (const expectedState of expected) {
            if (state === expectedState) {
                return true;
            }
        }

        // Expected state not found, build up error string & print
        let expectedStatesStr = "";

        for (const expectedState of expected) {
            expectedStatesStr += (AWOStateStr[expectedState] + " ");
        }

        console.error(
            `AWO state was ${AWOStateStr[state]}, expected it to be one of [${expectedStatesStr}]
            ${(new Error).stack}`
        );

        return false;
    }

    /**
     * Confirms the state is equal to or greater than the given state and prints an error message if it isn't.
     *
     * @param state The current AWO interface state.
     * @param expectedMin Minimum expected state.
     * @returns Whether the state is as expected.
     */
    static expectStateMinimum(state: AWOState, expectedMin: AWOState): boolean {

        if (state >= expectedMin) {
            return true;
        }

        console.error(
            `expected state to be at minimum ${expectedMin} ('${AWOStateStr[expectedMin]}'), 
            was ${state} ('${AWOStateStr[state]}')`
        );

        return false;
    }
}
