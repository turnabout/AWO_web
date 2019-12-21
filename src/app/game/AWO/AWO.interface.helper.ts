import { AWOInterface } from "./AWO.interface";
import { AWOState, AWOStateStr } from "./AWO.interface.state-enum";

/**
 * Class used as an interface for all communications with the AWO core game program.
 */
export class AWOInterfaceHelper {

    /**
     * Helper used during AWO interface initialization functions.
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

        return true;
    }
}
