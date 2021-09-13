import React, { Component } from 'react'
import { Text, View, SafeAreaView, Dimensions, FlatList } from 'react-native'
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
class ResultBarProgress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layOutHeight: height,
            layOutWidth: width,
            callProgressAnimationView: false,
            barProgress: 0.3,
            resultData: [
                {
                    id: 1,
                    ans: 'Sporting activities, games, matches etc',
                    barProgress: 0.8,
                },
                {
                    id: 2,
                    ans: 'School trips',
                    barProgress: 0.6,
                },
                {
                    id: 3,
                    ans: 'Duke of Edinburgh expesitions',
                    barProgress: 0.3,
                },

            ],
            answerGraphData: [],
            loading: false,
            graphData: [],
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
            array.map((item, key) => {
                let multiply = item.count * 100;
                let ans = (multiply / countAddition).toFixed()
                let finalans = (ans / 100)
                array[key].count = finalans
            })
            console.log('temp::', temp)
            this.setState({ graphData: temp })
        }
    }

    render() {
        console.log('data:::', this.state.answerGraphData)
        const { question } = this.props.route.params
        return (
            <SafeAreaView style={styles.container} onLayout={event => {
                const layout = event.nativeEvent.layout;
                this.setState({ height: layout.height, width: layout.width })
            }}>
                <Spinner visible={this.state.loading} />
                <Header btn={true} leftPress={() => this.props.navigation.goBack()} />
                <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16 }}>You said did' 'OAT listended …….</Text>

                <View style={{ flex: 1, marginLeft: 16, marginRight: 27 }}>
                    <Text style={{ marginTop: 15, fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727', lineHeight: 21 }}>{question}</Text>
                    <View>
                        <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', }}>Survey Result</Text>
                    </View>
                    {
                        this.state.answerGraphData.length != 0 ?
                            <FlatList
                                data={this.state.answerGraphData}
                                renderItem={({ item, index }) => (
                                    <View>
                                        <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', }}>{item.ans}</Text>
                                        <View style={{ paddingTop: 15 }}>
                                            <Progress.Bar borderRadius={0} width={width / 1.1} color="#00AFF0" progress={item.count} animationType="timing" unfilledColor="rgba(0,175,240,0.4)" height={25} children={<Text style={{ top: 5, position: 'absolute', left: item.count * 100 <= 10 ? (item.count * 100 - 7.5).toString() + '%' : (item.count * 100 - 12).toString() + '%', color: "white", fontSize: 13, fontFamily: 'Gotham-Medium', textAlign: 'right' }}>{item.count * 100 + '%'}</Text>} />
                                        </View>
                                    </View>

                                )}
                            />
                            : null
                    }

                </View>
            </SafeAreaView>
        )
    }
}
const mapStateToProps = (state) => {
    const AUTH = state.LoginData.token
    const answerGraphData = state.SurveyData.answerGraphData
    return { AUTH, answerGraphData }
}
export default connect(mapStateToProps, { answer_graph })(ResultBarProgress)
