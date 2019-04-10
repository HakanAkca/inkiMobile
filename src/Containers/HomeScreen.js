import React, { Component } from 'react'
import {StyleSheet, Platform, Image, Text, View, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native'
import firebase from 'react-native-firebase'
import {Button, Card, Icon, Input, Slider} from "react-native-elements";
import ReactNativePickerModule from 'react-native-picker-module'
import LinearGradient from "react-native-linear-gradient";
import salon from "./data/home.json"

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
        salons: []
    }

    componentDidMount() {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).once('value')
            .then((res) => {this.setState({currentUser: res._value})})

        firebase.database().ref('/salons').once('value')
            .then((res) => {this.setState({salons: res._value})})

        {/*firebase.database().ref('/salons').set(
            [{
                "id": 1,
                "name": "Toutatis Tatto",
                "email": "jpenddreth0@census.gov",
                "thumbnail": "https://www.megustattoo.fr/wp-content/uploads/2017/06/megustattoo-salle-2.jpg",
                "slot_1": "09:00 - 10:00",
                "slot_2": "12:00 - 17:00",
                "slot_3": "17:00 - 22:00",
                "description": "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker",
                "city": "Paris",
                "zipCodeShort": "75",
                "zipCodeFull": "75011",
                "Address": "95 Avenue Parmentier"
            }, {
                "id": 2,
                "name": "Paris Tatto",
                "email": "gfrediani1@senate.gov",
                "thumbnail": "https://www.megustattoo.fr/wp-content/uploads/2017/06/megustattoo-salle-2.jpg",
                "slot_1": "09:00 - 10:00",
                "slot_2": "12:00 - 17:00",
                "slot_3": "17:00 - 22:00",
                "description": "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker",
                "city": "Paris",
                "zipCodeShort": "75",
                "zipCodeFull": "75011",
                "Address": "95 Avenue Parmentier"
            }, {
                "id": 3,
                "name": "Abraxas Saint-Honoré",
                "email": "nbea2@imageshack.us",
                "thumbnail": "https://www.megustattoo.fr/wp-content/uploads/2017/06/megustattoo-salle-2.jpg",
                "slot_1": "09:00 - 10:00",
                "slot_2": "12:00 - 17:00",
                "slot_3": "17:00 - 22:00",
                "description": "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker",
                "city": "Paris",
                "zipCodeShort": "75",
                "zipCodeFull": "75011",
                "Address": "95 Avenue Parmentier"
            }, {
                "id": 4,
                "name": "beethoven Tatto",
                "email": "wvalek3@vk.com",
                "thumbnail": "https://www.megustattoo.fr/wp-content/uploads/2017/06/megustattoo-salle-2.jpg",
                "slot_1": "09:00 - 10:00",
                "slot_2": "12:00 - 17:00",
                "slot_3": "17:00 - 22:00",
                "description": "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker",
                "city": "Paris",
                "zipCodeShort": "75",
                "zipCodeFull": "75011",
                "Address": "95 Avenue Parmentier"
            }]
        ).then((data)=>{
            //success callback
            console.log('data ' , data)
        }).catch((error)=>{
            //error callback
            console.log('error ' , error)
        })*/}
    }

    handleSnapToItem(index){
        console.log("snapped to ", index)
    }

    _renderItem = ( {item, index} ) => {
        return (
            <View style={{ width: 300, height: 300, flexDirection: 'row', margin: 0}}>
                <Image
                    style={{ width: 300, height: 300, position: 'absolute'}}
                    source={require('../../assets/Images/salon.png')}
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
                <LinearGradient colors={['#DBDEEA', '#DBDEEA']} style={{width: '100%', alignItems: 'center', borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                    <View style={{alignItems: 'center', width: '100%', marginTop: 10}}>
                        <Text style={{fontSize: 16, fontFamily: 'ProximaNova-Bold'}}> Que cherchez-vous ?</Text>
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
                                        <Text style={{fontSize: 17, color: '#616161', fontFamily: 'ProximaNova-Regular'}}>Créneau</Text>
                                        <View style={{marginTop: 5}}>
                                            <Icon iconStyle={{color: '#616161'}}  name={'chevron-down'} type={"material-community"} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{marginTop: 20, width: '45%'}}>
                                    <TouchableOpacity style={{flexDirection: 'row', borderRadius: 5, padding: 10, backgroundColor: '#FFFFFF', alignItems: 'center',justifyContent: 'center'}} onPress={() => {this.pickerRef.show()}}>
                                        <Text style={{fontSize: 17, color: '#616161', fontFamily: 'ProximaNova-Regular'}}>Style</Text>
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
                                    title={"Choisir un créneau"}
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
                        <Text style={{fontSize: 20, marginLeft: '3.5%'}}>Les mieux notés</Text>
                        <ScrollView
                            containerStyle={{justifyContent:'center'}}
                            horizontal
                            showsHorizontalScrollIndicator={true}
                        >
                            {this.state.salons.map(item => (
                                <View key={item.id} style={{ width: 250, height: 250, flexDirection: 'row', margin: 10}}>
                                    <Image
                                        style={{ width: 250, height: 250, position: 'absolute', borderRadius: 10}}
                                        source={{ uri: item.thumbnail }}
                                    />
                                        <View style={{ flex: 1, backgroundColor: 'rgba(250, 250, 250, 0.99)', alignSelf: 'flex-end', alignItems: 'center', borderBottomStartRadius: 10, borderBottomEndRadius: 10}}>

                                            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => this.props.navigation.navigate('Salon', {data: item})}>
                                                <Text style={{ color: '#85DAF7', fontSize: 20, margin: 6 }}>{item.name}</Text>
                                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    <Icon name={'map-marker-outline'} type={'material-community'} />
                                                    <Text style={{ color: 'black', margin: 6 }}>{item.city}, {item.zipCodeShort}ème</Text>
                                                </View>

                                            </TouchableOpacity>
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