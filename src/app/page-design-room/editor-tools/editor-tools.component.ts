import { Component, OnInit } from "@angular/core";

export declare interface TileVarData {
    name: string;
    val: number;
}

export declare interface TileTypeData {
    name: string;
    vars: TileVarData[];
}

@Component({
    selector: "app-editor-tools",
    templateUrl: "./editor-tools.component.html",
    styleUrls: ["./editor-tools.component.css"]
})
export class EditorToolsComponent implements OnInit {

    private selectedTileType = 0;

    private tileTypes: TileTypeData[] = [
        {
            name: "Plain",
            vars: [
                {name: "Default", val: 0}
            ]
        },
    ];

    constructor() { }

    ngOnInit() {
    }

    onTileTypeSelected(event) {
        let selected: number = event.target.value;
        console.log(selected);
    }

}
