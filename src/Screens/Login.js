import React from 'react';
import { SafeAreaView, Image, TextInput, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import styles from '../style/styles';
import SVGImg from '../Source/SVGImg';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import { login,  } from '../Redux/Action'
import Spinner from '../Components/Spinner';
import Toast from 'react-native-tiny-toast';
import { connect } from 'react-redux'
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
            dropdownDisable: false
        }
    }
    componentWillMount() {
        this.getSchoolList()
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ loading: false })
        if (nextProps.status == 1) {
            this.props.navigation.replace('tabs')
        }
        else {
            Toast.show(nextProps.errormsg, {
                position: Toast.position.BOTTOM,
                containerStyle: { backgroundColor: 'black' },
                textStyle: { color: 'white' },
            })
        }

    }
    validate() {
        if (this.state.showOTP == false) {
            if (this.state.email == "") {
                this.setState({ emailError: 'Please enter email' })
            }
            else if (this.state.domainValue == "") {
                this.setState({ emailError: 'Please select domain' })
            }
            else {
                this.call_login_API()
            }
        }
        else {
            if (this.state.email == '' && this.state.password == '') {
                this.setState({ emailError: 'Please enter email', passwordError: 'Please enter OTP' })
            }
            else if (this.state.email == '') {
                this.setState({ emailError: 'Please enter email' })
            }
            else if (this.state.password == '') {
                this.setState({ passwordError: 'Please enter OTP' })
            }
            else {
                this.setState({ loading: true })
                this.props.login(this.state.id, this.state.password)
            }
        }
    }
    getSchoolList() {
        let url = constant.BASE_URL + 'schoollist'
        axios.get(url).then(responseJson => {
            if (responseJson.data.status == 1) {
                let data = []
                responseJson.data.data[0].School.map((item, index) => {
                    data.push(item.domain)
                })
                this.setState({ schoolList: data })
            }
            else {
                this.setState({ schoolList: [] })
            }
        })
            .catch(error => { dispatch(schoolDataFailed(error)) })
    }
    call_login_API() {
        this.setState({ loading: true })
        let url = constant.BASE_URL + 'LoginWithOTP'
        let data = new URLSearchParams()
        let email = this.state.email + '@' + this.state.domainValue
        data.append('email', email);
        axios.post(url, data, {
            headers: { 'Content-Type': "application/x-www-form-urlencoded" },
        }).then(responseJson => {
            this.setState({ loading: false })
            console.log('response json::', responseJson.data.data)
            if (responseJson.data.status == 1) {
                let id = responseJson.data.data[0].id
                this.setState({ showOTP: true, id: id, editableInput: false, dropdownDisable: true })
            }
            else {
                Toast.show(responseJson.data.message, {
                    position: Toast.position.BOTTOM,
                    containerStyle: { backgroundColor: 'black' },
                    textStyle: { color: 'white' },
                })
            }
        }).catch(error => { this.setState({ loading: false }) })
    }
    render() {
        console.log('check:', this.state.domainValue)
        var val = ''
        return (
            <SafeAreaView style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
                <SVGImg.HeaderLogo />
                <Spinner visible={this.state.loading} />
                <View style={{ paddingTop: 10, width: '100%', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', width: '90%', borderWidth: 0.5, borderColor: 'gray', borderRadius: 30, justifyContent: 'space-between' }}>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                style={{ height: 50, paddingLeft: 15, width: '70%', }}
                                placeholder="Enter Email"
                                value={this.state.email}
                                editable={this.state.editableInput}
                                onChangeText={text => { this.setState({ email: text.trim(), emailError: '' }) }}
                            />
                        </View>
                        <ModalDropdown
                            defaultValue={"Select Domain"}
                            disabled={this.state.dropdownDisable}
                            renderButtonText={() => {
                                return (
                                    <Text style={{ fontFamily: 'Gotham-Medium' }}>@{val}</Text>
                                )
                            }}
                            options={this.state.schoolList}
                            style={{ height: 50, justifyContent: 'center', }}
                            dropdownStyle={{ height: 140 }}
                            onSelect={(value, item) => { this.setState({ domainValue: item, emailError: '' }); val = item }}
                            textStyle={{ paddingRight: 10, fontFamily: 'Gotham-Medium', fontSize: 15 }}
                            dropdownTextStyle={{ fontSize: 15, color: 'black',fontFamily: 'Gotham-Medium', }}
                        />
                    </View>
                    {this.state.emailError != '' ? <Text style={{ paddingLeft: 20, marginTop: 10, fontFamily: 'Gotham-Medium', color: 'red', alignSelf: 'flex-start' }}>{this.state.emailError}</Text> : null}
                    {
                        this.state.showOTP == true ?
                            <TextInput
                                style={styles.textInputPassword}
                                placeholder="Enter OTP"
                                maxLength={4}
                                keyboardType="numeric"
                                value={this.state.password}
                                onChangeText={text => { this.setState({ password: text.trim(), passwordError: '' }) }}
                            />
                            : null
                    }
                    {this.state.passwordError != '' ? <Text style={{ paddingLeft: 20, marginTop: 10, fontFamily: 'Gotham-Medium', color: 'red', alignSelf: 'flex-start' }}>{this.state.passwordError}</Text> : null}
                    <TouchableOpacity style={styles.loginBtn} activeOpacity={0.6} onPress={() => { this.validate() }}>
                        <View >
                            <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#FFFFFF' }}>Log in</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        );
    }
}
const mapStateToProps = (state) => {
    const loginData = state.LoginData;
    const status = state.LoginData.status;
    const errormsg = state.LoginData.errormsg;
    const isLoggedIn = state.LoginData.isLoggedIn;
  
    return { loginData, status, errormsg, isLoggedIn,  }
}


export default connect(mapStateToProps, { login,  })(Login)