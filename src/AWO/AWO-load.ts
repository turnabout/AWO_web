import AWO_EM_MODULE from "../assets/AWO.js";
import { AWO } from "./AWO";

/**
 * Loads the AWO game. Calls AWO's emscripten module with a custom argument object used to hook into different loading
 * stages and update progress.
 *
 * Stores the full emscripten module in the `AWO` class.
 */
export function loadAWO(
    // progressUpdateCb: (percentComplete: number) => void,
    // statusUpdateCb: (status: string) => void,
    // runtimeInitializedCb: () => void,
    gameCanvas: HTMLCanvasElement,
    runtimeInitializedCb: () => void,
): void {

    // Adjust canvas
    gameCanvas.addEventListener("webglcontextlost", (e) => {
        alert("WebGL context lost. You will need to reload the page.");
        e.preventDefault();
    }, false);

    // Object with custom properties for AWO emscripten module to use
    const moduleObj: any = {
        preRun:  [],
        postRun: [],

        // Prints `printf` outputs.
        print(text: string) {
            if (arguments.length > 1) {
                text = Array.prototype.slice.call(arguments).join(" ");
            }

            console.log(text);
        },

        // Prints error messages
        printErr(text: string) {
            if (arguments.length > 1) {
                text = Array.prototype.slice.call(arguments).join(" ");
            }

            console.error(text);
        },

        // Used by module to get the canvas element
        canvas: (() => {
            return gameCanvas;
        })(),

        // Set the current loading status message
        setStatus(text: string) {
            if (!this.setStatus.last) {
                this.setStatus.last = { time: Date.now(), text: "" };
            }

            if (text === this.setStatus.last.text) {
                return;
            }

            const m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
            const now = Date.now();

            if (m && now - this.setStatus.last.time < 30) {
                // return; // If this is a progress update, skip it if too soon
            }

            this.setStatus.last.time = now;
            this.setStatus.last.text = text;

            // statusUpdateCb(text);
        },

        totalDependencies: 0,

        // Current/max amount of times `monitorRunDependencies` gets called.
        currentRDCalls: 0,
        maxRDCalls: 14,

        monitorRunDependencies(remaining: number) {

            // Send updated progress percentage
            /*
            progressUpdateCb(
                ((++this.currentRDCalls) / this.maxRDCalls) * 100
            );
            */

            this.totalDependencies = Math.max(this.totalDependencies, remaining);

            this.setStatus(
                remaining
                ? "Preparing... (" + (this.totalDependencies - remaining) + "/" + this.totalDependencies + ")"
                : "All downloads complete.",
            );
        },

        onRuntimeInitialized() {
            runtimeInitializedCb();
        },

        // Adjust location of files queried for
        locateFile(path: string, prefix: string) {
            return AWO.emDirPath + path;
        },

        // TODO: Set behaviour when abnormal program termination occurs
        onAbort() {
        }
    };

    AWO.emModuleObj = AWO_EM_MODULE(moduleObj);
}
