import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import firebase from 'react-native-firebase'

class ProfileScreen extends Component {

    signOutUser = async () => {
        try {
            await firebase.auth().signOut()
            this.props.navigation.navigate('Login')
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <View>
                <Button title="Déconnexion" onPress={() => this.signOutUser()}/>
            </View>
        )
    }
}

export default ProfileScreen