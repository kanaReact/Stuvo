import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, FlatList, Image, SafeAreaView, Modal } from 'react-native'
const { height, width } = Dimensions.get('window');
import styles from '../style/styles'

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
            btn: true
        }
    }

    toggleModal = () => {
        this.setState({ isVisible: !this.state.isVisible })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flexDirection: 'row', marginTop: 30, marginHorizontal: 16 }}>
                    <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727' }}>Review answers</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-end', flex: 1 }}>
                        <TouchableOpacity onPress={this.toggleModal} activeOpacity={0.6}>
                            <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flex: 1, marginTop: 24, marginBottom: 5, marginHorizontal: 16 }}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item, index }) => (
                            <View style={{ paddingHorizontal: 18, borderRadius: 10, backgroundColor: '#F3F3F3', marginTop: 10 }}>
                                <View style={{ marginVertical: 18, flexDirection: 'row' }}>
                                    <Text style={{ flex: 1, fontSize: 13, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>Question {item.num}</Text>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate(item.navigation, { btn: 'true' })} activeOpacity={0.6}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Image
                                                style={{ height: 12, width: 12, resizeMode: 'contain' }}
                                                source={require('../images/pen.png')}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727', lineHeight: 20 }}>{item.que}</Text>

                                <View style={{ flexDirection: 'row', marginTop: 25, marginBottom: 16, alignItems: 'center' }}>
                                    {item.option == '' ? <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727' }}>{item.optname}</Text> :
                                        <>
                                            <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727' }}>{item.option}</Text>
                                            <Text style={{ marginLeft: 15, fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727' }}>{item.optname}</Text>
                                        </>
                                    }
                                </View>
                            </View>
                        )}
                        keyExtractor={item => item.id.toString()}
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

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Question')} activeOpacity={0.6}>
                                    <View style={{ backgroundColor: '#00AFF0', marginTop: 25, height: 47, justifyContent: 'center', paddingHorizontal: 50, borderRadius: 50, marginBottom: 28 }}>
                                        <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#FFFFFF' }}>Close</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
        )
    }
}

export default ReviewAnswer
