import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Modal } from 'react-native'
import styles from '../../../style/styles'
import Header from '../../../Components/Header'
export class QueSubmit extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                <Text style={{ marginTop: 30, fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727', marginLeft: 16, marginRight: 24, lineHeight: 20 }}>You have now completed all question, please now submit your answers.</Text>

                <View style={{ flex: 1, justifyContent: 'flex-end', marginHorizontal: 27 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ReviewAnswer')} activeOpacity={0.6} style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center', marginBottom: 27 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>{this.state.isVisible ? '' : 'Review answers'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.toggleModal} activeOpacity={0.6}>
                        <View style={{ alignItems: 'center', backgroundColor: '#00AFF0', marginBottom: 50, height: 47, justifyContent: 'center', borderRadius: 50 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#FFFFFF' }}>Submit</Text>
                        </View>
                    </TouchableOpacity>
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

export default QueSubmit
