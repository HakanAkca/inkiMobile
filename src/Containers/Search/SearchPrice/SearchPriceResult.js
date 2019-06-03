import React, {Component} from 'react'
import {View, Text, ScrollView} from 'react-native'
import {Button, ListItem, Slider} from "react-native-elements";

class SearchPriceResult extends Component {

    constructor(props) {
        super(props)

        console.log(props)
    }

    render() {
        return (
            <ScrollView>
                {
                    this.props.navigation.state.params.data.map((l, i) => (
                        console.log(l),
                        l.price >= this.props.navigation.state.params.value  ?
                            <Text>{l.price}</Text>
                            :
                            console.log('nope')
                    ))
                }
            </ScrollView>
        )
    }
}

export default SearchPriceResult