import React, { Component } from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'
import SVGImg from '../../Source/SVGImg'
class Week1PendingQue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    text: 'Anti-bullying',
                    timeToComplete: '24 hours left to complete',
                    color: '#E10000',
                    navigation: 'Que25'
                },
                {
                    id: 2,
                    text: 'University Life',
                    timeToComplete: '24 hours left to complete',
                    color: '#E10000',
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
                    <Header lefttxt={{ color: '#919191' }} btn={true} leftPress={() => this.props.navigation.goBack()} />
                    <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 12 }}>Week 1 - Pending Surveys</Text>

                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item, index }) => (
                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E066' }}>
                                    <TouchableOpacity activeOpacity={0.6} onPress={() => { this.props.navigation.navigate(item.navigation) }}>
                                        <View style={{ flexDirection: 'row', paddingVertical: 10, marginLeft: 16, marginRight: 24, justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'column', width: "85%" }}>
                                                <Text style={{ fontSize: 14, color: '#272727', fontFamily: 'Gotham-Medium' }}>{item.text}</Text>
                                                <Text style={{ paddingTop: 7, fontSize: 10, color: item.color, fontFamily: Platform.OS == "android" ? "Gotham-BookItalic" : null, fontStyle: Platform.OS == "ios" ? "italic" : null }}>{item.timeToComplete}</Text>
                                            </View>

                                            <View style={{ flexDirection: 'column', width: "15%", alignItems: 'flex-end' }}>
                                              <SVGImg.Arrow />
                                            </View>
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

export default Week1PendingQue
