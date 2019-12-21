import { Component, OnInit } from "@angular/core";
import { GameService, AWOInterface, TileTypeData, TileVariationData } from "../../game/game.service";

@Component({
    selector: "app-editor-tools",
    templateUrl: "./editor-tools.component.html",
    styleUrls: ["./editor-tools.component.css"]
})
export class EditorToolsComponent implements OnInit {

    // public selectedTileType: TileTypeData;
    // public selectedTileVar: TileVarData;
    // public tileTypeData: TileTypeData[] = [];

    constructor(private gameService: GameService) { }

    ngOnInit() {
        this.gameService.initializedChange.subscribe((value) => {
            console.log("aaaaaaaaaaaa");
            console.log(value);
            let bla: TileTypeData;
            // let bla: AWOinterface.

            // let bla: AWO


            // this.gameService.AWOinterface.
            // this.tileTypeData = this.gameService.generateEditorTilesData();
        });

        /*
        if (this.gameService.initialized) {
            this.tileTypeData = this.gameService.generateEditorTilesData();
        } else {
            this.gameService.initializedChange.subscribe((value) => {
                console.log(value);
                this.tileTypeData = this.gameService.generateEditorTilesData();
            });
        }
        */
    }
}
