import React from 'react';
import {
  SafeAreaView,
  Image,
  TextInput,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from '../style/styles';
import SVGImg from '../Source/SVGImg';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import {login} from '../Redux/Action';
import Spinner from '../Components/Spinner';
import Toast from 'react-native-tiny-toast';
import {connect} from 'react-redux';
import constant from '../Redux/config/constant';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      emailError: '',
      passwordError: '',
      showOTP: false,
      id: '',
      schoolList: [],
      domainValue: '',
      editableInput: true,
      dropdownDisable: false,
    };
  }
  componentWillMount() {
    this.getSchoolList();
  }

  validate() {
    if (this.state.email == '') {
      this.setState({emailError: 'Please enter email address'});
    } else if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        this.state.email,
      )
    ) {
      this.setState({emailError: 'Please enter valid email address'});
    } else {
      this.call_login_API();
    }
  }
  getSchoolList() {
    let url = constant.BASE_URL + 'schoollist';
    axios
      .get(url)
      .then(responseJson => {
        if (responseJson.data.status == 1) {
          let data = [];
          responseJson.data.data[0].School.map((item, index) => {
            data.push(item.domain);
          });
          this.setState({schoolList: data});
        } else {
          this.setState({schoolList: []});
        }
      })
      .catch(error => {
        // dispatch(schoolDataFailed(error));
      });
  }
  call_login_API() {
    this.setState({loading: true});
    let url = constant.BASE_URL + 'LoginWithOTP';
    let data = new URLSearchParams();
    let email = this.state.email;
    data.append('email', email);
    axios
      .post(url, data, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      })
      .then(responseJson => {
        this.setState({loading: false});

        if (responseJson.data.status == 1) {
          Toast.show('OTP sent successfully', {
            position: Toast.position.BOTTOM,
            containerStyle: {backgroundColor: 'black'},
            textStyle: {color: 'white'},
          });
          let id = responseJson.data.data[0].id;
          this.props.navigation.navigate('VerifyOTP', {id: id});
        } else {
          Toast.show(responseJson.data.message, {
            position: Toast.position.BOTTOM,
            containerStyle: {backgroundColor: 'black'},
            textStyle: {color: 'white'},
          });
        }
      })
      .catch(error => {
        this.setState({loading: false});
        console.log('erro:', error);
      });
  }
  render() {
    var val = '';
    return (
      <SafeAreaView style={[styles.container, {alignItems: 'center'}]}>
        <View style={{padding: 15}}>
          <SVGImg.HeaderLogo />
        </View>

        <Spinner visible={this.state.loading} />
        <View style={styles.loginView}>
          <View style={styles.signinLabelView}>
            <Text style={styles.signinLabel}>Sign in</Text>
          </View>
          <View style={styles.signinLabelView}>
            <Text style={styles.signinNotelabel}>
              Please enter your academy email address below.
            </Text>
          </View>
          <View style={styles.signinLabelView}>
            <Text style={styles.emailAddressLabel}>Email address</Text>
          </View>
          <View style={{width: '100%'}}>
            <View style={styles.textinputemail}>
              <View style={{paddingRight: 10}}>
                <SVGImg.EmailIcon />
              </View>
              <TextInput
                style={{flex: 1}}
                placeholder="Enter email address"
                placeholderTextColor="#919191"
                value={this.state.email}
                onChangeText={text => {
                  this.setState({email: text.trim(), emailError: ''});
                }}
              />
            </View>
          </View>
          {this.state.emailError != '' ? (
            <Text
              style={{
                marginTop: 10,
                fontFamily: 'Gotham-Medium',
                color: 'red',
                alignSelf: 'flex-start',
              }}>
              {this.state.emailError}
            </Text>
          ) : null}

          <TouchableOpacity
            style={styles.loginBtn}
            activeOpacity={0.6}
            onPress={() => {
              this.validate();
            }}>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Gotham-Medium',
                  color: '#FFFFFF',
                }}>
                Continue
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  const loginData = state.LoginData;
  const status = state.LoginData.status;
  const errormsg = state.LoginData.errormsg;
  const isLoggedIn = state.LoginData.isLoggedIn;

  return {loginData, status, errormsg, isLoggedIn};
};

export default connect(mapStateToProps, {login})(Login);
