import { Component, Input } from "@angular/core";
import { LoadingService } from "./loading.service";

@Component({
    selector: "app-loading",
    templateUrl: "./loading.component.html",
    styleUrls: ["./loading.component.css"]
})
export class LoadingComponent {
    constructor(public loadingService: LoadingService) { }
}
