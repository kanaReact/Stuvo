import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styles from '../../style/styles';
import Header from '../../Components/Header';
import SVGImg from '../../Source/SVGImg';
import {WebView} from 'react-native-webview';
import constant from '../../Redux/config/constant';
import Spinner from '../../Components/Spinner';
class About_Student_Voice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }
  hideSpinner() {
    this.setState({visible: false});
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={[styles.headerMain, {marginTop: 20, marginHorizontal: 16}]}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 16,
            }}>
            <SVGImg.HeaderLogo />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              activeOpacity={0.6}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Gotham-Medium',
                  color: '#00AFF0',
                }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <WebView
          onLoad={() => {
            this.hideSpinner();
          }}
          source={{uri: constant.BASE_URL + 'about_student_voice'}}
        />
        <Spinner visible={this.state.visible} />
      </SafeAreaView>
    );
  }
}

export default About_Student_Voice;
