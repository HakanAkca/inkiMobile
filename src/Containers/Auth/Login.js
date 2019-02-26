import React, { Component } from 'react'
import { StyleSheet, Text, Image, View, KeyboardAvoidingView, Keyboard, Platform} from 'react-native'
import { Input, Button } from 'react-native-elements'
import firebase from 'react-native-firebase'
import CardView from "react-native-cardview";


class Login extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: '',
            errorMessage: null,
            keyboard: null
        }

        this._keyboardDidHide = this._keyboardDidHide.bind(this)
        this._keyboardDidShow = this._keyboardDidShow.bind(this)
    }

    handleLogin = () => {
        const { email, password } = this.state
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('AppStack'))
            .catch(error => this.setState({ errorMessage: error.message }))
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

    render() {

        const imageSize = this.state.keyboard === true ? 100 : 200;
        const marginTop = this.state.keyboard === true ? 20 : 0;
        const offset = Platform.OS === 'ios' ? 0 : -200;

        return (
            <KeyboardAvoidingView style={{height: '100%'}} behavior="padding" keyboardVerticalOffset={offset}>
                <View style={styles.container}>
                    <Image style={{width: imageSize, height: imageSize, resizeMode: 'contain', marginTop: marginTop}} source={require('../../Assets/Images/logo.png')}/>
                    <Text style={{fontSize: 20, marginTop: 20}}>Connexion</Text>
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
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Login