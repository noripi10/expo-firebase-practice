import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Button, Divider, Text} from 'react-native-elements';
import {signInEmailPassword} from '../util/firebase';
import {storage} from '../util/storage';

export const SignInScreen = () => {
  const [pastLogin, setPastLogin] = useState(false);
  const [emailPassword, setEmailPassword] = useState({
    EMAIL: '???@yahoo.co.jp',
    PASSWORD: '???',
  });
  const navigation = useNavigation();

  const setEmailPasswordHandler = (key, val) => {
    setEmailPassword((preVal) => ({
      ...preVal,
      [key]: val,
    }));
  };

  const signInEmailPasswordHandler = async () => {
    const {EMAIL, PASSWORD} = emailPassword;
    const userCredential = await signInEmailPassword(EMAIL, PASSWORD);
  };

  // const signUpAnonymousHandler = async () => {
  // 	const { uid, err } = await signUpAnonymous();
  // 	if (uid) {
  // 		setUser(uid);
  // 	} else {
  // 		Alert.alert('匿名ログインに失敗しました');
  // 	}
  // };
  const loadFunc = async () => {
    const login = await storage.load({key: 'login'});
    console.log('過去ログイン', login);
    if (login) {
      setPastLogin(true);
    }
  };

  useEffect(() => {
    loadFunc();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text h3>ログイン</Text>
      <TextInput
        style={styles.input}
        placeholder="ユーザーID"
        value={emailPassword.EMAIL}
        onChangeText={(text) => setEmailPasswordHandler('EMAIL', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="パスワード"
        secureTextEntry
        value={emailPassword.PASSWORD}
        onChangeText={(text) => setEmailPasswordHandler('PASSWORD', text)}
      />

      <Button
        title="ログイン"
        style={{margin: 8, width: 200}}
        onPress={() => signInEmailPasswordHandler()}
      />

      <Divider
        style={{backgroundColor: '#000', width: 250, marginVertical: 10}}
      />

      <Button
        title="ユーザー登録へ切替"
        style={{margin: 8, width: 200}}
        onPress={() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'SignUp'}],
            }),
          )
        }
      />
      {!pastLogin && (
        <Button title="ログインしない" style={{margin: 8, width: 200}} />
      )}
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
