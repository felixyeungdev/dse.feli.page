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

// https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
async function copyTextToClipboard(text) {
    function fallbackCopyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        var success = false;
        try {
            var successful = document.execCommand("copy");
            success = successful ? true : false;
        } catch (err) {}

        document.body.removeChild(textArea);
        return true;
    }
    if (!navigator.clipboard) {
        return fallbackCopyTextToClipboard(text);
    }
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        return false;
    }
}
