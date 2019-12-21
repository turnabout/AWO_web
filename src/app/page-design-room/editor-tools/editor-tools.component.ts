import { Component, OnInit } from "@angular/core";
import { GameService, TileTypeData, TileVariationData } from "../../game/game.service";

@Component({
    selector: "app-editor-tools",
    templateUrl: "./editor-tools.component.html",
    styleUrls: ["./editor-tools.component.css"]
})
export class EditorToolsComponent implements OnInit {

    public selectedTileType: TileTypeData;
    public selectedTileVariation: TileVariationData;
    public tileData: TileTypeData[] = [];

    constructor(private gameService: GameService) { }

    ngOnInit() {
        if (this.gameService.initialized) {
            this.tileData = this.gameService.AWOinterface.editor.getTileData();
        } else {
            this.gameService.initializedChange.subscribe((value) => {
                this.tileData = this.gameService.AWOinterface.editor.getTileData();
            });
        }
    }
}
