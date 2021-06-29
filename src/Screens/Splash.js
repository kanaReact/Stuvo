import React, { Component } from 'react';
import { View, Image, SafeAreaView, Dimensions, Text, TouchableOpacity, StatusBar } from 'react-native'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import styles from '../style/styles'
import SVGImg from '../Source/SVGImg';

class Splash extends Component {
    render() {
        return (
            <View style={[styles.container, { backgroundColor: '#00AFF0' }]}>
                <StatusBar backgroundColor="#00AFF0" barStyle={'dark-content'} />

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <SVGImg.SplashLogo />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ position: 'absolute', bottom: 50, width: '90%' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.replace('Welcome')} activeOpacity={0.6}>
                            <View style={{ alignItems: 'center', height: 47, justifyContent: 'center', backgroundColor: '#FFFFFF', borderRadius: 50 }}>
                                <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>Sign in</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
export default Splash