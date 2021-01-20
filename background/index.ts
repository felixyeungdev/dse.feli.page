import { pendingExplanation } from "./pendingExplanations";

const state = {
    started: false,
};

export function startBackgroundJobs() {
    if (state.started) return;
    console.log("starting background jobs");
    pendingExplanation.start();
    state.started = true;
}
