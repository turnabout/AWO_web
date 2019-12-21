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

    /**
     * Updates the currently selected tile.
     * Uses `selectedTileType` which is set automatically and the given variation.
     * @param tileVariation The tile variation to update the selected tile to.
     */
    updatedSelectedTile(tileVariation: TileVariationData) {
        this.selectedTileVariation = tileVariation;

        // Internally update the selected tile
        this.gameService.AWOinterface.editor.updateEditorSelectedTile(
            this.selectedTileType.value,
            this.selectedTileVariation.value
        );
    }

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
