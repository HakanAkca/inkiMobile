import React, { Component } from 'react'
import { View, Image, Text} from 'react-native'
import { Button } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';



class SplashScreen extends Component {

    render() {
        return(
            <LinearGradient colors={['#85DAF7', '#FD7495']} style={{height: '100%'}}>
            <View style={{alignItems: 'center'}}>
                <Image style={{marginTop: 50}} source={require('../Assets/Images/logo.png')} />
                <View style={{ width: '80%', alignItems: 'center', marginTop: 60}}>
                    <Text style={{fontSize: 24}}>Bienvenue !</Text>
                    <View style={{width: '100%'}}>
                        <Button title="Connexion"
                                containerStyle={{width: '100%', marginTop: 30}}
                                buttonStyle={{borderRadius: 20, backgroundColor: 'white', borderWidth: 2, borderColor: '#8DD2F0'}}
                                titleStyle={{ color: '#8DD2F0'}}
                                onPress={() => this.props.navigation.navigate('Login')}
                        />
                        <Button title="Inscription"
                                containerStyle={{width: '100%', marginTop: 20}}
                                buttonStyle={{borderRadius: 20, backgroundColor: 'white', borderWidth: 2, borderColor: '#F6799A'}}
                                titleStyle={{ color: '#F6799A'}}
                                onPress={() => this.props.navigation.navigate('Register')}
                        />
                    </View>
                </View>
            </View>
            </LinearGradient>
        )
    }
}

export default SplashScreen