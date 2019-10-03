import { Component, ViewChild, ElementRef } from "@angular/core";

import { GameService} from "./game.service";

@Component({
    selector: "app-game",
    templateUrl: "./game.component.html",
    styleUrls: ["./game.component.css"]
})
export class GameComponent {
    @ViewChild("gameCanvas", {static: false}) gameCanvas;

    constructor(private gameService: GameService) { }

    ngAfterViewInit() {
        this.gameService.loadGame(this.gameCanvas.nativeElement as HTMLCanvasElement);
    }
}
