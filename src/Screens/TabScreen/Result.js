import React, { Component } from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'
import SVGImg from '../../Source/SVGImg'
class WeekResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    text: 'Week 1 Results',
                    navigation: 'Week1Result'
                },
                {
                    id: 2,
                    text: 'Week 2 Results',
                    navigation: ''
                },
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
                    <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 12 }}>Results</Text>

                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item, index }) => (
                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E066' }}>
                                    <TouchableOpacity activeOpacity={0.6} onPress={() => this.props.navigation.navigate(item.navigation)}>
                                        <View style={{ flexDirection: 'row', paddingVertical: 18, marginLeft: 16, marginRight: 24, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ flex: 1, fontSize: 14, color: '#272727', fontFamily: 'Gotham-Medium' }}>{item.text}</Text>
                                            <SVGImg.Arrow />
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

export default WeekResult;