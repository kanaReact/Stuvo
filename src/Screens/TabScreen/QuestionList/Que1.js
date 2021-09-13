import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, SafeAreaView, TextInput, FlatList, Keyboard, ActivityIndicator, ScrollView } from 'react-native'
import styles from '../../../style/styles'
import Header from '../../../Components/Header'
import SVGImg from '../../../Source/SVGImg'
import { connect } from 'react-redux'
import { surveyDetail } from '../../../Redux/Action'
import Spinner from '../../../Components/Spinner'
import CheckBox from 'react-native-check-box'
import Toast from 'react-native-tiny-toast'
import DropDown from '../../../Components/DropDown'
var temp = [];
var tempid = [];
var tempRankAns = [];
var tempRankid = [];
var tempRank = [];
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
            checkboxAnswer: [],
            radioButtonWithImageArray: [],
            imageAnimating: false,
            dropDownData: [],
            selectRank: [],
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
        else if (nextProps.surveyDetailData[this.state.index].answeroption == "radiobuttonImage") {
            let tempArrayRadioBtnImage = []
            nextProps.surveyDetailData[this.state.index].anslist.map((item, index) => {
                tempArrayRadioBtnImage.push({
                    answer_title: item.answer_title,
                    serve_id: item.serve_id,
                    question_id: item.question_id,
                    set: '',
                    id: item.id,
                    question: nextProps.surveyDetailData[this.state.index].question,
                    answeroption: 'radiobuttonImage',
                })
            })
            this.setState({ radioButtonWithImageArray: tempArrayRadioBtnImage })
        }
        else if (nextProps.surveyDetailData[this.state.index].answeroption == "rank") {
            this.setState({ selectRank: [], question: nextProps.surveyDetailData[this.state.index].question })
            let tempArrayRank = []
            nextProps.surveyDetailData[this.state.index].anslist.map((item, index) => {
                let val = index + 1
                tempArrayRank.push({ id: val, name: val })
            })
            this.setState({ dropDownData: tempArrayRank })
        }

    }
    changeRadioBtnValue(data) {
        this.setState({ errorRadio: '' })
        let array = this.state.radiobuttonArray
        this.state.radiobuttonArray.map(async (item, index) => {
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
            else {
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
    changeRadioBtnImageValue(data) {
        this.setState({ errorRadio: '' })
        let array = this.state.radioButtonWithImageArray
        this.state.radioButtonWithImageArray.map(async (item, index) => {
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
            else {
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

        this.setState({ radioButtonWithImageArray: array })
    }
    async changeCheckboxValue(index, item) {
        let temp = this.state.checkboxArray;
        await temp.splice(index, 1, item)
        await this.setState({ checkboxArray: temp })
        return this.state.checkboxArray
    }
    onCheckBoxChange(index, item) {
        this.setState({ errorRadio: '' })
        let value = this.state.checkboxArray[index]
        if (value == false) {
            this.changeCheckboxValue(index, true);
            let que = this.state.surveyDetailData[this.state.index].question
            tempid.push(item.id)
            this.setState({ type: 'checkbox', survey_id: item.serve_id, question_id: item.question_id, question: que, })
            temp.push(item.answer_title)
        }
        else if (value == true) {
            this.changeCheckboxValue(index, false);
            let tempIndex = temp.indexOf(item.answer_title)
            let tempidIndex = tempid.indexOf(item.id)
            if (temp.includes(item.answer_title) == true) {
                temp.splice(tempIndex, 1);
                tempid.splice(tempidIndex, 1);
            }
        }
    }
    onDropDown(item, index, value) {
        let temp = this.state.selectRank;
        temp[index] = item;
        this.setState({ selectRank: temp, type: 'rank', survey_id: value.serve_id, question_id: value.question_id, });
        if (tempRankAns.includes(value.answer_title) == false) {
            tempRankAns.push(value.answer_title)
            tempRankid.push(value.id);
            tempRank.push(item.name)
        }
    }
    nextQuestion() {
        if (this.state.surveyDetailData[this.state.index].answeroption == "textbox") {
            if (this.state.textInputAnswer != '') {
                this.setState({ loading: true })
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
                this.setState({ loading: true })
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
        }
        else if (this.state.surveyDetailData[this.state.index].answeroption == "radiobuttonImage") {
            if (this.state.type != '') {
                this.setState({ loading: true })
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
        }
        else if (this.state.surveyDetailData[this.state.index].answeroption == "checkbox") {
            if (temp.length != 0) {
                this.setState({ loading: true })
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
        else {
            this.setState({ loading: true })
            const { id } = this.props.route.params
            this.props.surveyDetail(this.props.AUTH, id)
            let survey_id = this.state.survey_id;
            let question_id = this.state.question_id;
            let answer_id = tempRankid;
            let question = this.state.question;
            let answeroption = tempRankAns;
            let rank = tempRank;
            let answer = "true"
            let type = this.state.type;
            this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, rank: rank, type: type, answer: answer })
            this.setState({ index: this.state.index + 1 })
            tempRank = [];
            tempRankid = [];
            tempRankAns = [];

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
                //setTimeout(() => { this.props.navigation.navigate('QueSubmit', { answerArray: this.state.answerArray }); }, 500)
                this.props.navigation.navigate('QueSubmit', { answerArray: this.state.answerArray });
            }
            else {
                this.setState({ errorInput: 'Please enter answer' })
            }
        }
        if (this.state.surveyDetailData[this.state.index].answeroption == "radiobutton") {

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
                this.props.navigation.navigate('QueSubmit', { answerArray: this.state.answerArray });
            }
            else {
                this.setState({ errorRadio: 'Please select answer' })
            }
        }
        if (this.state.surveyDetailData[this.state.index].answeroption == "radiobuttonImage") {
            if (this.state.type != '') {
                const { id } = this.props.route.params

                let survey_id = this.state.survey_id;
                let question_id = this.state.question_id;
                let answer_id = this.state.answer_id;
                let question = this.state.question;
                let answeroption = this.state.answeroption;
                let type = this.state.type;
                let answer = "true"
                this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer })
                this.props.navigation.navigate('QueSubmit', { answerArray: this.state.answerArray });
            }
            else {
                this.setState({ errorRadio: 'Please select answer' })
            }
        }
        else if (this.state.surveyDetailData[this.state.index].answeroption == "checkbox") {
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
                this.props.navigation.navigate('QueSubmit', { answerArray: this.state.answerArray });
                temp = []
            }
            else {
                this.setState({ errorRadio: 'Please select answer' })
            }
        }
        else {

            const { id } = this.props.route.params

            let survey_id = this.state.survey_id;
            let question_id = this.state.question_id;
            let answer_id = tempRankid;
            let answeroption = tempRankAns;
            let question = this.state.question
            let rank = tempRank;
            let answer = "true";
            let type = this.state.type
            this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, rank: rank, type: type, answer: answer })
            this.props.navigation.navigate('QueSubmit', { answerArray: this.state.answerArray });
            tempRank = [];
            tempRankid = [];
            tempRankAns = [];
        }


    }
    onClose() {
        this.props.navigation.goBack();
        temp = [];
        tempid = [];
        tempRank = [];
        tempRankAns = [];
        tempRankid = [];
    }

    render() {
        const { currentIndex } = this.state;
        let questionCount = this.state.surveyDetailData.length;
        let currentQuestion = this.state.index + 1;
        console.log('data::', this.state.answerArray)
        return (
            <SafeAreaView style={styles.container}>
                <Spinner visible={this.state.loading} />
                <View style={[styles.headerMain, { marginTop: 20, marginHorizontal: 16 }]}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 32 }}>
                        <SVGImg.HeaderLogo />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => { this.onClose() }} activeOpacity={0.6}>
                            <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {questionCount == 0 ? <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16 }}>Question </Text> : <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16 }}>Question {currentQuestion} of {questionCount}</Text>}

                <ScrollView style={{ marginLeft: 16, marginRight: 24 }} contentContainerStyle={{ paddingBottom: 100 }}>
                    <Text style={{ marginTop: 15, fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727', lineHeight: 20 }}>{this.state.surveyDetailData.length != 0 ? this.state.surveyDetailData[this.state.index].question : null}</Text>

                    {
                        this.state.surveyDetailData.length != 0 ?
                            this.state.surveyDetailData[this.state.index].answeroption == "radiobutton" ?
                                <View>
                                    {
                                        this.state.radiobuttonArray.map((item, index) => (
                                            <TouchableOpacity key={index} style={{
                                                marginTop: 30, borderRadius: 30, minHeight: 41, justifyContent: 'center', paddingHorizontal: 18,
                                                backgroundColor: item.set == 0 ? '#E0E0E066' : '#00AFF0', paddingVertical: 10
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
                                    this.state.surveyDetailData[this.state.index].answeroption == "textbox" ?
                                        <View >
                                            <TextInput
                                                style={{ textAlignVertical: 'top', paddingLeft: 18, paddingRight: 5, paddingTop: 15, fontFamily: 'Gotham-Medium', color: '#919191', fontSize: 14, marginTop: 20, height: 131, borderRadius: 10, backgroundColor: '#F3F3F3' }}
                                                placeholder="Write something..."
                                                multiline={true}
                                                value={this.state.textInputAnswer}
                                                returnKeyType="done"
                                                onSubmitEditing={() => { Keyboard.dismiss() }}
                                                onChangeText={(text) => { this.setState({ textInputAnswer: text.trimStart(), errorInput: '' }) }}
                                            />
                                            {this.state.errorInput != '' ? <Text style={{ padding: 10, fontFamily: 'Gotham-Medium', color: 'red', alignSelf: 'flex-start', fontSize: 14 }}>{this.state.errorInput}</Text> : null}
                                        </View>
                                        :
                                        this.state.surveyDetailData[this.state.index].answeroption == "radiobuttonImage" ?
                                            <View>
                                                <FlatList
                                                    data={this.state.radioButtonWithImageArray}
                                                    numColumns={2}
                                                    columnWrapperStyle={{ justifyContent: "space-between", }}
                                                    renderItem={({ item, index }) => (
                                                        <View style={{ width: "48%", marginTop: 10 }}>
                                                            <TouchableOpacity onPress={() => { this.changeRadioBtnImageValue(item) }} style={{ flex: 1 }} activeOpacity={0.75}>
                                                                <Image onLoadStart={() => { this.setState({ imageAnimating: true }) }} onLoadEnd={() => { this.setState({ imageAnimating: false }) }} source={{ uri: item.answer_title }} style={{ height: 166, width: '100%', borderWidth: 4, borderColor: item.set == 1 ? '#00AFF0' : '#eaeaea', borderRadius: 10 }} />
                                                                <ActivityIndicator color="black" animating={this.state.imageAnimating} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
                                                            </TouchableOpacity>

                                                        </View>

                                                    )}
                                                />
                                                {this.state.errorRadio != '' ? <Text style={{ padding: 10, fontFamily: 'Gotham-Medium', color: 'red', alignSelf: 'flex-start', fontSize: 14 }}>{this.state.errorRadio}</Text> : null}
                                            </View>

                                            :
                                            this.state.surveyDetailData[this.state.index].anslist.map((item, index) => (
                                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                                    <Text style={{ marginTop: 35, paddingLeft: 5, fontFamily: 'Gotham-Medium', flex: 1 }}>{item.answer_title}</Text>
                                                    <DropDown
                                                        placeholder="Select Rank"
                                                        data={this.state.dropDownData}
                                                        value={this.state.selectRank[index]}
                                                        onSelect={value => {
                                                            this.onDropDown(value, index, item);
                                                        }}
                                                        Style={{ width: '45%', marginTop: 0, marginHorizontal: 0, flex: 1 }}
                                                    />

                                                </View>
                                            ))
                            :
                            null
                    }

                </ScrollView>

                <View style={{ justifyContent: 'flex-end', marginHorizontal: 27 }}>
                    {
                        currentQuestion == questionCount ?
                            <TouchableOpacity onPress={() => { this.navigateSubmit() }} activeOpacity={0.6}>
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
    const AUTH = state.LoginData.token
    const surveyDetailData = state.SurveyData.surveyDetailData
    const answerArray = state.SurveyData.answerArray
    return { AUTH, surveyDetailData, answerArray }
}
export default connect(mapStateToProps, { surveyDetail })(Que1)
