import { AWO } from "./AWO";

declare global {
    interface Window {
        Module: any;
    }
}

/**
 * Loads the AWO game by creating the initial `window.Module` object used by emscripten and then loading the runtime
 * script.
 */
export default function loadAWO(
    progressUpdateCb: (percentComplete: number) => void,
    statusUpdateCb: (status: string) => void,
    runtimeInitializedCb: () => void
) {
    // Initialize window.Module and add custom properties to it
    window.Module = {
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
        canvas() {
            const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;

            // TODO: Change behavior to something more user-friendly for when webgl context is lost
            canvas.addEventListener("webglcontextlost", (e) => {
                alert("WebGL context lost. You will need to reload the page.");
                e.preventDefault();
            }, false);

            return canvas;
        },

        setStatus(text: string) {
            if (!window.Module.setStatus.last) {
                window.Module.setStatus.last = { time: Date.now(), text: "" };
            }

            if (text === window.Module.setStatus.last.text) {
                return;
            }

            const m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
            const now = Date.now();

            if (m && now - window.Module.setStatus.last.time < 30) {
                // return; // If this is a progress update, skip it if too soon
            }

            window.Module.setStatus.last.time = now;
            window.Module.setStatus.last.text = text;

            statusUpdateCb(text);
        },

        totalDependencies: 0,

        // Current/max amount of times `monitorRunDependencies` gets called.
        currentRDCalls: 0,
        maxRDCalls: 14,

        monitorRunDependencies(remaining: number) {

            // Send updated progress percentage
            progressUpdateCb(
                ((++this.currentRDCalls) / this.maxRDCalls) * 100
            );

            this.totalDependencies = Math.max(this.totalDependencies, remaining);

            window.Module.setStatus(
                remaining
                ? "Preparing... (" + (this.totalDependencies - remaining) + "/" + this.totalDependencies + ")"
                : "All downloads complete.",
            );
        },

        onRuntimeInitialized() { runtimeInitializedCb(); },

        locateFile(path: string, prefix: string) {

            // Fix path for .data file
            if (path.endsWith(".data")) {
                return AWO.dirPath + path;
            }

            // otherwise, use the default, the prefix (JS file's dir) + the path
            return prefix + path;
        },

        // TODO: Set behaviour when abnormal program termination occurs
        onAbort() {

        }
    };

    // Load AWO's runtime script.
    ((d: Document) => {
        const script: HTMLScriptElement = d.createElement("script");

        script.type   = "text/javascript";
        script.async  = true;
        /*
        script.onload = () => {
        };
        */
        script.src = AWO.path;
        d.getElementsByTagName("head")[0].appendChild(script);
    })(document);
}
