import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {Button, CheckBox} from "react-native-elements";

class SearchStyle extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activeDay: new Date(),
            checked_1: false,
            checked_2: false,
            checked_3: false,
            checked_4: false,
            checked_5: false,
            checked_6: false,
            type: ''
        }
    }

    searchItem() {
        this.props.navigation.navigate('SearchStyleResult', {data: this.props.navigation.state.params.data, type: this.state.type})
    }

    checkSlot1() {
        this.setState({type:"Maori et polynésien", checked_1: !this.state.checked_1, checked_2: false, checked_3: false,  checked_4: false, checked_5: false, checked_6: false})
    }

    checkSlot2() {
        this.setState({type:"Old school (traditionnel)", checked_2: !this.state.checked_2, checked_1: false, checked_3: false,  checked_4: false, checked_5: false, checked_6: false})
    }

    checkSlot3() {
        this.setState({type:"Graphique", checked_3: !this.state.checked_3, checked_1: false, checked_2: false, checked_4: false, checked_5: false, checked_6: false})
    }

    checkSlot4() {
        this.setState({type:"Réaliste", checked_4: !this.state.checked_1, checked_2: false, checked_3: false, checked_5: false, checked_6: false})
    }

    checkSlot5() {
        this.setState({type:"Biomécanique", checked_5: !this.state.checked_2, checked_1: false, checked_3: false, checked_4: false, checked_6: false})
    }

    checkSlot6() {
        this.setState({type:"New school (cartoon)", checked_6: !this.state.checked_3, checked_1: false, checked_2: false,  checked_4: false, checked_5: false})
    }

    render() {
        return (
            <View style={{flex: 1, width: '100%'}}>
                <View style={{flex: 1, backgroundColor: '#F8FAFA', alignItems: 'flex-start'}}>
                    <Text style={{
                        marginLeft: '7%',
                        marginTop: '4%',
                        fontSize: 16,
                        fontFamily: 'ProximaNova-Semibold',
                        color: '#616161'
                    }}>Style</Text>
                    <CheckBox
                        center
                        checkedColor='#FDB8C7'
                        uncheckedColor='#FDB8C7'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.checked_1}
                        onPress={() => this.checkSlot1()}
                        title={<Text
                            style={{marginLeft: 10, color: '#FDB8C7'}}>Maori et polynésien</Text>}
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
                            style={{marginLeft: 10, color: '#FDB8C7'}}>Old school (traditionnel)</Text>}
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
                            style={{marginLeft: 10, color: '#FDB8C7'}}>Graphique</Text>}
                        containerStyle={{borderWidth: 0}}
                    />
                    <CheckBox
                        center
                        checkedColor='#FDB8C7'
                        uncheckedColor='#FDB8C7'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.checked_4}
                        onPress={() => this.checkSlot4()}
                        title={<Text
                            style={{marginLeft: 10, color: '#FDB8C7'}}>Réaliste</Text>}
                        containerStyle={{borderWidth: 0}}
                    />
                    <CheckBox
                        center
                        checkedColor='#FDB8C7'
                        uncheckedColor='#FDB8C7'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.checked_5}
                        onPress={() => this.checkSlot5()}
                        title={<Text
                            style={{marginLeft: 10, color: '#FDB8C7'}}>Biomécanique</Text>}
                        containerStyle={{borderWidth: 0}}
                    />
                    <CheckBox
                        center
                        checkedColor='#FDB8C7'
                        uncheckedColor='#FDB8C7'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.checked_6}
                        onPress={() => this.checkSlot6()}
                        title={<Text
                            style={{marginLeft: 10, color: '#FDB8C7'}}>New school (cartoon)</Text>}
                        containerStyle={{borderWidth: 0}}
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

export default SearchStyle