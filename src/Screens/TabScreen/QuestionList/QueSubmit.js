import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Modal, ImageBackground, BackHandler } from 'react-native'
import styles from '../../../style/styles'
import Header from '../../../Components/Header'
import ConfettiCannon from 'react-native-confetti-cannon';
import { connect } from 'react-redux'
import axios from 'axios';
import constant from '../../../Redux/config/constant';
import Spinner from '../../../Components/Spinner';
class QueSubmit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            loading: false,
            showBtn: false
        }
    }

    toggleModal() {
        this.explosion.start()
    }

    submitQuestion() {
        const { answerArray } = this.props.route.params
        this.setState({ loading: true })
        let url = constant.BASE_URL + 'survey_form_submit'
        let data = new URLSearchParams()
        data.append('ans_array', JSON.stringify(answerArray));
        console.log('data:', data)
        axios.post(url, data, {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                "Authorization": "Bearer " + this.props.AUTH
            },
        }).then(async (responseJson) => {
            this.setState({ loading: false })
            if (responseJson.data.status == 1) {
                this.explosion.start()
                await this.setState({ showBtn: true, isVisible: true })
            }
        }).catch(error => {

            this.setState({ loading: false })
        })

    }

    render() {
        const { answerArray } = this.props.route.params
        console.log('ans array:', answerArray)
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
                    source={require('../../../images/mainback.png')}>
                    <Header lefttxt={{ color: '#919191' }} btn={true} leftPress={() => this.props.navigation.navigate('Question')} />
                    <Text style={{ marginTop: 30, fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727', marginLeft: 16, marginRight: 24, lineHeight: 20 }}>You have now completed all questions, now submit your answers</Text>

                    {
                        this.state.showBtn == false ?
                            <View style={{ flex: 1, justifyContent: 'flex-end', marginHorizontal: 27 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ReviewAnswer', { answerArray: answerArray })} activeOpacity={0.6} style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center', marginBottom: 27 }}>
                                    <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>{this.state.isVisible ? '' : 'Review answers'}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { this.submitQuestion() }} activeOpacity={0.6}>
                                    <View style={{ alignItems: 'center', backgroundColor: '#00AFF0', marginBottom: 50, height: 47, justifyContent: 'center', borderRadius: 50 }}>
                                        <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#FFFFFF' }}>Submit</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            : null
                    }
                    <ConfettiCannon
                        count={20}
                        origin={{ x: -50, y: 0 }}
                        autoStart={false}
                        ref={ref => (this.explosion = ref)}
                    />

                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.isVisible}>
                            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ backgroundColor: '#FFFFFF', borderRadius: 20, width: '90%', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, paddingTop: 28, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>Success!</Text>
                                    <Text style={{ fontSize: 14, paddingTop: 20, fontFamily: 'Gotham-Medium', color: '#272727' }}>Your answers have been submitted.</Text>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Question')} activeOpacity={0.6}>
                                        <View style={{ backgroundColor: '#00AFF0', marginTop: 25, height: 47, justifyContent: 'center', paddingHorizontal: 50, borderRadius: 50, marginBottom: 28 }}>
                                            <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#FFFFFF' }}>Close</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        )
    }
}
const mapStateToProps = (state) => {
    const AUTH = state.LoginData.token
    const answerArray = state.SurveyData.answerArray
    return { AUTH, answerArray }
}
export default connect(mapStateToProps, null)(QueSubmit)
