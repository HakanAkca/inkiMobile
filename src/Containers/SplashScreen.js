import React, {Component} from 'react'
import {View, Image, Text, ActivityIndicator} from 'react-native'
import {Button} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import {withNavigation} from "react-navigation";


class SplashScreen extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        setTimeout(() =>  this.props.navigation.navigate('Login'), 1000)

    }

    render() {



        return (
            <LinearGradient colors={['#85DAF7', '#FD7495']} style={{height: '100%'}}>
                <View style={{alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                    <Image source={require('../../assets/Images/logo.png')}/>
                    <View style={{width: 312, height: 72, alignItems: 'center', marginTop: 60}}>
                        <Text style={{
                            fontSize: 19,
                            color: 'white',
                            textAlign: 'center',
                            fontFamily: 'ProximaNova-Regular'
                        }}>Votre application de réservation entre les professionnels du tatouage et les salons.</Text>
                    </View>
                    <ActivityIndicator style={{marginTop: 20}} size={"large"} color={"#FFFFFF"} />
                </View>
            </LinearGradient>
        )
    }
}

export default withNavigation(SplashScreen)