import React, { Component } from 'react';
import { View, SafeAreaView, Dimensions, Text, TouchableOpacity, StatusBar } from 'react-native'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import styles from '../style/styles'
class WelcomeScreen extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

                <Text style={{ marginTop: 30, fontSize: 20, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 12 }}>Welcome!</Text>
                <Text style={{ marginTop: 20, fontSize: 14, marginBottom: 12, fontFamily: 'Gotham-Medium', color: '#272727', marginLeft: 16, lineHeight: 20, marginRight: 24 }}>
                    Lorem Ipsum dolor sit amet, consectetur adipi scing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
                <Text style={{ marginTop: 10, fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727', marginLeft: 16, lineHeight: 20, marginRight: 24 }}>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>

                <View style={{ flex: 1, marginHorizontal: 24, marginTop: 80 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('tabs')} activeOpacity={0.6}>
                        <View style={{ alignItems: 'center', height: 47, justifyContent: 'center', backgroundColor: '#00AFF0', borderRadius: 50 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#FFFFFF' }}>Let's begin!</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

export default WelcomeScreen