import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ChatStream from "../components/ChatStream";

const useStyles = makeStyles({
    appcontainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#121212",
        overflow: "auto",
        "&::-webkit-scrollbar": {
            display: "none"
        }
    },
});

function TwitchChatClient () {
    const classes = useStyles();
    return (
        <div className={classes.appcontainer}>
            <ChatStream/>
        </div>
    );
}

export default TwitchChatClient;
