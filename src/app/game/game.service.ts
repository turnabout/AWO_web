import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { AWOFunctions, AWOInterface } from "./AWO/AWO.interface";

import { LoadingService } from "../loading/loading.service";
import { TileTypeData, TileVarData } from "../page-design-room/editor-tools/editor-tools.component";

@Injectable({
    providedIn: "root"
})
export class GameService {

    // Interface for communicating with AWO's base game program.
    private AWOinterface: AWOInterface;

    // Whether the game is currently initialized or not.
    public initialized = false;
    public initializedChange: Subject<boolean> = new Subject<boolean>();

    constructor(private loadingService: LoadingService) {
        this.initializedChange.subscribe((value) => {
            this.initialized = value;
        });
    }

    /**
     * Initialize the game's interface and internal components.
     */
    public initializeGame(gameCanvas: HTMLCanvasElement) {
        this.AWOinterface = new AWOInterface(gameCanvas);

        setTimeout(() => {
            this.AWOinterface.initializeInterface(
                () => {
                    this.loadingService.start("Loading...");
                },
                (progress: number, progressStr: string) => {
                    this.loadingService.update(progress, progressStr);
                },
                () => {
                    this.loadingService.end();
                    this.initializedChange.next(true);

                    // TODO: move elsewhere
                    this.AWOinterface.initializeGame(
                        window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                        window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight
                    );

                    // TODO: move
                    this.AWOinterface.prepareGame();
                    this.AWOinterface.runGame();
                }
            );
        });
    }

    /**
     * Generates the array of TileTypeData used by the design room's editor tools component.
     */
    public generateEditorTilesData(): TileTypeData[] {

        /*
        let result: TileTypeData[] = [];

        // Wrap function to get tile variations' data
        let get_next_tile_var: any = this.emModuleObj.cwrap(
            "editor_get_next_tile_var",
            "string",
            ["number", "number", "number"]
        );

        // Loop every tile type
        let ttString: string;
        let ttVal: number = 0;
        let varValuePtr: any = this.emModuleObj._malloc(1);

        while (ttString = this.emModuleObj.ccall("editor_get_next_tile_type", "string", [])) {

            // Create this tile type object
            let tt: TileTypeData = {
                name: ttString,
                vars: []
            };

            // Add all of its variations' objects
            let tvString: string;

            // myFunc(this.gamePtr, 5, varValuePtr);
            while (tvString = get_next_tile_var(this.gamePtr, ttVal, varValuePtr)) {
                tt.vars.push({
                    name: tvString,
                    val: this.emModuleObj.getValue(varValuePtr, "i8")
                });
            }

            result.push(tt);
            ttVal++;
        }

        this.emModuleObj._free(varValuePtr);
        return result;
        */
        return undefined;
    }
}
