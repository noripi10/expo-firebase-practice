import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const PhoneInputScreen = ({}) => {
  const [phoneNumber, setPhoneNumber] = useState('+819060969921');
  const navigation = useNavigation();

  const ClearButton = () => {
    return (
      <TouchableOpacity onPress={() => setPhoneNumber('')}>
        <Icon name="close" size={24} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={{marginLeft: 20}}>電話番号</Text>
        <Input
          disabledInputStyle={{background: '#ddd'}}
          inputStyle={{fontSize: 18}}
          leftIcon={<Icon name="phone" size={24} color="#000" />}
          rightIcon={ClearButton()}
          placeholder="+8190********"
          containerStyle={{width: 350}}
          autoFocus
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          value={phoneNumber}
          onChangeText={(tel) => setPhoneNumber(tel)}
        />
      </View>
      <Button
        title="次へ"
        onPress={() => navigation.navigate('Recaptcha', {phoneNumber})}
        style={{width: 200, margin: 8}}
        disabled={!phoneNumber || phoneNumber.length < 11}
      />
      <Button
        title="戻る"
        onPress={() => navigation.goBack()}
        style={{width: 200, margin: 8}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
