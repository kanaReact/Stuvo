import React, { Component } from 'react';
import { View, Image, SafeAreaView, ImageBackground, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import styles from '../style/styles'
import SVGImg from '../Source/SVGImg';
import { logout } from '../Redux/Action'
import { connect } from 'react-redux';
import constant from '../Redux/config/constant';
import axios from 'axios';
import Spinner from './Spinner';
class DrawerContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: false,
            activeTab1: true,
            activeTab2: true,
            loading: false
        }
    }
    call_logout_API() {
        this.setState({ loading: true })
        let url = constant.BASE_URL + 'logout';
        axios({
            url: url,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.props.AUTH
            }
        }).then(responseJson => {
            this.setState({ loading: false })
            this.props.navigation.replace('Login')
        })
    }
    changeTab(i) {
        if (i == 1) {
            this.props.navigation.navigate('Question')
            this.props.navigation.closeDrawer()
        } else if (i == 2) {
            this.props.navigation.navigate('Guidance')
            this.props.navigation.closeDrawer()
        } else if (i == 3) {
            this.props.navigation.navigate('TechnicalSupport')
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
                <Spinner visible={this.state.loading} />
                <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
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
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', marginTop: 200 }}>
                        <TouchableOpacity onPress={() => { this.props.logout(); this.call_logout_API() }}>
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
const mapStateToProps = (state) => {
    const AUTH = state.LoginData.token
    return { AUTH }
}
export default connect(mapStateToProps, { logout })(DrawerContainer)