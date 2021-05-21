import React, { Component } from 'react'
import { Text, View, SafeAreaView, Dimensions } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'
import Pie from 'react-native-pie'
import ProgressCircle from 'react-native-progress-circle'
import PieChart from '../../Components/PieChart'
import RnProgress from 'rn-animated-progress-circle'
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
class ResultProgress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layOutHeight: height,
            layOutWidth: width,
            callProgressAnimationView: false
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container} onLayout={event => {
                const layout = event.nativeEvent.layout;
                this.setState({ height: layout.height, width: layout.width })
                console.log('Height:', layout.height)
                // this.setState({frameStart:this.state.new_clarity_value})
                //   this.calculateFramestart();
            }}>
                <Header btn={true} leftPress={() => this.props.navigation.goBack()} />
                <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16 }}>Your voice has been heard …….</Text>

                <View style={{ flex: 1, marginLeft: 16, marginRight: 27 }}>
                    <Text style={{ marginTop: 15, fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727', lineHeight: 21 }}>Lorem ipsum dolor sit amet, consectetur adipis cing elit sed do eiusmod.</Text>

                    <View style={{ flex: 5, flexDirection: 'row', }}>
                        <View style={{ flex: 1, justifyContent: 'center', }}>
                            {/* <Pie
                                radius={80}
                                innerRadius={50}
                                sections={[
                                    {
                                        percentage: 10,
                                        color: '#67D1F8',
                                    },
                                    {
                                        percentage: 25,
                                        color: '#0085B7',
                                    },
                                    {
                                        percentage: 65,
                                        color: '#00AFF0',
                                    },
                                ]}
                                strokeCap={'butt'}
                            /> */}
                            <PieChart
                                percentArray={[0.10, 0.25, 0.65,]}
                                colorArray={['#67D1F8', '#0085B7', '#00AFF0']}
                                outerRadius={80}
                                innerRadius={50}
                                animationEndCallBack={() => { this.setState({ callProgressAnimationView: true }) }}
                            />
                            <View style={{ position: 'absolute', justifyContent: 'center', bottom: this.state.layOutHeight / 4.2, marginLeft: 'auto', marginRight: 'auto', right: 0, left: (width / 2) - 145 }}>
                                <Text style={{ fontSize: 11, fontFamily: 'Gotham-Medium', color: '#FFF', textAlign: "center", }}>10%</Text>
                            </View>
                            <View style={{ position: 'absolute', justifyContent: 'center', bottom: this.state.layOutHeight / 6.6, marginLeft: 'auto', marginRight: 'auto', right: 0, left: width / 3.2, }}>
                                <Text style={{ fontSize: 11, fontFamily: 'Gotham-Medium', color: '#FFF', textAlign: 'center', width: 50 }}>15%</Text>
                            </View>
                            <View style={{ position: 'absolute', justifyContent: 'center', top: this.state.layOutHeight / 4.2, left: 0, marginLeft: 'auto', marginRight: 'auto', right: 0, }}>
                                <Text style={{ fontSize: 11, fontFamily: 'Gotham-Medium', color: '#FFFFFF', textAlign: "center", paddingLeft: 10 }}>65%</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', marginLeft: 30 }}>
                            <Text style={{ fontSize: 12, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>Survey</Text>

                            <View style={{ flexDirection: 'row', marginTop: 24, alignItems: 'center' }}>
                                <View style={{ height: 5, width: 15, borderRadius: 20, backgroundColor: '#00AFF0' }}></View>
                                <Text style={{ marginLeft: 13, fontSize: 12, fontFamily: 'Gotham-Medium', color: '#272727' }}>University 1 -  <Text style={{ marginLeft: 13, fontSize: 12, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>65%</Text></Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 6, alignItems: 'center' }}>
                                <View style={{ height: 5, width: 15, borderRadius: 20, backgroundColor: '#0085B7' }}></View>
                                <Text style={{ marginLeft: 13, fontSize: 12, fontFamily: 'Gotham-Medium', color: '#272727' }}>University 2 -  <Text style={{ marginLeft: 13, fontSize: 12, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>15%</Text></Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 6, alignItems: 'center' }}>
                                <View style={{ height: 5, width: 15, borderRadius: 20, backgroundColor: '#67D1F8' }}></View>
                                <Text style={{ marginLeft: 13, fontSize: 12, fontFamily: 'Gotham-Medium', color: '#272727' }}>University 3 -  <Text style={{ marginLeft: 13, fontSize: 12, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>10%</Text></Text>
                            </View>
                        </View>
                    </View>

                    {
                        this.state.callProgressAnimationView == true ?
                            <View style={{ flex: 5, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <RnProgress
                                        value={0.65}
                                        size={100}
                                        color="#00AFF0"
                                        unfilledColor="#d3d3d3"
                                        animationMethod="spring"
                                        animationConfig={true}
                                        shouldAnimateFirstValue={true}
                                        children={<Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>{'65%'}</Text>}
                                    />
                                    <View style={{ alignItems: 'flex-start', marginLeft: 10, marginTop: 12 }}>
                                        <Text style={{ fontSize: 12, fontFamily: 'Gotham-Medium', color: '#272727' }}>University 1</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <RnProgress
                                        value={0.15}
                                        size={100}
                                        color="#00AFF0"
                                        unfilledColor="#d3d3d3"
                                        animationMethod="spring"
                                        animationConfig={true}
                                        shouldAnimateFirstValue={true}
                                        children={<Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>{'15%'}</Text>}
                                    />
                                    <Text style={{ marginTop: 12, fontSize: 12, fontFamily: 'Gotham-Medium', color: '#272727' }}>University 2</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <RnProgress
                                        value={0.10}
                                        size={100}
                                        color="#00AFF0"
                                        unfilledColor="#d3d3d3"
                                        animationMethod="spring"
                                        animationConfig={true}
                                        shouldAnimateFirstValue={true}
                                        children={<Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>{'10%'}</Text>}
                                    />
                                    <View style={{ alignItems: 'center', marginRight: 5, marginTop: 12 }}>
                                        <Text style={{ fontSize: 12, fontFamily: 'Gotham-Medium', color: '#272727' }}>University 3</Text>
                                    </View>
                                </View>
                            </View>
                            : null
                    }

                </View>
            </SafeAreaView>
        )
    }
}

export default ResultProgress
