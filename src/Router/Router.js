import React from "react";
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
    Booking: {screen: Booking}
})

HomeStack.navigationOptions = ({ navigation }) => {

    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if ( routeName == 'Salon' || routeName == 'Booking' ) {
        tabBarVisible = false
    }

    return {
        tabBarVisible
    }
}

const AgendaStack = createStackNavigator({
    Notification: { screen: AgendaScreen}
},{
    headerMode: 'none'
})

const NotificationStack = createStackNavigator({
    Notification: { screen: NotificationScreen},
    Chat: { screen: ChatScreen}
})

NotificationStack.navigationOptions = ({ navigation }) => {
    let header = false;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if ( routeName == 'Chat' ) {
        header = true
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
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor}) => (
                <Icon name={'compass-outline'} type={'material-community'} size={30} color={tintColor}/>
            )
        },
    },
    Agenda: {
        screen: AgendaStack,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor}) => (
                <Icon name={'calendar-range-outline'} type={'material-community'} size={30} color={tintColor}/>
            )
        },
    },
    Notification: {
        screen: NotificationStack,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor}) => (
                <Icon name={'bell'} type={'material-community'} size={30} color={tintColor}/>
            )
        },
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            tabBarLabel: 'Home',
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