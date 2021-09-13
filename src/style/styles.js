import { StyleSheet, Dimensions } from 'react-native'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    splashMain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00AFF0'
    },
    signInBtn: {
        position: 'absolute',
        bottom: height / 12,
        width: '100%',
        alignItems: 'center'
    },
    signInText: {
        color: '#00AFF0',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Gotham-Bold'
    },
    welcomeMain: {
        alignItems: 'flex-start',
        paddingTop: 30
    },
    welcomeText: {
        paddingLeft: 25,
        fontFamily: 'Gotham-Black',
        color: '#00AFF0',
        fontSize: 18
    },
    instructionText: {
        paddingLeft: 25,
        paddingTop: 30,
        paddingRight: 5
    },
    letsBeginBtnMain: {
        width: '85%',
        height: 45,
        backgroundColor: '#00AFF0',
        borderRadius: 30,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: height / 9
    },
    letsBeginText: {
        color: '#FFFFFF',
        fontFamily: 'Gotham-Bold',
        fontSize: 16,
        textAlign: 'center'
    },
    tabParent: {
        height: 69,
        width: '100%',
        backgroundColor: '#00AFF0',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    headerMain: {
        flexDirection: 'row',
        alignItems: 'center', height: 47
    },
    sideMenuImg: {
        paddingLeft: 20,
        flexDirection: 'column',
        width: '15%'
    },
    headerMainLogo: {
        //flexDirection: 'column',
        //width:'85%',
        alignItems: 'center'
    },
    activeDrawer: {
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: '#000',//#00AFF0
        height: 40,
        //width: '65%',
        marginLeft: 12,
        alignItems: 'center',
        borderRadius: 12
    },
    inActiveDrawer: {
        flexDirection: 'row',
        marginTop: 35,
        height: 40,
        width: '50%',
        alignItems: 'center',
        marginLeft: 12,
        backgroundColor: '#000000'
    },
    myProfileView: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: '#E0E0E066',
        marginHorizontal: 16,
    },
    myProfileTxt: {
        color: '#919191',
        fontSize: 13,
        fontFamily: 'Poppins-Regular'
    },
    myProfileText: {
        color: '#222222',
        fontSize: 13,
        fontFamily: 'Poppins-Regular'
    },
    textInput: {
        width: '90%', height: 50, borderWidth: 0.5, borderColor: 'gray', borderRadius: 30, paddingLeft: 20
    },
    textInputPassword: {
        width: '90%', height: 50, borderWidth: 0.5, borderColor: 'gray', borderRadius: 30, paddingLeft: 20, marginTop: 15
    },
    loginBtn: {
        width: '100%',
        height: 50,
        backgroundColor: '#00AFF0',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        borderRadius: 30,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 40,
        alignSelf: "center",
    },
    loginView: {
        paddingTop: 10, width: '90%', alignItems: 'center', flex: 1,
    },
    signinLabelView: {
        alignSelf: "flex-start",
        padding: 5
    },
    signinLabel: {
        color: '#00AFF0',
        fontSize: 20,
        fontFamily: 'Gotham-Bold'
    },
    signinNotelabel: {
        color: '#919191',
        fontSize: 14,
        fontFamily: 'Poppins-Regular'
    },
    emailAddressLabel: {
        color: '#00AFF0',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        paddingVertical: 15
    },
    textinputemail: {
        width: '100%',
        borderBottomWidth: 0.5,
        borderColor: '#919191',
        height: 47,
        paddingLeft: 5,
        flexDirection: "row",
        alignItems: "center"
    }




})