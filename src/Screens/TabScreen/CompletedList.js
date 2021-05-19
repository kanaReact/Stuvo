import React, { Component } from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'


class CompletedList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    question_no: 'Question 1',
                    question: 'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod?',
                    answer: 'a.   Yes'
                },
                {
                    id: 2,
                    question_no: 'Question 2',
                    question: 'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod?',
                    answer: 'a.   Yes'
                },
                {
                    id: 3,
                    question_no: 'Question 3',
                    question: 'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod?',
                    answer: 'No answer',
                },
                {
                    id: 4,
                    question_no: 'Question 4',
                    question: 'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod?',
                    answer: 'b.   No',
                },
                {
                    id: 5,
                    question_no: 'Question 5',
                    question: 'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod?',
                    answer: 'a.   Yes'
                },
            ]
        }
    }
    render() {
        return (
            <SafeAreaView style={[styles.container,{ backgroundColor:'white' }]}>
                <Header lefttxt={{ color: '#919191' }} btn={true} leftPress={() => this.props.navigation.goBack()} />
                <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 12 }}>Anti-bullying</Text>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item, index }) => (
                        <View style={{ backgroundColor: '#F3F3F3', marginHorizontal: 16, height: 140, borderRadius: 13,marginTop:5 ,marginBottom:5 }}>
                            <View>
                                <Text style={{ color: "#00AFF0", fontFamily: 'Gotham-Medium', fontSize: 14, paddingLeft: 13, paddingTop: 16 }}>{item.question_no}</Text>
                            </View>

                            <View>
                                <Text style={{ color: "#272727", fontFamily: 'Gotham-Medium', fontSize: 13, paddingLeft: 13, paddingTop: 16,paddingHorizontal:10 }}>{item.question}</Text>
                            </View>

                            <View>
                                <Text style={{ color: "#272727", fontFamily: 'Gotham-Medium', fontSize: 14, paddingLeft: 13, paddingTop: 26 }}>{item.answer}</Text>
                            </View>
                        </View>
                    )}
                />
            </SafeAreaView>
        );
    }
}
export default CompletedList