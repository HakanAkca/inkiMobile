import React, { Component } from 'react'
import {ScrollView, View, Text} from 'react-native'
import {Avatar, ListItem} from "react-native-elements";

const list = [
    {
        name: 'Magic circus - Tatto Shop',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Bonjour, une disponibilité...'
    },
    {
        name: 'Magic circus - Tatto Shop',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Bonjour, une disponibilité...'
    }
]

class Messages extends Component {

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
                                title={l.name}
                                subtitle={
                                    <View style={{marginTop: 5}}>
                                        <Text>{l.subtitle}</Text>
                                        <Text style={{marginTop: 2, fontSize: 12}}>Il y a 3 jours</Text>
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

export default Messages