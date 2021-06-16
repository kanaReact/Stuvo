import React, { Component } from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'
class Week1Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    text: 'Anti-bullying',
                    navigation: 'ResultProgress'
                },
                {
                    id: 2,
                    text: 'University Life',
                    navigation: ''
                },
                {
                    id: 3,
                    text: 'Mental Health',
                    navigation: ''
                },
                {
                    id: 4,
                    text: 'Public Services',
                    navigation: ''
                }
            ]
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground
                    style={{
                        height: '100%',
                        width: '100%',
                        resizeMode: 'stretch',
                    }}
                    resizeMode='stretch'
                    source={require('../../images/mainback.png')}
                >
                    <Header leftImagePress={() => { this.props.navigation.openDrawer() }} />
                    <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 12 }}>Week 1 - Results</Text>

                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item, index }) => (
                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E066' }}>
                                    <TouchableOpacity activeOpacity={0.6} onPress={() => this.props.navigation.navigate(item.navigation)}>
                                        <View style={{ flexDirection: 'row', paddingVertical: 18, marginLeft: 16, marginRight: 24, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ flex: 1, fontSize: 14, color: '#272727', fontFamily: 'Gotham-Medium' }}>{item.text}</Text>
                                            <Image style={{ height: 10, width: 11, resizeMode: 'contain', tintColor: "#919191" }} source={require('../../images/arrow.png')} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={item => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

export default Week1Result;