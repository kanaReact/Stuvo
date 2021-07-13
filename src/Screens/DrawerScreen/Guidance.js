import React, { Component } from 'react'
import { SafeAreaView, View, Text, FlatList, ImageBackground } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'
import { connect } from 'react-redux'
import { guidance } from '../../Redux/Action'
import Spinner from '../../Components/Spinner'
class Guidance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    text: 'If you need help with completing survey speak to your SV Lead at academy'
                },
                {
                    id: 2,
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
                },
                {
                    id: 3,
                    text: 'Lorem ipsum dolor sit amet, consectetur'
                }
            ],
            guidanceData: [],
            loading: false,
            noData: false
        }
    }
    componentWillMount() {
        this.setState({ loading: true })
        this.props.guidance(this.props.AUTH)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ loading: false })
        if (nextProps.guidanceData != this.state.guidanceData) {
            this.setState({ guidanceData: nextProps.guidanceData })
        }
        if (nextProps.guidanceData.length == 0) {
            this.setState({ noData: true })
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
                    <Spinner visible={this.state.loading} />
                    <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 6 }}>Guidance</Text>
                    <View style={{ flex: 1 }}>
                        {
                            this.state.noData == false ?
                                <FlatList
                                    data={this.state.guidanceData}
                                    renderItem={({ item, index }) => (
                                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E066', paddingVertical: 16, marginLeft: 16, marginRight: 24 }}>
                                            <Text style={{ fonttSize: 14, fontFamily: 'Gotham-Medium', color: '#272727', lineHeight: 20 }}>{item.title}</Text>
                                        </View>
                                    )}

                                    showsVerticalScrollIndicator={false}
                                />
                                :
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'Gotham-Medium', fontSize: 15 }}>No Data Available</Text>
                                </View>
                        }
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}
const mapStateToProps = (state) => {
    const AUTH = state.LoginData.token
    const guidanceData = state.DrawerData.guidanceData
    return { AUTH, guidanceData }
}
export default connect(mapStateToProps, { guidance })(Guidance);