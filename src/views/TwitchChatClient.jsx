import React from 'react';
import { withStyles } from '@material-ui/styles';
import ChatStream from "../components/ChatStream";
import StreamSelect from "../components/StreamSelect";

const styles = {
    appcontainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#121212",
        overflow: "auto",
        "&::-webkit-scrollbar": {
            display: "none"
        }
    },
};

class TwitchChatClient extends React.Component {
    constructor() {
        super();
        this.state = {
            channelName: "",
        }
    }

    changeChannel = (newChannel) => {
        this.setState({channelName: newChannel});
    }

    render() {
        const { channelName } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.appcontainer}>
                <StreamSelect changeChannel={this.changeChannel}/>
                <ChatStream channel={channelName}/>
            </div>
        );
    }
}

export default withStyles(styles)(TwitchChatClient);
