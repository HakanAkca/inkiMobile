import React, { Component } from 'react'
import {ScrollView, View, Text} from 'react-native'
import {Avatar, ListItem} from "react-native-elements";

const list = [
    {
        name: "N'oubliez pas de laisser un avis \n" +
            "au salon Magic Circus - Tattoo Shop ",
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    },
    {
        name: "N'oubliez pas de laisser un avis \n" +
            "au salon Magic Circus - Tattoo Shop ",
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    }
]

class Notification extends Component {

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
                <View>
                    {
                        list.map((l, i) => (
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
                        ))
                    }
                </View>
            </ScrollView>
        )
    }
}

export default Notification