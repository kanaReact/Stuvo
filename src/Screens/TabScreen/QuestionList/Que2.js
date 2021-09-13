import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native'
import styles from '../../../style/styles'
import SVGImg from '../../../Source/SVGImg';
import DropDown from '../../../Components/DropDown';
class Que2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            data: [
                {
                    id: 1,
                    name: 'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod?'
                },
                {
                    id: 2,
                    name: 'Label 2'
                },
                {
                    id: 3,
                    name: 'Label 3'
                },
                {
                    id: 4,
                    name: 'Label 4'
                },
            ],
            dropdownData: [],
            selectRank: [],
        }
    }
    componentDidMount() {
        let temp = []
        this.state.data.map((item, index) => {
            let val = index + 1
            temp.push({ id: val, name: val })
        })
        this.setState({ dropdownData: temp })
    }

    selectedIndex = (i) => {
        this.setState({ currentIndex: i })
    }
    onDropDown(item, index) {
        let temp = this.state.selectRank;
        temp[index] = item;
        this.setState({ selectRank: temp });
    }
    render() {
        const { currentIndex } = this.state;
        console.log('select rank arr:', this.state.selectRank);
        return (
            <SafeAreaView style={styles.container}>
                <View style={[styles.headerMain, { marginTop: 20, marginHorizontal: 16 }]}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} activeOpacity={0.6}>
                            <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: '#919191' }}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 16 }}>
                        <SVGImg.HeaderLogo />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Week1Questionaires')} activeOpacity={0.6}>
                            <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{ paddingBottom: 50 }}>
                    <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16 }}>Question 2 of 25</Text>
                    <View style={{ marginLeft: 16, marginRight: 24 }}>
                        <Text style={{ marginTop: 15, fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727', lineHeight: 20 }}>Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod?</Text>
                        {
                            this.state.data.map((item, index) => (
                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <Text style={{ marginTop: 35, paddingLeft: 5, fontFamily: 'Gotham-Medium', flex: 1 }}>{item.name}</Text>
                                    <DropDown
                                        placeholder="Select Rank"
                                        data={this.state.dropdownData}
                                        value={this.state.selectRank[index]}
                                        onSelect={value => {
                                            this.onDropDown(value, index);
                                        }}
                                        Style={{ width: '45%', marginTop: 0, marginHorizontal: 0, flex: 1 }}
                                    />

                                </View>
                            ))
                        }
                    </View>
                </ScrollView>
                <View style={{ justifyContent: 'flex-end', marginHorizontal: 27 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Que25')} activeOpacity={0.6}>
                        <View style={{ justifyContent: 'flex-end', height: 47, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00AFF0', marginBottom: 50, borderRadius: 50 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#FFFFFF' }}>Next Question</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        )
    }
}

export default Que2
