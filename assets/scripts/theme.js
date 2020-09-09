var feliTheme;

(function () {
    const availableThemes = ["light", "dark", "black"];

    function loadTheme(theme = "") {
        let test = Array.from(document.body.classList.values())
            .filter((className) => className.startsWith("theme-"))
            .forEach((e) => document.body.classList.remove(e));
        theme && setTheme(theme);
        let currentTheme = theme ? theme : getTheme();
        document.body.classList.add(`theme-${currentTheme}`);
    }

    function getTheme() {
        return localStorage.getItem("theme") || "light";
    }

    function setTheme(theme) {
        localStorage.setItem("theme", theme);
    }

    loadTheme();

    feliTheme = { loadTheme, getTheme, setTheme, availableThemes };
})();
