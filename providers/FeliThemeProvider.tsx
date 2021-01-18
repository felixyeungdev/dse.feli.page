// import useLocalStorage from "../hooks/useLocalStorage";
import { darkTheme, lightTheme } from "../theme/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

enum Theme {
    Dark = "dark",
    Light = "light",
}

const classNames = {
    classNameDark: "dark-mode",
    classNameLight: "light-mode",
};

const FeliThemeContext = createContext<any>({});

const defaultTheme = Theme.Light;

export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useLocalStorage("feli_page-theme", defaultTheme);
    const isDark = theme === Theme.Dark;
    const [mounted, setMounted] = useState(false);

    const toggle = () => {
        theme === Theme.Dark ? setTheme(Theme.Light) : setTheme(Theme.Dark);
    };

    useEffect(() => {
        if (theme === Theme.Dark) {
            document
                .querySelector("body")
                .classList.add(classNames.classNameDark);
            document
                .querySelector("body")
                .classList.remove(classNames.classNameLight);
        } else {
            document
                .querySelector("body")
                .classList.add(classNames.classNameLight);
            document
                .querySelector("body")
                .classList.remove(classNames.classNameDark);
        }
    }, [theme]);

    useEffect(() => {
        toggle();
        setMounted(true);
    }, []);

    useEffect(() => {
        mounted && toggle();
    }, [mounted]);

    return (
        <FeliThemeContext.Provider
            value={{ toggle, isDark }}
            // value={{ darkMode, toggle, isDark: false }}
        >
            {children}
        </FeliThemeContext.Provider>
    );
};
export const useFeliTheme = () => useContext(FeliThemeContext);

export const InjectMuiTheme = ({ children }) => {
    const { isDark } = useFeliTheme();
    const theme = isDark ? darkTheme : lightTheme;
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
