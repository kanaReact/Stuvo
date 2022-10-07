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
import Spinner from '../Components/Spinner';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      paramsObj: null,
      loading: false,
      schoolId: null,
    };
  }
  componentDidMount() {
    const data = this.props.route.params;
    console.log(data);
    this.setState({
      userData: data.data,
      paramsObj: data.webViewObj,
      schoolId: data.schoolId,
    });
  }
  setUserCall(id) {
    alert('set');
    this.setState({loading: true});
    const formData = new FormData();
    formData.append('emailaddress', this.state.paramsObj.emailaddress);
    formData.append('user_id', id);
    formData.append('school_id', this.state.schoolId);

    let url = constant.BASE_URL + 'set-user';
    axios
      .post(url, formData)
      .then(response => {
        this.setState({loading: false});

        if (response.data.status == 1) {
          this.props.loginSuccess(response.data);
          this.props.navigation.replace('Welcome');
        }
      })
      .catch(error => console.log('error set user', error));
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.viewFlex}>
          <View style={styles.headerView}>
            <SVGImg.HeaderLogo />
          </View>
          <Spinner visible={this.state.loading} />

          <FlatList
            data={this.state.userData}
            style={styles.userList}
            keyExtractor={index => index}
            ListEmptyComponent={() => (
              <View style={styles.emptyConatiner}>
                <Text style={styles.noDataText}>No Data</Text>
              </View>
            )}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  this.setUserCall(item.id);
                }}
                style={styles.userContainer}
                activeOpacity={0.7}>
                <Text style={styles.userNameStyle}>{item.name}</Text>
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
