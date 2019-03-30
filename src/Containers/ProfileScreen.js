import React, { Component } from 'react'
import {View, Text, ScrollView} from 'react-native'
import {Avatar, Icon, Rating} from 'react-native-elements'
import LinearGradient from "react-native-linear-gradient";
import CardView from "react-native-cardview";

class ProfileScreen extends Component {

    signOutUser = async () => {
        try {
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
                <LinearGradient colors={['#85DAF7', '#FD7495']} style={{height: '40%', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: '15%', marginLeft: '7%'}}>
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
                <View style={{position: 'absolute', height: '80%', width: '100%', left: 0, right: 0, top: 50 ,justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <CardView style={{backgroundColor: 'white', height: '50%', width: '85%', borderRadius: 20}} cardElevation={0} cardMaxElevation={0} cornerRadius={5}>
                        <View style={{padding: 15}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Icon name={'map-marker-outline'} type={'material-community'} />
                                <Text style={{fontSize: 16}}>Paris, 8ème</Text>
                            </View>
                            <View style={{flexDirection: 'column', alignItems: 'flex-start', marginTop: '5%'}}>
                                <Text style={{fontSize: 16}}>Avis :</Text>
                                <Rating
                                    type='custom'
                                    ratingColor='#3498db'
                                    ratingBackgroundColor='#c8c7c8'
                                    ratingCount={5}
                                    imageSize={20}
                                    onFinishRating={this.ratingCompleted}
                                />
                                <View style={{marginTop: '2%', height: '70%'}}>
                                    <Text style={{fontSize: 16}}>Description :</Text>
                                    <ScrollView>
                                        <Text style={{textAlign: 'center', marginTop: 10}}>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.</Text>
                                    </ScrollView>
                                </View>
                            </View>
                        </View>

                    </CardView>
                </View>
            </View>
        )
    }
}

export default ProfileScreen