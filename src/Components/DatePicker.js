import React, {memo, useState} from 'react';
import {
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePickerComponent = props => {
  const [selecteddateIOS, setSelecteddateIOS] = useState(props.date);

  const onChangeDate = (event, selectedDate) => {
    if (Platform.OS == 'android') {
      props.onClick(selectedDate);
    } else {
      setSelecteddateIOS(selectedDate);
      console.log('date ', selecteddateIOS);
    }
  };

  return (
    <View>
      {props.show && (
        <>
          {Platform.OS == 'ios' && (
            <View style={Style.doneButtonView}>
              <TouchableOpacity
                style={Style.doneButtonContainer}
                activeOpacity={0.8}
                onPress={() => props.onCancelClick()}>
                <Text style={Style.CancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={Style.doneButtonContainer}
                activeOpacity={0.8}
                onPress={() => props.onClick(selecteddateIOS)}>
                <Text style={Style.textStyle}>Confirm</Text>
              </TouchableOpacity>
            </View>
          )}
          <DateTimePicker
            testID="dateTimePicker"
            value={selecteddateIOS}
            mode={props.mode}
            is24Hour={true}
            display={Platform.OS == 'android' ? 'default' : 'spinner'}
            onChange={onChangeDate}
            minimumDate={props.minimumDate}
            maximumDate={props.maximumDate}
            {...props}
          />
        </>
      )}
    </View>
  );
};

export default memo(DatePickerComponent);

const Style = StyleSheet.create({
  doneButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopColor: '#0000003B',
    borderTopWidth: 1,
    // borderBottomWidth: 1,
    // borderBottomColor: '#0000003B',
    marginTop: 10,
  },
  doneButtonContainer: {
    paddingVertical: 5,
    paddingHorizontal: 25,
  },
  textStyle: {
    fontSize: 16,
    // color: #ffff,
  },
  CancelText: {
    fontSize: 16,
    // color: Colors.white,
  },
});
