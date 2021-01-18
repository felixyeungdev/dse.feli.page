import { createMuiTheme } from "@material-ui/core/styles";

const feliOrange = "#f9a825";

export const lightTheme = createMuiTheme({
    palette: {
        primary: { main: feliOrange },
        secondary: {
            main: "#ffffff",
        },
        background: {},
        divider: "#eaeaea",
    },
});

export const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: { main: feliOrange },
        secondary: {
            main: "#111111",
        },
        background: {
            default: "#181818",
            paper: "#1e1e1e",
        },
        divider: "#252525",
    },
});
