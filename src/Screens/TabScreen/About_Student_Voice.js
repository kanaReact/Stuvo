import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, SafeAreaView, TextInput,ScrollView } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'
import SVGImg from '../../Source/SVGImg'

class About_Student_Voice extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={[styles.headerMain, { marginTop: 20, marginHorizontal: 16 }]}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 16 }}>
                       <SVGImg.HeaderLogo />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} activeOpacity={0.6}>
                            <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 12 }}>About Student Voice</Text>
                <View style={{ marginHorizontal:16 }}>
                    <Image source={require('../../images/Rectangle-23.png')} style={{ width:'100%',height:218 }} />
                    <Text style={{ paddingTop:22,fontFamily:'Gotham-Medium',fontSize:14,color:'#272727',lineHeight:21 }}>Lorem ipsum dolor sit amet, consectetur adipi scing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ulla mco laboris nisi ut aliquip ex ea commodo consequat.</Text>
                    <Text style={{ paddingTop:28,fontFamily:'Gotham-Medium',fontSize:14,color:'#272727',lineHeight:21,paddingBottom:99 }}>Duis aute irure dolor in reprehenderit in volup tate velit esse cillum dolore eu fugiat nulla par iatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default About_Student_Voice