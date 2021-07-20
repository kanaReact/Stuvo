import React, { Component } from 'react';
import { View, Image, SafeAreaView, ImageBackground, Dimensions, Text, TouchableOpacity, FlatList, Platform } from 'react-native'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import styles from '../../style/styles'
import Header from '../../Components/Header'
import SVGImg from '../../Source/SVGImg';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification'
class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    text: 'New Surveys',
                    navigation: 'Week1Questionaires',
                    param:'new'
                },
                {
                    id: 2,
                    text: 'Pending Surveys',
                    count: '(2)',
                    navigation: 'Week1Questionaires',
                    param:'pandding'
                },
                {
                    id: 3,
                    text: 'Completed Surveys',
                    count: '(2)',
                    navigation: 'CompletedQuestion',
                    param:'completed'
                },
            ]
        }
    }
    componentDidMount()
    {
        // Notification Manage
        if(Platform.OS == "android")
        {
            this.requestUserPermission()
        this.getToken()

        messaging().onMessage(remoteMessage => {
            console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
            
            
            PushNotification.localNotification({
                channelId: 'MyChannel',
                title: remoteMessage.notification.title,
                message: remoteMessage.notification.body,
                smallIcon:'logo'
            })
            
        })
        PushNotification.configure({
            onNotification: (notification) => { 
                console.log('Open Notification:::',notification);
               
            },
        })
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage
            );
            // this.setState({ occuranceLogModal: true })
            
            
        });

        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );
                  
                }
            });
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
        console.log('Token2:', token)
        return token
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
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
                            renderItem={({ item, index }) => (
                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E066' }}>
                                    <TouchableOpacity activeOpacity={0.6} onPress={() => this.props.navigation.navigate(item.navigation,{ type:item.param })}>
                                        <View style={{ flexDirection: 'row', paddingVertical: 18, marginLeft: 16, marginRight: 24, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ flex: 1, fontSize: 14, color: '#272727', fontFamily: 'Gotham-Medium' }}>{item.text} <Text style={{ color: '#00AFF0' }}>{item.count}</Text></Text>
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
export default Question