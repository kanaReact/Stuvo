import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, SafeAreaView, TextInput, FlatList, Keyboard, ActivityIndicator, ScrollView, Dimensions } from 'react-native'
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
const { width, height } = Dimensions.get('window')
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
            otherOption: '',
            commentOption: '',
            otherOptionInput: '',
            commentOptionInput: '',
            questionListArray: [],
            commentOptionCheckBox: '',
            commentOptionCheckBoxInput: '',
            commentOptionRank: '',
            commentOptionRankInput: '',
            otherOptionRadioImage: '',
            otherOptionRadioImageInput: '',
            commentOptionRadioImage: '',
            commentOptionRadioImageInput: '',
            otherOptionError: '',
            commentOptinError: '',
            keyboardStatus: '',
            noData: false,
            selected: false,
            dropDownFlag: []
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
    componentDidMount() {
        this.keyboardDidShowSubscription = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                this.setState({ keyboardStatus: '1' });
            },
        );
        this.keyboardDidHideSubscription = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                this.setState({ keyboardStatus: '0' });
            },
        );
    }

    componentWillUnmount() {
        this.keyboardDidShowSubscription.remove();
        this.keyboardDidHideSubscription.remove();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ loading: false })
        this.setState({ otherOptionError: '', commentOptinError: '', selected: false })
        if (nextProps.surveyDetailData != this.state.surveyDetailData) {
            this.setState({ surveyDetailData: nextProps.surveyDetailData, type: '', textInputAnswer: '' })
        }
        if (nextProps.surveyDetailData.length != 0) {
            if (nextProps.surveyDetailData[this.state.index].answeroption == "radiobutton") {
                let tempArrayRadioBtn = []
                let comment = nextProps.surveyDetailData[this.state.index].comment
                this.setState({ commentOption: comment })
                nextProps.surveyDetailData[this.state.index].anslist.map((item, index) => {
                    tempArrayRadioBtn.push({
                        answer_title: item.answer_title,
                        serve_id: item.serve_id,
                        question_id: item.question_id,
                        set: '',
                        id: item.id,
                        question: nextProps.surveyDetailData[this.state.index].question,
                        answeroption: 'radiobutton',
                        other_option: item.other_option
                    })
                })
                this.setState({ radiobuttonArray: tempArrayRadioBtn })
            }
            else if (nextProps.surveyDetailData[this.state.index].answeroption == "checkbox") {
                let tempArrayRadioBtn = []
                let comment = nextProps.surveyDetailData[this.state.index].comment
                this.setState({ commentOptionCheckBox: comment })
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
                let comment = nextProps.surveyDetailData[this.state.index].comment
                this.setState({ commentOptionRadioImage: comment })
                nextProps.surveyDetailData[this.state.index].anslist.map((item, index) => {
                    tempArrayRadioBtnImage.push({
                        answer_title: item.answer_title,
                        serve_id: item.serve_id,
                        question_id: item.question_id,
                        set: '',
                        id: item.id,
                        question: nextProps.surveyDetailData[this.state.index].question,
                        answeroption: 'radiobuttonImage',
                        other_option: item.other_option
                    })
                })
                this.setState({ radioButtonWithImageArray: tempArrayRadioBtnImage })
            }
            else if (nextProps.surveyDetailData[this.state.index].answeroption == "rank") {
                let comment = nextProps.surveyDetailData[this.state.index].comment
                this.setState({ selectRank: [], question: nextProps.surveyDetailData[this.state.index].question, commentOptionRank: comment })
                let tempArrayRank = []
                nextProps.surveyDetailData[this.state.index].anslist.map((item, index) => {
                    let val = index + 1
                    tempArrayRank.push({ id: val, name: val })
                })
                this.setState({ dropDownData: tempArrayRank })
            }
        } else {
            this.setState({ noData: true })
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
                    otherOption: data.other_option,
                    selected: true
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
                    otherOptionInput: '',
                    otherOptionError: '',
                    selected: false
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
                    otherOptionRadioImage: data.other_option,
                    selected: true
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
                    otherOptionRadioImageInput: '',
                    otherOptionError: '',
                    selected: false
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
        this.setState({ errorRadio: '' })
        let temp = this.state.selectRank;
        temp[index] = item;
        this.setState({ selectRank: temp, type: 'rank', survey_id: value.serve_id, question_id: value.question_id, });
        if (tempRankid.includes(value.id) == false) {
            this.state.dropDownFlag.push(value.id)
        }
        tempRankAns[index] = value.answer_title;
        tempRankid[index] = value.id;
        tempRank[index] = item.name;

    }
    checkIfDuplicateExists(array) {
        console.log('set array:', new Set(array).size + ' ' + 'array length', array.length)
        return new Set(array).size !== array.length
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
                let answer = this.state.textInputAnswer;
                this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer })
                this.setState({ index: this.state.index + 1 })
            }
            else {
                this.setState({ errorInput: 'Please enter answer' })
            }
        }
        else if (this.state.surveyDetailData[this.state.index].answeroption == "radiobutton") {
            if (this.state.type != '') {
                if (this.state.commentOption == 'Y') {
                    if (this.state.commentOptionInput == '') {
                        this.setState({ commentOptinError: 'Please enter answer' })
                    }
                    else {
                        if (this.state.otherOption == 'Y') {
                            if (this.state.otherOptionInput == '') {
                                this.setState({ otherOptionError: 'Please enter answer' })
                            }
                            else {
                                this.setState({ loading: true })
                                const { id } = this.props.route.params
                                this.props.surveyDetail(this.props.AUTH, id)
                                let survey_id = this.state.survey_id;
                                let question_id = this.state.question_id;
                                let answer_id = this.state.answer_id;
                                let question = this.state.question;
                                let answeroption = this.state.answeroption;
                                let type = this.state.type;
                                let answer = "true";
                                let other_option = this.state.otherOption
                                let otherOptionAnswer = this.state.otherOptionInput
                                let comment = this.state.commentOption
                                let commentOptionAnswer = this.state.commentOptionInput;
                                let select = this.state.selected
                                this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer, other_option: other_option, otherOptionAnswer: otherOptionAnswer, select: select })
                                this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                                this.setState({ index: this.state.index + 1, otherOptionInput: '', commentOptionInput: '', otherOption: '', commentOption: '' })
                            }
                        } else {
                            this.setState({ loading: true })
                            const { id } = this.props.route.params
                            this.props.surveyDetail(this.props.AUTH, id)
                            let survey_id = this.state.survey_id;
                            let question_id = this.state.question_id;
                            let answer_id = this.state.answer_id;
                            let question = this.state.question;
                            let answeroption = this.state.answeroption;
                            let type = this.state.type;
                            let answer = "true";
                            let other_option = this.state.otherOption
                            let otherOptionAnswer = this.state.otherOptionInput
                            let comment = this.state.commentOption
                            let commentOptionAnswer = this.state.commentOptionInput
                            let select = this.state.selected
                            this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer, other_option: other_option, otherOptionAnswer: otherOptionAnswer, select: select })
                            this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                            this.setState({ index: this.state.index + 1, otherOptionInput: '', commentOptionInput: '', otherOption: '', commentOption: '' })
                        }
                    }
                }
                else {
                    if (this.state.otherOption == 'Y') {
                        if (this.state.otherOptionInput == '') {
                            this.setState({ otherOptionError: 'Please enter answer' })
                        }
                        else {
                            this.setState({ loading: true })
                            const { id } = this.props.route.params
                            this.props.surveyDetail(this.props.AUTH, id)
                            let survey_id = this.state.survey_id;
                            let question_id = this.state.question_id;
                            let answer_id = this.state.answer_id;
                            let question = this.state.question;
                            let answeroption = this.state.answeroption;
                            let type = this.state.type;
                            let answer = "true";
                            let other_option = this.state.otherOption
                            let otherOptionAnswer = this.state.otherOptionInput
                            let comment = this.state.commentOption
                            let commentOptionAnswer = this.state.commentOptionInput
                            let select = this.state.selected
                            this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer, other_option: other_option, otherOptionAnswer: otherOptionAnswer, select: select })
                            this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                            this.setState({ index: this.state.index + 1, otherOptionInput: '', commentOptionInput: '', otherOption: '', commentOption: '' })
                        }
                    } else {
                        this.setState({ loading: true })
                        const { id } = this.props.route.params
                        this.props.surveyDetail(this.props.AUTH, id)
                        let survey_id = this.state.survey_id;
                        let question_id = this.state.question_id;
                        let answer_id = this.state.answer_id;
                        let question = this.state.question;
                        let answeroption = this.state.answeroption;
                        let type = this.state.type;
                        let answer = "true";
                        let other_option = this.state.otherOption
                        let otherOptionAnswer = this.state.otherOptionInput
                        let comment = this.state.commentOption
                        let commentOptionAnswer = this.state.commentOptionInput
                        let select = this.state.selected
                        this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer, other_option: other_option, otherOptionAnswer: otherOptionAnswer, select: select })
                        this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                        this.setState({ index: this.state.index + 1, otherOptionInput: '', commentOptionInput: '', otherOption: '', commentOption: '' })
                    }
                }
            }
            else {
                this.setState({ errorRadio: 'Please select answer' })
            }
        }
        else if (this.state.surveyDetailData[this.state.index].answeroption == "radiobuttonImage") {
            if (this.state.type != '') {
                if (this.state.commentOptionRadioImage == 'Y') {
                    if (this.state.commentOptionRadioImageInput == '') {
                        this.setState({ commentOptinError: 'Please enter answer' })
                    }
                    else {
                        if (this.state.otherOptionRadioImage == 'Y') {
                            if (this.state.otherOptionRadioImageInput == '') {
                                this.setState({ otherOptionError: 'Please enter answer' })
                            }
                            else {
                                this.setState({ loading: true })
                                const { id } = this.props.route.params
                                this.props.surveyDetail(this.props.AUTH, id)
                                let survey_id = this.state.survey_id;
                                let question_id = this.state.question_id;
                                let answer_id = this.state.answer_id;
                                let question = this.state.question;
                                let answeroption = this.state.answeroption;
                                let type = this.state.type;
                                let answer = "true";
                                let other_option = this.state.otherOptionRadioImage;
                                let otherOptionAnswer = this.state.otherOptionRadioImageInput;
                                let comment = this.state.commentOptionRadioImage;
                                let commentOptionAnswer = this.state.commentOptionRadioImageInput;
                                let select = this.state.selected
                                this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer, other_option: other_option, otherOptionAnswer: otherOptionAnswer, select: select })
                                this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                                this.setState({ index: this.state.index + 1, otherOptionRadioImage: '', otherOptionRadioImageInput: '', commentOptionRadioImage: '', commentOptionRadioImageInput: '' })
                            }
                        } else {
                            this.setState({ loading: true })
                            const { id } = this.props.route.params
                            this.props.surveyDetail(this.props.AUTH, id)
                            let survey_id = this.state.survey_id;
                            let question_id = this.state.question_id;
                            let answer_id = this.state.answer_id;
                            let question = this.state.question;
                            let answeroption = this.state.answeroption;
                            let type = this.state.type;
                            let answer = "true";
                            let other_option = this.state.otherOptionRadioImage;
                            let otherOptionAnswer = this.state.otherOptionRadioImageInput;
                            let comment = this.state.commentOptionRadioImage;
                            let commentOptionAnswer = this.state.commentOptionRadioImageInput;
                            let select = this.state.selected
                            this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer, other_option: other_option, otherOptionAnswer: otherOptionAnswer, select: select })
                            this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                            this.setState({ index: this.state.index + 1, otherOptionRadioImage: '', otherOptionRadioImageInput: '', commentOptionRadioImage: '', commentOptionRadioImageInput: '' })

                        }
                    }
                }
                else {
                    if (this.state.otherOptionRadioImage == 'Y') {
                        if (this.state.otherOptionRadioImageInput == '') {
                            this.setState({ otherOptionError: 'Please enter answer' })
                        }
                        else {
                            this.setState({ loading: true })
                            const { id } = this.props.route.params
                            this.props.surveyDetail(this.props.AUTH, id)
                            let survey_id = this.state.survey_id;
                            let question_id = this.state.question_id;
                            let answer_id = this.state.answer_id;
                            let question = this.state.question;
                            let answeroption = this.state.answeroption;
                            let type = this.state.type;
                            let answer = "true";
                            let other_option = this.state.otherOptionRadioImage;
                            let otherOptionAnswer = this.state.otherOptionRadioImageInput;
                            let comment = this.state.commentOptionRadioImage;
                            let commentOptionAnswer = this.state.commentOptionRadioImageInput;
                            let select = this.state.selected
                            this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer, other_option: other_option, otherOptionAnswer: otherOptionAnswer, select: select })
                            this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                            this.setState({ index: this.state.index + 1, otherOptionRadioImage: '', otherOptionRadioImageInput: '', commentOptionRadioImage: '', commentOptionRadioImageInput: '' })

                        }
                    } else {
                        this.setState({ loading: true })
                        const { id } = this.props.route.params
                        this.props.surveyDetail(this.props.AUTH, id)
                        let survey_id = this.state.survey_id;
                        let question_id = this.state.question_id;
                        let answer_id = this.state.answer_id;
                        let question = this.state.question;
                        let answeroption = this.state.answeroption;
                        let type = this.state.type;
                        let answer = "true";
                        let other_option = this.state.otherOptionRadioImage;
                        let otherOptionAnswer = this.state.otherOptionRadioImageInput;
                        let comment = this.state.commentOptionRadioImage;
                        let commentOptionAnswer = this.state.commentOptionRadioImageInput;
                        let select = this.state.selected
                        this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer, other_option: other_option, otherOptionAnswer: otherOptionAnswer, select: select })
                        this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                        this.setState({ index: this.state.index + 1, otherOptionRadioImage: '', otherOptionRadioImageInput: '', commentOptionRadioImage: '', commentOptionRadioImageInput: '' })
                    }
                }
            }
            else {
                this.setState({ errorRadio: 'Please select answer' })
            }
        }
        else if (this.state.surveyDetailData[this.state.index].answeroption == "checkbox") {
            let min = this.state.surveyDetailData[this.state.index]?.min
            let max = this.state.surveyDetailData[this.state.index]?.max
            if (temp.length != 0) {
                if (this.state.commentOptionCheckBox == 'Y') {
                    if (this.state.commentOptionCheckBoxInput == '') {
                        this.setState({ commentOptinError: 'Please enter answer' })
                    }
                    else {
                        if (min != null && max != null) {
                            if (max < temp.length) {
                                alert('You can not select more than ' + max + ' answer')
                            }
                            else if (temp.length < min) {
                                alert('You have to select minimum ' + min + ' answer')
                            }
                            else if (temp.length > min && temp.length < max) {
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
                                let comment = this.state.commentOptionCheckBox;
                                let commentOptionAnswer = this.state.commentOptionCheckBoxInput
                                this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer })
                                this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                                this.setState({ index: this.state.index + 1, commentOptionCheckBoxInput: '', commentOptionCheckBox: '' })
                                temp = [];
                                tempid = [];
                            }
                            else if (min >= temp.length || max == temp.length) {
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
                                let comment = this.state.commentOptionCheckBox;
                                let commentOptionAnswer = this.state.commentOptionCheckBoxInput
                                this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer })
                                this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                                this.setState({ index: this.state.index + 1, commentOptionCheckBoxInput: '', commentOptionCheckBox: '' })
                                temp = [];
                                tempid = [];
                            }
                        }
                        else {
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
                            let comment = this.state.commentOptionCheckBox;
                            let commentOptionAnswer = this.state.commentOptionCheckBoxInput
                            this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer })
                            this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                            this.setState({ index: this.state.index + 1, commentOptionCheckBoxInput: '', commentOptionCheckBox: '' })
                            temp = [];
                            tempid = [];
                        }
                    }
                }
                else {
                    if (min != null && max != null) {
                        if (max < temp.length) {
                            alert('You can not select more than ' + max + ' answer')
                        }
                        else if (temp.length < min) {
                            alert('You have to select minimum ' + min + ' answer')
                        }
                        else if (temp.length > min && temp.length < max) {
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
                            let comment = this.state.commentOptionCheckBox;
                            let commentOptionAnswer = this.state.commentOptionCheckBoxInput
                            this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer })
                            this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                            this.setState({ index: this.state.index + 1, commentOptionCheckBoxInput: '', commentOptionCheckBox: '' })
                            temp = [];
                            tempid = [];
                        }
                        else if (min >= temp.length || max == temp.length) {
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
                            let comment = this.state.commentOptionCheckBox;
                            let commentOptionAnswer = this.state.commentOptionCheckBoxInput
                            this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer })
                            this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                            this.setState({ index: this.state.index + 1, commentOptionCheckBoxInput: '', commentOptionCheckBox: '' })
                            temp = [];
                            tempid = [];
                        }
                    }
                    else {
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
                        let comment = this.state.commentOptionCheckBox;
                        let commentOptionAnswer = this.state.commentOptionCheckBoxInput
                        this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer })
                        this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                        this.setState({ index: this.state.index + 1, commentOptionCheckBoxInput: '', commentOptionCheckBox: '' })
                        temp = [];
                        tempid = [];
                    }
                }
            }
            else {
                this.setState({ errorRadio: 'Please select answer' })
            }
        }
        else {
            console.log('check:', tempRank.length)

            if (this.state.dropDownData.length == this.state.dropDownFlag.length) {

                if (this.checkIfDuplicateExists(tempRank) == true) {
                    this.setState({ errorRadio: 'You can not select same rank' })
                }
                else {
                    if (this.state.commentOptionRank == 'Y') {
                        if (this.state.commentOptionRankInput == '') {
                            this.setState({ commentOptinError: 'Please enter answer' })
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
                            let comment = this.state.commentOptionRank;
                            let commentOptionAnswer = this.state.commentOptionRankInput;
                            this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, rank: rank, type: type, answer: answer })
                            this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                            this.setState({ index: this.state.index + 1, commentOptionRankInput: '', commentOptionRank: '' })
                            tempRank = [];
                            tempRankid = [];
                            tempRankAns = [];
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
                        let comment = this.state.commentOptionRank;
                        let commentOptionAnswer = this.state.commentOptionRankInput;
                        this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, rank: rank, type: type, answer: answer })
                        this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                        this.setState({ index: this.state.index + 1, commentOptionRankInput: '', commentOptionRank: '' })
                        tempRank = [];
                        tempRankid = [];
                        tempRankAns = [];
                    }

                }
            }
            else {
                console.log('check:', tempRank.length)
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
                this.props.navigation.navigate('QueSubmit', { answerArray: this.state.answerArray, questionList: this.state.questionListArray });
            }
            else {
                this.setState({ errorInput: 'Please enter answer' })
            }
        }
        if (this.state.surveyDetailData[this.state.index].answeroption === "radiobutton") {
            if (this.state.type != '') {
                if (this.state.commentOption == 'Y') {
                    if (this.state.commentOptionInput == '') {
                        this.setState({ commentOptinError: 'Please enter answer' })
                    }
                    else {
                        if (this.state.otherOption == 'Y') {
                            if (this.state.otherOptionInput == '') {
                                this.setState({ otherOptionError: 'Please enter answer' })
                            }
                            else {
                                const { id } = this.props.route.params
                                let survey_id = this.state.survey_id;
                                let question_id = this.state.question_id;
                                let answer_id = this.state.answer_id;
                                let question = this.state.question;
                                let answeroption = this.state.answeroption;
                                let type = this.state.type;
                                let answer = "true";
                                let other_option = this.state.otherOption
                                let otherOptionAnswer = this.state.otherOptionInput
                                let comment = this.state.commentOption
                                let commentOptionAnswer = this.state.commentOptionInput
                                let select = this.state.selected
                                this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer, other_option: other_option, otherOptionAnswer: otherOptionAnswer, select: select })
                                this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                                this.props.navigation.navigate('QueSubmit', { answerArray: this.state.answerArray, questionList: this.state.questionListArray });

                            }
                        } else {
                            const { id } = this.props.route.params
                            let survey_id = this.state.survey_id;
                            let question_id = this.state.question_id;
                            let answer_id = this.state.answer_id;
                            let question = this.state.question;
                            let answeroption = this.state.answeroption;
                            let type = this.state.type;
                            let answer = "true";
                            let other_option = this.state.otherOption
                            let otherOptionAnswer = this.state.otherOptionInput
                            let comment = this.state.commentOption
                            let commentOptionAnswer = this.state.commentOptionInput
                            let select = this.state.selected
                            this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer, other_option: other_option, otherOptionAnswer: otherOptionAnswer, select: select })
                            this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                            this.props.navigation.navigate('QueSubmit', { answerArray: this.state.answerArray, questionList: this.state.questionListArray });
                        }
                    }
                }
                else {
                    if (this.state.otherOption == 'Y') {
                        if (this.state.otherOptionInput == '') {
                            this.setState({ otherOptionError: 'Please enter answer' })
                        }
                        else {
                            const { id } = this.props.route.params
                            let survey_id = this.state.survey_id;
                            let question_id = this.state.question_id;
                            let answer_id = this.state.answer_id;
                            let question = this.state.question;
                            let answeroption = this.state.answeroption;
                            let type = this.state.type;
                            let answer = "true";
                            let other_option = this.state.otherOption
                            let otherOptionAnswer = this.state.otherOptionInput
                            let comment = this.state.commentOption
                            let commentOptionAnswer = this.state.commentOptionInput
                            let select = this.state.selected
                            this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer, other_option: other_option, otherOptionAnswer: otherOptionAnswer, select: select })
                            this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                            this.props.navigation.navigate('QueSubmit', { answerArray: this.state.answerArray, questionList: this.state.questionListArray });

                        }
                    } else {
                        const { id } = this.props.route.params
                        let survey_id = this.state.survey_id;
                        let question_id = this.state.question_id;
                        let answer_id = this.state.answer_id;
                        let question = this.state.question;
                        let answeroption = this.state.answeroption;
                        let type = this.state.type;
                        let answer = "true";
                        let other_option = this.state.otherOption
                        let otherOptionAnswer = this.state.otherOptionInput
                        let comment = this.state.commentOption
                        let commentOptionAnswer = this.state.commentOptionInput
                        let select = this.state.selected
                        this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer, other_option: other_option, otherOptionAnswer: otherOptionAnswer, select: select })
                        this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                        this.props.navigation.navigate('QueSubmit', { answerArray: this.state.answerArray, questionList: this.state.questionListArray });

                    }
                }
            }
            else {
                this.setState({ errorRadio: 'Please select answer' })
            }
        }
        if (this.state.surveyDetailData[this.state.index].answeroption == "radiobuttonImage") {
            if (this.state.type != '') {
                if (this.state.commentOptionRadioImage == 'Y') {
                    if (this.state.commentOptionRadioImageInput == '') {
                        this.setState({ commentOptinError: 'Please enter answer' })
                    }
                    else {
                        if (this.state.otherOptionRadioImage == 'Y') {
                            if (this.state.otherOptionRadioImageInput == '') {
                                this.setState({ otherOptionError: 'Please enter answer' })
                            }
                            else {
                                const { id } = this.props.route.params
                                let survey_id = this.state.survey_id;
                                let question_id = this.state.question_id;
                                let answer_id = this.state.answer_id;
                                let question = this.state.question;
                                let answeroption = this.state.answeroption;
                                let type = this.state.type;
                                let answer = "true";
                                let other_option = this.state.otherOptionRadioImage;
                                let otherOptionAnswer = this.state.otherOptionRadioImageInput;
                                let comment = this.state.commentOptionRadioImage;
                                let commentOptionAnswer = this.state.commentOptionRadioImageInput;
                                let select = this.state.selected
                                this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer, other_option: other_option, otherOptionAnswer: otherOptionAnswer, select: select })
                                this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                                this.props.navigation.navigate('QueSubmit', { answerArray: this.state.answerArray, questionList: this.state.questionListArray });
                            }
                        } else {
                            const { id } = this.props.route.params
                            let survey_id = this.state.survey_id;
                            let question_id = this.state.question_id;
                            let answer_id = this.state.answer_id;
                            let question = this.state.question;
                            let answeroption = this.state.answeroption;
                            let type = this.state.type;
                            let answer = "true";
                            let other_option = this.state.otherOptionRadioImage;
                            let otherOptionAnswer = this.state.otherOptionRadioImageInput;
                            let comment = this.state.commentOptionRadioImage;
                            let commentOptionAnswer = this.state.commentOptionRadioImageInput;
                            let select = this.state.selected
                            this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer, other_option: other_option, otherOptionAnswer: otherOptionAnswer, select: select })
                            this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                            this.props.navigation.navigate('QueSubmit', { answerArray: this.state.answerArray, questionList: this.state.questionListArray });
                        }
                    }
                }
                else {
                    if (this.state.otherOptionRadioImage == 'Y') {
                        if (this.state.otherOptionRadioImageInput == '') {
                            this.setState({ otherOptionError: 'Please enter answer' })
                        }
                        else {
                            const { id } = this.props.route.params
                            let survey_id = this.state.survey_id;
                            let question_id = this.state.question_id;
                            let answer_id = this.state.answer_id;
                            let question = this.state.question;
                            let answeroption = this.state.answeroption;
                            let type = this.state.type;
                            let answer = "true";
                            let other_option = this.state.otherOptionRadioImage;
                            let otherOptionAnswer = this.state.otherOptionRadioImageInput;
                            let comment = this.state.commentOptionRadioImage;
                            let commentOptionAnswer = this.state.commentOptionRadioImageInput;
                            let select = this.state.selected
                            this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer, other_option: other_option, otherOptionAnswer: otherOptionAnswer, select: select })
                            this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                            this.props.navigation.navigate('QueSubmit', { answerArray: this.state.answerArray, questionList: this.state.questionListArray });
                        }
                    } else {
                        const { id } = this.props.route.params
                        let survey_id = this.state.survey_id;
                        let question_id = this.state.question_id;
                        let answer_id = this.state.answer_id;
                        let question = this.state.question;
                        let answeroption = this.state.answeroption;
                        let type = this.state.type;
                        let answer = "true";
                        let other_option = this.state.otherOptionRadioImage;
                        let otherOptionAnswer = this.state.otherOptionRadioImageInput;
                        let comment = this.state.commentOptionRadioImage;
                        let commentOptionAnswer = this.state.commentOptionRadioImageInput;
                        let select = this.state.selected
                        this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer, other_option: other_option, otherOptionAnswer: otherOptionAnswer, select: select })
                        this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                        this.props.navigation.navigate('QueSubmit', { answerArray: this.state.answerArray, questionList: this.state.questionListArray });
                    }
                }
            }
            else {
                this.setState({ errorRadio: 'Please select answer' })
            }
        }
        else if (this.state.surveyDetailData[this.state.index].answeroption == "checkbox") {
            let min = this.state.surveyDetailData[this.state.index]?.min
            let max = this.state.surveyDetailData[this.state.index]?.max
            if (temp.length != 0) {
                if (this.state.commentOptionCheckBox == 'Y') {
                    if (this.state.commentOptionCheckBoxInput == '') {
                        this.setState({ commentOptinError: 'Please enter comment' })
                    }
                    else {
                        if (min != null && max != null) {
                            if (max < temp.length) {
                                alert('You can not select more than ' + max + ' answer')
                            }
                            else if (temp.length < min) {
                                alert('You have to select minimum ' + min + ' answer')
                            }
                            else if (temp.length > min && temp.length < max) {
                                const { id } = this.props.route.params
                                let survey_id = this.state.survey_id;
                                let question_id = this.state.question_id;
                                let answer_id = tempid;
                                let question = this.state.question;
                                let answeroption = temp;
                                let type = this.state.type;
                                let answer = "true"
                                let comment = this.state.commentOptionCheckBox;
                                let commentOptionAnswer = this.state.commentOptionCheckBoxInput
                                this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer })
                                this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                                this.props.navigation.navigate('QueSubmit', { answerArray: this.state.answerArray, questionList: this.state.questionListArray });
                                temp = []
                                tempid = [];

                            }
                            else if (min >= temp.length || max == temp.length) {
                                const { id } = this.props.route.params
                                let survey_id = this.state.survey_id;
                                let question_id = this.state.question_id;
                                let answer_id = tempid;
                                let question = this.state.question;
                                let answeroption = temp;
                                let type = this.state.type;
                                let answer = "true"
                                let comment = this.state.commentOptionCheckBox;
                                let commentOptionAnswer = this.state.commentOptionCheckBoxInput
                                this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer })
                                this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                                this.props.navigation.navigate('QueSubmit', { answerArray: this.state.answerArray, questionList: this.state.questionListArray });
                                temp = []
                                tempid = [];
                            }
                        }
                        else {
                            const { id } = this.props.route.params
                            let survey_id = this.state.survey_id;
                            let question_id = this.state.question_id;
                            let answer_id = tempid;
                            let question = this.state.question;
                            let answeroption = temp;
                            let type = this.state.type;
                            let answer = "true"
                            let comment = this.state.commentOptionCheckBox;
                            let commentOptionAnswer = this.state.commentOptionCheckBoxInput
                            this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer })
                            this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                            this.props.navigation.navigate('QueSubmit', { answerArray: this.state.answerArray, questionList: this.state.questionListArray });
                            temp = []
                            tempid = [];
                        }
                    }
                }
                else {
                    if (min != null && max != null) {
                        if (max < temp.length) {
                            alert('You can not select more than ' + max + ' answer')
                        }
                        else if (temp.length < min) {
                            alert('You have to select minimum ' + min + ' answer')
                        }
                        else if (temp.length > min && temp.length < max) {
                            const { id } = this.props.route.params
                            let survey_id = this.state.survey_id;
                            let question_id = this.state.question_id;
                            let answer_id = tempid;
                            let question = this.state.question;
                            let answeroption = temp;
                            let type = this.state.type;
                            let answer = "true"
                            let comment = this.state.commentOptionCheckBox;
                            let commentOptionAnswer = this.state.commentOptionCheckBoxInput
                            this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer })
                            this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                            this.props.navigation.navigate('QueSubmit', { answerArray: this.state.answerArray, questionList: this.state.questionListArray });
                            temp = []
                            tempid = [];

                        }
                        else if (min >= temp.length || max == temp.length) {
                            const { id } = this.props.route.params
                            let survey_id = this.state.survey_id;
                            let question_id = this.state.question_id;
                            let answer_id = tempid;
                            let question = this.state.question;
                            let answeroption = temp;
                            let type = this.state.type;
                            let answer = "true"
                            let comment = this.state.commentOptionCheckBox;
                            let commentOptionAnswer = this.state.commentOptionCheckBoxInput
                            this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer })
                            this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                            this.props.navigation.navigate('QueSubmit', { answerArray: this.state.answerArray, questionList: this.state.questionListArray });
                            temp = []
                            tempid = [];
                        }
                    }
                    else {
                        const { id } = this.props.route.params
                        let survey_id = this.state.survey_id;
                        let question_id = this.state.question_id;
                        let answer_id = tempid;
                        let question = this.state.question;
                        let answeroption = temp;
                        let type = this.state.type;
                        let answer = "true"
                        let comment = this.state.commentOptionCheckBox;
                        let commentOptionAnswer = this.state.commentOptionCheckBoxInput
                        this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, type: type, answer: answer })
                        this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                        this.props.navigation.navigate('QueSubmit', { answerArray: this.state.answerArray, questionList: this.state.questionListArray });
                        temp = []
                        tempid = [];
                    }
                }
            }
            else {
                this.setState({ errorRadio: 'Please select answer' })
            }
        }
        else {

            if (this.state.dropDownData.length != 0) {
                console.log('check:', tempRank.length)
                if (this.state.dropDownData.length == this.state.dropDownFlag.length) {
                    if (this.checkIfDuplicateExists(tempRank) == true) {
                        this.setState({ errorRadio: 'You can not select same rank' })
                    }
                    else {
                        if (this.state.commentOptionRank == 'Y') {
                            if (this.state.commentOptionRankInput == '') {
                                this.setState({ commentOptinError: 'Please enter answer' })
                            }
                            else {
                                const { id } = this.props.route.params
                                let survey_id = this.state.survey_id;
                                let question_id = this.state.question_id;
                                let answer_id = tempRankid;
                                let answeroption = tempRankAns;
                                let question = this.state.question;
                                let rank = tempRank;
                                let answer = "true";
                                let type = this.state.type;
                                let comment = this.state.commentOptionRank;
                                let commentOptionAnswer = this.state.commentOptionRankInput
                                this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, rank: rank, type: type, answer: answer })
                                this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                                this.props.navigation.navigate('QueSubmit', { answerArray: this.state.answerArray, questionList: this.state.questionListArray });
                                tempRank = [];
                                tempRankid = [];
                                tempRankAns = [];

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
                            let type = this.state.type;
                            let comment = this.state.commentOptionRank;
                            let commentOptionAnswer = this.state.commentOptionRankInput
                            this.state.answerArray.push({ survey_id: survey_id, question_id: question_id, anstitle_id: answer_id, question: question, answeroption: answeroption, rank: rank, type: type, answer: answer })
                            this.state.questionListArray.push({ question_id: question_id, comment: comment, commentOptionAnswer: commentOptionAnswer })
                            this.props.navigation.navigate('QueSubmit', { answerArray: this.state.answerArray, questionList: this.state.questionListArray });
                            tempRank = [];
                            tempRankid = [];
                            tempRankAns = [];

                        }
                    }

                }
                else {
                    console.log('check:', tempRank.length)
                    this.setState({ errorRadio: 'Please select answer' })
                }
            }
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
        console.log('data rank::', tempRankid.length)
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
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: this.state.keyboardStatus == '1' ? 220 : 30, marginLeft: 16, marginRight: 24 }}>
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
                                    {this.state.errorRadio != '' && <Text style={{ padding: 10, fontFamily: 'Gotham-Medium', color: 'red', alignSelf: 'flex-start', fontSize: 14 }}>{this.state.errorRadio}</Text>}
                                    {
                                        this.state.otherOption == 'Y' &&
                                        <TextInput
                                            style={{ textAlignVertical: 'top', paddingLeft: 18, paddingRight: 5, paddingTop: 15, fontFamily: 'Gotham-Medium', color: '#919191', fontSize: 14, marginTop: 20, height: 131, borderRadius: 10, backgroundColor: '#F3F3F3' }}
                                            placeholder="Write other comment..."
                                            multiline={true}
                                            value={this.state.otherOptionInput}
                                            returnKeyType="done"
                                            onSubmitEditing={() => { Keyboard.dismiss() }}
                                            onChangeText={(text) => { this.setState({ otherOptionInput: text.trimStart(), otherOptionError: '' }) }}
                                        />
                                    }
                                    {this.state.otherOptionError != '' && <Text style={{ padding: 10, fontFamily: 'Gotham-Medium', color: 'red', alignSelf: 'flex-start', fontSize: 14 }}>{this.state.otherOptionError}</Text>}
                                    {
                                        this.state.commentOption == 'Y' &&
                                        <TextInput
                                            style={{ textAlignVertical: 'top', paddingLeft: 18, paddingRight: 5, paddingTop: 15, fontFamily: 'Gotham-Medium', color: '#919191', fontSize: 14, marginTop: 20, height: 131, borderRadius: 10, backgroundColor: '#F3F3F3' }}
                                            placeholder="Write comment..."
                                            multiline={true}
                                            value={this.state.commentOptionInput}
                                            returnKeyType="done"
                                            onSubmitEditing={() => { Keyboard.dismiss() }}
                                            onChangeText={(text) => { this.setState({ commentOptionInput: text.trimStart(), commentOptinError: '' }) }}
                                        />
                                    }
                                    {this.state.commentOptinError != '' && <Text style={{ padding: 10, fontFamily: 'Gotham-Medium', color: 'red', alignSelf: 'flex-start', fontSize: 14 }}>{this.state.commentOptinError}</Text>}
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
                                                        rightTextStyle={{ minWidth: width / 1.2 }}
                                                    />
                                                </View>
                                            ))
                                        }
                                        {this.state.errorRadio != '' && <Text style={{ padding: 10, fontFamily: 'Gotham-Medium', color: 'red', alignSelf: 'flex-start', fontSize: 14 }}>{this.state.errorRadio}</Text>}
                                        {
                                            this.state.commentOptionCheckBox == 'Y' &&
                                            <TextInput
                                                style={{ textAlignVertical: 'top', paddingLeft: 18, paddingRight: 5, paddingTop: 15, fontFamily: 'Gotham-Medium', color: '#919191', fontSize: 14, marginTop: 20, height: 131, borderRadius: 10, backgroundColor: '#F3F3F3' }}
                                                placeholder="Write comment..."
                                                multiline={true}
                                                value={this.state.commentOptionCheckBoxInput}
                                                returnKeyType="done"
                                                onSubmitEditing={() => { Keyboard.dismiss() }}
                                                onChangeText={(text) => { this.setState({ commentOptionCheckBoxInput: text.trimStart(), commentOptinError: '' }) }}
                                            />
                                        }
                                        {this.state.commentOptinError != '' && <Text style={{ padding: 10, fontFamily: 'Gotham-Medium', color: 'red', alignSelf: 'flex-start', fontSize: 14 }}>{this.state.commentOptinError}</Text>}
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
                                            {this.state.errorInput != '' && <Text style={{ padding: 10, fontFamily: 'Gotham-Medium', color: 'red', alignSelf: 'flex-start', fontSize: 14 }}>{this.state.errorInput}</Text>}
                                        </View>
                                        :
                                        this.state.surveyDetailData[this.state.index].answeroption == "radiobuttonImage" ?
                                            <View>
                                                <FlatList
                                                    data={this.state.radioButtonWithImageArray}
                                                    numColumns={2}
                                                    columnWrapperStyle={{ justifyContent: "space-between", }}
                                                    renderItem={({ item, index }) => (
                                                        item.other_option == 'N' ?
                                                            <View style={{ width: "48%", marginTop: 10 }}>
                                                                <TouchableOpacity onPress={() => { this.changeRadioBtnImageValue(item) }} style={{ flex: 1 }} activeOpacity={0.75}>
                                                                    <Image onLoadStart={() => { this.setState({ imageAnimating: true }) }} onLoadEnd={() => { this.setState({ imageAnimating: false }) }} source={{ uri: item.answer_title }} style={{ height: 166, width: '100%', borderWidth: 4, borderColor: item.set == 1 ? '#00AFF0' : '#eaeaea', borderRadius: 10 }} />
                                                                    <ActivityIndicator color="black" animating={this.state.imageAnimating} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
                                                                </TouchableOpacity>
                                                            </View>
                                                            :
                                                            <TouchableOpacity key={index} style={{
                                                                marginTop: 30, borderRadius: 30, minHeight: 41, justifyContent: 'center', paddingHorizontal: 18,
                                                                backgroundColor: item.set == 0 ? '#E0E0E066' : '#00AFF0', paddingVertical: 10, width: '100%'
                                                            }} activeOpacity={0.6}
                                                                onPress={() => { this.changeRadioBtnImageValue(item) }}>
                                                                <Text style={{
                                                                    fontSize: 14, fontFamily: 'Gotham-Medium',
                                                                    color: item.set == 0 ? '#272727' : '#FFFFFF'
                                                                }}>{item.answer_title}</Text>
                                                            </TouchableOpacity>

                                                    )}
                                                />
                                                {this.state.errorRadio != '' && <Text style={{ padding: 10, fontFamily: 'Gotham-Medium', color: 'red', alignSelf: 'flex-start', fontSize: 14 }}>{this.state.errorRadio}</Text>}
                                                {
                                                    this.state.otherOptionRadioImage == 'Y' &&
                                                    <TextInput
                                                        style={{ textAlignVertical: 'top', paddingLeft: 18, paddingRight: 5, paddingTop: 15, fontFamily: 'Gotham-Medium', color: '#919191', fontSize: 14, marginTop: 20, height: 131, borderRadius: 10, backgroundColor: '#F3F3F3' }}
                                                        placeholder="Write other comment..."
                                                        multiline={true}
                                                        value={this.state.otherOptionRadioImageInput}
                                                        returnKeyType="done"
                                                        onSubmitEditing={() => { Keyboard.dismiss() }}
                                                        onChangeText={(text) => { this.setState({ otherOptionRadioImageInput: text.trimStart(), otherOptionError: '' }) }}
                                                    />
                                                }
                                                {this.state.otherOptionError != '' && <Text style={{ padding: 10, fontFamily: 'Gotham-Medium', color: 'red', alignSelf: 'flex-start', fontSize: 14 }}>{this.state.otherOptionError}</Text>}
                                                {
                                                    this.state.commentOptionRadioImage == 'Y' &&
                                                    <TextInput
                                                        style={{ textAlignVertical: 'top', paddingLeft: 18, paddingRight: 5, paddingTop: 15, fontFamily: 'Gotham-Medium', color: '#919191', fontSize: 14, marginTop: 20, height: 131, borderRadius: 10, backgroundColor: '#F3F3F3' }}
                                                        placeholder="Write comment..."
                                                        multiline={true}
                                                        value={this.state.commentOptionRadioImageInput}
                                                        returnKeyType="done"
                                                        onSubmitEditing={() => { Keyboard.dismiss() }}
                                                        onChangeText={(text) => { this.setState({ commentOptionRadioImageInput: text.trimStart(), commentOptinError: '' }) }}
                                                    />
                                                }
                                                {this.state.commentOptinError != '' && <Text style={{ padding: 10, fontFamily: 'Gotham-Medium', color: 'red', alignSelf: 'flex-start', fontSize: 14 }}>{this.state.commentOptinError}</Text>}
                                            </View>
                                            :
                                            <View>
                                                {
                                                    this.state.surveyDetailData[this.state.index].anslist.map((item, index) => (
                                                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                                            <Text style={{ marginTop: 35, paddingLeft: 5, fontFamily: 'Gotham-Medium', flex: 1 }}>{item.answer_title}</Text>
                                                            <DropDown
                                                                placeholder="Select Rank"
                                                                data={this.state.dropDownData}
                                                                value={this.state.selectRank[index]}
                                                                onSelect={(value, key) => {
                                                                    this.onDropDown(value, index, item);

                                                                }}
                                                                Style={{ width: '45%', marginTop: 0, marginHorizontal: 0, flex: 1 }}
                                                            />
                                                        </View>
                                                    ))
                                                }
                                                {this.state.errorRadio != '' && <Text style={{ padding: 10, fontFamily: 'Gotham-Medium', color: 'red', alignSelf: 'flex-start', fontSize: 14 }}>{this.state.errorRadio}</Text>}
                                                {
                                                    this.state.commentOptionRank == 'Y' &&
                                                    <TextInput
                                                        style={{ textAlignVertical: 'top', paddingLeft: 18, paddingRight: 5, paddingTop: 15, fontFamily: 'Gotham-Medium', color: '#919191', fontSize: 14, marginTop: 20, height: 131, borderRadius: 10, backgroundColor: '#F3F3F3' }}
                                                        placeholder="Write something..."
                                                        multiline={true}
                                                        value={this.state.commentOptionRankInput}
                                                        returnKeyType="done"
                                                        onSubmitEditing={() => { Keyboard.dismiss() }}
                                                        onChangeText={(text) => { this.setState({ commentOptionRankInput: text.trimStart(), commentOptinError: '' }) }}
                                                    />
                                                }
                                                {this.state.commentOptinError != '' && <Text style={{ padding: 10, fontFamily: 'Gotham-Medium', color: 'red', alignSelf: 'flex-start', fontSize: 14 }}>{this.state.commentOptinError}</Text>}
                                            </View>
                            :
                            this.state.noData == true &&
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Gotham-Medium', fontSize: 15 }}>No Data Available</Text>
                            </View>
                    }

                </ScrollView>

                <View style={{ justifyContent: 'flex-end', marginHorizontal: 27, marginTop: 10 }}>
                    {
                        this.state.surveyDetailData.length !== 0 ?
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
                                </TouchableOpacity> : null
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