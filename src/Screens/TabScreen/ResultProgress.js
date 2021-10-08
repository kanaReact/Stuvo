import React, { Component } from 'react'
import { Text, View, SafeAreaView, Dimensions } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'
import Pie from 'react-native-pie'
import ProgressCircle from 'react-native-progress-circle'
import PieChart from '../../Components/PieChart'
import RnProgress from 'rn-animated-progress-circle'
import * as Progress from 'react-native-progress'
import { connect } from 'react-redux'
import { answer_graph } from '../../Redux/Action'
import Spinner from '../../Components/Spinner'
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
class ResultProgress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layOutHeight: height,
            layOutWidth: width,
            callProgressAnimationView: false,
            barProgress: 0.3,
            loading: false,
            answerGraphData: [],
            noData: false,
            graphArray: [],
            colorArray: ['#67D1F8', '#0085B7', '#00AFF0', '#55ccf7', '#24bdf5', '#0991c3', '#80ddff'],
            randomColor: []
        }
    }
    componentWillMount() {
        this.setState({ loading: true })
        const { id } = this.props.route.params
        this.props.answer_graph(this.props.AUTH, id)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ loading: false })
        if (nextProps.answerGraphData != this.state.answerGraphData) {
            this.setState({ answerGraphData: nextProps.answerGraphData }, () => {
                this.calculateGraph()
            })
        }
    }
    calculateGraph() {
        let array = this.state.answerGraphData
        if (array.length != 0) {
            let countAddition = array.map(item => item.count).reduce((a, b) => a + b)
            let temp = []
            let colorTemp = [];
            array.map((item, index) => {
                console.log('count:', item.count)
                let multiply = item.count * 100;
                let ans = (multiply / countAddition).toFixed()
                let finalans = (ans / 100)
                temp.push(finalans)
                var letters = '0123456789ABCDEF';
                var color = '#';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                //var randomElement = this.state.colorArray[Math.floor(Math.random() * this.state.colorArray.length)];
                var randomElement = color
                console.log('color:', randomElement)
                array[index].color = randomElement
                colorTemp.push(randomElement)
            })
            this.setState({ randomColor: colorTemp, answerGraphData: array })
            this.setState({ graphArray: temp })
        }
    }
    percentage(item) {
        let array = this.state.answerGraphData
        let countAddition = array.map(item => item.count).reduce((a, b) => a + b)
        let temp = []
        let multiply = item.count * 100;
        let ans = (multiply / countAddition).toFixed()
        console.log('data:', ans)
        return ans + '%'
    }
    render() {
        const { question } = this.props.route.params
        console.log('data:::', this.state.answerGraphData)
        return (
            <SafeAreaView style={styles.container} onLayout={event => {
                const layout = event.nativeEvent.layout;
                this.setState({ height: layout.height, width: layout.width })
            }}>
                <Spinner visible={this.state.loading} />
                <Header btn={true} leftPress={() => this.props.navigation.goBack()} />
                <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16 }}>You said did' 'OAT listended …….</Text>

                {
                    this.state.noData == false ?
                        <View style={{ flex: 1, marginLeft: 16, marginRight: 27 }}>
                            <Text style={{ marginTop: 15, fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727', lineHeight: 21 }}>{question}</Text>
                            <View style={{ flexDirection: 'row', paddingTop: 50 }}>
                                <View style={{ flex: 1, justifyContent: 'center', }}>
                                    <PieChart
                                        percentArray={this.state.graphArray}
                                        colorArray={this.state.randomColor}
                                        outerRadius={80}
                                        innerRadius={50}
                                    />
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', marginLeft: 30 }}>
                                    <Text style={{ fontSize: 12, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>Survey</Text>

                                    {
                                        this.state.answerGraphData.length != 0 ?
                                            this.state.answerGraphData.map((item, index) => (
                                                <View style={{ flexDirection: 'row', marginTop: 24, alignItems: 'center' }}>
                                                    <View style={{ height: 5, width: 15, borderRadius: 20, backgroundColor: item.color }} />
                                                    <Text style={{ marginLeft: 13, fontSize: 12, fontFamily: 'Gotham-Medium', color: '#272727' }}>{item.ans} - <Text style={{ marginLeft: 14, fontSize: 12, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>{this.percentage(item)}</Text></Text>
                                                </View>
                                            ))
                                            : null
                                    }

                                </View>
                            </View>
                        </View>
                        :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Gotham-Medium', fontSize: 15 }}>No Data Available</Text>
                        </View>
                }
            </SafeAreaView>
        )
    }
}
const mapStateToProps = (state) => {
    const AUTH = state.LoginData.token
    const answerGraphData = state.SurveyData.answerGraphData
    return { AUTH, answerGraphData }
}
export default connect(mapStateToProps, { answer_graph })(ResultProgress)
