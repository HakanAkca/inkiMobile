import React, { Component } from 'react'
import {StyleSheet, Text, View, Image, Platform, KeyboardAvoidingView, Keyboard} from 'react-native'
import firebase from 'react-native-firebase'
import { Input, Button } from "react-native-elements";
import CardView from "react-native-cardview";
import LinearGradient from "react-native-linear-gradient";


class SignUp extends Component {

    constructor() {
        super();

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
            passwordError: null,
            errorMessage: null,
            keyboard: null
        };

        this._keyboardDidHide = this._keyboardDidHide.bind(this)
        this._keyboardDidShow = this._keyboardDidShow.bind(this)

    }

    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow () {
        this.setState({keyboard: true})
    }

    _keyboardDidHide () {
        this.setState({keyboard: false})
    }

    handleSignUp = () => {


        if (this.state.password !== this.state.confirmPassword) {
            this.setState({passwordError: 'Les mots de passe ne sont pas identique'})
        } else {
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
    }
    render() {

        const imageSize = this.state.keyboard === true ? 100 : 200;
        const marginTop = this.state.keyboard === true ? 20 : 0;
        const offset = Platform.OS === 'ios' ? 0 : -200;

        return (


            <LinearGradient colors={['#85DAF7', '#FD7495']} style={{height: '100%'}}>
            <KeyboardAvoidingView style={{height: '100%'}} behavior="padding" keyboardVerticalOffset={offset}>

                <View style={styles.container}>
                    <Image style={{width: imageSize, height: imageSize, resizeMode: 'contain', marginTop: marginTop}} source={require('../../Assets/Images/logo.png')}/>
                    <Text style={{fontSize: 20, marginTop: 20}}>Inscription</Text>
                    <CardView style={{width: '95%', backgroundColor: 'white', marginTop: 20}} cardElevation={0} cardMaxElevation={0} cornerRadius={10}>
                        <View style={{width: '100%', padding: 20, alignItems: 'center', marginTop: 20}}>
                            {
                                this.state.errorMessage &&
                                    <Text style={{ color: 'red' }}>
                                    {this.state.errorMessage}
                                    </Text>
                            }
                            <View style={{flexDirection: 'row'}}>
                                <Input
                                    containerStyle={{width: '50%'}}
                                    placeholder="Prénom"
                                    autoCapitalize="none"
                                    onChangeText={firstname => this.setState({ firstname })}
                                    value={this.state.firstname}
                                />

                                <Input
                                    containerStyle={{width: '50%'}}
                                    placeholder="Nom"
                                    autoCapitalize="none"
                                    onChangeText={lastname => this.setState({ lastname })}
                                    value={this.state.lastname}
                                />
                            </View>
                            <Input
                                placeholder="Email"
                                autoCapitalize="none"
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                            />
                            <Input
                                secureTextEntry
                                placeholder="Mot de passe"
                                autoCapitalize="none"
                                onChangeText={password => this.setState({ password, passwordError: null })}
                                value={this.state.password}
                            />
                            <Input
                                secureTextEntry
                                placeholder="Confirmer le mot de passe"
                                autoCapitalize="none"
                                onChangeText={confirmPassword => this.setState({ confirmPassword, passwordError: null })}
                                value={this.state.confirmPassword}
                            />
                            <Text style={{color: 'red'}}>{this.state.passwordError}</Text>

                            <Button title="Inscription"
                                    containerStyle={{width: '60%', marginTop: 40}}
                                    buttonStyle={{borderRadius: 20, backgroundColor: 'white', borderWidth: 2, borderColor: '#F6799A'}}
                                    titleStyle={{ color: '#F6799A'}}
                                    onPress={this.handleSignUp}
                            />
                        </View>
                    </CardView>
                </View>
            </KeyboardAvoidingView>
            </LinearGradient>
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