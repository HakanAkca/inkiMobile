import React, { Component } from 'react'
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import LinearGradient from "react-native-linear-gradient";
import {Avatar, Button, Icon, Rating} from "react-native-elements";
import CardView from "react-native-cardview";
import salon from "./data/home";

class SalonScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    constructor(props) {
        super(props)
    }

    componentWillMount() {

    }

    render() {

        const data = this.props.navigation.state.params.data

        return (
            <View style={{flex: 1}}>
                <LinearGradient colors={['#85DAF7', '#FD7495']} style={{height: '35%', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>

                    <Icon onPress={() => this.props.navigation.goBack()} containerStyle={{position: 'absolute', marginTop: 20, marginLeft: '3.5%'}}  size={40} color={'white'} type={"material-community"} name={'chevron-left'} />
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: '10%', marginLeft: '7%', padding: 10}}>
                        <Avatar
                            rounded
                            size={"large"}
                            source={{ uri: data.thumbnail}}
                        />
                        <View style={{marginLeft: '5%'}}>
                            <Text style={{fontSize: 20}}>{data.name}</Text>
                            <Text>Salon de tatouage</Text>
                        </View>
                    </View>
                </LinearGradient>
                <View style={{position:'absolute', height: '70%', width: '100%', left: 0, right: 0, marginTop: '76%', justifyContent: 'center', alignItems: 'center'}}>
                    <CardView style={{backgroundColor: 'white', height: '94%', width: '85%', borderRadius: 20}} cardElevation={2} cardMaxElevation={2} cornerRadius={5}>
                        <View style={{padding: 15}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Icon name={'map-marker-outline'} type={'material-community'} />
                                <Text style={{fontSize: 16, fontFamily: 'ProximaNova-Regular'}}>{data.city}, {data.zipCodeShort}ème</Text>
                            </View>
                            <View style={{flexDirection: 'column', alignItems: 'flex-start', marginTop: '3%'}}>
                                <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Regular'}}>Avis :</Text>
                                <Rating
                                    type='custom'
                                    ratingColor='#FD7495'
                                    ratingBackgroundColor='#E6E6E6'
                                    ratingCount={5}
                                    imageSize={14}
                                    onFinishRating={this.ratingCompleted}
                                />
                                <View style={{marginTop: '2%', height: '60%'}}>
                                    <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Regular'}}>Description :</Text>
                                    <ScrollView>
                                        <Text style={{fontSize:11, fontFamily: 'ProximaNova-Regular',textAlign: 'center', marginTop: 10, marginBottom: 10}}>{data.description}</Text>
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    </CardView>
                    <View style={{marginTop: '4%'}}>
                        <Text style={{fontSize: 16, marginLeft: '3.5%'}}>Instagram</Text>
                        <ScrollView
                            containerStyle={{justifyContent:'center'}}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            {salon.map(item => (
                                <View key={item.id} style={{ width: 150, height: 150, flexDirection: 'row', margin: 5}}>
                                    <Image
                                        style={{ width: 150, height: 150, resizeMode: 'cover', borderWidth: 1}}
                                        source={{ uri: item.thumbnail }}
                                    />
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                    <Button containerStyle={{top: 27}} buttonStyle={{height: 52.03, width: 325, backgroundColor: '#F8F8F8'}} titleStyle={{color: '#616161'}} title="Contacter le salon"/>
                    <Button buttonStyle={{width: 375, height: 71, borderRadius: 0}} onPress={() => this.props.navigation.navigate('Booking', {data: data})} containerStyle={{top: 52}} title="Reserver"/>
                </View>
            </View>
        )
    }
}

export default SalonScreen