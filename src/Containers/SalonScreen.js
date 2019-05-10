import React, {Component} from 'react'
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import LinearGradient from "react-native-linear-gradient";
import {Avatar, Button, Icon, Rating} from "react-native-elements";
import CardView from "react-native-cardview";
import salon from "./data/home";
import firebase from "react-native-firebase";

class SalonScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null
    })

    constructor(props) {
        super(props)

        this.state = {
            photos: []
        }
    }

    componentDidMount() {
        firebase.database().ref('/photos').on('value', snapshot => {
            let data = snapshot.val();
            let photos = Object.values(data);
            this.setState({photos});
        });
    }

    render() {

        const data = this.props.navigation.state.params.data

        return (
            <View style={{flex: 1}}>
                <LinearGradient colors={['#85DAF7', '#FD7495']}
                                style={{height: '35%', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
                    <Icon onPress={() => this.props.navigation.goBack()}
                          containerStyle={{position: 'absolute', marginTop: 20, marginLeft: '3.5%'}} size={40}
                          color={'white'} type={"material-community"} name={'chevron-left'}/>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: '12%',
                        marginLeft: '7%',
                        padding: 10
                    }}>
                        <Avatar
                            rounded
                            size={"large"}
                            source={{uri: data.thumbnail}}
                        />
                        <View style={{marginLeft: '5%'}}>
                            <Text style={{fontSize: 20}}>{data.name}</Text>
                            <Text>Salon de tatouage</Text>
                        </View>
                    </View>
                </LinearGradient>
                <View style={{flex: 1}}>
                    <View style={{
                        position: 'absolute',
                        height: '100%',
                        left: 0,
                        right: 0,
                        bottom: 50,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <CardView style={{backgroundColor: 'white', height: 191, width: '85%', borderRadius: 20}}
                                  cardElevation={2} cardMaxElevation={2} cornerRadius={5}>
                            <View style={{padding: 15}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Icon name={'map-marker-outline'} type={'material-community'}/>
                                    <Text style={{
                                        fontSize: 16,
                                        fontFamily: 'ProximaNova-Regular'
                                    }}>{data.city}, {data.zipCodeShort}ème</Text>
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
                                        <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Regular'}}>Description
                                            :</Text>
                                        <ScrollView>
                                            <Text style={{
                                                fontSize: 11,
                                                fontFamily: 'ProximaNova-Regular',
                                                textAlign: 'center',
                                                marginTop: 10,
                                                marginBottom: 10
                                            }}>{data.description}</Text>
                                        </ScrollView>
                                    </View>
                                </View>
                            </View>
                        </CardView>
                    </View>
                </View>
                <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                    <Text style={{fontSize: 16, marginLeft: '3.5%'}}>Instagram</Text>
                    <ScrollView
                        style={{width: '100%'}}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            this.state.photos.map((item, index) => {
                                console.log(item)
                                if (item.id === data.id) {
                                    return (
                                        <View key={index}
                                              style={{width: 126, height: 110, flexDirection: 'row', marginTop: 10}}>
                                            <Image
                                                style={{width: 126, height: 110, resizeMode: 'cover'}}
                                                source={{uri: item.url}}
                                            />
                                        </View>
                                    )
                                }
                            })
                        }
                    </ScrollView>
                </View>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Button buttonStyle={{height: 52.03, width: 325, backgroundColor: '#F8F8F8'}}
                            titleStyle={{color: '#616161'}} title="Contacter le salon"/>
                </View>
                <View>
                    <Button buttonStyle={{width: 375, height: 51, borderRadius: 0}}
                        onPress={() => this.props.navigation.navigate('Booking', {data: data})} title="Reserver"/>
                </View>

            </View>
        )
    }
}

export default SalonScreen