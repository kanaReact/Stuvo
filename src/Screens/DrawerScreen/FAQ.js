import React, { Component } from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'
class FAQ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
                },
                {
                    id: 2,
                    text: 'Lorem ipsum dolor sit amet, consectetur'
                },
            ]
        }
    }
    _renderItem({ item, index }) {
        const { id, text } = item;
        return (
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E066' }}>
                <TouchableOpacity activeOpacity={0.6} >
                    <View style={{ paddingVertical: 16, marginLeft: 16, marginRight: 24 }}>
                        <Text style={{ fontSize: 14, color: '#272727', fontFamily: 'Gotham-Medium', lineHeight: 20 }}>{text}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header btn={true} leftPress={() => this.props.navigation.goBack()} />
                <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 6 }}>FAQ</Text>

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

export default FAQ;