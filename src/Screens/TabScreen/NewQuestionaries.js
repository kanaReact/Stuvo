import React, { Component } from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList, Modal, Platform, ImageBackground } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'
import SVGImg from '../../Source/SVGImg'
import { connect } from 'react-redux'
import { surveyList } from '../../Redux/Action'
import Spinner from '../../Components/Spinner'
import moment from 'moment'
import axios from 'axios'
import constant from '../../Redux/config/constant';
var periods = {
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000
};
class NewQuestionaries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    text: 'Anti-bullying',
                    timeToComplete: '24 hours left to complete',
                    color: '#E10000'
                },
                {
                    id: 2,
                    text: 'University Life',
                    timeToComplete: '24 hours left to complete',
                    color: '#E10000'
                },
                {
                    id: 3,
                    text: 'Mental Health',
                    timeToComplete: '3 days left to complete',
                    color: '#E17800'
                },
                {
                    id: 4,
                    text: 'Public Services',
                    timeToComplete: '5 days left to complete',
                    color: '#E17800'
                }
            ],
            isVisible: false,
            surveyData: [],
            loading: false,
            noData: false,
            id: ''
        }
    }




    toggleModal = () => {
        this.setState({ isVisible: !this.state.isVisible })
    }
    componentWillMount() {
        this.setState({ loading: true })
        const { type } = this.props.route.params
        this.props.surveyList(this.props.AUTH, type)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ loading: false })
        if (nextProps.surveyData != this.state.surveyData) {
            this.setState({ surveyData: nextProps.surveyData })
        }
        if (nextProps.surveyData.length == 0) {
            this.setState({ noData: true })
        }
    }

    render() {
        const { type } = this.props.route.params
        console.log('data::', this.state.surveyData)
        return (
            <SafeAreaView style={styles.container}>
                <Spinner visible={this.state.loading} />
                <ImageBackground
                    style={{
                        height: '100%',
                        width: '100%',
                        resizeMode: 'stretch',
                    }}
                    resizeMode='stretch'
                    source={require('../../images/mainback.png')}>
                    <Header lefttxt={{ color: '#919191' }} btn={true} leftPress={() => this.props.navigation.goBack()} />
                    {
                        type == "new" ?
                            <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 12 }}>Surveys</Text>
                            :
                            type == "pandding" ?
                                <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 12 }}>Pending Surveys</Text>
                                :
                                <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 12 }}>Completed Surveys</Text>
                    }


                    {
                        this.state.noData == false ?
                            <FlatList
                                data={this.state.surveyData}
                                renderItem={({ item, index }) => (
                                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E066' }}>
                                        <TouchableOpacity activeOpacity={0.6} onPress={() => this.props.navigation.navigate('Week1Questionaires', { weekData: item.list, week: item.Week, type: type })}>
                                            <View style={{ flexDirection: 'row', paddingVertical: 18, marginLeft: 16, marginRight: 24, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ flex: 1, fontSize: 14, color: '#272727', fontFamily: 'Gotham-Medium' }}>Week {item.Week}</Text>
                                                <SVGImg.Arrow />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                showsVerticalScrollIndicator={false}
                            />
                            :
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Gotham-Medium', fontSize: 15, color: '#000' }}>No Data Available</Text>
                            </View>
                    }


                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.isVisible}
                        >
                            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ backgroundColor: '#FFFFFF', borderRadius: 20, width: '90%', alignItems: 'center', paddingHorizontal: 23 }}>
                                    <View style={{ marginTop: 45 }}>
                                        <SVGImg.QATBlack />
                                    </View>

                                    <Text style={{ fontSize: 20, paddingTop: 20, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>Before you proceed</Text>

                                    <Text style={{ fontSize: 14, paddingTop: 20, fontFamily: 'Gotham-Medium', color: '#272727', textAlign: 'center', lineHeight: 22 }}>This new set of questions are strictly{'\n'}time-based. You only have 7 days to{'\n'}submit your answers.</Text>

                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Que1', { id: this.state.id }); this.setState({ isVisible: false }) }} activeOpacity={0.6}>
                                        <View style={{ backgroundColor: '#00AFF0', marginTop: 30, height: 47, justifyContent: 'center', paddingHorizontal: 40, borderRadius: 50, marginBottom: 33 }}>
                                            <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#FFFFFF' }}>Continue</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}
const mapStateToProps = (state) => {
    const AUTH = state.LoginData.token
    const surveyData = state.SurveyData.surveyData
    return { AUTH, surveyData }
}
export default connect(mapStateToProps, { surveyList })(NewQuestionaries)