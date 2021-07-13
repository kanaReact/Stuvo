import React, { Component } from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import styles from '../../style/styles'
import Header from '../../Components/Header'
import SVGImg from '../../Source/SVGImg'
import { connect } from 'react-redux'
import axios from 'axios'
import constant from '../../Redux/config/constant'
import Spinner from '../../Components/Spinner'
import Toast from 'react-native-tiny-toast'
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
            ],
            description:'',
            loading:false,
            errorInput:''
        }
    }
    _renderItem({ item, index }) {
        const { id, text } = item;
        return (
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E066' }}>
                <TouchableOpacity activeOpacity={0.6}>
                    <View style={{ flexDirection: 'row', paddingVertical: 18, marginLeft: 16, marginRight: 24, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ flex: 1, fontSize: 14, color: '#272727', fontFamily: 'Gotham-Medium' }}>{text}</Text>
                        <SVGImg.Arrow />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    call_submitform_API()
    {
        this.setState({ loading:true })
        let url = constant.BASE_URL+'help_support_form_submit';
        let data = new URLSearchParams()
        data.append('name',this.props.name);
        data.append('school',this.props.school);
        data.append('descreption',this.state.description)
        axios.post(url,data,{
            headers:{ 
                'Authorization':'Bearer '+this.props.AUTH,
                'Content-Type': "application/x-www-form-urlencoded"
             }
        }).then(responseJson=>{
            this.setState({ loading:false })
            console.log('response::',responseJson.data)
            if(responseJson.data.status == 1)
            {
                Toast.show('Thank you for feedback', {
                    position: Toast.position.BOTTOM,
                    containerStyle: { backgroundColor: 'black' },
                    textStyle: { color: 'white' },
                })
                this.props.navigation.navigate('Question')
            }
        }).catch(error=>{
            this.setState({ loading:false })
        })
    }
    validate()
    {
        if(this.state.description == '')
        {
            this.setState({ errorInput:'Please enter description' })
        }
        else
        {
            this.call_submitform_API()
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header btn={true} leftPress={() => this.props.navigation.goBack()} />
                <Spinner visible={this.state.loading} />
                <ScrollView>
                    <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Gotham-Medium', color: '#00AFF0', marginLeft: 16 }}>Technical Help & Support</Text>

                    <Text style={{ marginTop: 22, fontSize: 14, fontFamily: 'Gotham-Medium', color: '#272727', marginLeft: 16, lineHeight: 20 }}>Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod</Text>


                    <View style={{ marginTop: 26, height: 49, marginHorizontal: 16, borderRadius: 10, backgroundColor: '#F3F3F3', fontFamily: 'Gotham-Medium', color: '#919191', fontSize: 14 }}>
                        <TextInput
                            style={{ flex: 1, paddingLeft: 18, paddingRight: 5, fontFamily: 'Gotham-Medium', color: '#272727', fontSize: 14 }}
                            placeholder="Name"
                            value={this.props.name}
                            editable={false}
                        />
                    </View>
                    <View style={{ marginTop: 18, height: 49, marginHorizontal: 16, borderRadius: 10, backgroundColor: '#F3F3F3', fontFamily: 'Gotham-Medium', color: '#919191', fontSize: 14 }}>
                        <TextInput
                            style={{ flex: 1, paddingLeft: 18, paddingRight: 5, fontFamily: 'Gotham-Medium', color: '#272727', fontSize: 14 }}
                            placeholder="Address"
                            value={this.props.school}
                            editable={false}
                        />
                    </View>

                    <View>
                        <TextInput
                            style={{ paddingLeft:18,marginTop: 15, height: 131, marginHorizontal: 16, borderRadius: 10, backgroundColor: '#F3F3F3', fontFamily: 'Gotham-Medium', color: '#272727', fontSize: 14,paddingTop:15 }}
                            placeholder="Write something..."
                            multiline={true}
                            blurOnSubmit={true}
                            returnKeyType="done"
                            placeholderTextColor="#919191"
                            value={this.state.description}
                            onChangeText={(text)=>{ this.setState({ description:text.trimStart(),errorInput:'' }) }}
                        />
                        {this.state.errorInput != '' ? <Text style={{ padding: 18, fontFamily: 'Gotham-Medium', color: 'red', alignSelf: 'flex-start', fontSize: 14 }}>{this.state.errorInput}</Text>:null}
                    </View>

                    <View style={{ justifyContent: 'flex-end', marginHorizontal: 27 }}>
                        <TouchableOpacity onPress={() => { this.validate() }} activeOpacity={0.6}>
                            <View style={{ alignItems: 'center', backgroundColor: '#00AFF0', marginBottom: 50, height: 47, justifyContent: 'center', borderRadius: 50, marginTop: 50 }}>
                                <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#FFFFFF' }}>Submit</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
const mapStateToProps = (state) => {
    const name = state.LoginData.name;
    const school = state.LoginData.school;
    const AUTH = state.LoginData.token
  
    return { name,school,AUTH  }
}
export default connect(mapStateToProps,null)(Help);