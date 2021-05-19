import React, { Component } from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity, TextInput,ScrollView } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'
class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    text: 'FAQ'
                },
                {
                    id: 2,
                    text: 'Help & Support'
                },
            ]
        }
    }
    _renderItem({ item, index }) {
        const { id, text } = item;
        return (
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E066' }}>
                <TouchableOpacity activeOpacity={0.6}>
                    <View style={{ flexDirection: 'row', paddingVertical: 18, marginLeft: 16, marginRight: 24, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ flex: 1, fontSize: 14, color: '#272727', fontFamily: 'Gotham-Medium' }}>{text}</Text>
                        <Image style={{ height: 10, width: 11, resizeMode: 'contain' }} source={require('../../images/arrow.png')} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header btn={true} leftPress={() => this.props.navigation.goBack()} />
                <ScrollView>
                <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16 }}>Technical Help & Support</Text>

                <Text style={{ marginTop: 22, fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727', marginLeft: 16, lineHeight: 20 }}>Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod</Text>


                <View style={{ marginTop: 26, height: 49, marginHorizontal: 16, borderRadius: 10, backgroundColor: '#F3F3F3', fontFamily: 'Gotham-Medium', color: '#919191', fontSize: 14 }}>
                    <TextInput
                        style={{ flex: 1, paddingLeft: 18, paddingRight: 5, fontFamily: 'Gotham-Medium', color: '#272727', fontSize: 14 }}
                        placeholder="Name"
                        value="Katie Smith"
                        editable={false}
                    />
                </View>
                <View style={{ marginTop: 18, height: 49, marginHorizontal: 16, borderRadius: 10, backgroundColor: '#F3F3F3', fontFamily: 'Gotham-Medium', color: '#919191', fontSize: 14 }}>
                    <TextInput
                        style={{ flex: 1, paddingLeft: 18, paddingRight: 5, fontFamily: 'Gotham-Medium', color: '#272727', fontSize: 14 }}
                        placeholder="Address"
                        value="Abbey College Cambridge"
                        editable={false}
                    />
                </View>

                <View style={{ marginTop: 15, height: 131, marginHorizontal: 16, borderRadius: 10, backgroundColor: '#F3F3F3', fontFamily: 'Gotham-Medium', color: '#919191', fontSize: 14 }}>
                    <TextInput
                        style={{ paddingLeft: 18, paddingRight: 5, paddingTop: 15, fontFamily: 'Gotham-Medium', color: '#919191', fontSize: 14 }}
                        placeholder="Write something..."
                        multiline={true}
                        blurOnSubmit={true}
                        returnKeyType="done"
                        
                    />
                </View>

                <View style={{ justifyContent: 'flex-end', marginHorizontal: 27 }}>
                    <TouchableOpacity onPress={() => { }} activeOpacity={0.6}>
                        <View style={{ alignItems: 'center', backgroundColor: '#00AFF0', marginBottom: 50, height: 47, justifyContent: 'center', borderRadius: 50,marginTop:50 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#FFFFFF' }}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default Help;