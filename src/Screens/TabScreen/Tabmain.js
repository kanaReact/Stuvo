import React, { Component } from 'react';
import { View, Image, SafeAreaView, Dimensions, Text, TouchableOpacity } from 'react-native'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import styles from '../../style/styles'
import Questions from '../TabScreen/Question'
import Result from '../TabScreen/Result'
import Notification from '../TabScreen/Notification'
class Tabmain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0
        }
    }
    changeTab(i) {
        this.setState({ currentTab: i })
    }
    componentDidMount()
    {
        console.log("fdfdsfjgh")
    }
    componentWillMount()
    {
        console.log("Callllll")
        this.setState({ currentTab: 0 })
    }
    renderTab() {
        const { currentTab } = this.state;
        if (currentTab == 0) {
            return (<Questions navigation={this.props.navigation} />)
        } else if (currentTab == 1) {
            return (<Result navigation={this.props.navigation} />)
        } else {
            return (<Notification navigation={this.props.navigation} />)
        }
    }
    render() {
        const { currentTab } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                {this.renderTab()}
                <View style={styles.tabParent}>
                <TouchableOpacity onPress={() => { this.changeTab(0) }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 6, alignContent: 'center', justifyContent: 'flex-end' }}>
                            
                                {currentTab == 0 ?
                                    <Image source={require('../../images/Tabbar/Questionaires.png')} style={{ borderRadius: 3, width: 20, height: 20, resizeMode: 'contain' }} />
                                    :
                                    <Image source={require('../../images/Tabbar/blue/Questionaires.png')} style={{ borderRadius: 3, width: 20, height: 20, resizeMode: 'contain' }} />
                                }
                            
                        </View>
                        <View style={{ flex: 4, alignItems: 'center', justifyContent: 'flex-start', marginTop: 7 }}>
                            <Text style={{ color: '#FFFFFFBF', fontSize: 10, fontFamily: 'Gotham-Medium' }}>Surveys</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => { this.changeTab(1) }}  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 6, alignContent: 'center', justifyContent: 'flex-end' }}>
                            
                                {currentTab == 1 ?
                                    <Image source={require('../../images/Tabbar/Results.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                                    :
                                    <Image source={require('../../images/Tabbar/blue/Results.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                                }
                            
                        </View>
                        <View style={{ flex: 4, alignItems: 'center', justifyContent: 'flex-start', marginTop: 7 }}>
                            <Text style={{ color: '#FFFFFFBF', fontSize: 10, fontFamily: 'Gotham-Medium' }}>Results</Text>
                        </View>
                    </View>
                    </TouchableOpacity>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 6, alignContent: 'center', justifyContent: 'flex-end' }}>
                            <TouchableOpacity onPress={() => { this.changeTab(2) }}>
                                {currentTab == 2 ?
                                    <Image source={require('../../images/Tabbar/notifications.png')} style={{ width: 20, height: 20, resizeMode: 'stretch' }} />
                                    :
                                    <Image source={require('../../images/Tabbar/blue/notifications.png')} style={{ width: 20, height: 20, resizeMode: 'stretch' }} />
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 4, alignItems: 'center', justifyContent: 'flex-start', marginTop: 7 }}>
                            <Text style={{ color: '#FFFFFFBF', fontSize: 10, fontFamily: 'Gotham-Medium' }}>Notifications</Text>
                        </View>
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}
export default Tabmain