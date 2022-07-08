import axios from 'axios';
import moment from 'moment';
import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import DatePicker from '../Components/DatePicker';
import Spinner from '../Components/Spinner';
import constant from '../Redux/config/constant';
import SVGImg from '../Source/SVGImg';
import styles from '../style/styles';
import {loginSuccess} from '../Redux/Action';
import {connect} from 'react-redux';
class SchoolList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schoolList: [],
      loading: false,
      filterdData: [],
      modalVisible: false,
      schoolId: null,
      selectYear: null,
      years: null,
      paramsObj: null,
      isLoading: false,
      dateVisible: false,
    };
  }
  componentDidMount() {
    this.getSchoolListApi();
  }
  componentWillMount() {
    const items = this.props.route.params.items;
    this.setState({
      paramsObj: items,
    });
  }
  getSchoolListApi() {
    this.setState({loading: true});
    let url = constant.BASE_URL + 'schoollist';
    axios
      .get(url)
      .then(response => {
        this.setState({
          schoolList: response.data.data[0].School,
          loading: false,
          filterdData: response.data.data[0].School,
        });
      })
      .catch(err => console.log('error', err));
  }
  searchSchool(text) {
    const filerData = this.state.filterdData.filter(item => {
      const itemData = `${item.name}`;
      const textData = text.toLowerCase();
      return itemData.toLowerCase().includes(textData);
    });

    this.setState({schoolList: filerData});
  }

  listEmpty() {
    return (
      <View style={styles.emptyConatiner}>
        <Text style={styles.noDataText}>No Data</Text>
      </View>
    );
  }

  userListCall() {
    this.setState({isLoading: true});
    const formData = new FormData();
    console.log('schoolid', this.state.schoolId);

    formData.append('school_id', this.state.schoolId);
    formData.append('name', this.state.paramsObj.displayname);
    formData.append('date_of_year', moment(this.state.years).format('YYYY'));
    console.log(formData);
    let url = constant.BASE_URL + 'user-list';
    axios
      .post(url, formData)
      .then(response => {
        this.setState({isLoading: false});
        if (response.data.data.length == 1) {
          this.setState({modalVisible: false});
          this.setUserCall(response.data.data[0].id);
        } else {
          this.setState({modalVisible: false});
          this.props.navigation.navigate('UserList', {
            data: response.data.data,
            webViewObj: this.state.paramsObj,
          });
        }
      })
      .catch(error => console.log('error', error));
  }
  setUserCall(id) {
    this.setState({loading: true});
    const formData = new FormData();
    formData.append('emailaddress', this.state.paramsObj.emailaddress);
    formData.append('user_id', id);
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
      .catch(error => console.log('error', error));
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <Spinner visible={this.state.loading} />
        <View style={styles.headerView}>
          <SVGImg.HeaderLogo />
        </View>
        <View style={styles.searchContainer}>
          <SVGImg.Search />
          <TextInput
            style={styles.inputStyle}
            placeholder="Search"
            onChangeText={text => this.searchSchool(text)}
          />
        </View>

        <FlatList
          data={this.state.schoolList}
          style={styles.listStyle}
          contentContainerStyle={styles.contentcontainer}
          showsVerticalScrollIndicator={false}
          keyExtractor={index => index}
          ListEmptyComponent={() => (
            <View style={styles.emptyConatiner}>
              <Text style={styles.noDataText}>No Data</Text>
            </View>
          )}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              style={styles.itemContainer}
              activeOpacity={0.7}
              onPress={() => {
                this.setState({modalVisible: true, schoolId: item.id});
              }}>
              <Text style={styles.schoolName}>{item.name}</Text>
              <Text style={styles.schoolAddress}>{item.address}</Text>
            </TouchableOpacity>
          )}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible: false, dateVisible: true});
          }}>
          <View style={styles.containerModal}>
            <View style={styles.mainContainer}>
              <KeyboardAvoidingView style={styles.keyboardStyle}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() =>
                    this.setState({modalVisible: false, dateVisible: false})
                  }>
                  <SVGImg.Close fill={'#000'} />
                </TouchableOpacity>
                <Text style={styles.displayname}>
                  Name: {this.state.paramsObj.displayname}
                </Text>

                <TouchableOpacity
                  style={styles.modalInput}
                  activeOpacity={0.7}
                  onPress={() => this.setState({dateVisible: true})}>
                  <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium'}}>
                    {this.state.years
                      ? moment(this.state.years).format('MM-DD-YYYY')
                      : 'Enter DOB'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.submitBtn}
                  activeOpacity={0.7}
                  onPress={() => this.userListCall()}>
                  {!this.state.isLoading ? (
                    <Text style={styles.modalSubmitbtn}>Submit</Text>
                  ) : (
                    <ActivityIndicator size={'small'} color={'#fff'} />
                  )}
                </TouchableOpacity>
                <DatePicker
                  show={this.state.dateVisible}
                  date={new Date()}
                  mode={'date'}
                  maximumDate={new Date()}
                  onClick={date => {
                    this.setState({years: date, dateVisible: false});
                  }}
                  onCancelClick={() => {
                    this.setState({dateVisible: false});
                  }}
                />
              </KeyboardAvoidingView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  const isLoggedIn = state.LoginData.isLoggedIn;
  const rememberMe = state.LoginData.rememberMe;
  return {isLoggedIn, rememberMe};
};
export default connect(mapStateToProps, {loginSuccess})(SchoolList);
