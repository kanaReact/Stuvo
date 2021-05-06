import React, { Component } from 'react'
import { SafeAreaView, View, Text, FlatList } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'
class Guidance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    text: 'If you need help with completing survey speak to your SV Lead at academy'
                },
                {
                    id: 2,
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
                },
                {
                    id: 3,
                    text: 'Lorem ipsum dolor sit amet, consectetur'
                }
            ]
        }
    }

    _renderItem({ item, index }) {
        const { id, text } = item;
        return (
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E066', paddingVertical: 16, marginLeft: 16, marginRight: 24 }}>
                <Text style={{ fonttSize: 14, fontFamily: 'Gotham-Medium', color: '#272727', lineHeight: 20 }}>{text}</Text>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header leftImagePress={() => { this.props.navigation.openDrawer() }} />
                <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 6 }}>Guidance</Text>

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

export default Guidance;