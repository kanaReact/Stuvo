import React, { Component } from 'react';
import { View, Image, SafeAreaView, ImageBackground, Dimensions, Text, TouchableOpacity, FlatList } from 'react-native'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import styles from '../../style/styles'
import Header from '../../Components/Header'
import SVGImg from '../../Source/SVGImg';
class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    text: 'New Surveys',
                    navigation: 'Week1Questionaires'
                },
                {
                    id: 2,
                    text: 'Pending Surveys',
                    count: '(2)',
                    navigation: 'Week1PendingQue'
                },
                {
                    id: 3,
                    text: 'Completed Surveys',
                    count: '(2)',
                    navigation: 'CompletedQuestion'
                },
            ]
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground
                    style={{
                        height: '100%',
                        width: '100%',
                        resizeMode: 'stretch',
                    }}
                    resizeMode='stretch'
                    source={require('../../images/mainback.png')}
                >
                    <Header leftImagePress={() => { this.props.navigation.openDrawer() }} />
                    <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 12 }}>Surveys</Text>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item, index }) => (
                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E066' }}>
                                    <TouchableOpacity activeOpacity={0.6} onPress={() => this.props.navigation.navigate(item.navigation)}>
                                        <View style={{ flexDirection: 'row', paddingVertical: 18, marginLeft: 16, marginRight: 24, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ flex: 1, fontSize: 14, color: '#272727', fontFamily: 'Gotham-Medium' }}>{item.text} <Text style={{ color: '#00AFF0' }}>{item.count}</Text></Text>
                                            <SVGImg.Arrow />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={item => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}
export default Question