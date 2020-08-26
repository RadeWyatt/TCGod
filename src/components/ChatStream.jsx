import React from 'react';
import TMI from 'tmi.js';
import uuid from 'react-uuid'
import ChatTile from "./ChatTile";

class ChatStream extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: []
        }
        this.messagesEndRef = React.createRef()
    }

    componentDidMount() {
        this.client = new TMI.Client({
            connection: {
                reconnect: true,
                secure: true
            },
            channels: [ 'TimTheTatman' ]
        });
        this.client.connect();
        this.client.on('message', (channel, user, message, self) => {
            if (this.state.chats.length === 50)
                this.state.chats.shift();
            this.state.chats.push([user, message])
            this.setState({chats: this.state.chats});
        });

    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    render() {
        const items = this.state.chats.map(function(item){
            return <ChatTile key={uuid()} user={item[0]} message={item[1]}/>;
        });
        return (
            <>
                {items}
                <div ref={this.messagesEndRef} />
            </>
        )
    }
}


export default ChatStream;