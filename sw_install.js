const version = "v1.0.7c";

function installServiceWorker() {
    let displayer = document.querySelector("#version");
    showVersion(version);

    function showVersion(data) {
        if (displayer) {
            displayer.textContent = data;
        }
    }

    if ("serviceWorker" in navigator) {
        window.addEventListener("load", async function () {
            let registration = await navigator.serviceWorker.register(
                "/sw.js",
                { scope: "/" }
            );
            console.log("Service Worker Registered");
            registration.addEventListener("updatefound", (e) => {
                // showVersion(`${version} Update found`);

                console.log("New Service Worker Found");

                let newWorker = registration.installing;
                newWorker.addEventListener("statechange", (e) => {
                    if (newWorker.state === "installed") {
                        // showVersion(`${version} Update installed`);
                        console.log("New Service Installed");
                        if (navigator.serviceWorker.controller) {
                            newWorker.postMessage({
                                action: "skipWaiting",
                            });
                            console.log("New Service Worker Skip Waiting");
                            showVersion(`${version} Update`);
                            displayer.classList.add("clicky");
                            displayer.addEventListener("click", (e) => {
                                window.location.reload();
                            });
                            //
                        }
                    }
                });
            });

            navigator.serviceWorker.ready.then(function (registration) {
                console.log("Service Worker Ready");
            });
        });
    }
}

installServiceWorker();
