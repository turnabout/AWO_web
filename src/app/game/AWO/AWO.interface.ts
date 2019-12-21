import { AWOState } from "./AWO.interface.state-enum";
import { AWOInitializationInterface } from "./AWO.interface.initialization";
import { AWOInterfaceState } from "./AWO.interface.state";
import { AWOEditorInterface } from "./AWO.interface.editor";
import { AWOGameInterface } from "./AWO.interface.game";

export * from "./AWO.interface.state-enum";
export * from "./AWO.interface.editor.types";

/**
 * Main AWO interface class used as an entry point for all communications with the AWO core game program.
 */
export class AWOInterface {

    // Reference to the current AWO interface state.
    private interfaceState: AWOInterfaceState;

    // Child interfaces
    public init: AWOInitializationInterface;
    public editor: AWOEditorInterface;
    public game: AWOGameInterface;

    // The current AWO interface state.
    public get state(): AWOState {
        return this.interfaceState.state;
    }

    constructor() {
        this.interfaceState = new AWOInterfaceState();
        this.init = new AWOInitializationInterface(this.interfaceState);
    }
}
