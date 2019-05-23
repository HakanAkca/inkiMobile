import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    AsyncStorage,
    Dimensions,
    Image
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import firebase from 'react-native-firebase'

let { width } = Dimensions.get('window');

LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.']
};
LocaleConfig.defaultLocale = 'fr';


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
            bookings: [],
            activeDay: new Date()
        };
    }

    componentDidMount() {
        firebase.database().ref('/bookings').on('value', snapshot => {
            let data = snapshot.val();
            let bookings = Object.values(data);
            this.setState({ bookings });
        });
    }

    render() {
        const {activeDay} = this.state;
        let y = activeDay.getFullYear(),
            m = activeDay.getMonth() + 1,
            d = activeDay.getDate();
        m = m < 10 ? `0${m}` : m;
        d = d < 10 ? `0${d}` : d;
        //console.log(`${year}-${m}-${date}`);

        return (
            <View style={{flex: 1, marginTop: 20}}>
                <Calendar
                    theme={{
                        calendarBackground: '#FFFFFF',
                        todayTextColor: '#1a1a1a',
                        textMonthColor: '#97424D',
                        selectedDayTextColor: 'white',
                        selectedDayBackgroundColor: '#F56B74',
                    }}
                    markedDates={{
                        [`${y}-${m}-${d}`]: {
                            selected: true,
                            disableTouchEvent: true,
                        }
                    }}
                    minDate={'2019-01-01'}
                    maxDate={new Date().setDate(new Date().getDate() + 365)}
                    onDayPress={(day) => {
                        this.setState({activeDay: new Date(day.dateString)})
                    }}
                    onDayLongPress={(day) => {
                        const toDay = new Date();
                        if (day.timestamp >= toDay.getMilliseconds()) {
                            console.log('Date is good');
                        } else {
                            console.log('Date is not good');
                        }
                    }}
                    onMonthChange={(month) => {
                        console.log('month changed', month)
                    }}
                    hideArrows={false}
                    renderArrow={(direction) => (
                        direction === 'left' ? <Image source={require('../../assets/Images/left.png')}/> :
                            <Image source={require('../../assets/Images/right.png')}/>
                    )}
                    hideExtraDays={false}
                    disableMonthChange={false}
                    firstDay={1}
                    hideDayNames={false}
                    showWeekNumbers={false}
                    onPressArrowLeft={substractMonth => substractMonth()}
                    onPressArrowRight={addMonth => addMonth()}
                />
                <View>
                    {
                        this.state.bookings.map((item, index) => {
                            let active = new Date(item.start)

                            let year = active.getFullYear(),
                                month = active.getMonth() + 1,
                                date = active.getDate();
                            month = month < 10 ? `0${month}` : month;
                            date = date < 10 ? `0${date}` : date;

                            return (
                                <View key={index}>
                                    {
                                        `${y}-${m}-${d}` === `${year}-${month}-${date}` &&
                                            <Text>{item.title}</Text>

                                    }
                                </View>
                            )
                        })
                    }
                </View>
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