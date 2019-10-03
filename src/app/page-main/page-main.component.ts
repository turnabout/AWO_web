import { Component, OnInit } from "@angular/core";

import { LoadingService } from "../loading/loading.service";
import { GameService } from "../game/game.service";

@Component({
    selector: "app-page-main",
    templateUrl: "./page-main.component.html",
    styleUrls: ["./page-main.component.css"]
})
export class PageMainComponent implements OnInit {

    constructor(
        private loadingService: LoadingService,
        private gameService: GameService,
    ) { }

    ngOnInit() {
    }

}
