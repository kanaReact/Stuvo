import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, SafeAreaView, TextInput } from 'react-native'
import styles from '../../../style/styles'
import Header from '../../../Components/Header'
class Que1 extends Component {
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
                {this.props.route.params != undefined ?
                    this.props.route.params.btn ?
                        <Header lefttxt={{ color: '#919191' }} btn={true} leftPress={() => this.props.navigation.goBack()} /> : null
                    :
                    <View style={[styles.headerMain, { marginTop: 20, marginHorizontal: 16 }]}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 32 }}>
                            <Image source={require('../../../images/HomeLogotopImg.png')} style={{ width: 134, height: 37, resizeMode: 'contain' }} />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()} activeOpacity={0.6}>
                                <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }

                <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16 }}>Question 1 of 25</Text>

                <View style={{ marginLeft: 16, marginRight: 24 }}>
                    <Text style={{ marginTop: 15, fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727', lineHeight: 20 }}>Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod?</Text>

                    <TouchableOpacity style={{ marginTop: 30, borderRadius: 30, height: 41, justifyContent: 'center', paddingHorizontal: 18, backgroundColor: currentIndex == 0 ? '#00AFF0' : '#E0E0E066' }} activeOpacity={0.6}
                        onPress={() => this.selectedIndex(0)}>
                        <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: currentIndex == 0 ? '#FFFFFF' : '#272727' }}>a.   Yes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: 20, borderRadius: 30, height: 41, justifyContent: 'center', paddingHorizontal: 18, backgroundColor: currentIndex == 1 ? '#00AFF0' : '#F3F3F3' }}
                        onPress={() => this.selectedIndex(1)}>
                        <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: currentIndex == 1 ? '#FFFFFF' : '#272727' }}>b.   No</Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: 20, height: 131, borderRadius: 10, backgroundColor: '#F3F3F3' }}>
                        <TextInput
                            style={{ paddingLeft: 18, paddingRight: 5, paddingTop: 15, fontFamily: 'Gotham-Medium', color: '#919191', fontSize: 14 }}
                            placeholder="Write something..."
                            multiline={true}
                        />
                    </View>
                </View>

                <View style={{ flex: 1, justifyContent: 'flex-end', marginHorizontal: 27 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Que2')} activeOpacity={0.6}>
                        <View style={{ alignItems: 'center', backgroundColor: '#00AFF0', marginBottom: 50, height: 47, justifyContent: 'center', borderRadius: 50, }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#FFFFFF' }}>Next Question</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        )
    }
}

export default Que1
