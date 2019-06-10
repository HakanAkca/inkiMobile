import React, { Component } from 'react'
import {ScrollView, View, Text, TouchableOpacity} from 'react-native'
import {Avatar, ListItem} from "react-native-elements";
import {withNavigation} from "react-navigation";
import firebase from "react-native-firebase";

let colors = ["#FDB8C7", "#85DAF7"];

class Messages extends Component {

    constructor() {
        super()

        this.state = {
            salons: []
        }
    }

    async componentDidMount() {
        firebase.database().ref('/salons').once('value')
            .then((res) => {
                this.setState({salons: res._value})
            })
    }

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
                <View>
                    {

                        this.state.salons.length > 0 ?
                            this.state.salons.map((l, i) => (
                                l.message === true &&
                                <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('Chat', {data: l})}>
                                    <ListItem
                                        key={i}
                                        leftAvatar={
                                            <Avatar
                                                rounded
                                                size={'large'}
                                                source={{uri: l.thumbnail }}
                                            />
                                        }
                                        title={ <Text style={{color: colors[i % colors.length], fontSize: 16 }}>{l.name}</Text>}
                                        subtitle={
                                            <View style={{marginTop: 5}}>
                                                <Text style={{color: '#C0BEBE', fontSize: 13}}>...</Text>
                                                <Text style={{marginTop: 2, fontSize: 12, color: '#C0BEBE', fontStyle: "italic"}}>Il y a 4 jours</Text>
                                            </View>
                                        }
                                    />
                                </TouchableOpacity>
                            ))
                            :
                            <View>
                                <Text>Vous n'avez aucun message</Text>
                            </View>
                    }
                </View>
            </ScrollView>
        )
    }
}

export default withNavigation(Messages)