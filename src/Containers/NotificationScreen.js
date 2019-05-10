import React, { Component }from 'react'
import { View, Text, Dimensions } from 'react-native'
import {TabBar, TabView} from "react-native-tab-view";
import Notification from "./Notification/Notification";
import Messages from "./Notification/Messages";

const {width} = Dimensions.get('window');
const numberOfTabs = 2;


class NotificationScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    constructor() {
        super()

        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: 'Notifications' },
                { key: 'second', title: 'Messages' },
            ],

        }
    }

    _renderTabBar = props => (
        <TabBar
            {...props}
            scrollEnabled
            style={{backgroundColor: '#FFFFFF', height: '10%', alignItems: 'center'}}
            indicatorStyle={{backgroundColor: '#88D7F4'}}
            renderLabel={this._renderLabel}
            tabStyle={{width: width/numberOfTabs}}
        />
    );

    _renderLabel = ({route}) => {
        const label = route.title
        return <Text>{label}</Text>
    }

    _handleIndexChange = index => {
        const currentRoute = this.state.routes[index].key;
        this.setState({
            index, currentRoute
        });
    }

    _renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <Notification />;
            case 'second':
                return <Messages />;
            default:
                return null;
        }
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <TabView
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderTabBar={this._renderTabBar}
                    onIndexChange={this._handleIndexChange}
                />
            </View>
        );
    }
}

export default NotificationScreen