import React, { Component } from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'
class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    text: 'FAQ',
                    navigation: 'FAQ',
                    noteText:''
                },
                {
                    id: 2,
                    text: 'Technical Help & Support',
                    navigation: 'Help',
                    noteText:"Lorem ipsum dolor sit amet, consectetur adipis\ncing elit, sed do eiusmod"
                },
            ]
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header leftImagePress={() => { this.props.navigation.openDrawer() }} />
                <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, }}>Technical Support</Text>
                <Text style={{  fontSize: 14, fontFamily: 'Gotham-Medium', color: '#919191', marginLeft: 16,paddingTop:22,lineHeight:20,  }}>Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod</Text>
                <View style={{ flex: 1,paddingTop:20 }}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item, index }) => (
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E066' }}>
                                <TouchableOpacity activeOpacity={0.6} onPress={() => this.props.navigation.navigate(item.navigation)}>
                                <View style={{ flexDirection: 'row', paddingVertical: 18, marginLeft: 16, marginRight: 24, justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ flexDirection:'column',width:"85%" }}>
                                            <Text style={{  fontSize: 14, color: '#272727', fontFamily: 'Gotham-Medium' }}>{item.text}</Text>
                                            {item.noteText != '' ? <Text style={{ paddingTop:7,fontSize:10,color:"#919191",fontFamily:'Gotham-Medium',lineHeight:16 }}>{item.noteText}</Text>: null}
                                        </View>
                                        
                                        <View style={{ flexDirection:'column',width:"15%",alignItems:'flex-end' }}>
                                            <Image style={{ height: 10, width: 11, resizeMode: 'contain',tintColor:"#919191" }} source={require('../../images/arrow.png')} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={item => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

export default Notification;