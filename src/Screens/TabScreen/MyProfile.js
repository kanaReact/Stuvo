import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, SafeAreaView, TextInput,ScrollView } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'

class MyProfile extends Component
{
    render()
    {
        return(
            <SafeAreaView style={styles.container}>
                <View style={[styles.headerMain, { marginTop: 20, marginHorizontal: 16 }]}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 16 }}>
                        <Image source={require('../../images/HomeLogotopImg.png')} style={{ width: 134, height: 37, resizeMode: 'contain' }} />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} activeOpacity={0.6}>
                            <Text style={{ fontSize: 14, fontFamily: 'Gotham-Medium', color: '#00AFF0' }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 12 }}>My Profile</Text>
                <View style={{ paddingTop:30 }}>
                    <View style={styles.myProfileView}>
                        <View>
                            <Text style={styles.myProfileTxt}>Name</Text>
                        </View>
                        <View>
                            <Text style={styles.myProfileText}>Katie Smith</Text>
                        </View>
                    </View>

                    <View style={styles.myProfileView}>
                        <View>
                            <Text style={styles.myProfileTxt}>School</Text>
                        </View>
                        <View>
                            <Text style={styles.myProfileText}>Abbey College Cambridge</Text>
                        </View>
                    </View>

                    <View style={styles.myProfileView}>
                        <View>
                            <Text style={styles.myProfileTxt}>Age</Text>
                        </View>
                        <View>
                            <Text style={styles.myProfileText}>18</Text>
                        </View>
                    </View>

                    <View style={styles.myProfileView}>
                        <View>
                            <Text style={styles.myProfileTxt}>Email</Text>
                        </View>
                        <View>
                            <Text style={styles.myProfileText}>selenamartin@mail.com</Text>
                        </View>
                    </View>

                    <View style={styles.myProfileView}>
                        <View>
                            <Text style={styles.myProfileTxt}>Contact number</Text>
                        </View>
                        <View>
                            <Text style={styles.myProfileText}>+44 712 345 6789</Text>
                        </View>
                    </View>

                    <View style={styles.myProfileView}>
                        <View>
                            <Text style={styles.myProfileTxt}>Total number of{'\n'}Surveys Completed</Text>
                        </View>
                        <View>
                            <Text style={styles.myProfileText}>10</Text>
                        </View>
                    </View>
                </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
export default MyProfile