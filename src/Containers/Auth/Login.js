import React, { Component } from 'react'
import { StyleSheet, Text, Image, View, KeyboardAvoidingView, Keyboard, TouchableOpacity, ScrollView} from 'react-native'
import { Input, Button } from 'react-native-elements'
import firebase from 'react-native-firebase'
import CardView from "react-native-cardview";
import LinearGradient from "react-native-linear-gradient";


class Login extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: '',
            errorMessage: null,
            keyboard: null,
            tab: true,
            loading: false,
            firstname: '',
            lastname: '',
            confirmPassword: '',
            passwordError: null,
            registerError: null,
        }

        this._keyboardDidHide = this._keyboardDidHide.bind(this)
        this._keyboardDidShow = this._keyboardDidShow.bind(this)
    }

    handleLogin = () => {
        const { email, password } = this.state

        this.setState({loading: true})

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('AppStack'))
            .then({loading: false})
            .catch(error => this.setState({ errorMessage: "Identifiant incorrect", loading: false} ))
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

    tabPress() {
        this.setState({tab: !this.state.tab})
    }

    handleSignUp = () => {
        this.setState({loading: true})

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
                .then({loading: false})
                .catch(error => this.setState({ registerError: "Compte déjà existant", loading: false}))
        }
    }

    render() {
        return (

            <LinearGradient colors={['#85DAF7', '#FD7495']} style={{height: '100%'}}>
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
                <ScrollView>
                    {
                        this.state.tab === true &&
                        <View style={styles.container}>
                            <Image style={{height: 150, resizeMode: 'contain'}} source={require('../../../assets/Images/logo.png')}/>
                            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: 30}}>
                                <View style={{borderBottomWidth: 1, width: 95, borderBottomColor: '#FFFFFF'}}>
                                    <Text style={{width: 104, height: 25, fontSize: 20, marginTop: 20, color: '#FFFFFF'}}>Connexion</Text>
                                </View>
                                <TouchableOpacity onPress={() => this.tabPress()}>
                                    <Text style={{fontSize: 20, marginTop: 20, color: '#FFFFFF'}}>Inscription</Text>
                                </TouchableOpacity>
                            </View>
                            <CardView style={{width: 332, height: 282,  backgroundColor: 'white', marginTop: 20}} cardElevation={0} cardMaxElevation={0} cornerRadius={10}>
                                <View style={{width: '100%', padding: 20, alignItems: 'center', marginTop: 20}}>
                                    {this.state.errorMessage &&
                                    <Text style={{ color: 'red' }}>
                                        {this.state.errorMessage}
                                    </Text>
                                    }
                                    <Input
                                        containerStyle={{marginTop: 20}}
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
                                            loading={this.state.loading}
                                            containerStyle={{width: '60%', marginTop: 50}}
                                            buttonStyle={{borderRadius: 20, backgroundColor: 'white', borderWidth: 2, borderColor: '#F6799A'}}
                                            titleStyle={{ color: '#F6799A'}}
                                            onPress={this.handleLogin}
                                    />
                                </View>
                            </CardView>
                        </View>
                    }
                    {
                        this.state.tab === false &&
                        <View style={styles.container}>
                            <Image style={{height: 150, resizeMode: 'contain'}} source={require('../../../assets/Images/logo.png')}/>
                            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: 30}}>
                                <TouchableOpacity onPress={() => this.tabPress()}>
                                    <Text style={{fontSize: 20, marginTop: 20, color: '#FFFFFF'}}>Connexion</Text>
                                </TouchableOpacity>
                                <View style={{borderBottomWidth: 1, width: 90, borderBottomColor: '#FFFFFF'}}>
                                    <Text style={{width: 104, height: 25, fontSize: 20, marginTop: 20, color: '#FFFFFF'}}>Inscription</Text>
                                </View>
                            </View>
                            <CardView style={{width: 332, height: 362, backgroundColor: 'white', marginTop: 20}} cardElevation={0} cardMaxElevation={0} cornerRadius={10}>
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
                                        containerStyle={{marginTop: 10}}
                                        placeholder="Email"
                                        autoCapitalize="none"
                                        onChangeText={email => this.setState({ email })}
                                        value={this.state.email}
                                    />
                                    <Input
                                        containerStyle={{marginTop: 10}}
                                        secureTextEntry
                                        placeholder="Mot de passe"
                                        autoCapitalize="none"
                                        onChangeText={password => this.setState({ password, passwordError: null })}
                                        value={this.state.password}
                                    />
                                    <Input
                                        containerStyle={{marginTop: 10}}
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

                    }

                </ScrollView>
            </KeyboardAvoidingView>
            </LinearGradient>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        alignItems: 'center'
    }
})

export default Login