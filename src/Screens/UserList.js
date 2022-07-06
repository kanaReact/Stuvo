import {Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../style/styles';
import SVGImg from '../Source/SVGImg';
import {FlatList} from 'react-native-gesture-handler';
import axios from 'axios';
import constant from '../Redux/config/constant';
import {loginSuccess} from '../Redux/Action';
import {connect} from 'react-redux';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      paramsObj: null,
    };
  }
  componentDidMount() {
    const data = this.props.route.params;
    console.log(data);
    this.setState({userData: data.data, paramsObj: data.webViewObj});
  }
  setUserCall(id) {
    const formData = new FormData();
    formData.append('emailaddress', this.state.paramsObj.emailaddress);
    formData.append('user_id', id);
    let url = constant.BASE_URL + 'set-user';
    axios
      .post(url, formData)
      .then(response => {
        if (response.data.status == 1) {
          this.props.loginSuccess(response.data);
          this.props.navigation.replace('Welcome');
        }
      })
      .catch(error => console.log('error', error));
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.viewFlex}>
          <View style={styles.headerView}>
            <SVGImg.HeaderLogo />
          </View>
          <FlatList
            data={this.state.userData}
            style={{marginTop: 18}}
            keyExtractor={index => index}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  this.setUserCall(item.id);
                }}
                style={{
                  borderBottomWidth: 0.5,
                  paddingVertical: 18,
                  paddingHorizontal: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomColor: '#E5E5E5',
                }}
                activeOpacity={0.7}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    fontFamily: 'Poppins-Bold',
                    flex: 1,
                  }}>
                  {item.name}
                </Text>
                <SVGImg.Arrow />
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  const isLoggedIn = state.LoginData.isLoggedIn;
  const rememberMe = state.LoginData.rememberMe;
  return {isLoggedIn, rememberMe};
};
export default connect(mapStateToProps, {loginSuccess})(UserList);
