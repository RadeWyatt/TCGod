import React from "react";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    tile: {
        width: "100%",
        minHeight: "40px",
        borderBottom: "1px solid rgba(255,255,255,0.3)",
        overflow: "hidden",
        display: "flex"
    },
    author: {
        width: "20%",
        backgroundColor: "rgba(255,255,255,0.15)",
        alignItems: "stretch",
        lineHeight: "3",
        textAlign: "center"
    },
    message: {
        width: "80%",
        backgroundColor: "rgba(255,255,255,0.1)",
        alignItems: "stretch",
        lineHeight: "3",
        color: "white",
        paddingLeft: "10px"
    }
});

function ChatTile (props) {
    const classes = useStyles();
    return (
        <div className={classes.tile}>
            <div className={classes.author}>{props.author}</div>
            <div className={classes.message}>{props.message}</div>
        </div>
    )
}

export default ChatTile;