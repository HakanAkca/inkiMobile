import React, {Component} from 'react'
import {View, Text, Image} from 'react-native'
import {Calendar} from "react-native-calendars";
import {Button} from "react-native-elements";

class SearchDate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activeDay: new Date()
        }
    }

    searchItem() {
        this.props.navigation.navigate('SearchDateResult', {data: this.props.navigation.state.params.data})
    }


    render() {
        const {activeDay} = this.state;
        let y = activeDay.getFullYear(),
            m = activeDay.getMonth() + 1,
            d = activeDay.getDate();
        m = m < 10 ? `0${m}` : m;
        d = d < 10 ? `0${d}` : d;

        return (
            <View style={{flex: 1, width: '100%'}}>
                <View style={{flex: 1}}>
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
                            direction === 'left' ? <Image source={require('../../../../assets/Images/left.png')}/> :
                                <Image source={require('../../../../assets/Images/right.png')}/>
                        )}
                        hideExtraDays={false}
                        disableMonthChange={false}
                        firstDay={1}
                        hideDayNames={false}
                        showWeekNumbers={false}
                        onPressArrowLeft={substractMonth => substractMonth()}
                        onPressArrowRight={addMonth => addMonth()}
                    />
                </View>
                <View>
                    <Button buttonStyle={{borderRadius: 0, backgroundColor: '#85DAF7', height: 71}} title={"Rechercher"}
                            onPress={() => this.searchItem()}/>
                </View>
            </View>
        )
    }
}

export default SearchDate