import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    AsyncStorage,
    Dimensions,
    Image,
    ScrollView
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import firebase from 'react-native-firebase'
import CardView from 'react-native-cardview'
import {Badge} from "react-native-elements";

let {width} = Dimensions.get('window');

LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.']
};
LocaleConfig.defaultLocale = 'fr';

let colors = ["#FDB8C7", "#85DAF7"];

export default class AgendaScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            activeDay: new Date()
        };
    }

    componentDidMount() {
        firebase.database().ref('/bookings').on('value', snapshot => {
            let data = snapshot.val();
            let bookings = Object.values(data);
            this.setState({bookings});
        });
    }

    render() {
        const {activeDay} = this.state;
        let y = activeDay.getFullYear(),
            m = activeDay.getMonth() + 1,
            d = activeDay.getDate();
        m = m < 10 ? `0${m}` : m;
        d = d < 10 ? `0${d}` : d;

        let today = new Date()
        let yr = today.getFullYear(),
            ms = today.getMonth() + 1,
            dy = today.getDate();
        ms = ms < 10 ? `0${ms}` : ms;
        dy = dy < 10 ? `0${dy}` : dy;

        return (
            <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
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

                <ScrollView style={{backgroundColor: '#F8FAFA'}}>
                <View style={{flex: 1, padding: 20, backgroundColor: '#F8FAFA'}}>
                    <View>
                        <Text style={{
                            color: '#616161',
                            fontSize: 16
                        }}>{`${y}-${m}-${d}` === `${yr}-${ms}-${dy}` ? 'Aujourd\'hui' : `Le ${y}-${m}-${d}`}</Text>
                    </View>
                    {
                        this.state.bookings.map((item, index) => {
                            let active = new Date(item.start)
                            let today = new Date()

                            let year = active.getFullYear(),
                                month = active.getMonth() + 1,
                                date = active.getDate();
                            month = month < 10 ? `0${month}` : month;
                            date = date < 10 ? `0${date}` : date;

                            let hoursStart = new Date(item.start).getHours()
                            hoursStart = hoursStart < 10 ? `0${hoursStart}` : hoursStart;
                            let minutesStart = new Date(item.start).getMinutes()
                            let secondStart = new Date(item.start).getSeconds()

                            let hoursEnd = new Date(item.end).getHours()
                            hoursEnd = hoursEnd < 10 ? `0${hoursEnd}` : hoursEnd;
                            let minutesEnd = new Date(item.end).getMinutes()
                            let secondEnd = new Date(item.end).getSeconds()

                            return (
                                <CardView key={index}
                                          cardElevation={1}
                                          cardMaxElevation={1}
                                          cornerRadius={0}
                                >
                                    {
                                        `${y}-${m}-${d}` === `${year}-${month}-${date}` &&
                                        <View
                                            style={{marginTop: 10, backgroundColor: '#FFFFFF', height: 61, width: 331,
                                                justifyContent: 'center'}}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-around'
                                            }}>
                                                <View style={{'backgroundColor': colors[index % colors.length], height: 14, width: 14, borderRadius: 50}} />
                                                <Text style={{fontSize: 17, width: 140}}>{item.title}</Text>
                                                <View style={{'backgroundColor': colors[index % colors.length], borderRadius: 50 }}>
                                                    <Text style={{fontSize: 11, padding: 10, color: '#FFFFFF'}}>{hoursStart + ':' + minutesStart + secondStart} - {hoursEnd + ':' + minutesEnd + secondEnd}</Text>
                                                </View>
                                            </View>
                                        </View>

                                    }
                                </CardView>
                            )
                        })
                    }
                </View>

                </ScrollView>
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
        flex: 1,
        paddingTop: 30
    }
});