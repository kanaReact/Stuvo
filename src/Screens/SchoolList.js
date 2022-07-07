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

import Spinner from '../Components/Spinner';

import constant from '../Redux/config/constant';
import SVGImg from '../Source/SVGImg';
import styles from '../style/styles';

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
  // school_id:12
  // name:Abbey Miles
  // date_of_year:2011
  listEmpty() {
    return (
      <View style={styles.emptyConatiner}>
        <Text style={styles.noDataText}>No Data</Text>
      </View>
    );
  }
  validation() {
    const currentYear = moment().get('years');
    let isValidate = true;
    if (!this.state.years) {
      alert('Enter year');
    } else if (this.state.years > currentYear) {
      alert('Future year is not accepted');
    } else {
      this.userListCall();
    }
  }
  userListCall() {
    this.setState({isLoading: true});
    const formData = new FormData();
    console.log(this.state.schoolId);

    formData.append('school_id', this.state.schoolId);
    formData.append('name', this.state.paramsObj.displayname);
    formData.append('date_of_year', this.state.years);
    console.log(formData);
    let url = constant.BASE_URL + 'user-list';
    axios
      .post(url, formData)
      .then(response => {
        this.setState({isLoading: false});

        this.setState({modalVisible: false});
        this.props.navigation.navigate('UserList', {
          data: response.data.data,
          webViewObj: this.state.paramsObj,
        });
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
            this.setState({modalVisible: false});
          }}>
          <View style={styles.containerModal}>
            <View style={styles.mainContainer}>
              <KeyboardAvoidingView style={{flexGrow: 1}}>
                <TouchableOpacity
                  style={{
                    padding: 10,

                    alignSelf: 'flex-end',
                  }}
                  onPress={() => this.setState({modalVisible: false})}>
                  <SVGImg.Close fill={'#000'} />
                </TouchableOpacity>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 16,
                    fontFamily: 'Poppins-Bold',
                  }}>
                  Name: {this.state.paramsObj.displayname}
                </Text>
                <TextInput
                  placeholder="Enter year"
                  placeholderTextColor={'#000'}
                  style={styles.modalInput}
                  onChangeText={text => this.setState({years: text})}
                  value={this.state.years}
                  keyboardType={'number-pad'}
                  maxLength={4}
                  returnKeyType={'done'}
                />
                <TouchableOpacity
                  style={styles.submitBtn}
                  activeOpacity={0.7}
                  onPress={() => this.validation()}>
                  {!this.state.isLoading ? (
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Gotham-Medium',
                        color: '#fff',
                      }}>
                      Submit
                    </Text>
                  ) : (
                    <ActivityIndicator size={'large'} />
                  )}
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}
export default SchoolList;
