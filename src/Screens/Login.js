import React from 'react';
import { SafeAreaView, Image, TextInput, Text, View, Dimensions,TouchableOpacity,ScrollView } from 'react-native'
import styles from '../style/styles';
import SVGImg from '../Source/SVGImg';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import { login} from '../Redux/Action'
import Spinner from '../Components/Spinner';
import Toast from 'react-native-tiny-toast';
import { connect } from 'react-redux'
class Login extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={
            email:'',
            password:'',
            loading:false,
            emailError:'',
            passwordError:''
        }
    }
    componentWillReceiveProps(nextProps)
    {
        this.setState({ loading:false })
        if(nextProps.status == 1)
        {
            this.props.navigation.replace('tabs')
        }
        else
        {
            Toast.show(nextProps.errormsg, {
                position: Toast.position.BOTTOM,
                containerStyle: { backgroundColor: 'black' },
                textStyle: { color: 'white' },
              })
        }
    }
    validate()
    {
        if(this.state.email=='' && this.state.password == '')
        {
            this.setState({ emailError:'Please enter email',passwordError:'Please enter password' })
        }
        else if(this.state.email == '')
        {
            this.setState({ emailError:'Please enter email'})
        }
        else if(this.state.password == '')
        {
            this.setState({ passwordError:'Please enter password' })
        }
        else if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email)))
        {
            this.setState({ emailError:'Enter valid email'})
        }
        else {
            this.setState({ loading:true })
            this.props.login(this.state.email,this.state.password)
        }
    }
    render() {
        return (
            <SafeAreaView style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
                <SVGImg.HeaderLogo />
                <Spinner visible={this.state.loading} />
                <View style={{ paddingTop: 10, width: '100%', alignItems: 'center' }}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter Email"
                        onChangeText={text=>{ this.setState({ email:text.trim(),emailError:'' }) }}
                    />
                    {this.state.emailError != '' ? <Text style={{ paddingLeft:20,marginTop:10,fontFamily:'Gotham-Medium',color:'red',alignSelf:'flex-start' }}>{this.state.emailError}</Text>:null}
                    <TextInput
                        style={styles.textInputPassword}
                        placeholder="Enter Password"
                        secureTextEntry={true}
                        onChangeText={text=>{ this.setState({ password:text.trim(),passwordError:'' }) }}
                    />
                    {this.state.passwordError != '' ? <Text style={{ paddingLeft:20,marginTop:10,fontFamily:'Gotham-Medium',color:'red',alignSelf:'flex-start' }}>{this.state.passwordError}</Text>:null}
                    <TouchableOpacity style={styles.loginBtn} activeOpacity={0.6} onPress={()=>{ this.validate() }}>
                    <View >
                        <Text style={{ fontSize: 16, fontFamily: 'Gotham-Medium', color: '#FFFFFF' }}>Log in</Text>
                    </View>
                    </TouchableOpacity>
                </View>
                
            </SafeAreaView>
        );
    }
}
const mapStateToProps = (state) => {
    const loginData = state.LoginData;
    const status = state.LoginData.status;
    const errormsg = state.LoginData.errormsg;
    const isLoggedIn = state.LoginData.isLoggedIn;
    return { loginData, status, errormsg, isLoggedIn }
  }
  
  
  export default connect(mapStateToProps, { login })(Login)