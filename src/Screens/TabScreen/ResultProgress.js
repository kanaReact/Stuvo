import React, { Component } from 'react'
import { Text, View, SafeAreaView,Dimensions } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'
import Pie from 'react-native-pie'
import ProgressCircle from 'react-native-progress-circle'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class ResultProgress extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header btn={true} leftPress={() => this.props.navigation.goBack()} />
                <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16 }}>You said we did’ ‘OAT listened…..</Text>

                <View style={{ flex: 1, marginLeft: 16, marginRight: 27 }}>
                    <Text style={{ marginTop: 15, fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727',  }}>Lorem ipsum dolor sit amet, consectetur adipis cing elit sed do eiusmod.</Text>

                    <View style={{ flex: 5, flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center', position: 'relative' }}>
                            <Pie
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
                            />
                            <View style={{ position: 'absolute', justifyContent: 'center', bottom: height/4.1, right: width/9, }}>
                                <Text style={{ fontSize: 11, fontFamily: 'Gotham-Medium', color: '#FFFFFF' }}>10%</Text>
                            </View>
                            <View style={{ position: 'absolute',  justifyContent: 'center', left: width/2.9, bottom: height/6,alignItems:"center"  }}>
                                <Text style={{ fontSize: 11, fontFamily: 'Gotham-Medium', color: '#FFFFFF' }}>15%</Text>
                            </View>
                            <View style={{ position: 'absolute',  alignItems: 'center', bottom: height/10.1, left: width/5.5, }}>
                                <Text style={{ fontSize: 11, fontFamily: 'Gotham-Medium', color: '#FFF', }}>65%</Text>
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

                    <View style={{ flex: 5, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <ProgressCircle
                                percent={65}
                                radius={42}
                                borderWidth={6}
                                color="#00AFF0"
                                shadowColor="#E8E8E8"
                                bgColor="#fff"
                            >
                                <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>{'65%'}</Text>
                            </ProgressCircle>
                            <View style={{ alignItems: 'flex-start', marginLeft: 10, marginTop: 12 }}>
                                <Text style={{ fontSize: 12, fontFamily: 'Gotham-Medium', color: '#272727' }}>University 1</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <ProgressCircle
                                percent={13}
                                radius={42}
                                borderWidth={6}
                                color="#00AFF0"
                                shadowColor="#E8E8E8"
                                bgColor="#fff"
                            >
                                <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>{'15%'}</Text>
                            </ProgressCircle>
                            <Text style={{ marginTop: 12, fontSize: 12, fontFamily: 'Gotham-Medium', color: '#272727' }}>University 2</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <ProgressCircle
                                percent={8}
                                radius={42}
                                borderWidth={6}
                                color="#00AFF0"
                                shadowColor="#E8E8E8"
                                bgColor="#fff"
                            >
                                <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>{'10%'}</Text>
                            </ProgressCircle>
                            <View style={{ alignItems: 'center', marginRight: 5, marginTop: 12 }}>
                                <Text style={{ fontSize: 12, fontFamily: 'Gotham-Medium', color: '#272727' }}>University 3</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </SafeAreaView>
        )
    }
}

export default ResultProgress
