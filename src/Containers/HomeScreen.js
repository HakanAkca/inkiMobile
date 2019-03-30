import React, { Component } from 'react'
import {StyleSheet, Platform, Image, Text, View, TouchableOpacity, ScrollView} from 'react-native'
import firebase from 'react-native-firebase'
import {Button, Card, Icon, Input, Slider} from "react-native-elements";
import ReactNativePickerModule from 'react-native-picker-module'
import LinearGradient from "react-native-linear-gradient";
import Carousel from 'react-native-snap-carousel';

class HomeScreen extends Component {
    state = {
        currentUser: [],
        selectedValue: null,
        data: [
            "Javascript",
            "Go",
            "Java",
            "Kotlin",
            "C++",
            "C#",
            "PHP"
        ],
        videos: [
            {
                thumbnail: "https://img.youtube.com/vi/D9ioyEvdggk/hqdefault.jpg",
            }, {
                thumbnail: "https://img.youtube.com/vi/sNPnbI1arSE/hqdefault.jpg",
            }, {
                thumbnail: "https://img.youtube.com/vi/VOgFZfRVaww/hqdefault.jpg",
            }
        ]
    }

    componentDidMount() {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).once('value')
            .then((res) => {this.setState({currentUser: res._value})})
    }


    handleSnapToItem(index){
        console.log("snapped to ", index)
    }

    _renderItem = ( {item, index} ) => {
        return (
            <View style={{ width: 300, height: 300, flexDirection: 'row', margin: 0}}>
                <Image
                    style={{ width: 300, height: 300, position: 'absolute'}}
                    source={require('../Assets/Images/salon.png')}
                />
                <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.95)', alignSelf: 'flex-end', alignItems: 'center', padding: 15}}>
                    <Text style={{ color: '#85DAF7', fontSize: 20, margin: 12 }}>Abraxas Saint-Honoré</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Icon name={'map-marker-outline'} type={'material-community'} />
                        <Text style={{ color: 'black', margin: 6 }}>Paris, 11ème</Text>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient colors={['#DBDEEA', '#DBDEEA']} style={{ height: '50%', width: '100%', alignItems: 'center', borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                    <View style={{alignItems: 'center', width: '100%', marginTop: 60}}>
                        <Text style={{fontSize: 20}}> Que cherchez-vous ?</Text>
                        <View style={{width: '90%',marginTop: 20}}>
                            <Input
                                placeholder='Où ?'
                                leftIcon={
                                    <Icon name={'map-marker-outline'} type={'material-community'} />
                                }
                                inputContainerStyle={{borderBottomColor: 'transparent'}}
                                containerStyle={{borderRadius: 5, backgroundColor: 'white'}}
                            />
                            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                                <View style={{marginTop: 20, width: '45%'}}>
                                    <TouchableOpacity style={{flexDirection: 'row', borderRadius: 5, padding: 10, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center'}} onPress={() => {this.pickerRef.show()}}>
                                        <Text style={{fontSize: 16, color: '#616161'}}>Créneau</Text>
                                        <View style={{marginTop: 5}}>
                                            <Icon iconStyle={{color: '#616161'}}  name={'chevron-down'} type={"material-community"} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{marginTop: 20, width: '45%'}}>
                                    <TouchableOpacity style={{flexDirection: 'row', borderRadius: 5, padding: 10, backgroundColor: '#FFFFFF', alignItems: 'center',justifyContent: 'center'}} onPress={() => {this.pickerRef.show()}}>
                                        <Text style={{fontSize: 16, color: '#616161'}}>Style</Text>
                                        <View style={{marginTop: 5}}>
                                            <Icon iconStyle={{color: '#616161'}} name={'chevron-down'} type={"material-community"} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{marginTop: 30}}>
                                <Text style={{fontSize: 17}}>Gamme de prix :</Text>
                                <View style={{alignItems: 'center'}}>
                                    <Slider
                                        value={this.state.value}
                                        onValueChange={value => this.setState({ value })}
                                        style={{width: '70%'}}
                                        thumbTintColor={'white'}
                                        maximumValue={50}
                                    />
                                </View>
                            </View>
                            <View>
                                <ReactNativePickerModule
                                    pickerRef={e => this.pickerRef = e}
                                    value={this.state.selectedValue}
                                    title={"Select a language"}
                                    items={this.state.data}
                                    onValueChange={(index) => {
                                        this.setState({
                                            selectedValue: index
                                        })
                                    }}/>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
                <View style={{justifyContent: 'center', padding: 10}}>
                    <Text style={{fontSize: 20}}>Les mieux notés</Text>
                    <ScrollView
                        containerStyle={{justifyContent:'center'}}
                        horizontal
                        showsHorizontalScrollIndicator={true}
                    >
                        {this.state.videos.map(image => (
                            <View style={{ width: 280, height: 300, flexDirection: 'row', margin: 10}}>
                                <Image
                                    style={{ width: 280, height: 300, position: 'absolute', borderRadius: 10}}
                                    source={{ uri: image.thumbnail }}
                                />
                                <View style={{ flex: 1, backgroundColor: 'rgba(250, 250, 250, 0.99)', alignSelf: 'flex-end', alignItems: 'center', borderBottomStartRadius: 10, borderBottomEndRadius: 10}}>
                                    <Text style={{ color: '#85DAF7', fontSize: 20, margin: 6 }}>Abraxas Saint-Honoré</Text>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Icon name={'map-marker-outline'} type={'material-community'} />
                                        <Text style={{ color: 'black', margin: 6 }}>Paris, 11ème</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    }
});

export default HomeScreen