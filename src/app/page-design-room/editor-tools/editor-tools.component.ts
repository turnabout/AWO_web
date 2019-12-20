import { Component, OnInit } from "@angular/core";
import { GameService} from "../../game/game.service";

export declare interface TileTypeData {
    name: string;
    vars: TileVarData[];
}

export declare interface TileVarData {
    name: string;
    val: number;
}

@Component({
    selector: "app-editor-tools",
    templateUrl: "./editor-tools.component.html",
    styleUrls: ["./editor-tools.component.css"]
})
export class EditorToolsComponent implements OnInit {

    public selectedTileType: TileTypeData;
    public selectedTileVar: TileVarData;

    public tileTypeData: TileTypeData[] = [];

    constructor(private gameService: GameService) { }

    ngOnInit() {
        if (this.gameService.initialized) {
            this.tileTypeData = this.gameService.generateEditorTilesData();
        } else {
            this.gameService.initializedChange.subscribe((value) => {
                console.log(value);
                this.tileTypeData = this.gameService.generateEditorTilesData();
            });
        }
    }
}
