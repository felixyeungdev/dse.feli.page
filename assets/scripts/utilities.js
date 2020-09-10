window.isDevelopmentMode =
    window.location.host.startsWith("localhost") ||
    window.location.host.startsWith("192.168.");

const devLogger = window.isDevelopmentMode ? console.log : () => {};

function randomID() {
    // var _copy = copy;
    // setInterval((e) => _copy(randomID()), 100);
    return (
        Math.round(Math.random() * 1e16).toString(16) +
        Math.round(Math.random() * 1e16).toString(16)
    );
}

function isASCII(str) {
    return /^[\x00-\x7F]*$/.test(str);
}

document.body.addEventListener("click", () => {});

let getHashSearch = () => {
    let hash = window.location.hash || "#";
    let search = hash.slice(1);
    return search;
};

let setHashSearch = (search = "") => {
    if (!search.startsWith("?")) search = "?" + search;
    window.location.hash = "#" + search;
};

// https://stackoverflow.com/questions/880512/prevent-text-selection-after-double-click
function clearSelection() {
    if (document.selection && document.selection.empty) {
        document.selection.empty();
    } else if (window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
    }
}
