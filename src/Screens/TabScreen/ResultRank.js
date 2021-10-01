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
            answerGraphData: [
                {
                    "Option": 'Ans 1',
                    "list": [
                        {
                            "1": 1,
                            "2": 0
                        }
                    ]
                },
                {
                    "Option": 'Ans 2',
                    "list": [
                        {
                            "1": 0,
                            "2": 1
                        }
                    ]
                },
            ],
            noData: false,
            graphArray: [],
        }
    }
    componentWillMount() {

    }
    getValues(val) {
        return (
            Object.values(val).map((value) => (
                <Text style={{ fontFamily: 'Gotham-Light', fontSize: 15, color: '#000', paddingRight: 15 }}>{value}</Text>
            ))
        )
    }
    render() {
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

                    <FlatList
                        data={this.state.answerGraphData}
                        renderItem={({ item, index }) => (
                            <View>
                                <View style={{ backgroundColor: '#00AFF0', minHeight: 25, justifyContent: 'center', }}>
                                    <Text style={{ fontFamily: 'Gotham-Medium', fontSize: 15, color: '#fff', paddingLeft: 10, }}>{item.Option}</Text>
                                </View>
                                {
                                    item.list.map((val, key) => (
                                        <>
                                            {
                                                Object.values(val).map((value) => (
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, backgroundColor: '#F2F2F2', paddingBottom: 10 }}>
                                                        <Text style={{ fontFamily: 'Gotham-Light', fontSize: 15, color: '#000', paddingLeft: 10 }}>Rank {value}:</Text>
                                                    </View>
                                                ))
                                            }
                                        </>

                                    ))


                                }
                            </View>
                        )}
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
