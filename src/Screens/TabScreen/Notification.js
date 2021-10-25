import React, { Component } from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'
import SVGImg from '../../Source/SVGImg'
import { connect } from 'react-redux'
import { notificationList } from '../../Redux/Action'
import Spinner from '../../Components/Spinner'
import moment from 'moment'
var periods = {
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000
};
class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    text: 'You have 24h left to complete\nyour answer.',
                    time: 'now'
                },
                {
                    id: 2,
                    text: 'You have 3 days left to complete\nyour answer.',
                    time: '16:00'
                },
                {
                    id: 3,
                    text: 'You have 5 days left to complete\nyour answer.',
                    time: 'Mon'
                },
            ],
            notificationData: [],
            loading: false,
            noData: false
        }
    }
    componentWillMount() {
        this.setState({ loading: true })
        this.props.notificationList(this.props.AUTH)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ loading: false })
        if (nextProps.notificationData != this.state.notificationData) {
            this.setState({ notificationData: nextProps.notificationData })
        }
        if (nextProps.notificationData.length == 0) {
            this.setState({ noData: true })
        }
    }
    formatTime(timeCreated) {
        var diff = Date.now() - moment(timeCreated).format("x");

        if (diff > periods.month) {
            // it was at least a month ago
            return Math.floor(diff / periods.month) + "M ago";
        } else if (diff > periods.week) {
            return Math.floor(diff / periods.week) + "W ago";
        } else if (diff > periods.day) {
            return Math.floor(diff / periods.day) + "D ago";
        } else if (diff > periods.hour) {
            return Math.floor(diff / periods.hour) + "H ago";
        } else if (diff > periods.minute) {
            return Math.floor(diff / periods.minute) + "M ago";
        }
        return "now";
    }





    render() {
        console.log('dat:::', this.state.notificationData)
        return (
            <SafeAreaView style={styles.container}>
                <Spinner visible={this.state.loading} />
                <Header leftImagePress={() => { this.props.navigation.openDrawer() }} />
                <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 6 }}>Notifications</Text>

                {
                    this.state.noData == false ?
                        <FlatList
                            data={this.state.notificationData}
                            renderItem={({ item, index }) => (
                                this.state.noData == false ?
                                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E066' }}>
                                        <View style={{ flexDirection: 'row', paddingVertical: 16, marginLeft: 16, marginRight: 24 }}>
                                            <SVGImg.Notification />
                                            <View style={{ flex: 1, marginHorizontal: 20, justifyContent: 'center' }}>
                                                <Text style={{ fontSize: 14, color: '#272727', fontFamily: 'Gotham-Medium', lineHeight: 16 }}>{item.message}</Text>
                                                <TouchableOpacity style={{ alignSelf: 'flex-start' }} activeOpacity={1}>
                                                    <Text style={{ fontSize: 10, color: '#919191', fontFamily: 'Gotham-Medium', marginTop: 5 }}>View now</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={{ fontSize: 10, color: '#919191', fontFamily: 'Gotham-Medium' }}>{this.formatTime(item.created_at)}</Text>
                                        </View>
                                    </View>
                                    :
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'Gotham-Medium', fontSize: 15 }}>No Data Available</Text>
                                    </View>
                            )}
                            keyExtractor={item => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                        :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Gotham-Medium', fontSize: 15 }}>No Data Available</Text>
                        </View>
                }
            </SafeAreaView>
        );
    }
}
const mapStateToProps = (state) => {
    const AUTH = state.LoginData.token
    const notificationData = state.SurveyData.notificationData
    return { AUTH, notificationData }
}
export default connect(mapStateToProps, { notificationList })(Notification);