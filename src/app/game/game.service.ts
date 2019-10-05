import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";

import { LoadingService } from "../loading/loading.service";
import { loadGame, initGame } from "./init";
import { TileTypeData, TileVarData } from "../page-design-room/editor-tools/editor-tools.component";

@Injectable({
    providedIn: "root"
})
export class GameService {

    // Path to emscripten-generated files
    private static emDirPath = "assets/";

    // Module object generated and used by emscripten as an interface to the outside world.
    // Can be used to speak with emscripten and use its interfaces.
    private emModuleObj: any;

    // Pointer to the main AWO Game instance.
    public gamePtr: number;

    // Whether the game surface is currently initialized or not.
    public initialized = false;
    public initializedChange: Subject<boolean> = new Subject<boolean>();

    constructor(private loadingService: LoadingService) {
        console.log("herro");

        this.initializedChange.subscribe((value) => {
            this.initialized = value;
        });

        /*
        this.myBool = new Observable((observer) => {
            const {next, error} = observer;
            let watchId;


        });
        */
    }

    /**
     * Perform the initial game load.
     */
    public loadGame(gameCanvas: HTMLCanvasElement) {
        setTimeout(() => {
            this.emModuleObj = loadGame(
                gameCanvas,
                this.loadingService,
                GameService.emDirPath,
                () => {
                    this.gamePtr = initGame(this.emModuleObj);
                    this.initializedChange.next(true);
                },
            );
        });

    }

    /**
     * Generates the array of TileTypeData used by the design room's editor tools component.
     */
    public generateEditorTilesData(): TileTypeData[] {

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
    }


}
