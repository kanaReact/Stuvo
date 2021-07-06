import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, SafeAreaView, TextInput,ScrollView } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'
import SVGImg from '../../Source/SVGImg'
import { connect } from 'react-redux'
import { userDetail } from '../../Redux/Action'
import Spinner from '../../Components/Spinner'

class MyProfile extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            userdetailData:[],
            loading:false
        }
    }
    componentWillMount()
    {
        this.setState({ loading:true })
        this.props.userDetail(this.props.AUTH)
    }
    componentWillReceiveProps(nextProps)
    {
        this.setState({ loading:false })
        if(nextProps.userdetailData != this.state.userdetailData)
        {
            this.setState({ userdetailData:nextProps.userdetailData })
        }
    }
    render()
    {
        return(
            <SafeAreaView style={styles.container}>
                <Spinner visible={this.state.loading} />
                <View style={[styles.headerMain, { marginTop: 20, marginHorizontal: 16 }]}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 16 }}>
                     <SVGImg.HeaderLogo />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} activeOpacity={0.6}>
                            <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 12 }}>My Profile</Text>
                <View style={{ paddingTop:30 }}>
                    <View style={styles.myProfileView}>
                        <View>
                            <Text style={styles.myProfileTxt}>Name</Text>
                        </View>
                        <View>
                            <Text style={styles.myProfileText}>{this.state.userdetailData.name}</Text>
                        </View>
                    </View>

                    <View style={styles.myProfileView}>
                        <View>
                            <Text style={styles.myProfileTxt}>School</Text>
                        </View>
                        <View>
                            <Text style={styles.myProfileText}>Abbey College Cambridge</Text>
                        </View>
                    </View>

                    

                    <View style={styles.myProfileView}>
                        <View>
                            <Text style={styles.myProfileTxt}>Age</Text>
                        </View>
                        <View>
                            <Text style={styles.myProfileText}>{this.state.userdetailData.age}</Text>
                        </View>
                    </View>

                    <View style={styles.myProfileView}>
                        <View>
                            <Text style={styles.myProfileTxt}>Email</Text>
                        </View>
                        <View>
                            <Text style={styles.myProfileText}>{this.state.userdetailData.email}</Text>
                        </View>
                    </View>

                    <View style={styles.myProfileView}>
                        <View>
                            <Text style={styles.myProfileTxt}>Contact number</Text>
                        </View>
                        <View>
                            <Text style={styles.myProfileText}>{this.state.userdetailData.mobile}</Text>
                        </View>
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
export default connect(mapStateToProps,{ userDetail })(MyProfile)