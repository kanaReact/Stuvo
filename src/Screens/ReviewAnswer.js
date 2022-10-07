import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  Modal,
  TextInput,
  Keyboard,
  ScrollView,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import styles from '../style/styles';
import SVGImg from '../Source/SVGImg';
import {connect} from 'react-redux';
import axios from 'axios';
import constant from '../Redux/config/constant';
import Spinner from '../Components/Spinner';
import CheckBox from 'react-native-check-box';
import ConfettiCannon from 'react-native-confetti-cannon';
import DropDown from '../Components/DropDown';
import Toast from 'react-native-tiny-toast';
var temp = [];
var tempid = [];
var tempRankAns = [];
var tempRankid = [];
var tempRank = [];
class ReviewAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          num: '1',
          que:
            'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod?',
          option: 'a.',
          optname: 'Yes',
          navigation: 'Que1',
        },
        {
          id: 2,
          num: '2',
          que:
            'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod?',
          option: 'a.',
          optname: 'School uniform',
          navigation: 'Que1',
        },
        {
          id: 3,
          num: '3',
          que:
            'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod?',
          option: '',
          optname: 'No answer',
          navigation: 'Que1',
        },
        {
          id: 4,
          num: '4',
          que:
            'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod?',
          option: 'b.',
          optname: 'No',
          navigation: 'Que1',
        },
        {
          id: 5,
          num: '5',
          que:
            'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod?',
          option: '',
          optname: 'No answer',
          navigation: 'Que1',
        },
      ],
      isVisible: false,
      btn: true,
      loading: false,
      answerArray: this.props.route.params.answerArray,
      editAnsModal: false,
      index: 0,
      radiobuttonArray: [],
      question_id: '',
      survey_id: '',
      answer: '',
      question: '',
      textInputAnswer: '',
      answeroption: '',
      answer_id: '',
      type: '',
      checkboxAnswer: [],
      checkboxArray: [],
      checkboxFlag: false,
      textInputAnswer: '',
      checkboxError: '',
      errorInput: '',
      radioButtonImageArray: [],
      showBtn: false,
      dropDownData: [],
      selectRank: [],
      rankFlag: false,
      errorRank: '',
      questionList: this.props.route.params.questionList,
      otherOption: '',
      commentOption: '',
      otherOptionInput: '',
      commentOptionInput: '',
      otherOptionError: '',
      commentOptionError: '',
      questionIndex: '',
    };
  }

  toggleModal() {
    this.explosion.start();
    // setTimeout(() => { this.setState({ isVisible: true }), 1500 })
  }

  call_submit_API() {
    this.setState({loading: true});
    let url = constant.BASE_URL + 'survey_form_submit';
    let data = new URLSearchParams();
    data.append('ans_array', JSON.stringify(this.state.answerArray));
    data.append('question_array', JSON.stringify(this.state.questionList));
    axios
      .post(url, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + this.props.AUTH,
        },
      })
      .then(async responseJson => {
        this.setState({loading: false});
        if (responseJson.data.status == 1) {
          this.explosion.start();
          await this.setState({isVisible: true, showBtn: true});
        } else {
          Toast.show(responseJson.data.message, {
            position: Toast.position.BOTTOM,
            containerStyle: {backgroundColor: 'black'},
            textStyle: {color: 'white'},
          });
          this.props.navigation.navigate('Question');
        }
      })
      .catch(error => {
        this.setState({loading: false});
        Toast.show('Internal server error, Please try again !!', {
          position: Toast.position.BOTTOM,
          containerStyle: {backgroundColor: 'black'},
          textStyle: {color: 'white'},
        });
      });
  }
  checkboxCheck(index, item) {
    if (
      this.state.answerArray[this.state.index].answeroption.includes(
        item.answer_title,
      ) !== false
    ) {
      return true;
    } else {
      return false;
    }
  }
  onCheckBoxChange(index, item) {
    this.setState({checkboxFlag: false, checkboxError: ''});
    let value = this.state.checkboxArray[index];
    if (value == false) {
      this.changeCheckboxValue(index, true);
      let que = this.state.answerArray[this.state.index].question;
      temp.push(item.answer_title);
      tempid.push(item.id);
      this.setState({
        type: 'checkbox',
        survey_id: item.serve_id,
        question_id: item.question_id,
        question: que,
      });
    } else if (value == true) {
      this.changeCheckboxValue(index, false);
      let tempIndex = temp.indexOf(item.answer_title);
      let tempidIndex = tempid.indexOf(item.id);
      if (temp.includes(item.answer_title) == true) {
        temp.splice(tempIndex, 1);
        tempid.splice(tempidIndex, 1);
      }
    }
  }
  async openEditAnsModal(index, item) {
    let tempRadioBtn = [];
    let tempImageRadioBtn = [];

    this.setState({index: index, editAnsModal: true});
    if (item.type == 'radiobutton') {
      let questionIndex = this.state.questionList.findIndex(
        val => val.question_id == item.question_id,
      );

      let comment = this.props.surveyDetailData[index].comment;
      let otherOption = item.other_option;
      this.setState({
        commentOption: comment,
        questionIndex: questionIndex,
        otherOption: otherOption,
      });
      if (comment == 'Y') {
        let quesComment = this.state.questionList[questionIndex]
          .commentOptionAnswer;
        this.setState({commentOptionInput: quesComment});
      }
      if (otherOption == 'Y') {
        let otherComment = item.otherOptionAnswer;
        this.setState({otherOptionInput: otherComment});
      }

      this.props.surveyDetailData[index].anslist.map((item, key) => {
        if (this.state.answerArray[index].anstitle_id == item.id) {
          this.setState({answeroption: item.answer_title});
          tempRadioBtn.push({
            answer_title: item.answer_title,
            serve_id: item.serve_id,
            question_id: item.question_id,
            set: 1,
            id: item.id,
            question: this.props.surveyDetailData[index].question,
            answeroption: 'radiobutton',
            other_option: item.other_option,
          });
        } else {
          tempRadioBtn.push({
            answer_title: item.answer_title,
            serve_id: item.serve_id,
            question_id: item.question_id,
            set: 0,
            id: item.id,
            question: this.props.surveyDetailData[index].question,
            answeroption: 'radiobutton',
            other_option: item.other_option,
          });
        }
      });
      this.setState({radiobuttonArray: tempRadioBtn});
    } else if (item.type == 'radiobuttonImage') {
      let questionIndex = this.state.questionList.findIndex(
        val => val.question_id == item.question_id,
      );
      let comment = this.props.surveyDetailData[index].comment;
      let otherOption = item.other_option;
      this.setState({
        commentOption: comment,
        questionIndex: questionIndex,
        otherOption: otherOption,
      });
      if (comment == 'Y') {
        let quesComment = this.state.questionList[questionIndex]
          .commentOptionAnswer;
        this.setState({commentOptionInput: quesComment});
      }
      if (otherOption == 'Y') {
        let otherComment = item.otherOptionAnswer;
        this.setState({otherOptionInput: otherComment});
      }
      this.props.surveyDetailData[index].anslist.map((item, key) => {
        if (this.state.answerArray[index].anstitle_id == item.id) {
          this.setState({answeroption: item.answer_title});
          tempImageRadioBtn.push({
            answer_title: item.answer_title,
            serve_id: item.serve_id,
            question_id: item.question_id,
            set: 1,
            id: item.id,
            question: this.props.surveyDetailData[index].question,
            answeroption: 'radiobuttonImage',
            other_option: item.other_option,
          });
        } else {
          tempImageRadioBtn.push({
            answer_title: item.answer_title,
            serve_id: item.serve_id,
            question_id: item.question_id,
            set: 0,
            id: item.id,
            question: this.props.surveyDetailData[index].question,
            answeroption: 'radiobuttonImage',
            other_option: item.other_option,
          });
        }
      });
      this.setState({radioButtonImageArray: tempImageRadioBtn});
    } else if (item.type == 'checkbox') {
      let questionIndex = this.state.questionList.findIndex(
        val => val.question_id == item.question_id,
      );
      let comment = this.props.surveyDetailData[index].comment;
      this.setState({questionIndex: questionIndex, commentOption: comment});

      if (comment == 'Y') {
        let quesComment = this.state.questionList[questionIndex]
          .commentOptionAnswer;
        this.setState({commentOptionInput: quesComment});
      }
      this.props.surveyDetailData[index].anslist.map((item, key) => {
        if (
          this.state.answerArray[index].anstitle_id.includes(item.id) == true
        ) {
          this.setState({checkboxFlag: true});
          this.changeCheckboxValue(key, true);
          temp.push(item.answer_title);
          tempid.push(item.id);
        } else {
          this.changeCheckboxValue(key, false);
        }
      });
    } else if (item.type == 'rank') {
      let tempRankArr = [];
      let unique = [];
      let questionIndex = this.state.questionList.findIndex(
        val => val.question_id == item.question_id,
      );
      let comment = this.props.surveyDetailData[index].comment;
      this.setState({questionIndex: questionIndex, commentOption: comment});
      if (comment == 'Y') {
        let quesComment = this.state.questionList[questionIndex]
          .commentOptionAnswer;
        this.setState({commentOptionInput: quesComment});
      }
      this.props.surveyDetailData[index].anslist.map((item, key) => {
        let val = key + 1;

        tempRankArr.push({id: val, name: val});
        this.setState({dropDownData: tempRankArr});
        if (
          this.state.answerArray[index].answeroption.includes(
            item.answer_title,
          ) == true
        ) {
          tempRankAns.push(item.answer_title);
          tempRankid.push(item.id);
        }
      });
      this.state.answerArray[index].rank.map(newItem => {
        unique.push({id: newItem, name: newItem});
        tempRank.push(newItem);
      });
      this.setState({selectRank: unique});
    } else if (item.type == 'textbox') {
      this.setState({textInputAnswer: this.state.answerArray[index].answer});
    }
  }
  async changeCheckboxValue(index, item) {
    let temp = this.state.checkboxArray;
    temp.splice(index, 1, item);
    this.setState({checkboxArray: temp});
  }
  onDropDown(item, index, value) {
    this.setState({rankFlag: true, errorRank: ''});
    let temp = this.state.selectRank;
    temp[index] = item;
    let newTempRank = tempRank;
    let newTempRankId = tempRankid;
    let newTempRankAns = tempRankAns;
    this.setState({
      selectRank: temp,
      type: 'rank',
      survey_id: value.serve_id,
      question_id: value.question_id,
    });
    newTempRank[index] = item.name;
    newTempRankId[index] = value.id;
    newTempRankAns[index] = value.answer_title;
  }
  async changeRadioBtnImageValue(data) {
    let array = this.state.radioButtonImageArray;
    this.state.radioButtonImageArray.map(async (item, index) => {
      if (array[index].id == data.id) {
        array[index].set = 1;
        this.setState({
          survey_id: data.serve_id,
          question_id: data.question_id,
          answer_id: data.id,
          question: data.question,
          answeroption: data.answer_title,
          type: data.answeroption,
          otherOption: data.other_option,
        });
      } else {
        array[index].set = 0;
        this.setState({
          survey_id: data.serve_id,
          question_id: data.question_id,
          answer_id: data.id,
          question: data.question,
          answeroption: data.answer_title,
          type: data.answeroption,
          otherOptionInput: '',
          otherOptionError: '',
        });
      }
    });
    this.setState({radioButtonImageArray: array});
  }
  changeRadioBtnValue(data) {
    let array = this.state.radiobuttonArray;
    this.state.radiobuttonArray.map(async (item, index) => {
      if (array[index].id == data.id) {
        array[index].set = 1;
        this.setState({
          survey_id: data.serve_id,
          question_id: data.question_id,
          answer_id: data.id,
          question: data.question,
          answeroption: data.answer_title,
          type: data.answeroption,
          otherOption: data.other_option,
        });
      } else {
        array[index].set = 0;
        this.setState({
          survey_id: data.serve_id,
          question_id: data.question_id,
          answer_id: data.id,
          question: data.question,
          answeroption: data.answer_title,
          type: data.answeroption,
          otherOptionInput: '',
          otherOptionError: '',
        });
      }
    });
    this.setState({radiobuttonArray: array});
  }
  checkIfDuplicateExists(array) {
    return new Set(array).size !== array.length;
  }
  updateQuestion() {
    let array = this.state.answerArray;
    let questionArray = this.state.questionList;
    if (this.state.answerArray[this.state.index].type == 'radiobutton') {
      if (this.state.answeroption != '') {
        if (this.state.commentOption == 'Y') {
          if (this.state.commentOptionInput == '') {
            this.setState({commentOptionError: 'Please enter answer'});
          } else {
            if (this.state.otherOption == 'Y') {
              if (this.state.otherOptionInput == '') {
                this.setState({otherOptionError: 'Please enter answer'});
              } else {
                array[this.state.index].type = 'radiobutton';
                array[this.state.index].anstitle_id = this.state.answer_id;
                array[this.state.index].answeroption = this.state.answeroption;
                array[this.state.index].other_option = this.state.otherOption;
                array[
                  this.state.index
                ].otherOptionAnswer = this.state.otherOptionInput;
                questionArray[
                  this.state.questionIndex
                ].comment = this.state.commentOption;
                questionArray[
                  this.state.questionIndex
                ].commentOptionAnswer = this.state.commentOptionInput;
                this.setState({
                  answerArray: array,
                  questionList: questionArray,
                  editAnsModal: false,
                });
              }
            } else {
              array[this.state.index].type = 'radiobutton';
              array[this.state.index].anstitle_id = this.state.answer_id;
              array[this.state.index].answeroption = this.state.answeroption;
              array[this.state.index].other_option = this.state.otherOption;
              array[
                this.state.index
              ].otherOptionAnswer = this.state.otherOptionInput;
              questionArray[
                this.state.questionIndex
              ].comment = this.state.commentOption;
              questionArray[
                this.state.questionIndex
              ].commentOptionAnswer = this.state.commentOptionInput;
              this.setState({
                answerArray: array,
                questionList: questionArray,
                editAnsModal: false,
              });
            }
          }
        } else {
          if (this.state.otherOption == 'Y') {
            if (this.state.otherOptionInput == '') {
              this.setState({otherOptionError: 'Please enter answer'});
            } else {
              array[this.state.index].type = 'radiobutton';
              array[this.state.index].anstitle_id = this.state.answer_id;
              array[this.state.index].answeroption = this.state.answeroption;
              array[this.state.index].other_option = this.state.otherOption;
              array[
                this.state.index
              ].otherOptionAnswer = this.state.otherOptionInput;
              questionArray[
                this.state.questionIndex
              ].comment = this.state.commentOption;
              questionArray[
                this.state.questionIndex
              ].commentOptionAnswer = this.state.commentOptionInput;
              this.setState({
                answerArray: array,
                questionList: questionArray,
                editAnsModal: false,
              });
            }
          } else {
            array[this.state.index].type = 'radiobutton';
            array[this.state.index].anstitle_id = this.state.answer_id;
            array[this.state.index].answeroption = this.state.answeroption;
            array[this.state.index].other_option = this.state.otherOption;
            array[
              this.state.index
            ].otherOptionAnswer = this.state.otherOptionInput;
            questionArray[
              this.state.questionIndex
            ].comment = this.state.commentOption;
            questionArray[
              this.state.questionIndex
            ].commentOptionAnswer = this.state.commentOptionInput;
            this.setState({
              answerArray: array,
              questionList: questionArray,
              editAnsModal: false,
            });
          }
        }
      } else {
        this.setState({
          editAnsModal: false,
          commentOption: '',
          commentOptionInput: '',
          commentOptionError: '',
        });
      }
    } else if (
      this.state.answerArray[this.state.index].type == 'radiobuttonImage'
    ) {
      if (this.state.answeroption != '') {
        if (this.state.commentOption == 'Y') {
          if (this.state.commentOptionInput == '') {
            this.setState({commentOptionError: 'Please enter answer'});
          } else {
            if (this.state.otherOption == 'Y') {
              if (this.state.otherOptionInput == '') {
                this.setState({otherOptionError: 'Please enter answer'});
              } else {
                array[this.state.index].type = 'radiobuttonImage';
                array[this.state.index].anstitle_id = this.state.answer_id;
                array[this.state.index].answeroption = this.state.answeroption;
                array[this.state.index].other_option = this.state.otherOption;
                array[
                  this.state.index
                ].otherOptionAnswer = this.state.otherOptionInput;
                questionArray[
                  this.state.questionIndex
                ].comment = this.state.commentOption;
                questionArray[
                  this.state.questionIndex
                ].commentOptionAnswer = this.state.commentOptionInput;
                this.setState({
                  answerArray: array,
                  questionList: questionArray,
                  editAnsModal: false,
                });
              }
            } else {
              array[this.state.index].type = 'radiobuttonImage';
              array[this.state.index].anstitle_id = this.state.answer_id;
              array[this.state.index].answeroption = this.state.answeroption;
              array[this.state.index].other_option = this.state.otherOption;
              array[
                this.state.index
              ].otherOptionAnswer = this.state.otherOptionInput;
              questionArray[
                this.state.questionIndex
              ].comment = this.state.commentOption;
              questionArray[
                this.state.questionIndex
              ].commentOptionAnswer = this.state.commentOptionInput;
              this.setState({
                answerArray: array,
                questionList: questionArray,
                editAnsModal: false,
              });
            }
          }
        } else {
          if (this.state.otherOption == 'Y') {
            if (this.state.otherOptionInput == '') {
              this.setState({otherOptionError: 'Please enter answer'});
            } else {
              array[this.state.index].type = 'radiobuttonImage';
              array[this.state.index].anstitle_id = this.state.answer_id;
              array[this.state.index].answeroption = this.state.answeroption;
              array[this.state.index].other_option = this.state.otherOption;
              array[
                this.state.index
              ].otherOptionAnswer = this.state.otherOptionInput;
              questionArray[
                this.state.questionIndex
              ].comment = this.state.commentOption;
              questionArray[
                this.state.questionIndex
              ].commentOptionAnswer = this.state.commentOptionInput;
              this.setState({
                answerArray: array,
                questionList: questionArray,
                editAnsModal: false,
              });
            }
          } else {
            array[this.state.index].type = 'radiobuttonImage';
            array[this.state.index].anstitle_id = this.state.answer_id;
            array[this.state.index].answeroption = this.state.answeroption;
            array[this.state.index].other_option = this.state.otherOption;
            array[
              this.state.index
            ].otherOptionAnswer = this.state.otherOptionInput;
            questionArray[
              this.state.questionIndex
            ].comment = this.state.commentOption;
            questionArray[
              this.state.questionIndex
            ].commentOptionAnswer = this.state.commentOptionInput;
            this.setState({
              answerArray: array,
              questionList: questionArray,
              editAnsModal: false,
            });
          }
        }
      } else {
        this.setState({
          editAnsModal: false,
          commentOption: '',
          commentOptionInput: '',
          commentOptionError: '',
        });
      }
    } else if (this.state.answerArray[this.state.index].type == 'checkbox') {
      let min = this.props.surveyDetailData[this.state.index]?.min;
      let max = this.props.surveyDetailData[this.state.index]?.max;
      if (this.state.checkboxFlag == false) {
        if (temp.length != 0) {
          if (this.state.commentOption == 'Y') {
            if (this.state.commentOptionInput == '') {
              this.setState({commentOptionError: 'Please enter answer'});
            } else {
              if (min != null && max != null) {
                if (max < temp.length) {
                  alert('You can not select more than ' + max + ' answer');
                } else if (temp.length < min) {
                  alert('You have to select minimum ' + min + ' answer');
                } else if (temp.length > min && temp.length < max) {
                  array[this.state.index].type = 'checkbox';
                  array[this.state.index].anstitle_id = tempid;
                  array[this.state.index].answeroption = temp;
                  questionArray[
                    this.state.questionIndex
                  ].comment = this.state.commentOption;
                  questionArray[
                    this.state.questionIndex
                  ].commentOptionAnswer = this.state.commentOptionInput;
                  this.setState({
                    answerArray: array,
                    questionList: questionArray,
                    editAnsModal: false,
                  });
                  temp = [];
                  tempid = [];
                } else if (min >= temp.length || max == temp.length) {
                  array[this.state.index].type = 'checkbox';
                  array[this.state.index].anstitle_id = tempid;
                  array[this.state.index].answeroption = temp;
                  questionArray[
                    this.state.questionIndex
                  ].comment = this.state.commentOption;
                  questionArray[
                    this.state.questionIndex
                  ].commentOptionAnswer = this.state.commentOptionInput;
                  this.setState({
                    answerArray: array,
                    questionList: questionArray,
                    editAnsModal: false,
                  });
                  temp = [];
                  tempid = [];
                }
              } else {
                array[this.state.index].type = 'checkbox';
                array[this.state.index].anstitle_id = tempid;
                array[this.state.index].answeroption = temp;
                questionArray[
                  this.state.questionIndex
                ].comment = this.state.commentOption;
                questionArray[
                  this.state.questionIndex
                ].commentOptionAnswer = this.state.commentOptionInput;
                this.setState({
                  answerArray: array,
                  questionList: questionArray,
                  editAnsModal: false,
                });
                temp = [];
                tempid = [];
              }
            }
          } else {
            if (min != null && max != null) {
              if (max < temp.length) {
                alert('You can not select more than ' + max + ' answer');
              } else if (temp.length < min) {
                alert('You have to select minimum ' + min + ' answer');
              } else if (temp.length > min && temp.length < max) {
                array[this.state.index].type = 'checkbox';
                array[this.state.index].anstitle_id = tempid;
                array[this.state.index].answeroption = temp;
                questionArray[
                  this.state.questionIndex
                ].comment = this.state.commentOption;
                questionArray[
                  this.state.questionIndex
                ].commentOptionAnswer = this.state.commentOptionInput;
                this.setState({
                  answerArray: array,
                  questionList: questionArray,
                  editAnsModal: false,
                });
                temp = [];
                tempid = [];
              } else if (min >= temp.length || max == temp.length) {
                array[this.state.index].type = 'checkbox';
                array[this.state.index].anstitle_id = tempid;
                array[this.state.index].answeroption = temp;
                questionArray[
                  this.state.questionIndex
                ].comment = this.state.commentOption;
                questionArray[
                  this.state.questionIndex
                ].commentOptionAnswer = this.state.commentOptionInput;
                this.setState({
                  answerArray: array,
                  questionList: questionArray,
                  editAnsModal: false,
                });
                temp = [];
                tempid = [];
              }
            } else {
              array[this.state.index].type = 'checkbox';
              array[this.state.index].anstitle_id = tempid;
              array[this.state.index].answeroption = temp;
              questionArray[
                this.state.questionIndex
              ].comment = this.state.commentOption;
              questionArray[
                this.state.questionIndex
              ].commentOptionAnswer = this.state.commentOptionInput;
              this.setState({
                answerArray: array,
                questionList: questionArray,
                editAnsModal: false,
              });
              temp = [];
              tempid = [];
            }
          }
        } else {
          this.setState({checkboxError: 'Please select answer'});
        }
      } else {
        this.setState({
          editAnsModal: false,
          commentOption: '',
          commentOptionAnswer: '',
          commentOptionError: '',
        });
        temp = [];
        tempid = [];
      }
    } else if (this.state.answerArray[this.state.index].type == 'rank') {
      if (this.state.rankFlag == true) {
        if (this.checkIfDuplicateExists(tempRank) == true) {
          this.setState({errorRank: 'You can not select same rank'});
        } else {
          if (this.state.commentOption == 'Y') {
            if (this.state.commentOptionInput == '') {
              this.setState({commentOptionError: 'Please enter answer'});
            } else {
              array[this.state.index].type = 'rank';
              array[this.state.index].anstitle_id = tempRankid;
              array[this.state.index].answeroption = tempRankAns;
              array[this.state.index].rank = tempRank;
              questionArray[
                this.state.questionIndex
              ].comment = this.state.commentOption;
              questionArray[
                this.state.questionIndex
              ].commentOptionAnswer = this.state.commentOptionInput;
              this.setState({
                answerArray: array,
                questionList: questionArray,
                editAnsModal: false,
              });
              tempRank = [];
              tempRankid = [];
              tempRankAns = [];
            }
          } else {
            array[this.state.index].type = 'rank';
            array[this.state.index].anstitle_id = tempRankid;
            array[this.state.index].answeroption = tempRankAns;
            array[this.state.index].rank = tempRank;
            questionArray[
              this.state.questionIndex
            ].comment = this.state.commentOption;
            questionArray[
              this.state.questionIndex
            ].commentOptionAnswer = this.state.commentOptionInput;
            this.setState({
              answerArray: array,
              questionList: questionArray,
              editAnsModal: false,
            });
            tempRank = [];
            tempRankid = [];
            tempRankAns = [];
          }
        }
      } else {
        this.setState({
          editAnsModal: false,
          commentOption: '',
          commentOptionAnswer: '',
          commentOptionInput: '',
        });
        tempRank = [];
        tempRankid = [];
        tempRankAns = [];
      }
    } else if (this.state.answerArray[this.state.index].type == 'textbox') {
      if (this.state.textInputAnswer != '') {
        array[this.state.index].type = 'textbox';
        array[this.state.index].answer = this.state.textInputAnswer;
        this.setState({answerArray: array, editAnsModal: false});
      } else {
        this.setState({errorInput: 'Please enter answer'});
      }
    }
  }
  onCloseModal() {
    this.setState({
      editAnsModal: false,
      otherOption: '',
      otherOptionError: '',
      otherOptionInput: '',
    });
    temp = [];
    tempid = [];
    tempRank = [];
    tempRankAns = [];
    tempRankid = [];
  }
  getExtension(file) {
    let extension = file.split('.').pop();
    return extension;
  }
  render() {
    let questionCount = this.props.surveyDetailData.length;
    let currentQuestion = this.state.index + 1;

    return (
      <SafeAreaView style={styles.container}>
        <Spinner visible={this.state.loading} />
        <View
          style={{flexDirection: 'row', marginTop: 30, marginHorizontal: 16}}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Gotham-Medium',
              color: '#272727',
            }}>
            Review answers
          </Text>
          {this.state.showBtn == false ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                flex: 1,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.call_submit_API();
                }}
                activeOpacity={0.6}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Gotham-Medium',
                    color: '#00AFF0',
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>

        <View
          style={{
            flex: 1,
            marginTop: 24,
            marginBottom: 5,
            marginHorizontal: 16,
          }}>
          <FlatList
            data={this.state.answerArray}
            renderItem={({item, index}) => (
              <View
                key={index}
                style={{
                  paddingHorizontal: 18,
                  borderRadius: 10,
                  backgroundColor: '#F3F3F3',
                  marginTop: 10,
                }}>
                <View style={{marginVertical: 18, flexDirection: 'row'}}>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 13,
                      fontFamily: 'Gotham-Medium',
                      color: '#00AFF0',
                    }}>
                    Question {index + 1}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.openEditAnsModal(index, item);
                    }}
                    style={{padding: 5}}
                    activeOpacity={0.6}>
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <SVGImg.Edit />
                    </View>
                  </TouchableOpacity>
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Gotham-Medium',
                    color: '#272727',
                    lineHeight: 20,
                  }}>
                  {item.question}
                </Text>

                {item.type == 'radiobuttonImage' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 25,
                      marginBottom: 16,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Gotham-Medium',
                        color: '#272727',
                      }}>
                      Answer.{' '}
                    </Text>
                    {item.other_option == 'N' ? (
                      <Image
                        source={{uri: item.answeroption}}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 10,
                          marginLeft: 10,
                        }}
                      />
                    ) : (
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: 'Gotham-Medium',
                          color: '#272727',
                        }}>
                        {item.answeroption}
                      </Text>
                    )}
                  </View>
                ) : item.type == 'rank' ? (
                  <View style={{marginTop: 25, marginBottom: 16}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Gotham-Medium',
                        color: '#272727',
                      }}>
                      Answer.
                    </Text>
                    <View>
                      {item.answeroption.map((value, newkey) => {
                        const newVal = item.rank.map(val => {
                          return val;
                        });
                        return (
                          <Text
                            style={{
                              padding: 10,
                              fontSize: 14,
                              fontFamily: 'Gotham-Medium',
                              color: '#272727',
                            }}>
                            {value} ({newVal[newkey]})
                          </Text>
                        );
                      })}
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 25,
                      marginBottom: 16,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Gotham-Medium',
                        color: '#272727',
                      }}>
                      Answer.
                    </Text>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 14,
                        fontFamily: 'Gotham-Medium',
                        color: '#272727',
                      }}>
                      {item.answeroption != ''
                        ? item.type == 'checkbox'
                          ? item.answeroption.toString()
                          : item.answeroption
                        : item.type == 'textbox'
                        ? item.answer
                        : item.answeroption}
                    </Text>
                  </View>
                )}
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <ConfettiCannon
          count={20}
          origin={{x: -50, y: 0}}
          autoStart={false}
          ref={ref => (this.explosion = ref)}
        />
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isVisible}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.4)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 20,
                  width: '90%',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    paddingTop: 28,
                    fontFamily: 'Gotham-Medium',
                    color: '#00AFF0',
                  }}>
                  Success!
                </Text>

                <Text
                  style={{
                    fontSize: 14,
                    paddingTop: 20,
                    fontFamily: 'Gotham-Medium',
                    color: '#272727',
                  }}>
                  Your answers have been submitted.
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Question');
                  }}
                  activeOpacity={0.6}>
                  <View
                    style={{
                      backgroundColor: '#00AFF0',
                      marginTop: 25,
                      height: 47,
                      justifyContent: 'center',
                      paddingHorizontal: 50,
                      borderRadius: 50,
                      marginBottom: 28,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Gotham-Medium',
                        color: '#FFFFFF',
                      }}>
                      Close
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <Modal
          animationType="none"
          visible={this.state.editAnsModal}
          transparent={false}>
          <SafeAreaView style={styles.container}>
            <Spinner visible={this.state.loading} />
            <View
              style={[
                styles.headerMain,
                {marginTop: 20, marginHorizontal: 16},
              ]}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 32,
                }}>
                <SVGImg.HeaderLogo />
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    this.onCloseModal();
                  }}
                  activeOpacity={0.6}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Gotham-Medium',
                      color: '#00AFF0',
                    }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView
              contentContainerStyle={{paddingBottom: 30}}
              showsVerticalScrollIndicator={false}>
              <Text
                style={{
                  marginTop: 30,
                  fontSize: 16,
                  fontFamily: 'Gotham-Medium',
                  color: '#00AFF0',
                  marginLeft: 16,
                }}>
                Question {currentQuestion} of {questionCount}
              </Text>

              <View style={{marginLeft: 16, marginRight: 24}}>
                <Text
                  style={{
                    marginTop: 15,
                    fontSize: 14,
                    fontFamily: 'Gotham-Medium',
                    color: '#272727',
                    lineHeight: 20,
                  }}>
                  {this.props.surveyDetailData.length != 0
                    ? this.props.surveyDetailData[this.state.index].question
                    : null}
                </Text>
                {this.props.surveyDetailData.length != 0 ? (
                  this.props.surveyDetailData[this.state.index].answeroption ==
                  'radiobutton' ? (
                    <View>
                      {this.state.radiobuttonArray.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          style={{
                            marginTop: 30,
                            borderRadius: 30,
                            height: 41,
                            justifyContent: 'center',
                            paddingHorizontal: 18,
                            backgroundColor:
                              item.set == 1 ? '#00AFF0' : '#E0E0E066',
                          }}
                          activeOpacity={0.6}
                          onPress={() => {
                            this.changeRadioBtnValue(item);
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: 'Gotham-Medium',
                              color: item.set == 1 ? '#FFFFFF' : '#272727',
                            }}>
                            {item.answer_title}
                          </Text>
                        </TouchableOpacity>
                      ))}
                      {this.state.errorRadio != '' ? (
                        <Text
                          style={{
                            padding: 10,
                            fontFamily: 'Gotham-Medium',
                            color: 'red',
                            alignSelf: 'flex-start',
                            fontSize: 14,
                          }}>
                          {this.state.errorRadio}
                        </Text>
                      ) : null}
                      {this.state.otherOption == 'Y' && (
                        <View>
                          <TextInput
                            style={{
                              textAlignVertical: 'top',
                              paddingLeft: 18,
                              paddingRight: 5,
                              paddingTop: 15,
                              fontFamily: 'Gotham-Medium',
                              color: '#919191',
                              fontSize: 14,
                              marginTop: 20,
                              height: 131,
                              borderRadius: 10,
                              backgroundColor: '#F3F3F3',
                            }}
                            placeholder="Write something..."
                            multiline={true}
                            returnKeyType="done"
                            onSubmitEditing={() => {
                              Keyboard.dismiss();
                            }}
                            value={this.state.otherOptionInput}
                            onChangeText={text => {
                              this.setState({
                                otherOptionInput: text.trimStart(),
                                otherOptionError: '',
                              });
                            }}
                          />
                          {this.state.otherOptionError != '' ? (
                            <Text
                              style={{
                                padding: 10,
                                fontFamily: 'Gotham-Medium',
                                color: 'red',
                                alignSelf: 'flex-start',
                                fontSize: 14,
                              }}>
                              {this.state.otherOptionError}
                            </Text>
                          ) : null}
                        </View>
                      )}
                      {this.state.commentOption == 'Y' && (
                        <View>
                          <TextInput
                            style={{
                              textAlignVertical: 'top',
                              paddingLeft: 18,
                              paddingRight: 5,
                              paddingTop: 15,
                              fontFamily: 'Gotham-Medium',
                              color: '#919191',
                              fontSize: 14,
                              marginTop: 20,
                              height: 131,
                              borderRadius: 10,
                              backgroundColor: '#F3F3F3',
                            }}
                            placeholder="Write something..."
                            multiline={true}
                            returnKeyType="done"
                            onSubmitEditing={() => {
                              Keyboard.dismiss();
                            }}
                            value={this.state.commentOptionInput}
                            onChangeText={text => {
                              this.setState({
                                commentOptionInput: text.trimStart(),
                                commentOptionError: '',
                              });
                            }}
                          />
                          {this.state.commentOptionError != '' ? (
                            <Text
                              style={{
                                padding: 10,
                                fontFamily: 'Gotham-Medium',
                                color: 'red',
                                alignSelf: 'flex-start',
                                fontSize: 14,
                              }}>
                              {this.state.commentOptionError}
                            </Text>
                          ) : null}
                        </View>
                      )}
                    </View>
                  ) : this.props.surveyDetailData[this.state.index]
                      .answeroption == 'checkbox' ? (
                    <View>
                      {this.props.surveyDetailData[
                        this.state.index
                      ].anslist.map((item, index) => (
                        <View key={index} style={{flexDirection: 'row'}}>
                          <CheckBox
                            style={{padding: 10, width: '50%'}}
                            onClick={() => {
                              this.onCheckBoxChange(index, item);
                            }}
                            checkBoxColor={'#00AFF0'}
                            checkedCheckBoxColor={'#00AFF0'}
                            isChecked={this.state.checkboxArray[index]}
                            rightText={item.answer_title}
                            rightTextStyle={{minWidth: width / 1.2}}
                          />
                        </View>
                      ))}
                      {this.state.checkboxError != '' ? (
                        <Text
                          style={{
                            padding: 10,
                            fontFamily: 'Gotham-Medium',
                            color: 'red',
                            alignSelf: 'flex-start',
                            fontSize: 14,
                          }}>
                          {this.state.checkboxError}
                        </Text>
                      ) : null}
                      {this.state.commentOption == 'Y' && (
                        <View>
                          <TextInput
                            style={{
                              textAlignVertical: 'top',
                              paddingLeft: 18,
                              paddingRight: 5,
                              paddingTop: 15,
                              fontFamily: 'Gotham-Medium',
                              color: '#919191',
                              fontSize: 14,
                              marginTop: 20,
                              height: 131,
                              borderRadius: 10,
                              backgroundColor: '#F3F3F3',
                            }}
                            placeholder="Write something..."
                            multiline={true}
                            returnKeyType="done"
                            onSubmitEditing={() => {
                              Keyboard.dismiss();
                            }}
                            value={this.state.commentOptionInput}
                            onChangeText={text => {
                              this.setState({
                                commentOptionInput: text.trimStart(),
                                commentOptionError: '',
                                checkboxFlag: false,
                              });
                            }}
                          />
                          {this.state.commentOptionError != '' ? (
                            <Text
                              style={{
                                padding: 10,
                                fontFamily: 'Gotham-Medium',
                                color: 'red',
                                alignSelf: 'flex-start',
                                fontSize: 14,
                              }}>
                              {this.state.commentOptionError}
                            </Text>
                          ) : null}
                        </View>
                      )}
                    </View>
                  ) : this.props.surveyDetailData[this.state.index]
                      .answeroption == 'textbox' ? (
                    <View>
                      <TextInput
                        style={{
                          textAlignVertical: 'top',
                          paddingLeft: 18,
                          paddingRight: 5,
                          paddingTop: 15,
                          fontFamily: 'Gotham-Medium',
                          color: '#919191',
                          fontSize: 14,
                          marginTop: 20,
                          height: 131,
                          borderRadius: 10,
                          backgroundColor: '#F3F3F3',
                        }}
                        placeholder="Write something..."
                        multiline={true}
                        returnKeyType="done"
                        onSubmitEditing={() => {
                          Keyboard.dismiss();
                        }}
                        value={this.state.textInputAnswer}
                        onChangeText={text => {
                          this.setState({
                            textInputAnswer: text.trimStart(),
                            errorInput: '',
                          });
                        }}
                      />
                      {this.state.errorInput != '' ? (
                        <Text
                          style={{
                            padding: 10,
                            fontFamily: 'Gotham-Medium',
                            color: 'red',
                            alignSelf: 'flex-start',
                            fontSize: 14,
                          }}>
                          {this.state.errorInput}
                        </Text>
                      ) : null}
                    </View>
                  ) : this.props.surveyDetailData[this.state.index]
                      .answeroption == 'radiobuttonImage' ? (
                    <View>
                      <FlatList
                        data={this.state.radioButtonImageArray}
                        numColumns={2}
                        columnWrapperStyle={{justifyContent: 'space-between'}}
                        renderItem={({item, index}) =>
                          item.other_option == 'N' ? (
                            <View style={{width: '48%', marginTop: 10}}>
                              <TouchableOpacity
                                onPress={() => {
                                  this.changeRadioBtnImageValue(item);
                                }}
                                style={{flex: 1}}
                                activeOpacity={0.75}>
                                <Image
                                  source={{uri: item.answer_title}}
                                  style={{
                                    height: 166,
                                    width: '100%',
                                    borderWidth: 4,
                                    borderColor:
                                      item.set == 1 ? '#00AFF0' : '#eaeaea',
                                    borderRadius: 10,
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          ) : (
                            <TouchableOpacity
                              key={index}
                              style={{
                                marginTop: 30,
                                borderRadius: 30,
                                height: 41,
                                justifyContent: 'center',
                                paddingHorizontal: 18,
                                backgroundColor:
                                  item.set == 1 ? '#00AFF0' : '#E0E0E066',
                                width: '100%',
                              }}
                              activeOpacity={0.6}
                              onPress={() => {
                                this.changeRadioBtnImageValue(item);
                              }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: 'Gotham-Medium',
                                  color: item.set == 1 ? '#FFFFFF' : '#272727',
                                }}>
                                {item.answer_title}
                              </Text>
                            </TouchableOpacity>
                          )
                        }
                      />
                      {this.state.otherOption == 'Y' && (
                        <View>
                          <TextInput
                            style={{
                              textAlignVertical: 'top',
                              paddingLeft: 18,
                              paddingRight: 5,
                              paddingTop: 15,
                              fontFamily: 'Gotham-Medium',
                              color: '#919191',
                              fontSize: 14,
                              marginTop: 20,
                              height: 131,
                              borderRadius: 10,
                              backgroundColor: '#F3F3F3',
                            }}
                            placeholder="Write something..."
                            multiline={true}
                            returnKeyType="done"
                            onSubmitEditing={() => {
                              Keyboard.dismiss();
                            }}
                            value={this.state.otherOptionInput}
                            onChangeText={text => {
                              this.setState({
                                otherOptionInput: text.trimStart(),
                                otherOptionError: '',
                              });
                            }}
                          />
                          {this.state.otherOptionError != '' ? (
                            <Text
                              style={{
                                padding: 10,
                                fontFamily: 'Gotham-Medium',
                                color: 'red',
                                alignSelf: 'flex-start',
                                fontSize: 14,
                              }}>
                              {this.state.otherOptionError}
                            </Text>
                          ) : null}
                        </View>
                      )}
                      {this.state.commentOption == 'Y' && (
                        <View>
                          <TextInput
                            style={{
                              textAlignVertical: 'top',
                              paddingLeft: 18,
                              paddingRight: 5,
                              paddingTop: 15,
                              fontFamily: 'Gotham-Medium',
                              color: '#919191',
                              fontSize: 14,
                              marginTop: 20,
                              height: 131,
                              borderRadius: 10,
                              backgroundColor: '#F3F3F3',
                            }}
                            placeholder="Write something..."
                            multiline={true}
                            returnKeyType="done"
                            onSubmitEditing={() => {
                              Keyboard.dismiss();
                            }}
                            value={this.state.commentOptionInput}
                            onChangeText={text => {
                              this.setState({
                                commentOptionInput: text.trimStart(),
                                commentOptionError: '',
                              });
                            }}
                          />
                          {this.state.commentOptionError != '' ? (
                            <Text
                              style={{
                                padding: 10,
                                fontFamily: 'Gotham-Medium',
                                color: 'red',
                                alignSelf: 'flex-start',
                                fontSize: 14,
                              }}>
                              {this.state.commentOptionError}
                            </Text>
                          ) : null}
                        </View>
                      )}
                    </View>
                  ) : (
                    <View>
                      {this.props.surveyDetailData[
                        this.state.index
                      ].anslist.map((item, index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              marginTop: 35,
                              paddingLeft: 5,
                              fontFamily: 'Gotham-Medium',
                              flex: 1,
                            }}>
                            {item.answer_title}
                          </Text>
                          <DropDown
                            placeholder="Select Rank"
                            data={this.state.dropDownData}
                            value={this.state.selectRank[index]}
                            onSelect={value => {
                              this.onDropDown(value, index, item);
                            }}
                            Style={{
                              width: '45%',
                              marginTop: 0,
                              marginHorizontal: 0,
                              flex: 1,
                            }}
                          />
                        </View>
                      ))}
                      {this.state.errorRank != '' ? (
                        <Text
                          style={{
                            padding: 10,
                            fontFamily: 'Gotham-Medium',
                            color: 'red',
                            alignSelf: 'flex-start',
                            fontSize: 14,
                          }}>
                          {this.state.errorRank}
                        </Text>
                      ) : null}
                      {this.state.commentOption == 'Y' && (
                        <View>
                          <TextInput
                            style={{
                              textAlignVertical: 'top',
                              paddingLeft: 18,
                              paddingRight: 5,
                              paddingTop: 15,
                              fontFamily: 'Gotham-Medium',
                              color: '#919191',
                              fontSize: 14,
                              marginTop: 20,
                              height: 131,
                              borderRadius: 10,
                              backgroundColor: '#F3F3F3',
                            }}
                            placeholder="Write something..."
                            multiline={true}
                            returnKeyType="done"
                            onSubmitEditing={() => {
                              Keyboard.dismiss();
                            }}
                            value={this.state.commentOptionInput}
                            onChangeText={text => {
                              this.setState({
                                commentOptionInput: text.trimStart(),
                                commentOptionError: '',
                                rankFlag: true,
                              });
                            }}
                          />
                          {this.state.commentOptionError != '' ? (
                            <Text
                              style={{
                                padding: 10,
                                fontFamily: 'Gotham-Medium',
                                color: 'red',
                                alignSelf: 'flex-start',
                                fontSize: 14,
                              }}>
                              {this.state.commentOptionError}
                            </Text>
                          ) : null}
                        </View>
                      )}
                    </View>
                  )
                ) : null}
              </View>
            </ScrollView>
            <View style={{justifyContent: 'flex-end', marginHorizontal: 27}}>
              {
                <TouchableOpacity
                  onPress={() => {
                    this.updateQuestion();
                  }}
                  activeOpacity={0.6}>
                  <View
                    style={{
                      alignItems: 'center',
                      backgroundColor: '#00AFF0',
                      marginBottom: 50,
                      height: 47,
                      justifyContent: 'center',
                      borderRadius: 50,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Gotham-Medium',
                        color: '#FFFFFF',
                      }}>
                      Update
                    </Text>
                  </View>
                </TouchableOpacity>
              }
            </View>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  const AUTH = state.LoginData.token;
  const surveyDetailData = state.SurveyData.surveyDetailData;
  return {AUTH, surveyDetailData};
};
export default connect(mapStateToProps, null)(ReviewAnswer);
