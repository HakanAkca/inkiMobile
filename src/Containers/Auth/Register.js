import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'react-native-firebase'
import { Input } from "react-native-elements";


class SignUp extends Component {
    state = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        errorMessage: null
    }

    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) =>
                firebase.database().ref('users/' + res.user.uid).set({
                    firstName: this.state.firstname,
                    lastName: this.state.lastname,
                    email: this.state.email
                }))
            .catch(error => this.setState({ errorMessage: error.message }))
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Sign Up</Text>
                {this.state.errorMessage &&
                <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </Text>
                }
                <Input
                    placeholder="Prénom"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={firstname => this.setState({ firstname })}
                    value={this.state.firstname}
                />

                <Input
                    placeholder="Nom"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={lastname => this.setState({ lastname })}
                    value={this.state.lastname}
                />
                <Input
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <Input
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <Button title="Sign Up" onPress={this.handleSignUp} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    }
})

export default SignUp