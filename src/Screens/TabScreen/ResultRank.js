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
class ResultRank extends Component {
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
            keyValArr: []
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
            this.setState({ answerGraphData: nextProps.answerGraphData })
            console.log('graph data:', nextProps.answerGraphData)
        }
    }
    displayTotal(obj) {
        const sumValues = Object.values(obj).reduce((a, b) => a + b);
        return sumValues
    }
    render() {
        const { question } = this.props.route.params
        return (
            <SafeAreaView style={styles.container}>
                <Spinner visible={this.state.loading} />
                <Header btn={true} leftPress={() => this.props.navigation.goBack()} />
                <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16 }}>You said did' 'OAT listended …….</Text>
                <View style={{ flex: 1, marginLeft: 16, marginRight: 27 }}>
                    <Text style={{ marginTop: 15, fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727', lineHeight: 21 }}>{question}</Text>
                    <FlatList
                        data={this.state.answerGraphData}
                        style={{ marginTop: 10 }}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <View style={{ backgroundColor: '#00AFF0', minHeight: 25, justifyContent: 'center', }}>
                                        <Text style={{ fontFamily: 'Gotham-Medium', fontSize: 14, color: '#fff', paddingLeft: 10, paddingVertical: 10 }}>{item.Option}</Text>
                                    </View>
                                    {
                                        Object.keys(item.list).map((value) => (
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, backgroundColor: '#F2F2F2', paddingBottom: 10, }}>
                                                <Text style={{ fontSize: 14, color: '#000', paddingLeft: 10 }}>{value} :</Text>
                                                <Text style={{ fontSize: 14, color: '#000', paddingRight: 10 }}>{item.list[value]}</Text>
                                            </View>
                                        ))
                                    }
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, backgroundColor: '#F2F2F2', paddingBottom: 10 }}>
                                        <Text style={{ fontSize: 14, color: '#000', paddingLeft: 10 }}>Total :</Text>
                                        <Text style={{ fontSize: 14, color: '#000', paddingRight: 10 }}>{this.displayTotal(item.list)}</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />
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
export default connect(mapStateToProps, { answer_graph })(ResultRank)
