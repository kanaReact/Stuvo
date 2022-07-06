import React, {Component} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  Dimensions,
  Text,
  TouchableOpacity,
  StatusBar,
  Modal,
  ActivityIndicator,
} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import styles from '../style/styles';
import SVGImg from '../Source/SVGImg';
import {connect, useDispatch} from 'react-redux';
import WebView from 'react-native-webview';
import Header from '../Components/Header';
import Spinner from '../Components/Spinner';
import axios from 'axios';
import {loginSuccess} from '../Redux/Action';
import constant from '../Redux/config/constant';
var url = '';
class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWebview: false,
      visible: true,
      loading: false,
      responseUrl: null,
    };
  }
  check_navigation() {
    if (this.props.rememberMe == undefined) {
      this.props.navigation.replace('Welcome');
    }
    if (this.props.isLoggedIn == false && this.props.rememberMe == false) {
      this.props.navigation.replace('Login');
    } else if (
      this.props.rememberMe == true &&
      this.props.isLoggedIn == false
    ) {
      this.props.navigation.replace('Login');
    } else if (this.props.rememberMe == true && this.props.isLoggedIn == true) {
      this.props.navigation.replace('tabs');
    } else if (
      this.props.isLoggedIn == true &&
      this.props.rememberMe == false
    ) {
      this.props.navigation.replace('Welcome');
    }
  }
  componentDidMount() {
    if (this.props.isLoggedIn == true) {
      setTimeout(() => {
        if (this.props.rememberMe == undefined) {
          this.props.navigation.replace('Welcome');
        }
        if (this.props.isLoggedIn == false && this.props.rememberMe == false) {
          this.props.navigation.replace('Login');
        } else if (
          this.props.rememberMe == true &&
          this.props.isLoggedIn == false
        ) {
          this.props.navigation.replace('Login');
        } else if (
          this.props.rememberMe == true &&
          this.props.isLoggedIn == true
        ) {
          this.props.navigation.replace('tabs');
        } else if (
          this.props.isLoggedIn == true &&
          this.props.rememberMe == false
        ) {
          this.props.navigation.replace('Welcome');
        }
      }, 1500);
    }
  }
  hideSpinner() {
    this.setState({visible: false});
  }
  // componentDidUpdate() {
  //   if (url) {
  //     if (url !== constant.webLink) {
  //       // alert(this.state.responseUrl);
  //       this.webviewOnNavigationStateChange(url);
  //     }
  //   }
  // }
  webviewOnNavigationStateChange(link) {
    let matchParamTwo = link.includes('success.php');
    if (matchParamTwo) {
      let url = link;
      var urlRegex = /[?&]([^=#]+)=([^&#]*)/g,
        params = {},
        match;
      while ((match = urlRegex.exec(url))) {
        params[match[1]] = match[2];
      }
      let newObj = {};
      Object.keys(params).map(item => {
        newObj[item] = decodeURIComponent(params[item] + '').replace(
          /\+/g,
          ' ',
        );
      });
      this.setState({isWebview: false});
      this.loginDetail(newObj);

      console.log('encode12s', newObj);
    }
  }
  callAzureLogout(url) {
    console.log('logout url', url);
    axios
      .get(url)
      .then(res => {
        console.log('Res Azure logout:', res.data);
      })
      .catch(err => {
        console.log('Err:', err);
      });
  }
  loginDetail(dataObj) {
    let url = constant.BASE_URL + 'sso-login-detail';

    // this.setState({loading: true});
    let data = new FormData();
    data.append('emailaddress', dataObj.emailaddress);
    data.append('Logouturl', dataObj.Logouturl);
    data.append('authnmethodsreferences', dataObj.Logouturl);
    data.append('displayname', dataObj.Logouturl);
    data.append('givenname', dataObj.Logouturl);
    data.append('identityprovider', dataObj.Logouturl);
    data.append('name', dataObj.Logouturl);
    data.append('objectidentifier', dataObj.Logouturl);
    data.append('surname', dataObj.Logouturl);
    data.append('tenantid', dataObj.tenantid);
    console.log('Data:', dataObj);
    axios
      .post(url, data, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      })
      .then(responseJson => {
        // this.setState({loading: false});

        console.log('res', responseJson);
        if (responseJson.data.status == 1) {
          this.props.loginSuccess(responseJson.data);
          this.callAzureLogout(dataObj.Logouturl);
          this.props.navigation.replace('Welcome');
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  }
  _bridge(event) {
    console.log('Event:', event);
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: '#00AFF0'}]}>
        <StatusBar backgroundColor="#00AFF0" barStyle={'dark-content'} />
        <Spinner visible={this.state.loading} />

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../images/splash_logo.png')}
            resizeMode="contain"
          />
        </View>
        <View style={{alignItems: 'center'}}>
          {this.props.isLoggedIn == false ? (
            <View style={{position: 'absolute', bottom: 50, width: '90%'}}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({isWebview: true});
                }}
                activeOpacity={0.6}>
                <View
                  style={{
                    alignItems: 'center',
                    height: 47,
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 50,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Gotham-Medium',
                      color: '#00AFF0',
                    }}>
                    Sign in
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
          <Modal visible={this.state.isWebview}>
            <SafeAreaView style={{flex: 1}}>
              <StatusBar backgroundColor={'#fff'} />
              <View
                style={{
                  height: 40,
                  backgroundColor: '#fff',
                  width: '100%',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,

                  elevation: 4,
                }}>
                <TouchableOpacity
                  style={{padding: 10}}
                  onPress={() =>
                    this.setState({isWebview: false, visible: true})
                  }>
                  <SVGImg.Close fill={'#000'} />
                </TouchableOpacity>
              </View>
              <Spinner visible={this.state.visible} />
              <WebView
                onLoad={() => {
                  this.hideSpinner();
                }}
                style={{marginTop: 5}}
                onNavigationStateChange={webviewState => {
                  console.log('web:', webviewState);
                  this.webviewOnNavigationStateChange(webviewState?.url);
                }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                // injectedJavaScript={this.state.cookie}
                startInLoadingState={false}
                cacheMode="LOAD_NO_CACHE"
                cacheEnabled={false}
                source={{uri: constant.webLink}}
              />
            </SafeAreaView>
          </Modal>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  const isLoggedIn = state.LoginData.isLoggedIn;
  const rememberMe = state.LoginData.rememberMe;
  return {isLoggedIn, rememberMe};
};

export default connect(mapStateToProps, {loginSuccess})(Splash);
