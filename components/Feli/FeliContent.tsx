import styles from "../../styles/Feli/FeliContent.module.scss";
import AppBar from "@material-ui/core/AppBar";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

export default function FeliContent({
    children,
    center = false,
    justifyText = false,
    paddingTop = true,
    paddingBottom = true,
}) {
    const classNames = [];
    center && classNames.push(styles.center);
    justifyText && classNames.push(styles.justifyText);
    paddingTop && classNames.push(styles.paddingTop);
    paddingBottom && classNames.push(styles.paddingBottom);
    const classNameStr = classNames.join(" ");
    return (
        <>
            <main className={classNameStr}>{children}</main>
        </>
    );
}
