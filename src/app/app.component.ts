import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title: string = "AWO-web";

  // Loading bar support
  private loading: boolean = true;
  private loadingMessage: string = "Loading...";
  private loadingProgress: number = 50;
}
