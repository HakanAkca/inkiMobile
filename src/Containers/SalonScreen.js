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
        fetch('https://www.instagram.com/mytroopers/?__a=1')
            .then((response) => console.log(response))

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <LinearGradient colors={['#85DAF7', '#FD7495']} style={{height: '35%', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>

                    <Icon onPress={() => this.props.navigation.goBack()} containerStyle={{position: 'absolute', marginTop: 20, marginLeft: '3.5%'}}  size={40} color={'white'} type={"material-community"} name={'chevron-left'} />
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: '10%', marginLeft: '7%', padding: 10}}>
                        <Avatar
                            rounded
                            size={"large"}
                            source={{
                                uri:
                                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                            }}
                        />
                        <View style={{marginLeft: '5%'}}>
                            <Text style={{fontSize: 20}}>Alice Durand</Text>
                            <Text>Tatoueur Nomade</Text>
                        </View>
                    </View>
                </LinearGradient>
                <View style={{position:'absolute', height: '70%', width: '100%', left: 0, right: 0, marginTop: '74%', justifyContent: 'center', alignItems: 'center'}}>
                    <CardView style={{backgroundColor: 'white', height: '95%', width: '85%', borderRadius: 20}} cardElevation={2} cardMaxElevation={2} cornerRadius={5}>
                        <View style={{padding: 15}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Icon name={'map-marker-outline'} type={'material-community'} />
                                <Text style={{fontSize: 16, fontFamily: 'ProximaNova-Regular'}}>Paris, 8ème</Text>
                            </View>
                            <View style={{flexDirection: 'column', alignItems: 'flex-start', marginTop: '5%'}}>
                                <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Regular'}}>Avis :</Text>
                                <Rating
                                    type='custom'
                                    ratingColor='#3498db'
                                    ratingBackgroundColor='#c8c7c8'
                                    ratingCount={5}
                                    imageSize={14}
                                    onFinishRating={this.ratingCompleted}
                                />
                                <View style={{marginTop: '2%', height: '60%'}}>
                                    <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Regular'}}>Description :</Text>
                                    <ScrollView>
                                        <Text style={{fontSize:11, fontFamily: 'ProximaNova-Regular',textAlign: 'center', marginTop: 10, marginBottom: 10}}>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.</Text>
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    </CardView>
                    <View style={{marginTop: '8%'}}>
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
                    <Button containerStyle={{top: 25}} title="Me contacter"/>
                    <Button containerStyle={{top: 57, width: '100%'}} title="Reserver"/>
                </View>
            </View>
        )
    }
}

export default SalonScreen