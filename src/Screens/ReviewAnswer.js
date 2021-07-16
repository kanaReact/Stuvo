import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, FlatList, Image, SafeAreaView, Modal,TextInput } from 'react-native'
const { height, width } = Dimensions.get('window');
import styles from '../style/styles'
import SVGImg from '../Source/SVGImg';
import { connect } from 'react-redux';
import axios from 'axios';
import constant from '../Redux/config/constant';
import Spinner from '../Components/Spinner';
import CheckBox from 'react-native-check-box';
class ReviewAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    num: '1',
                    que: 'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod?',
                    option: 'a.',
                    optname: 'Yes',
                    navigation: 'Que1'
                },
                {
                    id: 2,
                    num: '2',
                    que: 'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod?',
                    option: 'a.',
                    optname: 'School uniform',
                    navigation: 'Que1'
                },
                {
                    id: 3,
                    num: '3',
                    que: 'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod?',
                    option: '',
                    optname: 'No answer',
                    navigation: 'Que1'
                },
                {
                    id: 4,
                    num: '4',
                    que: 'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod?',
                    option: 'b.',
                    optname: 'No',
                    navigation: 'Que1'
                },
                {
                    id: 5,
                    num: '5',
                    que: 'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod?',
                    option: '',
                    optname: 'No answer',
                    navigation: 'Que1'
                }
            ],
            isVisible: false,
            btn: true,
            loading: false,
            answerArray: this.props.route.params.answerArray,
            editAnsModal: false,
            index: 0
        }
    }

    toggleModal = () => {
        this.setState({ isVisible: !this.state.isVisible })
    }
    call_submit_API() {
        const { answerArray } = this.props.route.params
        this.setState({ loading: true })
        let url = constant.BASE_URL + 'survey_form_submit'
        let data = new URLSearchParams()
        data.append('ans_array', JSON.stringify(answerArray));
        axios.post(url, data, {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                "Authorization": "Bearer " + this.props.AUTH
            },
        }).then(responseJson => {
            console.log('res;', responseJson.data)
            this.setState({ loading: false })
            if (responseJson.data.status == 1) {
                this.toggleModal()
            }
            else {
                console.log('error')
            }
        }).catch(error => {
            console.log('error:', error)
            this.setState({ loading: false })
        })
    }
    render() {
        const { answerArray } = this.props.route.params
        console.log('ans array:::', answerArray)
        let questionCount = this.props.surveyDetailData.length
        let currentQuestion = this.state.index + 1
        return (
            <SafeAreaView style={styles.container}>
                <Spinner visible={this.state.loading} />
                <View style={{ flexDirection: 'row', marginTop: 30, marginHorizontal: 16 }}>
                    <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727' }}>Review answers</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-end', flex: 1 }}>
                        <TouchableOpacity onPress={() => { this.call_submit_API() }} activeOpacity={0.6}>
                            <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flex: 1, marginTop: 24, marginBottom: 5, marginHorizontal: 16 }}>
                    <FlatList
                        data={this.state.answerArray}
                        renderItem={({ item, index }) => (
                            <View key={index} style={{ paddingHorizontal: 18, borderRadius: 10, backgroundColor: '#F3F3F3', marginTop: 10 }}>
                                <View style={{ marginVertical: 18, flexDirection: 'row' }}>
                                    <Text style={{ flex: 1, fontSize: 13, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>Question {index + 1}</Text>
                                    <TouchableOpacity onPress={()=>{ this.setState({ index:index,editAnsModal:true }) }} style={{ padding: 5 }} activeOpacity={0.6}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <SVGImg.Edit />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727', lineHeight: 20 }}>{item.question}</Text>

                                <View style={{ flexDirection: 'row', marginTop: 25, marginBottom: 16, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727' }}>Answer.</Text>
                                    <Text style={{ marginLeft: 10, fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727' }}>{item.answeroption != '' ? item.answeroption : item.answer}</Text>
                                </View>
                            </View>
                        )}

                        showsVerticalScrollIndicator={false}
                    />
                </View>

                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.isVisible}
                        onRequestClose={() => {
                            console.log("Modal has been closed.")
                        }}
                    >
                        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ backgroundColor: '#FFFFFF', borderRadius: 20, width: '90%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, paddingTop: 28, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>Success!</Text>

                                <Text style={{ fontSize: 14, paddingTop: 20, fontFamily: 'Gotham-Medium', color: '#272727' }}>Your answers have been submitted.</Text>

                                <TouchableOpacity onPress={() => {this.props.navigation.navigate('Question')}} activeOpacity={0.6}>
                                    <View style={{ backgroundColor: '#00AFF0', marginTop: 25, height: 47, justifyContent: 'center', paddingHorizontal: 50, borderRadius: 50, marginBottom: 28 }}>
                                        <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#FFFFFF' }}>Close</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
                <Modal animationType="none" visible={this.state.editAnsModal} transparent={false}>
                    <SafeAreaView style={styles.container}>
                        <Spinner visible={this.state.loading} />
                        <View style={[styles.headerMain, { marginTop: 20, marginHorizontal: 16 }]}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 32 }}>
                                <SVGImg.HeaderLogo />
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => { this.setState({ editAnsModal:false }) }} activeOpacity={0.6}>
                                    <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16 }}>Question {currentQuestion} of {questionCount}</Text>

                        <View style={{ marginLeft: 16, marginRight: 24 }}>
                            <Text style={{ marginTop: 15, fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727', lineHeight: 20 }}>{this.props.surveyDetailData.length != 0 ? this.props.surveyDetailData[this.state.index].question : null}</Text>

                            {
                                this.props.surveyDetailData.length != 0 ?
                                    this.props.surveyDetailData[this.state.index].answeroption == "rediobutton" ?
                                        <View>
                                            {
                                                this.props.surveyDetailData[this.state.index].anslist.map((item, index) => (
                                                    console.log('item:',item),
                                                    <TouchableOpacity key={index} style={{
                                                        marginTop: 30, borderRadius: 30, height: 41, justifyContent: 'center', paddingHorizontal: 18,
                                                        backgroundColor: item.answer_title == this.state.answerArray[this.state.index].answeroption ? '#00AFF0' : '#E0E0E066'
                                                    }} activeOpacity={0.6}
                                                        onPress={() => { this.changeRadioBtnValue(item) }}>
                                                        <Text style={{
                                                            fontSize: 14, fontFamily: 'Gotham-Medium',
                                                            color: item.answer_title == this.state.answerArray[this.state.index].answeroption ? '#FFFFFF' : '#272727'
                                                        }}>{item.answer_title}</Text>
                                                    </TouchableOpacity>
                                                ))
                                            }
                                            {this.state.errorRadio != '' ? <Text style={{ padding: 10, fontFamily: 'Gotham-Medium', color: 'red', alignSelf: 'flex-start', fontSize: 14 }}>{this.state.errorRadio}</Text> : null}
                                        </View>

                                        :
                                        this.props.surveyDetailData[this.state.index].answeroption == "checkbox" ?
                                            <View>
                                                {
                                                    this.props.surveyDetailData[this.state.index].anslist.map((item, index) => (
                                                        <View key={index} style={{ flexDirection: 'row' }}>
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

                                            <View >
                                                <TextInput
                                                    style={{ paddingLeft: 18, paddingRight: 5, paddingTop: 15, fontFamily: 'Gotham-Medium', color: '#919191', fontSize: 14, marginTop: 20, height: 131, borderRadius: 10, backgroundColor: '#F3F3F3' }}
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
                </Modal>
            </SafeAreaView>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('survey data::', state.SurveyData.surveyDetailData)
    const AUTH = state.LoginData.token
    const surveyDetailData = state.SurveyData.surveyDetailData
    return { AUTH, surveyDetailData }
}
export default connect(mapStateToProps, null)(ReviewAnswer)
