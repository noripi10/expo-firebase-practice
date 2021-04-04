import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {signInPhoneNumber} from '../util/firebase';

export const VerificationScreen = ({}) => {
  const [code, setCode] = useState('');
  const route = useRoute();

  const {verificationID} = route.params;

  const signInPhoneNumberHandler = async () => {
    await signInPhoneNumber(verificationID, code);
  };

  return (
    <View style={styles.container}>
      <Input
        disabledInputStyle={{background: '#ddd'}}
        inputStyle={{fontSize: 18}}
        leftIcon={<Icon name="code" size={24} color="#000" />}
        leftIconContainerStyle={{}}
        placeholder="確認コード"
        containerStyle={{width: 300}}
        value={code}
        onChangeText={(code) => setCode(code)}
      />
      <Button
        title="実行"
        onPress={() => signInPhoneNumberHandler()}
        style={{width: 200, margin: 8}}
        disabled={!code}
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
