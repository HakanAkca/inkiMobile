import React from "react";
import {View, Text} from 'react-native'
import { createSwitchNavigator, createAppContainer, createBottomTabNavigator, createStackNavigator } from "react-navigation";
import {Icon} from "react-native-elements";

import Loading from "../Components/Loading";
import SignUp from "../Containers/Auth/Register";
import Login from "../Containers/Auth/Login";
import HomeScreen from "../Containers/HomeScreen";
import ProfileScreen from "../Containers/ProfileScreen";
import SplashScreen from "../Containers/SplashScreen";
import NotificationScreen from "../Containers/NotificationScreen";
import AgendaScreen from "../Containers/AgendaScreen";
import SalonScreen from "../Containers/SalonScreen";
import Booking from "../Containers/Booking/Booking";
import ChatScreen from "../Containers/ChatScreen";
import SearchPrice from "../Containers/Search/SearchPrice/SearchPrice";
import SearchPriceResult from "../Containers/Search/SearchPrice/SearchPriceResult";


const SplashStack = createStackNavigator({

    SplashScreen: {
        screen: SplashScreen
    },
    Login: {
        screen: Login
    },
    Register: {
        screen: SignUp
    },
}, {
    headerMode: 'none'
})

const HomeStack = createStackNavigator({
    Home: { screen: HomeScreen },
    Salon: {
        screen: SalonScreen,
    },
    Booking: {screen: Booking},
    SearchPrice: {
        screen: SearchPrice,
        navigationOptions: {
            headerTitle:
                <View>
                    <Text style={{fontSize: 22, fontFamily: 'ProximaNova-Regular', color: '#88D7F4'}}>Recherche</Text>
                </View>
        }
    },
    SearchPriceResult: {screen: SearchPriceResult}
})

HomeStack.navigationOptions = ({ navigation }) => {

    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if ( routeName == 'Salon' || routeName == 'Booking' || routeName == 'SearchPrice') {
        tabBarVisible = false
    }

    return {
        tabBarVisible
    }
}

const AgendaStack = createStackNavigator({
    Agenda: {
        screen: AgendaScreen,
        navigationOptions: {
            headerTitle:
                <View>
                    <Text style={{fontSize: 22, fontFamily: 'ProximaNova-Regular', color: '#88D7F4'}}>Agenda / Reservation</Text>
                </View>
        }}
})

const NotificationStack = createStackNavigator({
    Notification: { screen: NotificationScreen},
    Chat: { screen: ChatScreen}
})

NotificationStack.navigationOptions = ({ navigation }) => {
    let header = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if ( routeName == 'Chat' ) {
        header = false
    }

    return {
        header
    }
}

const ProfileStack = createStackNavigator({
    Profile: { screen: ProfileScreen}
},{
    headerMode: 'none'
})

const AppStack = createBottomTabNavigator({
    Recherche: {
        screen: HomeStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon name={'compass-outline'} type={'material-community'} size={30} color={tintColor}/>
            )
        },
    },
    Agenda: {
        screen: AgendaStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon name={'calendar-range-outline'} type={'material-community'} size={30} color={tintColor}/>
            )
        },
    },
    Notification: {
        screen: NotificationStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon name={'bell'} type={'material-community'} size={30} color={tintColor}/>
            )
        },
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon name={'account-circle-outline'} type={'material-community'} size={30} color={tintColor}/>
            )
        },
    }

},{
    tabBarOptions: {
        showLabel: false
    }
})

const Router = createSwitchNavigator(
    {
        Loading,
        SplashStack,
        AppStack
    },
    {
        initialRouteName: 'Loading',

    }
);

export default Router