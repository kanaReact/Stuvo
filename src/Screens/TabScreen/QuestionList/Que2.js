import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import styles from '../../../style/styles'
import SVGImg from '../../../Source/SVGImg';
class Que2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        }
    }

    selectedIndex = (i) => {
        this.setState({ currentIndex: i })
    }

    render() {
        const { currentIndex } = this.state;
        return (
            <SafeAreaView style={styles.container}>

                <View style={[styles.headerMain, { marginTop: 20, marginHorizontal: 16 }]}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} activeOpacity={0.6}>
                            <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: '#919191' }}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 16 }}>
                        <SVGImg.HeaderLogo />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Week1Questionaires')} activeOpacity={0.6}>
                            <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16 }}>Question 2 of 25</Text>

                <View style={{ marginLeft: 16, marginRight: 24 }}>
                    <Text style={{ marginTop: 15, fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727', lineHeight: 20 }}>Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod?</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, marginRight: 6.5 }}>
                            <TouchableOpacity activeOpacity={0.6}
                                onPress={() => this.selectedIndex(0)}>
                                <View style={{ marginTop: 30, borderWidth: 4, borderColor: currentIndex == 0 ? '#00AFF0' : '#FFFFFF', borderRadius: 10 }}>
                                    <Image
                                        style={{ height: 166, width: '100%', resizeMode: 'stretch', }}
                                        source={require('../../../images/School_uniform.png')}
                                    />
                                </View>
                                <View style={{ marginTop: 18, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727' }}>a.   School uniform</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginLeft: 6.5 }}>
                            <TouchableOpacity activeOpacity={0.6}
                                onPress={() => this.selectedIndex(1)}>
                                <View style={{ marginTop: 30, borderWidth: 4, borderColor: currentIndex == 1 ? '#00AFF0' : '#FFFFFF', borderRadius: 10 }}>
                                    <Image
                                        style={{ height: 166, width: '100%', borderRadius: currentIndex == 1 ? 2 : 10,resizeMode: 'stretch' }}
                                        source={require('../../../images/Ordinary_clothing.png')}
                                    />
                                </View>
                                <View style={{ marginTop: 18, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727' }}>b.   Ordinary clothing</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

                <View style={{ flex: 1, justifyContent: 'flex-end', marginHorizontal: 27 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Que25')} activeOpacity={0.6}>
                        <View style={{ justifyContent: 'flex-end', height: 47, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00AFF0', marginBottom: 50, borderRadius: 50 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#FFFFFF' }}>Next Question</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        )
    }
}

export default Que2
