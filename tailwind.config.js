const plugin = require("tailwindcss/plugin");

module.exports = {
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                feli: {
                    lightest: "#feeed6",
                    lighter: "#fde4bd",
                    light: "#fbc672",
                    DEFAULT: "#f9a828",
                    dark: "#cf8106",
                    darker: "#845204",
                    darker: "#6C4303",
                    "opacity-100": "rgba(249, 168, 37, 0.1)",
                    "opacity-200": "rgba(249, 168, 37, 0.2)",
                    "opacity-300": "rgba(249, 168, 37, 0.3)",
                    "opacity-400": "rgba(249, 168, 37, 0.4)",
                    "opacity-500": "rgba(249, 168, 37, 0.5)",
                    "opacity-600": "rgba(249, 168, 37, 0.6)",
                    "opacity-700": "rgba(249, 168, 37, 0.7)",
                    "opacity-800": "rgba(249, 168, 37, 0.8)",
                    "opacity-900": "rgba(249, 168, 37, 0.9)",
                },
                dark: {
                    DEFAULT: "#0F0F0F",
                },
            },
            minHeight: {
                64: "64px",
                56: "56px",
                "screen-1/4": "25vh",
                "screen-1/2": "50vh",
                "screen-3/4": "75vh",
            },
        },
        fontFamily: {
            display: [
                "Inter",
                "ui-sans-serif",
                "system-ui",
                "-apple-system",
                "BlinkMacSystemFont",
                "Segoe UI",
                "Roboto",
                "Helvetica Neue",
                "Arial",
                "Noto Sans",
                "sans-serif",
                "Apple Color Emoji",
                "Segoe UI Emoji",
                "Segoe UI Symbol",
                "Noto Color Emoji",
            ],
        },
    },
    variants: {
        extend: {
            boxShadow: ["active"],
            textColor: ["active"],
            backgroundColor: ["active"],
            zIndex: ["hover"],
        },
    },
    plugins: [
        plugin(function ({ addBase, theme }) {
            addBase({
                h1: {
                    fontSize: theme("fontSize.4xl"),
                    fontWeight: theme("fontWeight.bold"),
                },
                h2: {
                    fontSize: theme("fontSize.3xl"),
                    fontWeight: theme("fontWeight.bold"),
                },
                h3: {
                    fontSize: theme("fontSize.2xl"),
                    fontWeight: theme("fontWeight.bold"),
                },
                h4: {
                    fontSize: theme("fontSize.xl"),
                    fontWeight: theme("fontWeight.bold"),
                },
                h5: {
                    fontSize: theme("fontSize.lg"),
                    fontWeight: theme("fontWeight.bold"),
                },
                h6: {
                    fontSize: theme("fontSize.base"),
                    fontWeight: theme("fontWeight.bold"),
                },
            });
        }),
    ],
};
