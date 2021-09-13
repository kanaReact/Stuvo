import React, { Component } from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'
import SVGImg from '../../Source/SVGImg'
import { connect } from 'react-redux'
import { submit_survey_list } from '../../Redux/Action'
import Spinner from '../../Components/Spinner'
import moment from 'moment'
class WeekResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    text: 'Week 1 Results',
                    navigation: 'Week1Result'
                },
                {
                    id: 2,
                    text: 'Week 2 Results',
                    navigation: ''
                },
            ],
            surveyData: [],
            noData: false,
            loading: false,
        }
    }
    componentWillMount() {
        this.setState({ loading: true })
        this.props.submit_survey_list(this.props.AUTH)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ loading: false })
        if (nextProps.submitSurveyData != this.state.surveyData) {
            this.setState({ surveyData: nextProps.submitSurveyData })
        }
        if (nextProps.submitSurveyData.length == 0) {
            this.setState({ noData: true })
        }
    }
    calculateWeek(date) {
        var dt = moment(date, "YYYY-MM-DD").format('YYYY-MM-DD')
        var given = moment(dt, "YYYY-MM-DD");
        var current = moment().startOf('day');

        let getWeek = moment.duration(current.diff(given)).asDays();
        let countWeek = getWeek / 7
        console.log('current::', dt)
        return Math.ceil(countWeek).toString()
    }
    render() {
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
                    source={require('../../images/mainback.png')}
                >
                    <Header leftImagePress={() => { this.props.navigation.openDrawer() }} />
                    <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 12 }}>Results</Text>

                    {
                        this.state.noData == false ?
                            <FlatList
                                data={this.state.surveyData}
                                renderItem={({ item, index }) => (
                                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E066' }}>
                                        <TouchableOpacity activeOpacity={0.6} onPress={() => this.props.navigation.navigate('Week1Result', { weekData: item.list, week: item.Week })}>
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
                                <Text style={{ fontFamily: 'Gotham-Medium', fontSize: 15 }}>No Data Available</Text>
                            </View>
                    }


                </ImageBackground>
            </SafeAreaView>
        );
    }
}
const mapStateToProps = (state) => {
    const AUTH = state.LoginData.token
    const surveyData = state.SurveyData.surveyData
    const submitSurveyData = state.SurveyData.submitSurveyData
    return { AUTH, surveyData, submitSurveyData }
}
export default connect(mapStateToProps, { submit_survey_list })(WeekResult);