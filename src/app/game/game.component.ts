import { Component, ViewChild } from "@angular/core";
import { animate, state, style, transition, trigger } from "@angular/animations";

import { GameService} from "./game.service";

@Component({
    selector: "app-game",
    templateUrl: "./game.component.html",
    styleUrls: ["./game.component.css"],
    animations: [
        trigger("faded", [
            state("out", style({
                opacity: 0
            })),
            state("in", style({
                opacity: 1
            })),
            transition("out => in", [
                animate("0.5s 0.2s ease-in")
            ]),
            transition("in => out", [
                animate("1s")
            ]),
        ])
    ]
})
export class GameComponent {
    @ViewChild("gameCanvas", {static: false}) gameCanvas;

    constructor(private gameService: GameService) { }

    ngAfterViewInit() {
        this.gameService.loadGame(this.gameCanvas.nativeElement as HTMLCanvasElement);
    }
}
