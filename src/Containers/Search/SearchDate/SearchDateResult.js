import React, {Component} from 'react'
import {View, Text, ScrollView, TouchableOpacity} from 'react-native'
import {Avatar, Button, Icon, ListItem, Rating} from "react-native-elements";

let colors = ["#FDB8C7", "#85DAF7"];

class SearchDateResult extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView>
                <View style={{padding: 10, alignItems: 'center', justifyContent: 'center'}}>
                    {
                        this.props.navigation.state.params.data.map((l, i) => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Booking', {data: l})}
                                              style={{padding: 10}}>
                                <ListItem
                                    containerStyle={{padding: 0, borderRadius: 10, width: 341, height: 100}}
                                    key={i}
                                    leftAvatar={
                                        <View>
                                            <Avatar
                                                containerStyle={{
                                                    borderTopLeftRadius: 10,
                                                    borderBottomLeftRadius: 10,
                                                    overflow: 'hidden',
                                                    width: 90.27,
                                                    height: 100
                                                }}
                                                size={"large"}
                                                source={{uri: l.thumbnail}}
                                            />
                                        </View>
                                    }
                                    title={
                                        <View>
                                            <Text style={{
                                                'color': colors[i % colors.length],
                                                fontSize: 16
                                            }}>{l.name}</Text>
                                            <View style={{
                                                flexDirection: 'row',
                                                marginTop: 10,
                                                marginLeft: -5,
                                                alignItems: 'center'
                                            }}>
                                                <Icon name={'map-marker-outline'} type={'material-community'}/>
                                                <Text style={{fontSize: 16, color: '#616161'}}>{l.city}
                                                    {
                                                        l.zipCodeShort ? ", " + l.zipCodeShort + " ème" : ""
                                                    }
                                                </Text>
                                            </View>
                                        </View>
                                    }
                                    subtitle={
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            marginTop: 5
                                        }}>
                                            <View style={{flexDirection: 'row'}}>
                                                <Text>Avis: </Text>
                                                <Rating
                                                    readonly
                                                    type='custom'
                                                    ratingColor='#FD7495'
                                                    ratingBackgroundColor='#E6E6E6'
                                                    ratingCount={5}
                                                    imageSize={16}
                                                    startingValue={l.rating}
                                                />
                                            </View>
                                            <View style={{marginRight: 10}}>
                                                <Icon name={'calendar-range-outline'} type={'material-community'}/>
                                            </View>
                                        </View>
                                    }
                                />
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </ScrollView>
        )
    }
}

export default SearchDateResult