import React, {Component} from 'react'
import {View, Text, ScrollView, AsyncStorage} from 'react-native'
import Modal from 'react-native-modal';
import {Calendar} from "react-native-calendars";
import {CheckBox, ListItem, Button, Icon} from "react-native-elements";
import firebase from 'react-native-firebase'


class Booking extends Component {


    constructor(props) {
        super(props);
        this.state = {
            checked_1: false,
            checked_2: false,
            checked_3: false,
            date: "",
            confirmationModal: null,
            loading: false
        };

        this.onDayPress = this.onDayPress.bind(this);
    }

    onDayPress(day) {
        this.setState({
            date: day.dateString
        });
    }

    checkSlot1() {
        this.setState({checked_1: !this.state.checked_1, checked_2: false, checked_3: false})
    }

    checkSlot2() {
        this.setState({checked_2: !this.state.checked_2, checked_1: false, checked_3: false})
    }

    checkSlot3() {
        this.setState({checked_3: !this.state.checked_3, checked_1: false, checked_2: false})
    }

    async validateBooking() {
        const data = this.state
        const salon = this.props.navigation.state.params.data;
        this.setState({loading: true})

        if (data.checked_1 === true) {
            firebase.database().ref('/bookings').push({
                title: this.props.navigation.state.params.data.name,
                start: this.state.date + ' ' + salon.slot_1,
                end: this.state.date + ' ' + salon.slot_2
            }).then(() => this.setState({loading: false, confirmationModal: true}))

            //await AsyncStorage.setItem('agenda', JSON.stringify({title: this.props.navigation.state.params.data.name, start: this.state.date + ' ' + salon.slot_1, end: this.state.date + ' ' +  salon.slot_2 }))
        } else if (data.checked_2) {
            firebase.database().ref('/bookings').push({
                title: this.props.navigation.state.params.data.name,
                start: this.state.date + ' ' + salon.slot_3,
                end: this.state.date + ' ' + salon.slot_4
            }).then(() => this.setState({loading: false, confirmationModal: true}))

            //await AsyncStorage.setItem('agenda', JSON.stringify({salon: salon.slot_2, date: this.state.date}))
        } else {
            firebase.database().ref('/bookings').push({
                title: this.props.navigation.state.params.data.name,
                start: this.state.date + ' ' + salon.slot_5,
                end: this.state.date + ' ' + salon.slot_6
            }).then(() => this.setState({loading: false, confirmationModal: true}))

            //await AsyncStorage.setItem('agenda', JSON.stringify({salon: salon.slot_3, date: this.state.date}))
        }
    }

    showModal() {
        this.setState({confirmationModal: null})
        this.props.navigation.navigate('Agenda')
    }

    render() {
        const data = this.props.navigation.state.params.data

        return (

            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={{alignItems: 'center', backgroundColor: '#FFFFFF'}}>
                        <Calendar
                            onDayPress={this.onDayPress}
                            style={styles.calendar}
                            hideExtraDays
                            markedDates={{
                                [this.state.date]: {
                                    selected: true,
                                    disableTouchEvent: true,
                                    selectedColor: '#FDB8C7'
                                }
                            }}
                        />
                    </View>
                    <View style={{backgroundColor: '#F8FAFA', alignItems: 'flex-start'}}>
                        <Text style={{
                            marginLeft: '7%',
                            marginTop: '4%',
                            fontSize: 16,
                            fontFamily: 'ProximaNova-Semibold',
                            color: '#616161'
                        }}>Horaire</Text>
                        <CheckBox
                            center
                            checkedColor='#FDB8C7'
                            uncheckedColor='#FDB8C7'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={this.state.checked_1}
                            onPress={() => this.checkSlot1()}
                            title={<Text
                                style={{marginLeft: 10, color: '#FDB8C7'}}>{data.slot_1} - {data.slot_2}</Text>}
                            containerStyle={{borderWidth: 0}}
                        />
                        <CheckBox
                            center
                            checkedColor='#FDB8C7'
                            uncheckedColor='#FDB8C7'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={this.state.checked_2}
                            onPress={() => this.checkSlot2()}
                            title={<Text
                                style={{marginLeft: 10, color: '#FDB8C7'}}>{data.slot_3} - {data.slot_4}</Text>}
                            containerStyle={{borderWidth: 0}}
                        />
                        <CheckBox
                            center
                            checkedColor='#FDB8C7'
                            uncheckedColor='#FDB8C7'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={this.state.checked_3}
                            onPress={() => this.checkSlot3()}
                            title={<Text
                                style={{marginLeft: 10, color: '#FDB8C7'}}>{data.slot_5} - {data.slot_6}</Text>}
                            containerStyle={{borderWidth: 0}}
                        />

                    </View>
                    <Button loading={this.state.loading} onPress={() => this.validateBooking()}
                            containerStyle={{ width: 375}}
                            buttonStyle={{borderRadius: 0, backgroundColor: '#85DAF7'}} title={'Valider'}/>
                    <Modal isVisible={this.state.confirmationModal}>
                        <View style={styles.content}>
                            <Icon name={"check-circle-outline"} type={"material-community"} size={80}
                                  color={'#FD7495'}/>
                            <Text style={styles.contentTitle}>Votre réservation à bien été enregistré !</Text>
                            <Button title="Voir l'agenda"
                                    containerStyle={{marginTop: 30, width: 129.06}}
                                    buttonStyle={{
                                        borderRadius: 20,
                                        backgroundColor: 'white',
                                        borderWidth: 2,
                                        borderColor: '#F6799A'
                                    }}
                                    titleStyle={{color: '#F6799A', fontSize: 14}}
                                    onPress={() => this.showModal()}
                            />
                        </View>
                    </Modal>
                </View>
            </View>

        );
    }
}

const styles = ({
    calendar: {
        marginTop: 20,
        borderTopWidth: 1,
        paddingTop: 5,
        borderBottomWidth: 1,
        borderColor: '#ffffff',
        height: 350,
        width: '90%',

        backgroundColor: '#FFFFFF'
    },
    text: {
        textAlign: 'center',
        borderColor: '#FFFFFF',
        padding: 10,
        backgroundColor: '#eee'
    },
    container: {
        flex: 1,
        backgroundColor: '#F8FAFA'
    },
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        height: 260,
    },
    contentTitle: {
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center',
        color: '#85DAF7'
    },
})

export default Booking