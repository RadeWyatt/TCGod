import React from 'react';
import TMI from 'tmi.js';
import uuid from 'react-uuid'
import ChatTile from "./ChatTile";

class ChatStream extends React.Component {
    constructor() {
        super();
        this.state = {
            chats: []
        }
        this.messagesEndRef = React.createRef()
    }

    componentDidUpdate(prevProps) {
        if (this.props.channel !== prevProps.channel) {
            this.updateTwitchClient()
        }
        this.scrollToBottom();
    }

    updateTwitchClient() {
        if (this.client) {
            this.client.disconnect();
            this.setState({chats: []});
        }
        const newClient = new TMI.Client({
            connection: {
                reconnect: true,
                secure: true
            },
            channels: [ this.props.channel ]
        });
        this.client = newClient;
        this.client.connect();
        this.client.on('message', (channel, user, message, self) => {
            if (this.state.chats.length === 50)
                this.state.chats.shift();
            this.state.chats.push([user, message])
            this.setState({chats: this.state.chats});
        });
    }

    scrollToBottom() {
        this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    render() {
        const items = this.state.chats.map(function(item){
            return <ChatTile key={uuid()} user={item[0]} message={item[1]}/>;
        });
        return (
            <div style={{marginTop: "30px"}}>
                {items}
                <div ref={this.messagesEndRef} />
            </div>
        )
    }
}


export default ChatStream;