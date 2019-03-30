import React, { Component } from 'react'
import { StyleSheet, Platform, Image, Text, View, ActivityIndicator} from 'react-native'
import firebase from 'react-native-firebase'

class HomeScreen extends Component {
    state = {
        currentUser: []
    }

    componentDidMount() {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).once('value')
            .then((res) => {this.setState({currentUser: res._value})})
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Text>
                        Hi !
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
});

export default HomeScreen