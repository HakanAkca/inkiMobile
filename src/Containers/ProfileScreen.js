import React, { Component } from 'react'
import {View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import firebase from 'react-native-firebase'
import {Avatar, Button, Icon, Rating} from 'react-native-elements'
import LinearGradient from "react-native-linear-gradient";
import CardView from "react-native-cardview";

class ProfileScreen extends Component {

    constructor() {
        super()

        this.state = {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper nibh at eros consequat vestibulum. Integer aliquam id justo a dignissim. Donec in egestas nisi. Suspendisse a convallis quam, et accumsan erat. Ut facilisis nunc et tortor varius, quis mattis nisl consectetur. Aliquam elementum sed tortor a aliquet. Fusce dapibus rhoncus ex, et volutpat enim tincidunt id.'
        }
    }

    signOutUser = async () => {
        try {
            console.log('ok')
            await firebase.auth().signOut()
            this.props.navigation.navigate('Login')
        } catch (e) {
            console.log(e)
        }
    }

    //<Button title="Déconnexion" onPress={() => this.signOutUser()}/>

    render() {
        return (
            <View style={{flex: 1}}>
                <LinearGradient colors={['#85DAF7', '#FD7495']} style={{height: 139}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 39, marginLeft: 38}}>
                        <Avatar
                            rounded
                            size={"large"}
                            source={{
                                uri:
                                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                            }}
                        />
                        <View style={{marginLeft: 23}}>
                            <Text style={{fontSize: 20, fontFamily: 'ProximaNova-Semibold'}}>Alice Durand</Text>
                            <Text style={{fontSize: 16, fontFamily: 'ProximaNova-Regular'}}>Tatoueur Nomade</Text>
                        </View>
                    </View>
                </LinearGradient>
                <View style={{alignItems: 'center', flex: 1}}>
                    <CardView style={{backgroundColor: 'white', width: '100%', height: 223}} cardElevation={0} cardMaxElevation={0} cornerRadius={0}>
                        <View style={{padding: 15, marginLeft: 28, marginRight: 28}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: -10}}>
                                <Icon size={30} name={'map-marker-outline'} type={'material-community'} />
                                <Text style={{fontSize: 16, fontFamily: 'ProximaNova-Bold'}}>Paris, 8ème</Text>
                            </View>
                            <View style={{flexDirection: 'column', alignItems: 'flex-start', marginTop: '5%'}}>
                                <Text style={{fontSize: 16, color: '#FD7495'}}>Avis :</Text>
                                <Rating
                                    type='custom'
                                    ratingColor='#FD7495'
                                    ratingBackgroundColor='#E6E6E6'
                                    ratingCount={5}
                                    imageSize={18}
                                    onFinishRating={this.ratingCompleted}
                                />
                                <TouchableOpacity>
                                    <Text style={{marginTop: 5, height: 20, width: 84, fontSize: 12, color: '#FDB8C7', textDecorationLine: 'underline'}}>En voir plus</Text>
                                </TouchableOpacity>
                                <View style={{marginTop: 8, height: '60%'}}>
                                    <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Regular', color:  '#646464'}}>Description :</Text>
                                    <ScrollView>
                                        <TextInput
                                            style={{fontSize: 11, fontFamily: 'ProximaNova-Regular', color: '#9F9E9E', height: 58, marginTop: 8}}
                                            multiline = {true}
                                            numberOfLines = {3}
                                            value={this.state.text}
                                        />
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    </CardView>
                    <CardView style={{backgroundColor: 'white', width: '100%', height: 74, marginTop: 15}} cardElevation={0} cardMaxElevation={0} cornerRadius={0}>
                        <View style={{padding: 15}}>
                            <View>
                                <Text style={{marginLeft: 28, color: '#616161', fontSize: 16, fontFamily: 'ProximaNova-Regular', height: 18, width: 103}}>Compte liées</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 25, marginTop: 5}}>
                                    <Icon color={"#FD7495"} size={30} name={'instagram'} type={'material-community'} />
                                    <Text style={{fontSize: 16, color: '#FD7495', fontFamily: 'ProximaNova-Bold'}}>Intagram : </Text>
                                    <TextInput
                                        style={{color: '#FD7495'}}
                                        value={"@alidura"}
                                    />
                                </View>
                            </View>
                        </View>
                    </CardView>

                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <Button buttonStyle={{height: 44, width: 239, borderRadius: 30, backgroundColor: 'white'}} containerStyle={{marginBottom: 20}} titleStyle={{color: '#85DAF7'}}  title="Déconnexion" onPress={() => this.signOutUser()}/>
                    </View>
                </View>
            </View>
        )
    }
}

export default ProfileScreen