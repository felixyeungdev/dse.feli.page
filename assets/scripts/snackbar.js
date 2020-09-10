class Snackbar {
    constructor() {
        this.base = document.createElement("div");
        this.base.classList.add("snackbar");
        document.body.append(this.base);
    }

    show(text = "", timeout = 5000) {
        this.base.textContent = text;
        setTimeout((e) => this.base.classList.add("show"));
        setTimeout((e) => this.base.classList.remove("show"), timeout);
    }

    hide() {
        this.base.classList.remove("show");
    }
}
