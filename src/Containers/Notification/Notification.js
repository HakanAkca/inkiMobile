import React, { Component } from 'react'
import {ScrollView, View, Text, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Alert} from 'react-native'
import {Avatar, Icon, ListItem, Rating} from "react-native-elements";
import {NavigationEvents} from "react-navigation";
import firebase from 'react-native-firebase'

class Notification extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list: [{
                id: 1,
                name: "N'oubliez pas de laisser un avis \n" +
                    "au salon Magic Circus - Tattoo Shop ",
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                validated: false
            }],
            ratings: [],
            salons: [],
            showModal: false,
            rating: null,
            comment: "",
            avatar: "",
            name: ""
        }
    }

    componentDidMount() {
        {/*firebase.database().ref('/ratings').set(
            [{
                "id": 1,
                "salon_id": 1,
                "rating": 0,
                "comment": "",
            }]
        ).then((data) => {
            //success callback
            console.log('data ', data)
        }).catch((error) => {
            //error callback
            console.log('error ', error)
        })*/}

        this.getRating()

    }

    openRatingModal() {
        this.setState({showModal: true})
        this.ratingModal()
    }

    ratingModal(){
        return (
            <Modal visible={this.state.showModal}>
                <View>
                    <TouchableOpacity onPress={() => this.setState({showModal: false})}>
                        <Text>x</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }

    getRating() {
        firebase.database().ref('/ratings').once('value')
            .then((res) => {
                this.setState({ratings: res._value})
            })

        firebase.database().ref('/salons').once('value')
            .then((res) => this.setState({avatar: res._value[0].thumbnail, name: res._value[0].name}))
    }

    onFinishRating(rating) {
        console.log("Rating is: " + rating)
        this.setState({rating})
    }

    sendRating() {
        this.setState({showModal: false})

        firebase.database().ref('/ratings/0').set({
            comment: this.state.comment,
            rating: this.state.rating,
            validated: true,
            salon_id: 1
        })

        this.getRating()

        setTimeout(() => {
            Alert.alert(
                'Important',
                'Votre avis à bien été enregistrer elle sera publier après la vérification de notre service',
                [
                    {text: 'Fermer'},
                ],
            );
        }, 1000)
    }

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
                <NavigationEvents
                    onDidFocus={() => this.getRating}
                />
                <View>
                    {
                        this.state.ratings.map((l, i) => (
                            l.validated == false ?
                            <TouchableOpacity key={l.id} onPress={() => this.openRatingModal()}>
                                <ListItem
                                    key={l.id}
                                    leftAvatar={
                                        <Avatar
                                            rounded
                                            size={'large'}
                                            source={{uri: this.state.avatar }}
                                        />
                                    }
                                    title={
                                        <View>
                                            <Text style={{fontSize: 15}}>N'oubliez pas de laisser un avis au salon {this.state.name}</Text>
                                        </View>
                                    }
                                />
                                <Modal visible={this.state.showModal}>
                                    <KeyboardAvoidingView>
                                    <View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-around',
                                            height: 100,
                                            borderBottomWidth: 2,
                                            borderBottomColor: "#F8F8F8"}}>
                                            <TouchableOpacity onPress={() => this.setState({showModal: false})}>
                                                <Text style={{fontSize: 20, color: "#CECECE"}}>X</Text>
                                            </TouchableOpacity>
                                            <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                                <Text style={{color: '#88D7F4', fontSize: 22}}>Satisfais du salons ?</Text>
                                                <Text style={{color: '#88D7F4', fontSize: 22}}>Laissez un avis !</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => this.sendRating()}>
                                                <Icon color={"#FB3E66"} size={20} name={"check"} type={"material-community"}/>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center', padding: 30,
                                            borderBottomWidth: 1.5,
                                            borderBottomColor: "#F8F8F8",
                                            height: 105
                                        }}>
                                            <Avatar source={{uri: this.state.avatar}} rounded size={"large"} />
                                            <View style={{marginLeft: 20}}>
                                                <Text style={{color: "#FD7495", fontSize: 20}}>{this.state.name}</Text>
                                                <Text style={{color: '#B7B7B7', fontSize: 16}}>Salon de tatouage</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center', padding: 30,
                                            borderBottomWidth: 1.5,
                                            borderBottomColor: "#F8F8F8",
                                            height: 105
                                        }}>
                                            <Rating
                                                type='custom'
                                                ratingColor='#FD7495'
                                                ratingBackgroundColor='#E6E6E6'
                                                ratingCount={5}
                                                imageSize={28}
                                                startingValue={0}
                                                minValue={0}
                                                fractions={1}
                                                onFinishRating={this.onFinishRating.bind(this)}
                                            />
                                            <View style={{marginLeft: 20}}>
                                                <Text style={{color: '#FD7495', fontSize: 16}}>Niveau de satisfaction</Text>
                                            </View>
                                        </View>
                                        <View style={{padding: 15}}>
                                            <TextInput
                                                multiline={true}
                                                numberOfLine={5}
                                                placeholder="Laisse ton avis ici..."
                                                onChangeText={(comment) => this.setState({comment})}
                                                value={this.state.comment}
                                            />
                                        </View>
                                    </View>
                                    </KeyboardAvoidingView>
                                </Modal>
                            </TouchableOpacity>
                                :
                            <View key={l.id}>{console.log(l)}</View>
                        ))
                    }
                </View>
            </ScrollView>
        )
    }
}

export default Notification