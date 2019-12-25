import { Component, OnInit } from "@angular/core";
import { GameService, TileTypeData, TileVariationData, SelectedEntityKind } from "../../game/game.service";

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
     * @param tileType The new selected tile type.
     */
    updateSelectedTileType(tileType: TileTypeData) {
        this.selectedTileType = tileType;
        this.selectedTileVariation = null;

        // Internally update the selected tile
        this.gameService.AWO.editor.updateEditorSelectedEntity(
            SelectedEntityKind.Tile,
            this.selectedTileType.value,
            -1
        );
    }

    /**
     * Updates the currently selected tile variation.
     * @param tileVariation The new selected tile variation.
     */
    updateSelectedTileVariation(tileVariation: TileVariationData) {
        this.selectedTileVariation = tileVariation;

        // Internally update the selected tile
        this.gameService.AWO.editor.updateEditorSelectedEntity(
            SelectedEntityKind.Tile,
            this.selectedTileType.value,
            this.selectedTileVariation.value
        );
    }

    ngOnInit() {
        if (this.gameService.initialized) {
            this.tileData = this.gameService.AWO.data.getTileData();
            this.selectedTileType = this.tileData[0];
        } else {
            this.gameService.initializedChange.subscribe((value) => {
                this.tileData = this.gameService.AWO.data.getTileData();
                this.selectedTileType = this.tileData[0];
            });
        }
    }
}
