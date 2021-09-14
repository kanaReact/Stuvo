import React, { useState, useEffect } from 'react';
import {
    Animated,
    FlatList,
    StyleSheet,
    Text,
    Easing,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    TextInput
} from 'react-native';
import DownArrow from '../Source/DownArrow';



const DropDown = props => {
    const [dropVisible, setdropVisible] = useState(false);
    const [arrayHolder, setArrayHolder] = useState(props.data);
    const [pickerData, setPickerData] = useState(props.data)
    const [text, setText] = useState('')
    const animatedValue = new Animated.Value(0);

    const moveToggle = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 150],
    });

    animatedValue.setValue(dropVisible ? 1 : 0);
    const dropDownOpen = async () => {
        Animated.timing(animatedValue, {
            toValue: dropVisible ? 0 : 1,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();

        setTimeout(() => {
            setdropVisible(!dropVisible);
        }, 200);
    };

    const click = async item => {
        Animated.timing(animatedValue, {
            toValue: dropVisible ? 0 : 1,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();

        setTimeout(() => {
            props.onSelect(item);
            setdropVisible(!dropVisible);
        }, 200);
    };
    const DropDownRender = ({ item }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => click(item)}>
                    <View
                        style={[
                            localStyle.renderRow,
                            { borderBottomWidth: props.data.length == props.index ? 0 : 1, flexDirection: 'row', justifyContent: props.rolename == true ? 'space-between' : null },
                        ]}>
                        <Text style={localStyle.nameStyle}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={[styles.d_pickerContent, props.Style]}>
            <Text style={[styles.labelTxt, { fontWeight: 'bold' }]}>
                {props.Label}
                <Text style={[styles.labelTxt, { color: 'red', fontSize: 18 }]}>
                    {props.mandatory ? '*' : null}
                </Text>
            </Text>

            <View
                style={[
                    styles.d_pickerView,
                    { borderColor: dropVisible ? '#00AFF0' : '#B1B1B1' },
                ]}>
                <TouchableWithoutFeedback onPress={dropDownOpen}>
                    <View style={[localStyle.touchStyle, props.touchStyle]}>
                        {props.value ? (
                            <Text style={[styles.inputTxt, props.lableStyle]}>
                                {props.value?.name}
                            </Text>
                        ) : (
                            <Text style={[styles.inputTxt, props.placeholderStyle]}>
                                {props.placeholder}
                            </Text>
                        )}
                    </View>
                </TouchableWithoutFeedback>

                <TouchableOpacity onPress={dropDownOpen} style={localStyle.imageTouch}>
                    <DownArrow
                        style={{ transform: [{ rotate: dropVisible ? `180deg` : '0deg' }] }}
                    />
                </TouchableOpacity>
            </View>

            <Animated.View
                style={[
                    localStyle.flatlistView,
                    { maxHeight: moveToggle },
                    props.drowDownViewStyle,
                ]}>

                <FlatList
                    data={props.data}
                    nestedScrollEnabled={true}
                    renderItem={item => <DropDownRender {...item} />}
                />
            </Animated.View>

            {props.error ? <Text style={styles.error}>{props.error}</Text> : null}
        </View>
    );
};

export default DropDown;
const styles = StyleSheet.create({
    d_pickerContent: {
        marginHorizontal: 24,
        marginTop: 16,
    },
    labelTxt: {
        fontSize: 15,
        fontWeight: '400',
        color: '#000',
    },
    d_pickerView: {
        flexDirection: 'row',
        borderWidth: 1,
        marginTop: 8,
        borderRadius: 2,
        paddingHorizontal: 12,
        justifyContent: 'center',
        paddingVertical: 8,
        height: 45,
        borderRadius: 5,
    },
    inputTxt: {
        fontSize: 14,
        color: '#495057',
        paddingVertical: 0,
        fontFamily: 'Gotham-Medium'
    },
    error: {
        fontSize: 12,
        color: 'red',
        marginTop: 5,
    },
})

const localStyle = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    placeholderStyle: {
        flex: 1,
        color: '#707070',
        fontSize: 15,
    },
    rowView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
    },
    touchStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
    },
    flatlistView: {
        // marginTop: 5,
        backgroundColor: '#F1F1F1',
        paddingHorizontal: 12,
        borderRadius: 10,
        maxHeight: 200,
    },
    renderRow: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: 'white',
    },
    nameStyle: {
        flex: 1,
        color: '#2A2A2A',
        fontSize: 14,
        fontFamily: 'Gotham-Medium'
    },
    imageTouch: {
        height: '100%',
        justifyContent: 'center',
    },
    imageStyle: {
        resizeMode: 'contain',
    },
});
