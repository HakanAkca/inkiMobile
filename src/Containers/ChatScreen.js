import React, { Component } from 'react'
import { GiftedChat } from "react-native-gifted-chat";

class ChatScreen extends Component {

    state = {
        messages: []
    };

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'My message',
                    createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                    image: 'https://facebook.github.io/react/img/logo_og.png',
                    // You can also add a video prop:
                    // Any additional custom parameters are passed through
                }
            ]
        });
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }));
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: 1
                }}
            />
        );
    }
}

export default ChatScreen