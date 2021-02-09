import { pendingExplanationBackground } from "./pendingExplanations";

export function startBackgroundJobs() {
    console.log("starting background jobs");
    pendingExplanationBackground.start();
}
