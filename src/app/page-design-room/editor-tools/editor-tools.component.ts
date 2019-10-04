import { Component, OnInit } from "@angular/core";

declare interface TileType {
    name: string;
    id: number;
}

@Component({
    selector: "app-editor-tools",
    templateUrl: "./editor-tools.component.html",
    styleUrls: ["./editor-tools.component.css"]
})
export class EditorToolsComponent implements OnInit {

    private tileTypes: TileType[] = [
        {name: "Plain", id: 0},
        {name: "Forest", id: 1}
    ];

    constructor() { }

    ngOnInit() {
    }

    onTileTypeSelected(event) {
        let selected: number = event.target.value;
        console.log(selected);
    }

}
