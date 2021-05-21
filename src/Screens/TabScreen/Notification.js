import React, { Component } from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'
class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    img: require('../../images/Notification_list_icon.png'),
                    text: 'You have 24h left to complete\nyour answer.',
                    time: 'now'
                },
                {
                    id: 2,
                    img: require('../../images/Notification_list_icon.png'),
                    text: 'You have 3 days left to complete\nyour answer.',
                    time: '16:00'
                },
                {
                    id: 3,
                    img: require('../../images/Notification_list_icon.png'),
                    text: 'You have 5 days left to complete\nyour answer.',
                    time: 'Mon'
                },

            ]
        }
    }

    _renderItem({ item, index }) {
        const { id, img, text, time } = item;
        return (
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E066' }}>
                <View style={{ flexDirection: 'row', paddingVertical: 16, marginLeft: 16, marginRight: 24 }}>
                    <View style={{ padding: 7, backgroundColor: '#00AFF0', borderRadius: 50, alignSelf: 'center', justifyContent: 'center' }}>
                        <Image source={img} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
                    </View>

                    <View style={{ flex: 1, marginHorizontal: 20, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 14, color: '#272727', fontFamily: 'Gotham-Medium',lineHeight:16 }}>{text}</Text>
                        <TouchableOpacity style={{ alignSelf: 'flex-start' }} activeOpacity={0.6}>
                            <Text style={{ fontSize: 10, color: '#919191', fontFamily: 'Gotham-Medium', marginTop: 5 }}>View now</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{ fontSize: 10, color: '#919191', fontFamily: 'Gotham-Medium' }}>{time}</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header leftImagePress={() => { this.props.navigation.openDrawer() }} />
                <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 6 }}>Notifications</Text>

                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.data}
                        renderItem={this._renderItem}
                        keyExtractor={item => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

export default Notification;