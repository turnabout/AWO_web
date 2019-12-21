import { AWOInterface } from "./AWO.interface";
import { AWOState, AWOStateStr } from "./AWO.interface.state-enum";

/**
 * Class used as an interface for all communications with the AWO core game program.
 */
export class AWOInterfaceHelper {

    /**
     * Confirms the state is as expected and prints an error message if it isn't.
     *
     * @param interf The AWO interface.
     * @param expected The expected state.
     * @returns Whether the state is as expected.
     */
    static isInitStateExpected(interf: AWOInterface, expected: AWOState): boolean {

        if (interf.state === expected) {
            return true;
        }

        console.error(
            `expected state to be '${AWOStateStr[expected]}', was '${AWOStateStr[interf.state]}' 
            ${(new Error).stack}`
        );

        return false;
    }

    /**
     * Confirms the state is one of expected states and prints an error message if it isn't.
     *
     * @param interf The AWO interface.
     * @param expected List of possible expected states.
     * @returns Whether the state is as expected.
     */
    static expectStateOneOf(interf: AWOInterface, ...expected: AWOState[]): boolean {

        // Return positive result if one of the expected states was found
        for (const expectedState of expected) {
            if (interf.state === expectedState) {
                return true;
            }
        }

        // Expected state not found, build up error string & print
        let expectedStatesStr = "";

        for (const expectedState of expected) {
            expectedStatesStr += (AWOStateStr[expectedState] + " ");
        }

        console.error(
            `AWO state was ${AWOStateStr[interf.state]}, expected it to be one of [${expectedStatesStr}]
            ${(new Error).stack}`
        );

        return false;
    }

    /**
     * Confirms the state is equal to or greater than the given state and prints an error message if it isn't.
     *
     * @param interf The AWO interface.
     * @param expectedMin Minimum expected state.
     * @returns Whether the state is as expected.
     */
    static expectStateMinimum(interf: AWOInterface, expectedMin: AWOState): boolean {

        if (interf.state >= expectedMin) {
            return true;
        }

        console.error(
            `expected state to be at minimum ${expectedMin} ('${AWOStateStr[expectedMin]}'), 
            was ${interf.state} ('${AWOStateStr[interf.state]}')`
        );

        return false;
    }
}
