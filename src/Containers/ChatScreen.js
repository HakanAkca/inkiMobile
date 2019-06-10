import React, { Component } from 'react'
import { GiftedChat, Bubble} from "react-native-gifted-chat";
import {ScrollView, Text, View, Image, TouchableOpacity, TextInput} from "react-native";
import {Avatar, Icon} from "react-native-elements";

class ChatScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null
    })


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

    renderInputField() {
        return(
            <View style={{
                backgroundColor: 'transparent',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 84
            }}>
                <View style={{marginLeft: 20}}>
                    <Icon color={"#AEAEAE"} name={"camera"} type={"material-community"} />
                </View>
                <View style={{marginLeft: 10}}>
                    <TextInput
                        style={{height: 40,width: 307, borderWidth: 1, borderColor: '#E9E9E9', borderRadius: 20, padding: 10}}
                        placeholder="Envoyer un message"
                    />
                </View>
            </View>
        )
    }

    render() {

        const {name, thumbnail} = this.props.navigation.state.params.data

        return (
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', backgroundColor: '#F8F8F8', height: 114, alignItems: 'center'}}>
                    <TouchableOpacity style={{height:12.44, width: 22.44, marginLeft: 20}} onPress={() => this.props.navigation.goBack()}>
                        <Image source={require('../../assets/Images/left.png')} />
                    </TouchableOpacity>
                    <Avatar containerStyle={{height: 65, width: 65, borderRadius: 40, overflow: 'hidden', marginLeft: 5}} source={{ uri: thumbnail}} />
                    <View style={{marginLeft: 10}}>
                        <Text style={{color: '#FD7495', fontSize: 20}}>{name}</Text>
                        <Text style={{fontSize: 16, color: '#B7B7B7'}}>Salon de tatouage</Text>
                    </View>
                </View>
                <GiftedChat
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1
                    }}
                    alignTop={false}
                    renderComposer={this.renderInputField.bind(this)}
                 />
            </View>
        );
    }
}

export default ChatScreen