import React from 'react';
import { SafeAreaView, Image, TextInput, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import styles from '../style/styles';
import SVGImg from '../Source/SVGImg';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import { login, } from '../Redux/Action'
import Spinner from '../Components/Spinner';
import Toast from 'react-native-tiny-toast';
import { connect } from 'react-redux'
import constant from '../Redux/config/constant';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';
import Header from '../Components/Header';
import OtpInputs from 'react-native-otp-inputs';
class VerifyOTP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: '',
            loading: false,
            otpError: '',
            showOTP: false,
            id: '',
            schoolList: [],
            domainValue: '',
            editableInput: true,
            dropdownDisable: false,
            counter: 59,
            showResend: false
        }
    }
    componentDidMount() {
        this.startTimer()

    }
    componentWillReceiveProps(nextProps) {
        this.setState({ loading: false })
        if (nextProps.status == 1) {
            clearInterval(this.interval)
            this.props.navigation.replace('Welcome')
        }
        else {
            Toast.show(nextProps.errormsg, {
                position: Toast.position.BOTTOM,
                containerStyle: { backgroundColor: 'black' },
                textStyle: { color: 'white' },
            })
        }

    }
    startTimer() {
        this.interval = setInterval(() => {
            this.setState({ counter: this.state.counter - 1 }, () => {
                if (this.state.counter == 0) {
                    clearInterval(this.interval);
                    this.setState({ counter: 59, showResend: true })
                }
            })
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    validate() {

        if (this.state.otp == "") {
            this.setState({ otpError: 'Please enter otp' })
        }
        else {
            this.setState({ loading: true })
            const { id } = this.props.route.params
            this.props.login(id, this.state.otp)
        }

    }
    call_resend_OTP(id) {
        this.setState({ loading: true })
        let url = constant.BASE_URL + 'resend_otp'
        let data = new URLSearchParams()
        data.append('id', id)
        axios.post(url, data, {
            headers: { 'Content-Type': "application/x-www-form-urlencoded" },
        }).then(responseJson => {
            this.setState({ loading: false, showResend: false, })
            console.log('res::', responseJson)
            if (responseJson.data.status == 1) {
                Toast.show('OTP resent successfully', {
                    position: Toast.position.BOTTOM,
                    containerStyle: { backgroundColor: 'black' },
                    textStyle: { color: 'white' },
                })
                this.startTimer()
            }
        }).catch(error => {
            this.setState({ loading: false })
        })
    }
    render() {
        const { id } = this.props.route.params

        return (
            <SafeAreaView style={[styles.container, { alignItems: 'center', }]}>
                <View style={{ padding: 15, width: "100%" }}>
                    <Header lefttxt={{ color: '#919191' }} btn={true} leftPress={() => this.props.navigation.goBack()} />
                </View>

                <Spinner visible={this.state.loading} />
                <View style={styles.loginView}>
                    <View style={styles.signinLabelView}>
                        <Text style={styles.signinLabel}>Verification</Text>
                    </View>
                    <View style={styles.signinLabelView}>
                        <Text style={styles.signinNotelabel}>Please enter the 6-Digit Verification Code we sent to your email.</Text>
                    </View>
                    <View style={styles.signinLabelView}>
                        <Text style={[styles.emailAddressLabel, { color: "black" }]}>Enter code</Text>
                    </View>
                    <View style={{ width: '100%', height: 50, alignSelf: "center" }}>
                        <OtpInputs
                            numberOfInputs={6}
                            inputStyles={{
                                borderRadius: 10,
                                textAlign: "center",
                                fontSize: 16,
                                width: 50,
                                height: 50,
                                justifyContent: "center",
                                backgroundColor: "#F3F3F3",
                                color: 'black'
                            }}
                            handleChange={(code) => this.setState({ otp: code, otpError: '' })}
                            selectTextOnFocus={false}
                            returnKeyType="done"
                        />
                        {this.state.otpError != '' ? <Text style={{ marginTop: 10, fontFamily: 'Gotham-Medium', color: 'red', alignSelf: 'flex-start' }}>{this.state.otpError}</Text> : null}

                    </View>
                    <View style={{ height: 60, width: "100%", alignItems: "center", justifyContent: "center", marginTop: 35 }}>
                        <Text style={{ fontFamily: "Gotham-Bold" }}>{this.state.counter < 10 ? '0:0' + this.state.counter : '0:' + this.state.counter}</Text>
                        {
                            this.state.showResend == true ?
                                <TouchableOpacity onPress={() => { this.call_resend_OTP(id) }}>
                                    <Text style={{ fontFamily: "Poppins-Regular", color: '#00AFF0', textDecorationLine: "underline", padding: 10 }}>Resend OTP</Text>
                                </TouchableOpacity>
                                : null
                        }
                    </View>
                    <TouchableOpacity style={styles.loginBtn} activeOpacity={0.6} onPress={() => { this.validate() }}>
                        <View >
                            <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#FFFFFF' }}>Continue</Text>
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

    return { loginData, status, errormsg, isLoggedIn, }
}


export default connect(mapStateToProps, { login, })(VerifyOTP)