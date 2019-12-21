import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { AWOInterface } from "./AWO/AWO.interface";

import { LoadingService } from "../loading/loading.service";
export * from "./AWO/AWO.interface";

@Injectable({
    providedIn: "root"
})
export class GameService {

    // Interface for communicating with AWO's base game program.
    public AWOinterface: AWOInterface;

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
        this.AWOinterface = new AWOInterface();

        // console.log(this.AWOinterface.state);
        // this.AWOinterface.init.initializeGame();
        // console.log(this.AWOinterface.state);
        // this.AWOinterface.testy();


        setTimeout(() => {
            /*
            this.AWOinterface.initializeInterface(
                        () => {
                    this.loadingService.start("Loading...");
                },
                (progress: number, progressStr: string) => {
                    this.loadingService.update(progress, progressStr);
                },
                () => {

                    // TODO: move elsewhere
                    this.AWOinterface.initializeGame(
                        window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                        window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight
                    );

                    this.loadingService.end();
                    this.initializedChange.next(true);

                    // TODO: move elsewhere
                    this.AWOinterface.prepareGame();
                    this.AWOinterface.runGame();
                }
            );
            */
        });
    }
}
