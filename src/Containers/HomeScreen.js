import React, {Component} from 'react'
import {
    StyleSheet,
    Platform,
    Image,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    FlatList,
    AsyncStorage,
    Dimensions
} from 'react-native'
import firebase from 'react-native-firebase'
import {Button, Card, Icon, Input, SearchBar, Slider, ListItem, Avatar, Badge} from "react-native-elements";
import ReactNativePickerModule from 'react-native-picker-module'

const {height, width} = Dimensions.get('window');
const itemWidth = (width - 15) / 2;

class HomeScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        header: null
    })

    constructor() {
        super()

        this.state = {
            currentUser: [],
            selectedValue: null,
            data: [],
            salons: [],
            text: ""

        }
    }

    async componentDidMount() {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).once('value')
            .then((res) => {
                this.setState({currentUser: res._value})
            })

        firebase.database().ref('/salons').once('value')
            .then((res) => {
                this.setState({salons: res._value})
            })

        {/*firebase.database().ref('/photos').set([{
            "id": 1,
            "url": "http://tattoo-design.org/wp-content/uploads/2018/11/7495/e837b90e2ffd003ed1584d05fb1d4796e371ebd01cb10c4090f4c278aeebb4bad8_640.jpg"
        },{
            "id": 1,
            "url": "https://i.pinimg.com/236x/82/b3/bb/82b3bbd81d029ccdc6ab02149f87c49b.jpg"
        },{
            "id": 1,
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4PW0zEUgptIWpd-1MhFKjvZ_vcBSYKByj733qZENW9gMwcBQj"
        },{
            "id": 2,
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCtv_lBIAYmKvwkPOM4jFaHvSBQCBqWJbD6Nzl1YDJ_AQJiBLVYQ"
        }
        ])*/}

        {/*firebase.database().ref('/salons').set(
            [{
                "id": 1,
                "name": "Toutatis Tatto",
                "email": "jpenddreth0@census.gov",
                "thumbnail": "https://www.megustattoo.fr/wp-content/uploads/2017/06/megustattoo-salle-2.jpg",
                "slot_1": "09:00",
                "slot_2": "10:00",
                "slot_3": "12:00",
                "slot_4": "17:00",
                "slot_5": "17:00",
                "slot_6": "22:00",
                "description": "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker",
                "city": "Paris",
                "zipCodeShort": "75",
                "zipCodeFull": "75011",
                "Address": "95 Avenue Parmentier",
            }, {
                "id": 2,
                "name": "Paris Tatto",
                "email": "gfrediani1@senate.gov",
                "thumbnail": "https://www.megustattoo.fr/wp-content/uploads/2017/06/megustattoo-salle-2.jpg",
                "slot_1": "09:00",
                "slot_2": "10:00",
                "slot_3": "12:00",
                "slot_4": "17:00",
                "slot_5": "17:00",
                "slot_6": "22:00",
                "description": "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker",
                "city": "Paris",
                "zipCodeShort": "75",
                "zipCodeFull": "75011",
                "Address": "95 Avenue Parmentier",
            }, {
                "id": 3,
                "name": "Abraxas Saint-Honoré",
                "email": "nbea2@imageshack.us",
                "thumbnail": "https://www.megustattoo.fr/wp-content/uploads/2017/06/megustattoo-salle-2.jpg",
                "slot_1": "09:00",
                "slot_2": "10:00",
                "slot_3": "12:00",
                "slot_4": "17:00",
                "slot_5": "17:00",
                "slot_6": "22:00",
                "description": "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker",
                "city": "Lorient",
                "zipCodeShort": "",
                "zipCodeFull": "",
                "Address": "95 Avenue Parmentier",
            }, {
                "id": 4,
                "name": "beethoven Tatto",
                "email": "wvalek3@vk.com",
                "thumbnail": "https://www.megustattoo.fr/wp-content/uploads/2017/06/megustattoo-salle-2.jpg",
                "slot_1": "09:00",
                "slot_2": "10:00",
                "slot_3": "12:00",
                "slot_4": "17:00",
                "slot_5": "17:00",
                "slot_6": "22:00",
                "description": "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker",
                "city": "Paris",
                "zipCodeShort": "75",
                "zipCodeFull": "75011",
                "Address": "95 Avenue Parmentier",
            }]
        ).then((data) => {
            //success callback
            console.log('data ', data)
        }).catch((error) => {
            //error callback
            console.log('error ', error)
        })*/}
    }

    handleSnapToItem(index) {
        console.log("snapped to ", index)
    }

    _renderItem = ({item, index}) => {
        return (
            <View style={{width: 300, height: 300, flexDirection: 'row', margin: 0}}>
                <Image
                    style={{width: 300, height: 300, position: 'absolute'}}
                    source={require('../../assets/Images/salon.png')}
                />
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    padding: 15
                }}>
                    <Text style={{color: '#85DAF7', fontSize: 20, margin: 12}}>Abraxas Saint-Honoré</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Icon name={'map-marker-outline'} type={'material-community'}/>
                        <Text style={{color: 'black', margin: 6}}>Paris, 11ème</Text>
                    </View>
                </View>
            </View>
        );
    }


    searchFilterFunction = (text) => {
        console.log(text)
        this.setState({
            text: text,
        });

        const newData = this.state.salons.filter(item => {
            const itemData = ` ${item.name.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });

        this.setState({data: newData});
    };

    render() {
        console.log(this.state.data)
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{alignItems: 'center', width: '100%'}}>
                        <View style={{width: '90%', marginTop: 30}}>
                            <SearchBar
                                onClear={() => this.setState({data: []})}
                                placeholder="Dites nous ce que vous cherchez..."
                                lightTheme
                                round
                                containerStyle={{
                                    backgroundColor: 'white', shadowColor: '#85DAF7',
                                    shadowOffset: {width: 0, height: 2},
                                    shadowOpacity: 0.8,
                                    shadowRadius: 2,
                                }}
                                inputStyle={{backgroundColor: 'white'}}
                                inputContainerStyle={{backgroundColor: 'white', borderRadius: 0}}
                                onChangeText={(text) => this.searchFilterFunction(text)}
                                autoCorrect={false}
                                value={this.state.text}
                            />
                            <FlatList
                                data={this.state.data}
                                renderItem={({item}) => (
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Salon', {data: item})}>
                                        <ListItem
                                            leftAvatar={
                                                <Avatar
                                                    rounded
                                                    size="large"
                                                    source={{uri: item.thumbnail}}
                                                />
                                            }
                                            title={<View><Text style={{fontSize: 16}}>{item.name}</Text></View>}
                                            subtitle={
                                                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: -2.5}}>
                                                    <Icon size={18} name={'map-marker-outline'} type={'material-community'}/>
                                                    <Text style={{fontSize: 16, fontFamily: 'ProximaNova-Regular'}}>
                                                        {item.city}
                                                        {
                                                           item.zipCodeShort ? ", " + item.zipCodeShort + " ème" : ""
                                                        }
                                                    </Text>
                                                </View>
                                            }
                                            containerStyle={{borderBottomWidth: 0}}
                                        />
                                    </TouchableOpacity>
                                )}
                                keyExtractor={item => item.name}
                                ItemSeparatorComponent={this.renderSeparator}
                                ListHeaderComponent={this.renderHeader}
                            />
                            <View style={{flexDirection: 'row', marginTop: 15}}>
                                <Badge value="Date" textStyle={{color: '#FD7495'}}
                                       badgeStyle={{backgroundColor: 'white'}} containerStyle={{
                                    borderColor: '#FD7495',
                                    justifyContent: 'center',
                                    width: 74,
                                    height: 34,
                                    backgroundColor: 'white',
                                    borderWidth: 1,
                                    borderRadius: 20
                                }}/>

                                <Badge onPress={() => this.props.navigation.navigate('SearchPrice', {data: this.state.salons})} value="Tarif" textStyle={{color: '#FD7495'}}
                                       badgeStyle={{backgroundColor: 'white'}} containerStyle={{
                                    borderColor: '#FD7495',
                                    justifyContent: 'center',
                                    width: 74,
                                    height: 34,
                                    backgroundColor: 'white',
                                    borderWidth: 1,
                                    borderRadius: 20,
                                    marginLeft: 10
                                }}/>

                                <Badge value="Style" textStyle={{color: '#FD7495'}}
                                       badgeStyle={{backgroundColor: 'white'}} containerStyle={{
                                    borderColor: '#FD7495',
                                    justifyContent: 'center',
                                    width: 74,
                                    height: 34,
                                    backgroundColor: 'white',
                                    borderWidth: 1,
                                    borderRadius: 20,
                                    marginLeft: 10
                                }}/>

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
                    <View style={{justifyContent: 'center', padding: 10}}>
                        <Text style={{
                            fontSize: 20,
                            marginLeft: '3.5%',
                            fontFamily: 'ProximaNova-semibold',
                            marginTop: 24
                        }}>Que cherchez vous ?</Text>
                        <ScrollView
                            containerStyle={{justifyContent: 'center'}}
                            horizontal
                            showsHorizontalScrollIndicator={true}
                        >
                            {this.state.salons.map((item, index) => (
                                <TouchableOpacity key={index}
                                                  onPress={() => this.props.navigation.navigate('Salon', {data: item})}>
                                    <View style={{width: 141, height: 172, flexDirection: 'row', margin: 10}}>
                                        <Image
                                            style={{width: 141, height: 172, position: 'absolute', borderRadius: 10}}
                                            source={{uri: item.thumbnail}}
                                        />
                                        <View style={{
                                            flex: 1,
                                            backgroundColor: 'rgba(250, 250, 250, 0.99)',
                                            alignSelf: 'flex-end',
                                            alignItems: 'center',
                                            borderBottomStartRadius: 10,
                                            borderBottomEndRadius: 10
                                        }}>
                                            <Text style={{color: '#85DAF7', fontSize: 12, margin: 6}}>{item.name}</Text>
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <Icon name={'map-marker-outline'} type={'material-community'}/>
                                                <Text style={{
                                                    color: 'black',
                                                    margin: 6,
                                                    fontSize: 12
                                                }}>{item.city} {item.zipCodeShort ? ',' + item.zipCodeShort + "ème" : ""}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 20, marginLeft: '6%', fontFamily: 'ProximaNova-semibold'}}>Les salons
                            sur Paris</Text>
                        <View style={{flex: 1, flexDirection: 'row', width: '100%', flexWrap: 'wrap'}}>
                            {this.state.salons.map((item, index) => {
                                return item.city === 'Paris' ?
                                    <View key={index} style={{width: '50%', padding: 10}}>
                                        <TouchableOpacity key={index}
                                                          onPress={() => this.props.navigation.navigate('Salon', {data: item})}>
                                            <Image style={{width: 172, height: 116, resizeMode: 'cover'}}
                                                   source={{uri: item.thumbnail}}/>
                                            <View style={{marginTop: 5, width: 97, height: 30}}>
                                                <Text style={{
                                                    fontSize: 16,
                                                    fontFamily: 'ProximaNova-Regular',
                                                    color: '#85DAF7',
                                                    width: 200
                                                }}>{item.name}</Text>
                                                <Text style={{
                                                    fontSize: 14,
                                                    fontFamily: 'ProximaNova-Regular',
                                                    color: '#9F9E9E'
                                                }}>{item.price}€ par heure</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    null
                            })}
                        </View>
                    </View>
                </ScrollView>
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