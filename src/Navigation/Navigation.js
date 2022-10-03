import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Splash from '../Screens/Splash';
import Welcome from '../Screens/WelcomeScreen';
import ReviewAnswer from '../Screens/ReviewAnswer';
import Question from '../Screens/TabScreen/Question';
import Week1Questionaires from '../Screens/TabScreen/Week1Questionaires';
import Week1PendingQue from '../Screens/TabScreen/Week1PendingQue';
import Que1 from '../Screens/TabScreen/QuestionList/Que1';
import Que2 from '../Screens/TabScreen/QuestionList/Que2';
import Que25 from '../Screens/TabScreen/QuestionList/Que25';
import QueSubmit from '../Screens/TabScreen/QuestionList/QueSubmit';
import Notification from '../Screens/TabScreen/Notification';
import Result from '../Screens/TabScreen/Result';
import Week1Result from '../Screens/TabScreen/Week1Result';
import Week2Result from '../Screens/TabScreen/Week2Result';
import ResultProgress from '../Screens/TabScreen/ResultProgress';
import DrawerContainer from '../Components/DrawerContainer';
import Guidance from '../Screens/DrawerScreen/Guidance';
import TechnicalSupport from '../Screens/DrawerScreen/TechnicalSupport';
import FAQ from '../Screens/DrawerScreen/FAQ';
import Help from '../Screens/DrawerScreen/Help&Support';
import CompletedQuestion from '../Screens/TabScreen/CompletedQuestion';
import CompletedList from '../Screens/TabScreen/CompletedList';
import MyProfile from '../Screens/TabScreen/MyProfile';
import About_Student_Voice from '../Screens/TabScreen/About_Student_Voice';
import SVGImg from '../Source/SVGImg';
import Login from '../Screens/Login';
import VerifyOTP from '../Screens/VerifyOTP';
import DeviceInfo from 'react-native-device-info';
import ResultBarProgress from '../Screens/TabScreen/ResultBarProgress';
import SurveyQueAns from '../Screens/TabScreen/SurveyQueAns';
import RadioImageResult from '../Screens/TabScreen/RadioImageResult';
import NewQuestionaries from '../Screens/TabScreen/NewQuestionaries';
import NewQuestionariesComplete from '../Screens/TabScreen/NewQuestionariesComplete';
import ResultRank from '../Screens/TabScreen/ResultRank';
import SchoolList from '../Screens/SchoolList';
import UserList from '../Screens/UserList';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const TabBottom = createBottomTabNavigator();

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, gestureEnabled: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SchoolList" component={SchoolList} />
        <Stack.Screen name="UserList" component={UserList} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Que1" component={Que1} />
        <Stack.Screen name="Que2" component={Que2} />
        <Stack.Screen name="Que25" component={Que25} />
        <Stack.Screen name="CompletedList" component={CompletedList} />
        <Stack.Screen name="QueSubmit" component={QueSubmit} />
        <Stack.Screen name="ReviewAnswer" component={ReviewAnswer} />
        <Stack.Screen name="tabs" component={tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function Navigator() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}
      initialRouteName="Question">
      <Stack.Screen name="Question" component={Question} />
      <Stack.Screen name="Week1Questionaires" component={Week1Questionaires} />
      <Stack.Screen name="NewQuestionaries" component={NewQuestionaries} />
      <Stack.Screen
        name="NewQuestionariesComplete"
        component={NewQuestionariesComplete}
      />
      <Stack.Screen name="Week1PendingQue" component={Week1PendingQue} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Guidance" component={Guidance} />
      <Stack.Screen name="TechnicalSupport" component={TechnicalSupport} />
      <Stack.Screen name="Result" component={Result} />
      <Stack.Screen name="Week1Result" component={Week1Result} />
      <Stack.Screen name="Week2Result" component={Week2Result} />
      <Stack.Screen name="ResultProgress" component={ResultProgress} />
      <Stack.Screen name="ResultBarProgress" component={ResultBarProgress} />
      <Stack.Screen name="FAQ" component={FAQ} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="CompletedQuestion" component={CompletedQuestion} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen
        name="About_Student_Voice"
        component={About_Student_Voice}
      />
      <Stack.Screen name="SurveyQueAns" component={SurveyQueAns} />
      <Stack.Screen name="RadioImageResult" component={RadioImageResult} />
      <Stack.Screen name="ResultRank" component={ResultRank} />
    </Stack.Navigator>
  );
}
function drawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContainer {...props} />}
      drawerStyle={{width: '95%'}}>
      <Drawer.Screen name="drawer" component={Navigator} />
    </Drawer.Navigator>
  );
}

function tabs() {
  return (
    <TabBottom.Navigator
      tabBar={props => <MyTabBar {...props} />}
      tabBarOptions={{
        backgroundColor: '#00AFF0',
      }}>
      <TabBottom.Screen name="main" component={drawer} />
    </TabBottom.Navigator>
  );
}

function MyTabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const [activeIndex, setactiveIndex] = useState(0);

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        if (label == 'main') {
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 69,
                backgroundColor: '#00AFF0',
                width: width,
                justifyContent: 'center',
                paddingTop: 8,
                paddingBottom: DeviceInfo.hasNotch() == true ? 20 : 0,
              }}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={() => {
                  navigation.navigate('Question');
                  setactiveIndex(0);
                }}
                style={{
                  height: 68,
                  width: width / 3.3,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {activeIndex == 0 ? (
                  <View style={{alignItems: 'center'}}>
                    <SVGImg.TabServeyWhite />
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 9,
                        paddingTop: 8,
                        textAlign: 'center',
                        fontFamily: 'Gotham-Medium',
                      }}>
                      Surveys
                    </Text>
                  </View>
                ) : (
                  <View style={{alignItems: 'center'}}>
                    <SVGImg.TabSurvey />
                    <Text
                      style={{
                        color: 'rgba(255,255,255,0.75)',
                        fontSize: 8,
                        paddingTop: 8,
                        textAlign: 'center',
                        fontFamily: 'Gotham-Medium',
                      }}>
                      Surveys
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={() => {
                  navigation.navigate('Result');
                  setactiveIndex(1);
                }}
                style={{
                  height: 68,
                  width: width / 3.3,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {activeIndex == 1 ? (
                  <View style={{alignItems: 'center'}}>
                    <SVGImg.TabResultWhite />
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 9,
                        paddingTop: 8,
                        textAlign: 'center',
                        fontFamily: 'Gotham-Medium',
                      }}>
                      Results
                    </Text>
                  </View>
                ) : (
                  <View style={{alignItems: 'center'}}>
                    <SVGImg.TabResult />
                    <Text
                      style={{
                        color: 'rgba(255,255,255,0.75)',
                        fontSize: 9,
                        paddingTop: 8,
                        textAlign: 'center',
                        fontFamily: 'Gotham-Medium',
                      }}>
                      Results
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={() => {
                  navigation.navigate('Notification');
                  setactiveIndex(2);
                }}
                style={{
                  height: 68,
                  width: width / 3.3,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {activeIndex == 2 ? (
                  <View style={{alignItems: 'center'}}>
                    <SVGImg.TabNotWhite />
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 9,
                        paddingTop: 8,
                        textAlign: 'center',
                        fontFamily: 'Gotham-Medium',
                      }}>
                      Notifications
                    </Text>
                  </View>
                ) : (
                  <View style={{alignItems: 'center'}}>
                    <SVGImg.TaBNot />
                    <Text
                      style={{
                        color: 'rgba(255,255,255,0.75)',
                        fontSize: 9,
                        paddingTop: 8,
                        textAlign: 'center',
                        fontFamily: 'Gotham-Medium',
                      }}>
                      Notifications
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          );
        }
      })}
    </View>
  );
}

export default Navigation;
