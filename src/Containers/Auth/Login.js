import React, { Component } from 'react'
import { StyleSheet, Text, Image, View, KeyboardAvoidingView } from 'react-native'
import { Input, Button } from 'react-native-elements'
import firebase from 'react-native-firebase'
import CardView from "react-native-cardview";
import SvgUri from 'react-native-svg-uri';

class Login extends Component {
    state = { email: '', password: '', errorMessage: null }

    handleLogin = () => {
        const { email, password } = this.state
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('AppStack'))
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        return (
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
                <View style={styles.container}>
                    <Image style={{marginTop: 20}} source={require('../../Assets/Images/logo.png')}/>
                    <Text style={{marginTop: 20, fontSize: 20}}>Connexion</Text>
                    <CardView style={{width: '95%', backgroundColor: 'white', marginTop: 20}} cardElevation={0} cardMaxElevation={0} cornerRadius={10}>
                        <View style={{width: '100%', padding: 20, alignItems: 'center', marginTop: 20}}>
                            {this.state.errorMessage &&
                                <Text style={{ color: 'red' }}>
                                    {this.state.errorMessage}
                                </Text>
                            }
                            <Input
                                autoCapitalize="none"
                                placeholder="Email"
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                            />
                            <Input
                                containerStyle={{marginTop: 20}}
                                secureTextEntry
                                autoCapitalize="none"
                                placeholder="Mot de passe"
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}
                            />
                            <Button title="Connexion"
                                    containerStyle={{width: '60%', marginTop: 50}}
                                    buttonStyle={{borderRadius: 20, backgroundColor: 'white', borderWidth: 2, borderColor: '#F6799A'}}
                                    titleStyle={{ color: '#F6799A'}}
                                    onPress={this.handleLogin}
                            />
                        </View>
                    </CardView>
                    <Button title="Inscription"
                            containerStyle={{width: '60%', marginTop: 50}}
                            buttonStyle={{borderRadius: 20, backgroundColor: 'white', borderWidth: 2, borderColor: '#F6799A'}}
                            titleStyle={{ color: '#F6799A'}}
                            onPress={() => this.props.navigation.navigate('Register')}
                    />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})

export default Login