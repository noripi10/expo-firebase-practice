import React, {useContext, useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Button, Divider, Text} from 'react-native-elements';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {signInFacebook, signInGoogle, signUpAnonymous} from '../util/firebase';
import {UserContext} from '../context/UserContext';
import {signUpEmailPassword} from '../util/firebase';

export const SignUpScreen = () => {
  const navigation = useNavigation();
  const {user, setUser} = useContext(UserContext);

  const [emailPassword, setEmailPassword] = useState({
    EMAIL: '???@yahoo.co.jp',
    PASSWORD: '???',
  });

  const setEmailPasswordHandler = (key, val) => {
    setEmailPassword((preVal) => ({
      ...preVal,
      [key]: val,
    }));
  };

  const signUpEmailPasswordHandler = async () => {
    const {EMAIL, PASSWORD} = emailPassword;
    await signUpEmailPassword(EMAIL, PASSWORD);
  };

  const signInFacebookHandler = async () => {
    await signInFacebook();
    // if (uid) {
    // 	// setUser(uid);
    // } else {
    // 	Alert.alert('FaceBookログインに失敗しました');
    // }
  };

  const signInGoogleHandler = async () => {
    await signInGoogle();
    // if (uid) {
    // 	// setUser(uid);
    // } else {
    // 	Alert.alert('Googleログインに失敗しました');
    // }
  };

  return (
    <View style={styles.container}>
      <Text h3>ユーザー登録</Text>
      <TextInput
        style={styles.input}
        placeholder="ユーザーID"
        value={emailPassword.EMAIL}
        onChangeText={(text) => setEmailPasswordHandler('EMAIL', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="パスワード"
        value={emailPassword.PASSWORD}
        secureTextEntry
        onChangeText={(text) => setEmailPasswordHandler('PASSWORD', text)}
      />

      <Button
        title="サインアップ"
        style={{margin: 8, width: 200}}
        onPress={() => signUpEmailPasswordHandler()}
      />

      <Button
        title="Googleログイン"
        style={{margin: 8, width: 200}}
        onPress={() => signInGoogleHandler()}
      />

      <Button
        title="FaceBookログイン"
        style={{margin: 8, width: 200}}
        onPress={() => signInFacebookHandler()}
      />

      <Button
        title="電話番号認証"
        style={{margin: 8, width: 200}}
        onPress={() => navigation.navigate('Phone')}
      />

      <Button
        title="電話番号認証(New)"
        style={{margin: 8, width: 200}}
        onPress={() => navigation.navigate('RecaptchaNew')}
      />

      <Divider
        style={{backgroundColor: '#000', width: 250, marginVertical: 10}}
      />

      <Button
        title="ログインへ切替"
        style={{margin: 8, width: 200}}
        onPress={() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'SignIn'}],
            }),
          )
        }
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
  input: {
    width: 300,
    height: 36,
    borderColor: '#000',
    borderBottomWidth: 1,
    fontSize: 16,
    padding: 8,
    margin: 16,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    padding: 15,
    margin: 8,
    backgroundColor: 'skyblue',
    borderRadius: 8,
  },
});
