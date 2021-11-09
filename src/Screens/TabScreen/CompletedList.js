import React, { Component } from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'
import { connect } from 'react-redux'
import { surveyComplete } from '../../Redux/Action'
import Spinner from '../../Components/Spinner'
let temp = []
class CompletedList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    question_no: 'Question 1',
                    question: 'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod?',
                    answer: 'a.   Yes'
                },
                {
                    id: 2,
                    question_no: 'Question 2',
                    question: 'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod?',
                    answer: 'a.   Yes'
                },
                {
                    id: 3,
                    question_no: 'Question 3',
                    question: 'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod?',
                    answer: 'No answer',
                },
                {
                    id: 4,
                    question_no: 'Question 4',
                    question: 'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod?',
                    answer: 'b.   No',
                },
                {
                    id: 5,
                    question_no: 'Question 5',
                    question: 'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod?',
                    answer: 'a.   Yes'
                },
            ],
            surveyCompleteList: [],
            loading: false,
            checkboxAnswer: [],
            noData: false
        }
    }
    componentWillMount() {
        this.setState({ loading: true })
        const { id } = this.props.route.params
        this.props.surveyComplete(this.props.AUTH, id)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ loading: false })
        if (nextProps.surveyCompleteList != this.state.surveyCompleteList) {
            this.setState({ surveyCompleteList: nextProps.surveyCompleteList })
        }
        if (nextProps.surveyCompleteList.length == 0) {
            this.setState({ noData: true })
        }
    }
    showcheckboxAnswer(value) {
        return value.anserData.toString()
    }
    render() {
        const { title, id } = this.props.route.params
        console.log('data:::', this.state.surveyCompleteList)
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: 'white' }]}>
                <Spinner visible={this.state.loading} />
                <Header lefttxt={{ color: '#919191' }} btn={true} leftPress={() => this.props.navigation.goBack()} />
                <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 12 }}>{title}</Text>
                {
                    this.state.noData == false ?
                        <FlatList
                            data={this.state.surveyCompleteList}
                            renderItem={({ item, index }) => (
                                item.Survey.question.map((val, key) => (
                                    <View style={{ backgroundColor: '#F3F3F3', minHeight: 140, marginHorizontal: 16, borderRadius: 13, marginTop: 5, marginBottom: 5, paddingVertical: 10 }}>
                                        <View>
                                            <View>
                                                <Text style={{ color: "#00AFF0", fontFamily: 'Gotham-Medium', fontSize: 14, paddingLeft: 13, paddingTop: 16 }}>{"Question " + (key + 1)}</Text>
                                            </View>

                                            <View>
                                                <Text style={{ color: "#272727", fontFamily: 'Gotham-Medium', fontSize: 13, paddingLeft: 13, paddingTop: 16, paddingHorizontal: 10 }} >{val.question}</Text>
                                            </View>
                                            {
                                                val.type == "checkbox" ?
                                                    <View>
                                                        <View>
                                                            <Text style={{ color: "#272727", fontFamily: 'Gotham-Medium', fontSize: 14, paddingLeft: 13, paddingTop: 20 }}>{this.showcheckboxAnswer(val)}</Text>
                                                        </View>
                                                        {
                                                            val.comment == 'Y' &&
                                                            <View>
                                                                <Text style={{ color: "#272727", fontFamily: 'Gotham-Medium', fontSize: 14, paddingLeft: 13, paddingTop: 20, textAlign: 'justify', marginRight: 13 }}>Comment : {val.commenta_option_answer.trim()}</Text>
                                                            </View>
                                                        }
                                                    </View>
                                                    :
                                                    val.type == "textbox" ?
                                                        <View>
                                                            <View>
                                                                <Text style={{ color: "#272727", fontFamily: 'Gotham-Medium', fontSize: 14, paddingLeft: 13, paddingTop: 26, textAlign: 'justify', paddingRight: 13 }}>{val.answer.trim()}</Text>
                                                            </View>
                                                        </View>
                                                        :
                                                        val.type == "radiobutton" ?
                                                            <View>
                                                                <View>
                                                                    <Text style={{ color: "#272727", fontFamily: 'Gotham-Medium', fontSize: 14, paddingLeft: 13, paddingTop: 26 }}>{val.anserData}</Text>
                                                                </View>
                                                                {
                                                                    val.comment == 'Y' &&
                                                                    <Text style={{ color: "#272727", fontFamily: 'Gotham-Medium', fontSize: 14, marginLeft: 13, paddingTop: 10, textAlign: 'justify', marginRight: 13 }}>Comment : {val.commenta_option_answer.trim()}</Text>
                                                                }
                                                                {
                                                                    val.other_option == 'Y' &&
                                                                    <Text style={{ color: "#272727", fontFamily: 'Gotham-Medium', fontSize: 14, marginLeft: 13, paddingTop: 10, textAlign: 'justify', marginRight: 13 }}>Other Comment : {val.other_option_answer.trim()}</Text>

                                                                }
                                                            </View>
                                                            :
                                                            val.type == "rank" ?
                                                                <View>
                                                                    {
                                                                        val.anserData.map((value, newKey) => {
                                                                            const newVal = val.anserRank.map((val) => { return val })
                                                                            return (
                                                                                <Text style={{ color: "#272727", fontFamily: 'Gotham-Medium', fontSize: 14, paddingLeft: 13, paddingTop: 26 }}>{value} ({newVal[newKey]})</Text>
                                                                            )
                                                                        })}
                                                                    {val.comment == 'Y' &&
                                                                        <View>
                                                                            <Text style={{ color: "#272727", fontFamily: 'Gotham-Medium', fontSize: 14, paddingLeft: 13, paddingTop: 20, textAlign: 'justify', marginRight: 13 }}>Comment : {val.commenta_option_answer.trim()}</Text>
                                                                        </View>
                                                                    }
                                                                </View>

                                                                :
                                                                <View>
                                                                    <View>
                                                                        {
                                                                            val.other_option == 'N' ?
                                                                                <Image source={{ uri: val.anserData }} style={{ width: 50, height: 50, marginTop: 10, marginLeft: 10, borderRadius: 10 }} />
                                                                                :
                                                                                <Text style={{ color: "#272727", fontFamily: 'Gotham-Medium', fontSize: 14, paddingLeft: 13, paddingTop: 26 }}>{val.anserData}</Text>
                                                                        }
                                                                    </View>
                                                                    {
                                                                        val.comment == 'Y' &&
                                                                        <View>
                                                                            <Text style={{ color: "#272727", fontFamily: 'Gotham-Medium', fontSize: 14, paddingLeft: 13, paddingTop: 20, textAlign: 'justify', marginRight: 13 }}>Comment : {val.commenta_option_answer.trim()}</Text>
                                                                        </View>
                                                                    }
                                                                    {
                                                                        val.other_option == 'Y' &&
                                                                        <View>
                                                                            <Text style={{ color: "#272727", fontFamily: 'Gotham-Medium', fontSize: 14, paddingLeft: 13, paddingTop: 20, textAlign: 'justify', marginRight: 13 }}>Other Comment : {val.other_option_answer.trim()}</Text>
                                                                        </View>
                                                                    }
                                                                </View>

                                            }
                                        </View>
                                    </View>
                                ))
                            )}
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
    const surveyCompleteList = state.SurveyData.surveyCompleteList
    return { AUTH, surveyCompleteList }
}

export default connect(mapStateToProps, { surveyComplete })(CompletedList)