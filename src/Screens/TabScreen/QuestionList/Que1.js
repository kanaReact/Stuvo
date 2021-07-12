import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, SafeAreaView, TextInput } from 'react-native'
import styles from '../../../style/styles'
import Header from '../../../Components/Header'
import SVGImg from '../../../Source/SVGImg'
import { connect } from 'react-redux'
import { surveyDetail, answers } from '../../../Redux/Action'
import Spinner from '../../../Components/Spinner'
import CheckBox from 'react-native-check-box'
import Toast from 'react-native-tiny-toast'
class Que1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            surveyDetailData: [],
            loading: false,
            index: 0,
            isChecked: false,
            checkboxArray: [],
            radiobuttonArray: [],
            showBtn: false,
            question_id: '',
            survey_id: '',
            answer: '',
            question: '',
            textInputAnswer: '',
            answeroption: '',
            answer_id: '',
            type: '',
            errorRadio: '',
            errorInput: ''
        }

    }

    selectedIndex = (i) => {
        this.setState({ currentIndex: i })
    }
    componentWillMount() {
        this.setState({ loading: true })
        const { id } = this.props.route.params
        this.props.surveyDetail(this.props.AUTH, id)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ loading: false })
        console.log('Survey detail data::', nextProps.surveyDetailData)
        if (nextProps.surveyDetailData != this.state.surveyDetailData) {
            this.setState({ surveyDetailData: nextProps.surveyDetailData, type: '', textInputAnswer: '' })
        }
        if (nextProps.surveyDetailData[this.state.index].answeroption == "rediobutton") {
            let tempArrayRadioBtn = []
            nextProps.surveyDetailData[this.state.index].anslist.map((item, index) => {
                tempArrayRadioBtn.push({
                    answer_title: item.answer_title,
                    serve_id: item.serve_id,
                    question_id: item.question_id,
                    set: '',
                    id: item.id,
                    question: nextProps.surveyDetailData[this.state.index].question,
                    answeroption: 'rediobutton',
                })
            })

            this.setState({ radiobuttonArray: tempArrayRadioBtn })

        }
        else if (nextProps.surveyDetailData[this.state.index].answeroption == "checkbox") {
            let tempArrayRadioBtn = []
            nextProps.surveyDetailData[this.state.index].anslist.map((item, index) => {
                tempArrayRadioBtn.push({
                    answer_title: item.answer_title,
                    serve_id: item.serve_id,
                    question_id: item.question_id,
                    set: '',
                    id: item.id,
                    question: nextProps.surveyDetailData[this.state.index].question,
                    answeroption: 'checkbox',
                })
            })

            this.setState({ checkboxArray: tempArrayRadioBtn })
        }
        else if (nextProps.surveyDetailData[this.state.index].answeroption == "textbox") {
            this.setState({
                survey_id: nextProps.surveyDetailData[this.state.index].serve_id,
                question_id: nextProps.surveyDetailData[this.state.index].id,
                answer_id: '',
                question: nextProps.surveyDetailData[this.state.index].question,
                answeroption: "",
                type: "textbox",
            })
        }
    }
    changeRadioBtnValue(data) {
        this.setState({ errorRadio: '' })
        let array = this.state.radiobuttonArray
        this.state.radiobuttonArray.map((item, index) => {
            if (array[index].id == data.id) {
                array[index].set = 1;
                this.setState({
                    survey_id: array[index].serve_id,
                    question_id: array[index].question_id,
                    answer_id: array[index].id,
                    question: array[index].question,
                    answeroption: array[index].answer_title,
                    type: array[index].answeroption,
                })
            }
            else {
                array[index].set = 0;
                this.setState({
                    survey_id: array[index].serve_id,
                    question_id: array[index].question_id,
                    answer_id: array[index].id,
                    question: array[index].question,
                    answeroption: array[index].answer_title,
                    type: array[index].answeroption,
                })
            }
        })
        this.setState({ radiobuttonArray: array })
    }
    changeCheckboxValue(data) {
        this.setState({ errorRadio: '' })
        let array = this.state.checkboxArray
        this.state.checkboxArray.map((item, index) => {
            if (array[index].id == data.id) {
                array[index].set = 1;
                this.setState({
                    survey_id: array[index].serve_id,
                    question_id: array[index].question_id,
                    answer_id: array[index].id,
                    question: array[index].question,
                    answeroption: array[index].answer_title,
                    type: array[index].answeroption,
                })
            }
            else {
                array[index].set = 0;
                this.setState({
                    survey_id: array[index].serve_id,
                    question_id: array[index].question_id,
                    answer_id: array[index].id,
                    question: array[index].question,
                    answeroption: array[index].answer_title,
                    type: array[index].answeroption,
                })
            }
        })
        this.setState({ checkboxArray: array })
    }
    nextQuestion() {
        if (this.state.surveyDetailData[this.state.index].answeroption == "textbox") {
            if (this.state.textInputAnswer == '') {
                const { id } = this.props.route.params
                this.props.surveyDetail(this.props.AUTH, id)
                let survey_id = this.state.survey_id;
                let question_id = this.state.question_id;
                let answer_id = this.state.answer_id;
                let question = this.state.question;
                let answeroption = this.state.answeroption;
                let type = this.state.type;
                let answer = this.state.textInputAnswer
                this.props.answers(survey_id, question_id, answer_id, question, answeroption, type, answer)
                this.setState({ index: this.state.index + 1 })
            }
            else {
                this.setState({ errorInput: 'Please enter answer' })
            }
        }
        else {
            if (this.state.type != '') {
                const { id } = this.props.route.params
                this.props.surveyDetail(this.props.AUTH, id)
                let survey_id = this.state.survey_id;
                let question_id = this.state.question_id;
                let answer_id = this.state.answer_id;
                let question = this.state.question;
                let answeroption = this.state.answeroption;
                let type = this.state.type;
                let answer = "true"
                this.props.answers(survey_id, question_id, answer_id, question, answeroption, type, answer)
                this.setState({ index: this.state.index + 1 })
            }
            else {
                this.setState({ errorRadio: 'Please select answer' })
            }
        }

    }
    navigateSubmit() {
        if (this.state.surveyDetailData[this.state.index].answeroption == "textbox") {
            if (this.state.textInputAnswer == '') {
                const { id } = this.props.route.params
                this.props.surveyDetail(this.props.AUTH, id);
                let survey_id = this.state.survey_id;
                let question_id = this.state.question_id;
                let answer_id = this.state.answer_id;
                let question = this.state.question;
                let answeroption = this.state.answeroption;
                let type = this.state.type;
                let answer = this.state.textInputAnswer;
                this.props.answers(survey_id, question_id, answer_id, question, answeroption, type, answer)
            }
            else {
                this.setState({ errorInput: 'Please enter answer' })
            }
        }
        else {
            if (this.state.type != '') {
                const { id } = this.props.route.params
                this.props.surveyDetail(this.props.AUTH, id)
                let survey_id = this.state.survey_id;
                let question_id = this.state.question_id;
                let answer_id = this.state.answer_id;
                let question = this.state.question;
                let answeroption = this.state.answeroption;
                let type = this.state.type;
                let answer = "true";
                this.props.answers(survey_id, question_id, answer_id, question, answeroption, type, answer)
            }
            else {
                this.setState({ errorRadio: 'Please select answer' })
            }
        }

    }

    render() {
        const { currentIndex } = this.state;
        let questionCount = this.state.surveyDetailData.length
        let currentQuestion = this.state.index + 1
        return (
            <SafeAreaView style={styles.container}>
                <Spinner visible={this.state.loading} />
                <View style={[styles.headerMain, { marginTop: 20, marginHorizontal: 16 }]}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 32 }}>
                        <SVGImg.HeaderLogo />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} activeOpacity={0.6}>
                            <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16 }}>Question {currentQuestion} of {questionCount}</Text>

                <View style={{ marginLeft: 16, marginRight: 24 }}>
                    <Text style={{ marginTop: 15, fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727', lineHeight: 20 }}>{this.state.surveyDetailData.length != 0 ? this.state.surveyDetailData[this.state.index].question : null}</Text>

                    {
                        this.state.surveyDetailData.length != 0 ?
                            this.state.surveyDetailData[this.state.index].answeroption == "rediobutton" ?
                                <View>
                                    {
                                        this.state.radiobuttonArray.map((item, index) => (
                                            <TouchableOpacity style={{
                                                marginTop: 30, borderRadius: 30, height: 41, justifyContent: 'center', paddingHorizontal: 18,
                                                backgroundColor: item.set == 0 ? '#E0E0E066' : '#00AFF0'
                                            }} activeOpacity={0.6}
                                                onPress={() => { this.changeRadioBtnValue(item) }}>
                                                <Text style={{
                                                    fontSize: 14, fontFamily: 'Gotham-Medium',
                                                    color: item.set == 0 ? '#272727' : '#FFFFFF'
                                                }}>{item.answer_title}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                    {this.state.errorRadio != '' ? <Text style={{ padding: 10, fontFamily: 'Gotham-Medium', color: 'red', alignSelf: 'flex-start', fontSize: 14 }}>{this.state.errorRadio}</Text> : null}
                                </View>

                                :
                                this.state.surveyDetailData[this.state.index].answeroption == "checkbox" ?
                                    <View>
                                        {
                                            this.state.checkboxArray.map((item, index) => (
                                                <View style={{ flexDirection: 'row' }}>
                                                    <CheckBox style={{ padding: 10, width: '50%' }}
                                                        onClick={() => { this.changeCheckboxValue(item) }}
                                                        checkBoxColor={'#00AFF0'}
                                                        checkedCheckBoxColor={'#00AFF0'}
                                                        isChecked={item.set == 1 ? true : false}
                                                        rightText={item.answer_title}
                                                    />
                                                </View>
                                            ))
                                        }
                                        {this.state.errorRadio != '' ? <Text style={{ padding: 10, fontFamily: 'Gotham-Medium', color: 'red', alignSelf: 'flex-start', fontSize: 14 }}>{this.state.errorRadio}</Text> : null}
                                    </View>
                                    :

                                    <View style={{ marginTop: 20, height: 131, borderRadius: 10, backgroundColor: '#F3F3F3' }}>
                                        <TextInput
                                            style={{ paddingLeft: 18, paddingRight: 5, paddingTop: 15, fontFamily: 'Gotham-Medium', color: '#919191', fontSize: 14 }}
                                            placeholder="Write something..."
                                            multiline={true}
                                            value={this.state.textInputAnswer}
                                            onChangeText={(text) => { this.setState({ textInputAnswer: text.trimStart(), errorInput: '' }) }}
                                        />
                                        {this.state.errorInput != '' ? <Text style={{ padding: 10, fontFamily: 'Gotham-Medium', color: 'red', alignSelf: 'flex-start', fontSize: 14 }}>{this.state.errorInput}</Text> : null}
                                    </View>

                            : null
                    }

                </View>

                <View style={{ flex: 1, justifyContent: 'flex-end', marginHorizontal: 27 }}>
                    {
                        currentQuestion == questionCount ?
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('QueSubmit'); this.navigateSubmit() }} activeOpacity={0.6}>
                                <View style={{ alignItems: 'center', backgroundColor: '#00AFF0', marginBottom: 50, height: 47, justifyContent: 'center', borderRadius: 50, }}>
                                    <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#FFFFFF' }}>Next</Text>
                                </View>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => { this.nextQuestion() }} activeOpacity={0.6}>
                                <View style={{ alignItems: 'center', backgroundColor: '#00AFF0', marginBottom: 50, height: 47, justifyContent: 'center', borderRadius: 50, }}>
                                    <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#FFFFFF' }}>Next Question</Text>
                                </View>
                            </TouchableOpacity>
                    }
                </View>

            </SafeAreaView>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('check::', state.SurveyData.answerArray)
    const AUTH = state.LoginData.token
    const surveyDetailData = state.SurveyData.surveyDetailData
    const answerArray = state.SurveyData.answerArray
    return { AUTH, surveyDetailData, answerArray }
}
export default connect(mapStateToProps, { surveyDetail, answers })(Que1)
