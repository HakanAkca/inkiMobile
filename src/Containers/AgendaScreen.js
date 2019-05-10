import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    AsyncStorage,
    Dimensions,
} from 'react-native';
import firebase from 'react-native-firebase'
import EventCalendar from 'react-native-events-calendar';

let { width } = Dimensions.get('window');


export default class AgendaScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
            events: [
                {
                    start: '2019-05-06 00:00:00',
                    end: '2019-01-01 02:00:00',
                    title: 'New Year Party',
                    summary: 'xyz Location',
                }, {
                    start: '2019-01-01 01:00:00',
                    end: '2019-01-01 02:00:00',
                    title: 'New Year Wishes',
                    summary: 'Call to every one',
                },
                {
                    start: '2019-01-02 00:30:00',
                    end: '2019-01-02 01:30:00',
                    title: 'Parag Birthday Party',
                    summary: 'Call him',
                },
                {
                    start: '2019-05-07 01:30:00',
                    end: '2019-05-07 02:20',
                    title: 'My Birthday Party',
                    summary: 'Lets Enjoy',
                },
                {
                    start: '2019-05-07 10:10:00',
                    end: '2019-05-07 11:40:00',
                    title: 'Engg Expo 2019',
                    summary: 'Expoo Vanue not confirm',
                },
            ],
            bookings: []
        };
    }

    componentDidMount() {
        firebase.database().ref('/bookings').on('value', snapshot => {
            let data = snapshot.val();
            let bookings = Object.values(data);
            this.setState({ bookings });
        });
    }

    eventClicked(event) {
        //On Click oC a event showing alert from here
        alert(JSON.stringify(event));
    }

    render() {

        console.log(this.state.bookings)

        return (
            <View style={{flex: 1, marginTop: 20}}>
                <EventCalendar
                    eventTapped={this.eventClicked.bind(this)}
                    //Function on event press
                    events={this.state.bookings}
                    //passing the Array of event
                    width={width}
                    //Container width
                    size={60}
                    styles={{
                        container: {
                            backgroundColor: 'white'
                        },
                        event: {
                            opacity: 0.5
                        }
                    }}
                    //number of date will render before and after initDate
                    //(default is 30 will render 30 day before initDate and 29 day after initDate)
                    //show initial date (default is today)
                    scrollToFirst
                    format24h
                    //scroll to first event of the day (default true)
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30
    }
});