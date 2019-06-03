import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {Button, Slider} from "react-native-elements";

class SearchPrice extends Component {

    constructor(props) {
        super(props)

        this.state = {
            value: null,
            item: [],
            showResult: false
        }
    }

    searchItem() {
        this.props.navigation.navigate('SearchPriceResult', {data: this.props.navigation.state.params.data, value: this.state.value})
    }

    render() {
        return (
            <View style={{flex: 1, width: '100%'}}>
                <View style={{flex: 1, padding: 20}}>
                    <Text style={{fontSize: 17, color: '#616161'}}>Gamme de prix :</Text>
                    <View style={{alignItems: 'center'}}>
                        <Slider
                            style={{width: 265}}
                            minimumValue={0}
                            maximumValue={350}
                            step={1}
                            minimumTrackTintColor='#FDB8C7'
                            maximumTrackTintColor='#FD7495'
                            thumbTintColor={'#FFFFFF'}
                            value={this.state.value}
                            onValueChange={value => this.setState({ value })}
                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{marginLeft: 38, color: '#FD7495'}}>0€</Text>

                        <Text style={{color: '#FD7495'}}>150€</Text>

                        <Text style={{marginRight: 38, color: '#FD7495'}}>350€</Text>
                    </View>
                </View>
                <View>
                    <Button buttonStyle={{borderRadius: 0, backgroundColor: '#85DAF7', height: 71}} title={"Rechercher"} onPress={() => this.searchItem()} />
                </View>
            </View>
        )
    }
}

export default SearchPrice