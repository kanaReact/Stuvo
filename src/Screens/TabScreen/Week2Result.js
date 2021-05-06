import React, { Component } from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'
class Week2Result extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header leftImagePress={() => { this.props.navigation.openDrawer() }} />
                <Text>Week 2 Result</Text>
            </SafeAreaView>
        )
    }
}

export default Week2Result
