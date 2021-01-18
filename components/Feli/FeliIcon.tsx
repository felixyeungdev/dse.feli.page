import Avatar from "@material-ui/core/Avatar";
import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
    })
);

export default function FeliIcon({
    size = 128,
    margin = 0,
}: {
    size?: number;
    margin?: number | string;
}) {
    const iconStyles = useStyles();

    return (
        <div
            style={{
                margin,
                borderRadius: 500,
            }}
        >
            <Avatar
                src="/assets/images/dse-clean.png"
                alt="dse.feli.page icon"
                className={iconStyles.small}
                style={{
                    transform: "scale(1.5)",
                }}
            />
        </div>
    );
}
