import { Injectable } from "@angular/core";

import { LoadingService } from "../loading/loading.service";
import { loadGame, initGame } from "./init";

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

    constructor(private loadingService: LoadingService) { }

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
                    this.initialized = true;
                },
            );
        });
    }
}
