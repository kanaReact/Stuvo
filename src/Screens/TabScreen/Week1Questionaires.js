import React, { Component } from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList, Modal,Platform } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'
class Week1Questionaires extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    text: 'Anti-bullying',
                    timeToComplete:'24 hours left to complete',
                    color:'#E10000'
                },
                {
                    id: 2,
                    text: 'University Life',
                    timeToComplete:'24 hours left to complete',
                    color:'#E10000'
                },
                {
                    id: 3,
                    text: 'Mental Health',
                    timeToComplete:'3 days left to complete',
                    color:'#E17800'
                },
                {
                    id: 4,
                    text: 'Public Services',
                    timeToComplete:'5 days left to complete',
                    color:'#E17800'
                }
            ],
            isVisible: false
        }
    }

    toggleModal = () => {
        this.setState({ isVisible: !this.state.isVisible })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header lefttxt={{ color: '#919191' }} btn={true} leftPress={() => this.props.navigation.goBack()} />
                <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 12 }}>Week 1 - Questionnaires</Text>

                <View>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item, index }) => (
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E066' }}>
                                <TouchableOpacity activeOpacity={0.6} onPress={this.toggleModal}>
                                <View style={{ flexDirection: 'row', paddingVertical: 10, marginLeft: 16, marginRight: 24, justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ flexDirection:'column',width:"85%", }}>
                                            <Text style={{  fontSize: 14, color: '#272727', fontFamily: 'Gotham-Medium' }}>{item.text}</Text>
                                            <Text style={{ paddingTop:7,fontSize:10,color:item.color,fontFamily:Platform.OS == "android" ? "Gotham-BookItalic" : null,fontStyle:Platform.OS == "ios" ? "italic" : null }}>{item.timeToComplete}</Text>
                                        </View>
                                        
                                        <View style={{ flexDirection:'column',width:"15%",alignItems:'flex-end' }}>
                                            <Image style={{ height: 9, width: 11, resizeMode: 'contain',tintColor:'#919191' }} source={require('../../images/arrow.png')} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
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
                            <View style={{ backgroundColor: '#FFFFFF', borderRadius: 20, width: '90%', alignItems: 'center', paddingHorizontal: 23 }}>
                                <View style={{ marginTop: 45 }}>
                                    <Image
                                        style={{ height: 47, width: 170, resizeMode: 'contain' }}
                                        source={require('../../images/Notification_logo_black.png')}
                                    />
                                </View>

                                <Text style={{ fontSize: 20, paddingTop: 20, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>Before you proceed</Text>

                                <Text style={{ fontSize: 14, paddingTop: 20, fontFamily: 'Gotham-Medium', color: '#272727',  textAlign: 'center',lineHeight:21 }}>This new set of questions are strictly{'\n'}time-based. You only have 7 days to{'\n'}submit your answers.</Text>

                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Que1');this.setState({ isVisible:false }) }} activeOpacity={0.6}>
                                    <View style={{ backgroundColor: '#00AFF0', marginTop: 30, height: 47, justifyContent: 'center', paddingHorizontal: 40, borderRadius: 50, marginBottom: 33 }}>
                                        <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#FFFFFF' }}>Continue</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
        );
    }
}

export default Week1Questionaires