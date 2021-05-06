/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import { View,LogBox } from 'react-native'
 import Navigation from './src/Navigation/Navigation'
 LogBox.ignoreLogs(['Warning: ...']);
 LogBox.ignoreAllLogs();
 class App extends React.Component
 {
   render(){
     return(
       <Navigation/>
     );
   }
 }
 export default App
 