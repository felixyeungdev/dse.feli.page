import { pendingExplanation } from "./pendingExplanations";

export function startBackgroundJobs() {
    console.log("starting background jobs");
    pendingExplanation.start();
}
