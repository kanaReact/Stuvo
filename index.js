/**
 * @format
 */

import {AppRegistry,Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging'
if(Platform.OS == "android")
{
    messaging().setBackgroundMessageHandler(remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
    });
}

AppRegistry.registerComponent(appName, () => App);
