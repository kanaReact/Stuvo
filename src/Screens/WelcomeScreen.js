import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import styles from '../style/styles';
import {connect} from 'react-redux';
import {rememberMe, removerememberMe, handle_welcome} from '../Redux/Action';
import Spinner from '../Components/Spinner';
class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btn: this.props.rememberme == true ? false : true,
      loading: false,
      welcomeData: [],
    };
  }
  componentWillMount() {
    this.setState({loading: true});
    this.props.handle_welcome(this.props.AUTH);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({loading: false});
    if (nextProps.welcomeData != this.state.welcomeData) {
      this.setState({welcomeData: nextProps.welcomeData});
    }
  }
  navigate() {
    if (this.props.isLoggedIn == true) {
      this.props.navigation.replace('tabs');
    } else {
      this.props.navigation.navigate('Login');
    }
  }
  check_rememberme() {
    if (this.state.btn == false) {
      this.props.rememberMe();
    } else {
      this.props.removerememberMe();
    }
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner visible={this.state.loading} />
        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
        <Text
          style={{
            marginTop: 30,
            fontSize: 20,
            fontFamily: 'Gotham-Medium',
            color: '#00AFF0',
            marginLeft: 24,
            marginBottom: 12,
          }}>
          Welcome!
        </Text>
        <Text
          style={{
            marginTop: 20,
            fontSize: 14,
            marginBottom: 12,
            fontFamily: 'Gotham-Medium',
            color: '#272727',
            lineHeight: 20,
            marginHorizontal: 24,
          }}>
          {this.state.welcomeData.description}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 24,
            marginTop: 30,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({btn: !this.state.btn}, () => {
                this.check_rememberme();
              });
            }}>
            {this.state.btn ? (
              <View
                style={{
                  height: 16,
                  width: 16,
                  borderWidth: 2,
                  borderColor: '#00AFF0',
                }}
              />
            ) : (
              <View
                style={{
                  height: 16,
                  width: 16,
                  backgroundColor: '#00AFF0',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{
                    height: 12,
                    width: 10,
                    resizeMode: 'contain',
                    tintColor: 'white',
                  }}
                  source={require('../images/Checkbox.png')}
                />
              </View>
            )}
          </TouchableOpacity>
          <Text
            onPress={() => {
              this.setState({btn: !this.state.btn}, () => {
                this.check_rememberme();
              });
            }}
            style={{
              fontSize: 14,
              fontFamily: 'Gotham-Medium',
              color: '#272727',
              marginLeft: 16,
            }}>
            Do not show again
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            marginHorizontal: 24,
            justifyContent: 'flex-end',
            marginBottom: 50,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.navigate();
            }}
            activeOpacity={0.6}>
            <View
              style={{
                alignItems: 'center',
                height: 47,
                justifyContent: 'center',
                backgroundColor: '#00AFF0',
                borderRadius: 50,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Gotham-Medium',
                  color: '#FFFFFF',
                }}>
                Let's begin!
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  const isLoggedIn = state.LoginData.isLoggedIn;
  const rememberme = state.LoginData.rememberMe;
  const welcomeData = state.LoginData.welcomeData;
  const AUTH = state.LoginData.token;
  return {isLoggedIn, rememberme, welcomeData, AUTH};
};

export default connect(mapStateToProps, {
  rememberMe,
  removerememberMe,
  handle_welcome,
})(WelcomeScreen);
