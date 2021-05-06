import React, { Component } from 'react';
import { View, Image, SafeAreaView, ImageBackground, Dimensions, Text, TouchableOpacity, FlatList,StatusBar } from 'react-native'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import styles from '../../style/styles'
import Header from '../../Components/Header'
class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    text: 'New Questionnaires',
                    navigation: 'Week1Questionaires'
                },
                {
                    id: 2,
                    text: 'Pending Questionnaires',
                    count: '(2)',
                    navigation: 'Week1PendingQue'
                },
                {
                    id: 3,
                    text: 'Completed Questionnaires',
                    count: '(2)',
                    navigation: 'CompletedQuestion'
                },
            ]
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
                <Header leftImagePress={() => { this.props.navigation.openDrawer() }} />
                <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 12 }}>Questionnaires</Text>

                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item, index }) => (
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E066' }}>
                                <TouchableOpacity activeOpacity={0.6} onPress={() => this.props.navigation.navigate(item.navigation)}>
                                    <View style={{ flexDirection: 'row', paddingVertical: 18, marginLeft: 16, marginRight: 24, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ flex: 1, fontSize: 14, color: '#272727', fontFamily: 'Gotham-Medium' }}>{item.text} <Text style={{ color: '#00AFF0' }}>{item.count}</Text></Text>
                                        <Image style={{ height: 10, width: 11, resizeMode: 'contain' }} source={require('../../images/arrow.png')} />
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
export default Question