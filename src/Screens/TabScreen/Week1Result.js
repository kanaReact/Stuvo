import React, { Component } from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'
import SVGImg from '../../Source/SVGImg'
import { connect } from 'react-redux'
import { submit_survey_list } from '../../Redux/Action'
import Spinner from '../../Components/Spinner'
class Week1Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    text: 'Anti-bullying',
                    navigation: 'ResultBarProgress'
                },
                {
                    id: 2,
                    text: 'University Life',
                    navigation: ''
                },
                {
                    id: 3,
                    text: 'Mental Health',
                    navigation: ''
                },
                {
                    id: 4,
                    text: 'Public Services',
                    navigation: ''
                }
            ],
            submitSurveyData: [],
            loading: false,
            noData: false
        }
    }
    componentWillMount() {
        const { weekData } = this.props.route.params
        this.setState({ submitSurveyData: weekData })

    }
    componentWillReceiveProps(nextProps) {
        this.setState({ loading: false })
        if (nextProps.submitSurveyData != this.state.submitSurveyData) {
            this.setState({ submitSurveyData: nextProps.submitSurveyData })
        }
        if (nextProps.submitSurveyData.length == 0) {
            this.setState({ noData: true })
        }
    }
    render() {
        const { week } = this.props.route.params
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
                    <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 12 }}>Week {week} - Results</Text>
                    {
                        this.state.noData == false ?
                            <FlatList
                                data={this.state.submitSurveyData}
                                renderItem={({ item, index }) => (
                                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E066' }}>
                                        <TouchableOpacity activeOpacity={0.6} onPress={() => { this.props.navigation.navigate('SurveyQueAns', { id: item.id, title: item.title, showResult: item.PubliceSurveyResult }) }}>
                                            <View style={{ flexDirection: 'row', paddingVertical: 18, marginLeft: 16, marginRight: 24, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ flex: 1, fontSize: 14, color: '#272727', fontFamily: 'Gotham-Medium' }}>{item.title}</Text>
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
    const submitSurveyData = state.SurveyData.submitSurveyData
    return { AUTH, submitSurveyData }
}
export default connect(mapStateToProps, { submit_survey_list })(Week1Result);