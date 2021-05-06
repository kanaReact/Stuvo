import React, { Component } from 'react';
import { View, Image, SafeAreaView, Dimensions, Text, TouchableOpacity } from 'react-native'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import styles from '../style/styles'
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
                            <Image source={require('../images/side_menu.png')} style={{ width: 24, height: 24 }} />
                        </TouchableOpacity>
                    }
                </View>
                <View style={[styles.headerMainLogo, { marginRight: 30, flex: 1, justifyContent: 'center' }]}>
                    <Image source={require('../images/HomeLogotopImg.png')} style={{ width: 134, height: 37, resizeMode: 'contain' }} />
                </View>
            </View>
        );
    }
}