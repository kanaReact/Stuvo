import React, { Component } from 'react';
import { View, Image, SafeAreaView, ImageBackground, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import styles from '../style/styles'
import SVGImg from '../Source/SVGImg';
export default class DrawerContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: false,
            activeTab1: true,
            activeTab2: true
        }
    }
    changeTab(i) {
        if (i == 1) {
            this.props.navigation.navigate('Question')
            this.setState({ activeTab: false, activeTab1: true, activeTab2: true })
            this.props.navigation.closeDrawer()
        } else if (i == 2) {
            this.props.navigation.navigate('Guidance')
            this.setState({ activeTab1: false, activeTab2: true, activeTab: true })
            this.props.navigation.closeDrawer()
        } else if (i == 3) {
            this.props.navigation.navigate('TechnicalSupport')
            this.setState({ activeTab1: true, activeTab2: false, activeTab: true })
            this.props.navigation.closeDrawer()
        }
        else if (i == 4) {
            this.props.navigation.navigate('MyProfile')
            this.props.navigation.closeDrawer()
        }
        else if (i == 5) {
            this.props.navigation.navigate('About_Student_Voice')
            this.props.navigation.closeDrawer()
        }
    }

    render() {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: '#000000', }]}>
                <ScrollView contentContainerStyle={{ paddingBottom: height / 2, }}>
                    <View style={{ flexDirection: 'row', paddingTop: 50 }}>
                        <TouchableOpacity onPress={() => { this.props.navigation.closeDrawer() }}>
                            <View style={{ justifyContent: 'center', flex: 1, flexDirection: 'column', marginLeft: 26 }}>
                                <SVGImg.Close />
                            </View>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'column', width: '100%', paddingLeft: width / 5, paddingTop: 10 }}>
                            <SVGImg.SideBarLogo />
                        </View>
                    </View>

                    <View style={{ paddingTop: 45 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Welcome")}>
                            <View style={styles.activeDrawer}>
                                <View style={{ marginLeft: 14 }}>
                                    <SVGImg.HomeIcon />
                                </View>
                                <Text style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'Gotham-Medium', paddingLeft: 15 }}>Home</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.changeTab(4)}>
                            <View style={styles.activeDrawer}>
                                <View style={{ marginLeft: 14 }}>
                                    <SVGImg.Profile />
                                </View>
                                <Text style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'Gotham-Medium', paddingLeft: 15 }}>My Profile</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.changeTab(5)}>
                            <View style={styles.activeDrawer}>
                                <View style={{ marginLeft: 14 }}>
                                    <SVGImg.StudentVoice />
                                </View>
                                <Text style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'Gotham-Medium', paddingLeft: 15 }}>About Student Voice</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.changeTab(2)}>
                            <View style={styles.activeDrawer}>
                                <View style={{ marginLeft: 14 }}>
                                    <SVGImg.Guidance />
                                </View>
                                <Text style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'Gotham-Medium', paddingLeft: 15 }}>Guidance</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.changeTab(3)}>
                            <View style={styles.activeDrawer}>
                                <View style={{ marginLeft: 14 }}>
                                    <SVGImg.Technical />
                                </View>
                                <Text style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'Gotham-Medium', paddingLeft: 15 }}>Technical Support</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', marginTop : 200 }}>
                        <TouchableOpacity>
                            <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginLeft: 26 }}>
                                    <SVGImg.LogOut />
                                </View>
                                <Text style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'Gotham-Medium', paddingLeft: 15 }}>Log Out</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}