class Snackbar {
    constructor() {
        this.base = document.createElement("div");
        this.base.classList.add("snackbar");
        document.body.append(this.base);
    }

    show(text = "", timeout = 5000) {
        this.base.textContent = text;
        const offset = 250;
        setTimeout((e) => this.base.classList.add("show"), offset);
        setTimeout((e) => this.base.classList.remove("show"), timeout + offset);
        setTimeout((e) => this.base.remove(), timeout + 500 + offset);
    }

    hide() {
        this.base.classList.remove("show");
    }

    remove() {
        this.base.remove();
    }
}
