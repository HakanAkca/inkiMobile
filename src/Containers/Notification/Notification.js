import React, { Component } from 'react'
import {ScrollView, View, Text, TouchableOpacity} from 'react-native'
import {Avatar, ListItem} from "react-native-elements";

const list = [
    {
        name: "N'oubliez pas de laisser un avis \n" +
            "au salon Magic Circus - Tattoo Shop ",
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        validated: true
    }
]

class Notification extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list: [{
                name: "N'oubliez pas de laisser un avis \n" +
                    "au salon Magic Circus - Tattoo Shop ",
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                validated: true
            }]
        }
    }


    openRatingModal() {

    }

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
                <View>
                    {
                        this.state.list.map((l, i) => (
                            l.validated === false ?
                            <TouchableOpacity onPress={() => this.openRatingModal()}>
                                <ListItem
                                    key={i}
                                    leftAvatar={
                                        <Avatar
                                            rounded
                                            size={'large'}
                                            source={{uri: l.avatar_url }}
                                        />
                                    }
                                    title={
                                        <View>
                                            <Text style={{fontSize: 15}}>{l.name}</Text>
                                        </View>
                                    }
                                />
                            </TouchableOpacity>
                                :
                                <View></View>
                        ))
                    }
                </View>
            </ScrollView>
        )
    }
}

export default Notification