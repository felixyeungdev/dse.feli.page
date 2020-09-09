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
