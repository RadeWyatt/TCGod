import React, { useState } from 'react';
import TMI from 'tmi.js';
import uuid from 'react-uuid'
import ChatTile from "../components/ChatTile";

class TwitchChatClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatList: []
        }
        this.client = new TMI.Client({
            connection: {
                reconnect: true,
                secure: true
            },
            channels: [ 'shroud' ]
        });
        this.client.connect();
        this.messagesEndRef = React.createRef()
    }



    componentDidMount() {
        this.client.on('message', (channel, tags, message, self) => {
            this.handleMessage(channel, tags, message, self);
        });
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    handleMessage(channel, tags, message, self) {
        const author = `${tags['display-name']}`;
        const msg = `${message}`;
        this.state.chatList.push([author,msg])
        this.setState(this.state.chatList);
    }

    render() {
        const items = this.state.chatList.map(function(item){
            return <ChatTile key={uuid()} author={item[0]} message={item[1]}/>;
        });
        return (
            <>
                {items}
                <div ref={this.messagesEndRef} />
            </>
        );
    }
}

export default TwitchChatClient;
