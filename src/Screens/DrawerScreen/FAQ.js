import React, { Component } from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'
import { connect } from 'react-redux'
import { faq } from '../../Redux/Action'
import Spinner from '../../Components/Spinner'
class FAQ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
                },
                {
                    id: 2,
                    text: 'Lorem ipsum dolor sit amet, consectetur'
                },
            ],
            faqData: [],
            noData: false,
            loading: false
        }
    }
    componentWillMount() {
        this.setState({ loading:true })
        this.props.faq(this.props.AUTH)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ loading:false })
        if (nextProps.faqData != this.state.faqData) {
            this.setState({ faqData: nextProps.faqData })
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Spinner visible={this.state.loading} />
                <Header btn={true} leftPress={() => this.props.navigation.goBack()} />
                <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16, marginBottom: 6 }}>FAQ</Text>
                <View style={{ flex: 1 }}>
                    {
                        this.state.noData == false ?
                            <FlatList
                                data={this.state.faqData}
                                renderItem={({ item, index }) => (
                                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E066' }}>
                                        <TouchableOpacity activeOpacity={0.6} >
                                            <View style={{ paddingVertical: 16, marginLeft: 16, marginRight: 24 }}>
                                                <Text style={{ fontSize: 14, color: '#272727', fontFamily: 'Gotham-Medium', lineHeight: 20 }}>{item.title}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                showsVerticalScrollIndicator={false}
                            /> :
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Gotham-Medium', fontSize: 15 }}>No Data Available</Text>
                            </View>
                    }
                </View>
            </SafeAreaView>
        );
    }
}
const mapStateToProps = (state) => {
    const AUTH = state.LoginData.token
    const faqData = state.DrawerData.faqData
    return { AUTH, faqData }
}
export default connect(mapStateToProps, { faq })(FAQ);