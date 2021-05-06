import React, { Component } from 'react';
import { View, Image, SafeAreaView, ImageBackground, Dimensions, Text, TouchableOpacity,StatusBar } from 'react-native'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import styles from '../style/styles'
export default class DrawerContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: true,
            activeTab1: true,
            activeTab2: true
        }
    }
    changeTab(i) {
        if (i == 1) {
            this.props.navigation.navigate('TabMain')
            this.setState({ activeTab: false, activeTab1: true, activeTab2: true })
        } else if (i == 2) {
            this.props.navigation.navigate('Guidance')
            this.setState({ activeTab1: false, activeTab2: true, activeTab: true })
        } else if (i == 3) {
            this.props.navigation.navigate('TechnicalSupport')
            this.setState({ activeTab1: true, activeTab2: false, activeTab: true })
        }
    }
    
    render() {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: '#000000', }]}>
                <StatusBar backgroundColor="#FFF" barStyle="dark-content"  />
                <View style={{ flexDirection: 'row', paddingTop: 50 }}>
                    <TouchableOpacity onPress={() => { this.props.navigation.closeDrawer() }}>
                        <View style={{ justifyContent: 'center', flex: 1, flexDirection: 'column', marginLeft: 26 }}>
                            <Image source={require('../images/sideMenu/Close_icon.png')} style={{ width: 13, height: 13, }} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column', width: '100%', paddingLeft: width / 5, paddingTop: 10 }}>
                        <Image source={require('../images/sideMenu/Menu_ligo_white.png')} style={{ width: 128, height: 31 }} />
                    </View>
                </View>

                <View style={{ paddingTop: 45 }}>
                    <TouchableOpacity onPress={() => this.changeTab(1)}>
                        <View style={this.state.activeTab == false ? styles.activeDrawer : styles.inActiveDrawer}>
                            <Image source={require('../images/sideMenu/home.png')} style={{ width: 18, height: 18, marginLeft: 14 }} />
                            <Text style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'Gotham-Medium', paddingLeft: 15 }}>Home</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changeTab(2)}>
                        <View style={this.state.activeTab1 == false ? styles.activeDrawer : styles.inActiveDrawer}>
                            <Image source={require('../images/sideMenu/Guidance.png')} style={{ width: 18, height: 18, marginLeft: 14 }} />
                            <Text style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'Gotham-Medium', paddingLeft: 15 }}>Guidance</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changeTab(3)}>
                        <View style={this.state.activeTab2 == false ? styles.activeDrawer : styles.inActiveDrawer}>
                            <Image source={require('../images/sideMenu/Technical_Support.png')} style={{ width: 18, height: 18, marginLeft: 14 }} />
                            <Text style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'Gotham-Medium', paddingLeft: 15 }}>Technical Support</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', marginBottom: 50 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Splash')}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../images/sideMenu/Log_out.png')} style={{ width: 18, height: 18, marginLeft: 26 }} />
                            <Text style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'Gotham-Medium', paddingLeft: 15 }}>Log Out</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}