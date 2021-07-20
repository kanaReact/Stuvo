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
let temp = []
let tempid=[]
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
            errorInput: '',
            answerArray: [],
            checkboxAnswer: []
        }

    }

    selectedIndex = (i) => {
        this.setState({ currentIndex: i })
    }
    componentWillMount() {
        this.setState({ loading: true })
        const { id } = this.props.route.params
        console.log('id::',id)
        this.props.surveyDetail(this.props.AUTH, id)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ loading: false })
        if (nextProps.surveyDetailData != this.state.surveyDetailData) {
            this.setState({ surveyDetailData: nextProps.surveyDetailData, type: '', textInputAnswer: '' })
        }
        if (nextProps.surveyDetailData[this.state.index].answeroption == "radiobutton") {
            let tempArrayRadioBtn = []
            nextProps.surveyDetailData[this.state.index].anslist.map((item, index) => {
                tempArrayRadioBtn.push({
                    answer_title: item.answer_title,
                    serve_id: item.serve_id,
                    question_id: item.question_id,
                    set: '',
                    id: item.id,
                    question: nextProps.surveyDetailData[this.state.index].question,
                    answeroption: 'radiobutton',
                })
            })

            this.setState({ radiobuttonArray: tempArrayRadioBtn })

        }
        else if (nextProps.surveyDetailData[this.state.index].answeroption == "checkbox") {
            let tempArrayRadioBtn = []
            nextProps.surveyDetailData[this.state.index].anslist.map((item, index) => {
                this.changeCheckboxValue(index, false)
            })


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
        this.state.radiobuttonArray.map(async(item, index) => {
            if (array[index].id == data.id) {
                array[index].set = 1;
                await this.setState({
                    survey_id: data.serve_id,
                    question_id: data.question_id,
                    answer_id: data.id,
                    question: data.question,
                    answeroption: data.answer_title,
                    type: data.answeroption,
                })
            }
            else  {
                array[index].set = 0;
                await this.setState({
                    survey_id: data.serve_id,
                    question_id: data.question_id,
                    answer_id: data.id,
                    question: data.question,
                    answeroption: data.answer_title,
                    type: data.answeroption,
                })
            }
        })
        
        this.setState({ radiobuttonArray: array })
    }
    async changeCheckboxValue(index, item) {
        let temp = this.state.checkboxArray;
        await temp.splice(index, 1, item)
        await this.setState({ checkboxArray: temp })
        return this.state.checkboxArray
    }
    onCheckBoxChange(index, item) {
        console.log('checkbox array:::', this.state.checkboxArray)
        let value = this.state.checkboxArray[index]
        if (value == false) {
            this.changeCheckboxValue(index, true);
            let que = this.state.surveyDetailData[this.state.index].question
            tempid.push(item.id)
            this.setState({ type: 'checkbox', survey_id: item.serve_id, question_id: item.question_id, question: que,  })
            temp.push(item.answer_title)
        }
        else if (value == true) {
            this.changeCheckboxValue(index, false);
            temp.pop(item.answer_title)
            tempid.pop(item.id)
        } else {
            this.changeCheckboxValue(index, true)
        }
        console.log('temp array:', temp)
    }
    nextQuestion() {
        
        if (this.state.surveyDetailData[this.state.index].answeroption == "textbox") {
            if (this.state.textInputAnswer != '') {
                const { id } = this.props.route.params
                this.props.surveyDetail(this.props.AUTH, id)
                let survey_id = this.state.survey_id;
                let question_id = this.state.question_id;
                let answer_id = this.state.answer_id;
                let question = this.state.question;
                let answeroption = this.state.answeroption;
                let type = this.state.type;
                let answer = this.state.textInputAnswer
                this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer })
                this.setState({ index: this.state.index + 1 })
            }
            else {
                this.setState({ errorInput: 'Please enter answer' })
            }
        }
        else if (this.state.surveyDetailData[this.state.index].answeroption == "radiobutton") {
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
                this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer })
                this.setState({ index: this.state.index + 1 })
            }
            else {
                this.setState({ errorRadio: 'Please select answer' })
            }
        } else {
            if (temp.length != 0) {
                const { id } = this.props.route.params
                this.props.surveyDetail(this.props.AUTH, id)
                let survey_id = this.state.survey_id;
                let question_id = this.state.question_id;
                let answer_id = tempid;
                let question = this.state.question;
                let answeroption = temp;
                let type = this.state.type;
                let answer = "true"
                this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer })
                this.setState({ index: this.state.index + 1 })
                temp = [];
                tempid = [];
            }
            else {
                this.setState({ errorRadio: 'Please select answer' })
            }
        }

    }
    navigateSubmit() {
        if (this.state.surveyDetailData[this.state.index].answeroption == "textbox") {
            if (this.state.textInputAnswer != '') {
                const { id } = this.props.route.params
                
                let survey_id = this.state.survey_id;
                let question_id = this.state.question_id;
                let answer_id = this.state.answer_id;
                let question = this.state.question;
                let answeroption = this.state.answeroption;
                let type = this.state.type;
                let answer = this.state.textInputAnswer;
                this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer })
            }
            else {
                this.setState({ errorInput: 'Please enter answer' })
            }
        }
        else if (this.state.surveyDetailData[this.state.index].answeroption == "radiobutton") {
            
            if (this.state.type != '') {
                const { id } = this.props.route.params
                
                let survey_id = this.state.survey_id;
                let question_id = this.state.question_id;
                let answer_id = this.state.answer_id;
                let question = this.state.question;
                let answeroption = this.state.answeroption;
                let type = this.state.type;
                let answer = "true";
                this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer })
            }
            else {
                this.setState({ errorRadio: 'Please select answer' })
            }
        }
        else {
            if (temp.length != 0) {
                const { id } = this.props.route.params
                
                let survey_id = this.state.survey_id;
                let question_id = this.state.question_id;
                let answer_id = tempid;
                let question = this.state.question;
                let answeroption = temp;
                let type = this.state.type;
                let answer = "true"
                this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer })
                temp = []
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
        console.log('Answer Array:::::', this.state.answerArray)
        console.log('answet option state::',this.state.answeroption)
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
                            this.state.surveyDetailData[this.state.index].answeroption == "radiobutton" ?
                                <View>
                                    {
                                        this.state.radiobuttonArray.map((item, index) => (
                                            <TouchableOpacity key={index} style={{
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
                                            this.state.surveyDetailData[this.state.index].anslist.map((item, index) => (
                                                <View key={index} style={{ flexDirection: 'row' }}>
                                                    <CheckBox style={{ padding: 10, width: '50%' }}
                                                        onClick={() => { this.onCheckBoxChange(index, item) }}
                                                        checkBoxColor={'#00AFF0'}
                                                        checkedCheckBoxColor={'#00AFF0'}
                                                        isChecked={this.state.checkboxArray[index] == true ? true : false}
                                                        rightText={item.answer_title}
                                                    />
                                                </View>
                                            ))
                                        }
                                        {this.state.errorRadio != '' ? <Text style={{ padding: 10, fontFamily: 'Gotham-Medium', color: 'red', alignSelf: 'flex-start', fontSize: 14 }}>{this.state.errorRadio}</Text> : null}
                                    </View>
                                    :

                                    <View >
                                        <TextInput
                                            style={{ textAlignVertical: 'top', paddingLeft: 18, paddingRight: 5, paddingTop: 15, fontFamily: 'Gotham-Medium', color: '#919191', fontSize: 14, marginTop: 20, height: 131, borderRadius: 10, backgroundColor: '#F3F3F3' }}
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
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('QueSubmit', { answerArray: this.state.answerArray }); this.navigateSubmit() }} activeOpacity={0.6}>
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
    console.log('data::',state.SurveyData.surveyDetailData)
    const AUTH = state.LoginData.token
    const surveyDetailData = state.SurveyData.surveyDetailData
    const answerArray = state.SurveyData.answerArray
    return { AUTH, surveyDetailData, answerArray }
}
export default connect(mapStateToProps, { surveyDetail, answers })(Que1)
