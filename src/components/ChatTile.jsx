import React from "react";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    tile: {
        width: "100%",
        height: "auto",
        backgroundColor: "grey",
        borderBottom: "1px solid white"
    },
});

function ChatTile (props) {
    const classes = useStyles();
    return (
        <div className={classes.tile}>
            <div className="author">{props.author}</div>
            <div className="message">{props.message}</div>
        </div>
    )
}

export default ChatTile;