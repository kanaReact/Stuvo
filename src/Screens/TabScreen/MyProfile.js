import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, SafeAreaView, TextInput, ScrollView, Keyboard } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'
import SVGImg from '../../Source/SVGImg'
import { connect } from 'react-redux'
import { userDetail } from '../../Redux/Action'
import Spinner from '../../Components/Spinner'
import axios from 'axios'
import constant from '../../Redux/config/constant'
import Toast from 'react-native-tiny-toast'
class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdetailData: [],
            loading: false,
            name: '',
            age: '',
            mobile: '',
            editLabel: 'Edit',
            nameEdit: false,
            ageEdit: false,
            mobileEdit: false
        }
    }
    componentWillMount() {
        this.setState({ loading: true })
        this.props.userDetail(this.props.AUTH)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ loading: false })
        console.log('nextProps:', nextProps.userdetailData.age)
        if (nextProps.userdetailData != this.state.userdetailData) {
            this.setState({
                userdetailData: nextProps.userdetailData,
                name: nextProps.userdetailData.name,
                age: nextProps.userdetailData.age != null ? nextProps.userdetailData.age.toString() : '',
                mobile: nextProps.userdetailData.mobile != null ? nextProps.userdetailData.mobile.toString() : ''
            })
        }
    }
    call_update_API(name, age, mobile) {
        this.setState({ loading: true })
        let url = constant.BASE_URL + 'profile_update'
        let data = new URLSearchParams();
        data.append('name', name);
        data.append('age', age);
        data.append('mobile', mobile);
        axios.post(url, data, {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                "Authorization": "Bearer " + this.props.AUTH
            },
        }).then(responseJson => {
            this.setState({ loading: false })
            if (responseJson.data.status == 1) {
                this.setState({ editLabel: "Edit", nameEdit: false, ageEdit: false, mobileEdit: false })
                Toast.show('Profile Updated Successfully !!', {
                    position: Toast.position.BOTTOM,
                    containerStyle: { backgroundColor: 'black' },
                    textStyle: { color: 'white' },
                })
            }
            else {
                Toast.show(responseJson.data.message, {
                    position: Toast.position.BOTTOM,
                    containerStyle: { backgroundColor: 'black' },
                    textStyle: { color: 'white' },
                })
            }
        }).catch((error) => { this.setState({ loading: true }); })
    }
    editOption() {
        if (this.state.editLabel == "Edit") {
            this.setState({
                editLabel: "Update",
                nameEdit: true,
                ageEdit: true,
                mobileEdit: true
            })
        }
        else {
            Keyboard.dismiss()
            if (this.state.name == '') {
                Toast.show('Please enter name', {
                    position: Toast.position.BOTTOM,
                    containerStyle: { backgroundColor: 'black' },
                    textStyle: { color: 'white' },
                })
            }
            else if (this.state.mobile == '') {
                Toast.show('Please enter contact number', {
                    position: Toast.position.BOTTOM,
                    containerStyle: { backgroundColor: 'black' },
                    textStyle: { color: 'white' },
                })
            }
            else if (this.state.age == '0') {
                Toast.show('Please enter valid age', {
                    position: Toast.position.BOTTOM,
                    containerStyle: { backgroundColor: 'black' },
                    textStyle: { color: 'white' },
                })
            }
            else if (this.state.mobile.length != 10) {
                Toast.show('Please enter valid number', {
                    position: Toast.position.BOTTOM,
                    containerStyle: { backgroundColor: 'black' },
                    textStyle: { color: 'white' },
                })
            }
            else {
                this.call_update_API(this.state.name, this.state.age, this.state.mobile)
            }

        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Spinner visible={this.state.loading} />
                <View style={[styles.headerMain, { marginTop: 20, marginHorizontal: 16 }]}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} activeOpacity={0.6}>
                        <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: 'gray' }}>Back</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 16 }}>
                        <SVGImg.HeaderLogo />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => { this.editOption() }}>
                            <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>{this.state.editLabel}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 12 }}>My Profile</Text>
                    <View style={{ paddingTop: 30 }}>
                        <View style={styles.myProfileView}>

                            <Text style={styles.myProfileTxt}>Name</Text>


                            <TextInput autoFocus={this.state.nameEdit == true ? true : false} editable={this.state.nameEdit} onChangeText={(text) => { this.setState({ name: text.trimStart() }) }} value={this.state.name} style={{ height: 50, textAlign: "right", color: '#222222', flex: 1 }} />

                        </View>

                        <View style={styles.myProfileView}>
                            <View>
                                <Text style={styles.myProfileTxt}>School</Text>
                            </View>
                            <View>
                                {this.state.userdetailData.School != undefined ? <Text style={styles.myProfileText}>{this.state.userdetailData.School.name}</Text> : null}

                            </View>
                        </View>



                        <View style={styles.myProfileView}>
                            <Text style={styles.myProfileTxt}>Age</Text>
                            <TextInput keyboardType="number-pad" maxLength={2} editable={this.state.ageEdit} onChangeText={(text) => { this.setState({ age: text.trim() }) }} value={this.state.age} style={{ height: 50, textAlign: "right", color: '#222222', flex: 1 }} />
                        </View>

                        <View style={styles.myProfileView}>
                            <Text style={styles.myProfileTxt}>Email</Text>
                            <Text style={styles.myProfileText}>{this.state.userdetailData.email}</Text>
                        </View>

                        <View style={styles.myProfileView}>
                            <Text style={styles.myProfileTxt}>Contact number</Text>
                            <TextInput keyboardType="phone-pad" maxLength={10} editable={this.state.mobileEdit} onChangeText={(text) => { this.setState({ mobile: text.trim() }) }} value={this.state.mobile} style={{ height: 50, textAlign: "right", color: '#222222', flex: 1 }} />
                        </View>

                        <View style={styles.myProfileView}>
                            <View>
                                <Text style={styles.myProfileTxt}>Total number of{'\n'}Surveys Completed</Text>
                            </View>
                            <View>
                                <Text style={styles.myProfileText}>{this.state.userdetailData.Total_surveys_completed}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
const mapStateToProps = (state) => {
    const AUTH = state.LoginData.token
    const userdetailData = state.LoginData.userdetailData
    return { AUTH, userdetailData }
}
export default connect(mapStateToProps, { userDetail })(MyProfile)