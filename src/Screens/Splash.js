import React, { Component } from 'react';
import { View, Image, SafeAreaView, Dimensions, Text, TouchableOpacity, StatusBar } from 'react-native'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import styles from '../style/styles'
import SVGImg from '../Source/SVGImg';
import { connect } from 'react-redux'
class Splash extends Component {
    constructor(props) {
        super(props)
    }
    check_navigation() {
        if (this.props.rememberMe == undefined) {
            this.props.navigation.replace('Welcome')
        }
        if (this.props.isLoggedIn == false && this.props.rememberMe == false) {
            this.props.navigation.replace('Login')
        }
        else if (this.props.rememberMe == true && this.props.isLoggedIn == false) {
            this.props.navigation.replace('Login')
        }
        else if (this.props.rememberMe == true && this.props.isLoggedIn == true) {
            this.props.navigation.replace('tabs')
        }
        else if (this.props.isLoggedIn == true && this.props.rememberMe == false) {
            this.props.navigation.replace('Welcome')
        }
    }
    componentDidMount() {
        if (this.props.isLoggedIn == true) {
            setTimeout(() => {
                if (this.props.rememberMe == undefined) {
                    this.props.navigation.replace('Welcome')
                }
                if (this.props.isLoggedIn == false && this.props.rememberMe == false) {
                    this.props.navigation.replace('Login')
                }
                else if (this.props.rememberMe == true && this.props.isLoggedIn == false) {
                    this.props.navigation.replace('Login')
                }
                else if (this.props.rememberMe == true && this.props.isLoggedIn == true) {
                    this.props.navigation.replace('tabs')
                }
                else if (this.props.isLoggedIn == true && this.props.rememberMe == false) {
                    this.props.navigation.replace('Welcome')
                }
            }, 1500)
        }
    }
    render() {
        return (
            <View style={[styles.container, { backgroundColor: '#00AFF0' }]}>
                <StatusBar backgroundColor="#00AFF0" barStyle={'dark-content'} />

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <Image source={require('../images/splash_logo.png')} resizeMode="contain" />
                </View>
                <View style={{ alignItems: 'center' }}>
                    {
                        this.props.isLoggedIn == false ?
                            <View style={{ position: 'absolute', bottom: 50, width: '90%' }}>
                                <TouchableOpacity onPress={() => { this.check_navigation() }} activeOpacity={0.6}>
                                    <View style={{ alignItems: 'center', height: 47, justifyContent: 'center', backgroundColor: '#FFFFFF', borderRadius: 50 }}>
                                        <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>Sign in</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            : null
                    }
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => {

    const isLoggedIn = state.LoginData.isLoggedIn;
    const rememberMe = state.LoginData.rememberMe;
    return { isLoggedIn, rememberMe }
}

export default connect(mapStateToProps, null)(Splash)