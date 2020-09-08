function randomID() {
    return (
        Math.round(Math.random() * 1e16).toString(16) +
        Math.round(Math.random() * 1e16).toString(16)
    );
}

function isASCII(str) {
    return /^[\x00-\x7F]*$/.test(str);
}

document.body.addEventListener("click", () => {});
