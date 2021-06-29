import React, { Component } from 'react';
import { View, Image, SafeAreaView, Dimensions, Text, TouchableOpacity } from 'react-native'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import styles from '../style/styles'
import SVGImg from '../Source/SVGImg';
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btn: true
        }
    }
    render() {
        return (
            <View style={[styles.headerMain, { marginTop: 20 }]}>
                <View style={{ marginLeft: 16 }}>
                    {this.props.btn == true ?
                        <TouchableOpacity onPress={this.props.leftPress} activeOpacity={0.6}>
                            <Text style={[{ fontSize: 14, color: '#272727', fontFamily: 'Gotham-Medium' },this.props.lefttxt]}>Back</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={this.props.leftImagePress} activeOpacity={0.6}>
                            <SVGImg.SideBar />
                        </TouchableOpacity>
                    }
                </View>
                <View style={[styles.headerMainLogo, { marginRight: 30, flex: 1, justifyContent: 'center' }]}>
                    <SVGImg.HeaderLogo />
                </View>
            </View>
        );
    }
}