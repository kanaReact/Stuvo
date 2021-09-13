import React, { Component } from 'react';
import { View, Image, SafeAreaView, ImageBackground, Dimensions, Text, TouchableOpacity, FlatList, Platform, StatusBar } from 'react-native'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import styles from '../../style/styles'
import Header from '../../Components/Header'
import SVGImg from '../../Source/SVGImg';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification'
import { connect } from 'react-redux'
import { sendToken, surveyList } from '../../Redux/Action'
import axios from 'axios';
import constant from '../../Redux/config/constant';
import Spinner from '../../Components/Spinner';
class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    text: 'New Surveys',
                    navigation: 'NewQuestionaries',
                    param: 'new'
                },
                {
                    id: 2,
                    text: 'Pending Surveys',
                    count: '(2)',
                    navigation: 'NewQuestionaries',
                    param: 'pandding'
                },
                {
                    id: 3,
                    text: 'Completed Surveys',
                    count: '(2)',
                    navigation: 'NewQuestionariesComplete',
                    param: 'completed'
                },
            ],
            pendingCount: '',
            completedCount: '',
            loading: false
        }
    }
    componentWillMount() {
        this.setState({ loading: true })
        this.props.navigation.addListener('focus', this.refreshData)
        this.get_pending_survey_count()
        this.get_completed_survey_count()
    }
    refreshData = () => {
        this.setState({ loading: true })
        this.get_pending_survey_count()
        this.get_completed_survey_count()
    }
    get_pending_survey_count() {
        let url = constant.BASE_URL + 'surveylist?type=pandding'
        axios.get(url, {
            headers: { 'Authorization': 'Bearer ' + this.props.AUTH }
        }).then(async (responseJson) => {
            this.setState({ loading: false })
            console.log('pending survey count:', responseJson.data.status)
            if (responseJson.data.status == 1) {
                let count = 0;
                responseJson.data.data[0].Survey.map((item) => {
                    count += item.list.length
                })
                await this.setState({ pendingCount: count })
            }
        }).catch(error => { this.setState({ loading: false }) })
    }
    get_completed_survey_count() {
        let url = constant.BASE_URL + 'surveylist?type=completed'
        axios.get(url, {
            headers: { 'Authorization': 'Bearer ' + this.props.AUTH }
        }).then(async (responseJson) => {
            this.setState({ loading: false })
            console.log('compete survey count:', responseJson.data)
            if (responseJson.data.status == 1) {
                let count = 0;
                responseJson.data.data[0].Survey.map((item) => {
                    count += item.list.length
                })
                await this.setState({ completedCount: count })
            }
        })
            .catch(error => { this.setState({ loading: false }) })
    }

    componentDidMount() {
        // Notification Manage
        if (Platform.OS == "android") {
            this.requestUserPermission()
            this.getToken()

            messaging().onMessage(remoteMessage => {
                console.log('remote :::', remoteMessage)
                PushNotification.localNotification({
                    channelId: 'MyChannel',
                    title: remoteMessage.data.title,
                    message: remoteMessage.data.message,
                })
            })
            PushNotification.configure({
                onNotification: (notification) => {
                    console.log('Open Notification:::', notification);

                },
            })
            messaging().onNotificationOpenedApp(remoteMessage => {
                console.log(
                    'Notification caused app to open from background state:',
                    remoteMessage
                );


            });

            // Check whether an initial notification is available
            messaging().getInitialNotification().then(remoteMessage => {
                console.log('remote:', remoteMessage)
            })

        }
    }
    requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }

    getToken = async () => {
        PushNotification.createChannel(
            {
                channelId: "MyChannel", // (required)
                channelName: "My channel", // (required)
            },
        );

        const token = await messaging().getToken()
        console.log('token:::', token)
        let device_type = Platform.OS == "android" ? "android" : "ios"
        this.props.sendToken(this.props.AUTH, token, device_type)
        return token
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
                <Spinner visible={this.state.loading} />
                <ImageBackground
                    style={{
                        height: '100%',
                        width: '100%',
                        resizeMode: 'stretch',
                    }}
                    resizeMode='stretch'
                    source={require('../../images/mainback.png')}
                >
                    <Header leftImagePress={() => { this.props.navigation.openDrawer() }} />
                    <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 12 }}>Surveys</Text>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={this.state.data}
                            scrollEnabled={false}
                            renderItem={({ item, index }) => (
                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E066' }}>
                                    <TouchableOpacity activeOpacity={0.6} onPress={() => this.props.navigation.navigate(item.navigation, { type: item.param })}>
                                        <View style={{ flexDirection: 'row', paddingVertical: 18, marginLeft: 16, marginRight: 24, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ flex: 1, fontSize: 14, color: '#272727', fontFamily: 'Gotham-Medium' }}>{item.text} <Text style={{ color: '#00AFF0' }}>{item.text == "Pending Surveys" ? this.state.pendingCount != '' ? '(' + this.state.pendingCount + ')' : '' : item.text == "Completed Surveys" ? this.state.completedCount != '' ? '(' + this.state.completedCount + ')' : '' : ''}</Text></Text>
                                            <SVGImg.Arrow />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={item => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}
const mapStateToProps = (state) => {
    console.log('auth ::', state.LoginData.token)
    const AUTH = state.LoginData.token
    return { AUTH }
}
export default connect(mapStateToProps, { sendToken, surveyList })(Question)