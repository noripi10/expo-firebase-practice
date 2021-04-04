import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from 'expo-firebase-recaptcha';
import {getFirebaseAppOptions} from '../util/firebase';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import firebase from 'firebase';

export const RecaptchaScreenNew = () => {
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [confirmCode, setConfirmCode] = React.useState('');
  const [verificationId, setVerificationId] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState('');
  const unmountedRef = React.useRef(false);
  const navigation = useNavigation();

  const attemptInvisibleVerification = false;

  const verificationSendHandler = async () => {
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current,
      );
      console.log({verificationId});
      setVerificationId(verificationId);
    } catch (err) {
      alert(err);
      setErrorMessage(err.message);
    }
  };

  const authHandler = async () => {
    try {
      console.log(verificationId, confirmCode);
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        confirmCode,
      );
      await firebase.auth().signInWithCredential(credential);
    } catch (err) {
      alert(err);
      setErrorMessage(err.message);
    }
  };

  const config = () => getFirebaseAppOptions();

  React.useEffect(() => {
    return () => {
      unmountedRef.current = true;
    };
  });

  return (
    <>
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={config()}
          attemptInvisibleVerification={attemptInvisibleVerification}
        />
        <Text>電話番号を入力</Text>
        <Input
          placeholder="+81 **********"
          autoFocus
          autoCompleteType="tel"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={(tel) => setPhoneNumber(tel)}
          leftIcon={<Icon name="phone" />}
          rightIcon={
            <TouchableOpacity onPress={() => setPhoneNumber('')}>
              <Icon name="close" />
            </TouchableOpacity>
          }
        />
        <Button
          title="送信"
          disabled={!phoneNumber}
          onPress={() => verificationSendHandler()}
        />
        <View style={{marginVertical: 20}} />

        <Text>確認コードを入力</Text>
        <Input
          placeholder="123456"
          autoCompleteType="cc-number"
          keyboardType="number-pad"
          value={confirmCode}
          onChangeText={(tel) => setConfirmCode(tel)}
          leftIcon={<Icon name="code" />}
          rightIcon={
            <TouchableOpacity onPress={() => setConfirmCode('')}>
              <Icon name="close" />
            </TouchableOpacity>
          }
        />
        <Button
          title="確認コード送信"
          disabled={!verificationId}
          onPress={() => authHandler()}
        />

        <View style={{position: 'absolute', bottom: 100, right: 35}}>
          <Button title="戻る" onPress={() => navigation.goBack()} />
        </View>
        {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
      </KeyboardAvoidingView>
      {/* {errorMessage && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}>
          <TouchableOpacity onPress={() => setErrorMessage('')}>
            <Text>errorMessage</Text>
          </TouchableOpacity>
        </View>
      )} */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 100,
    marginHorizontal: 30,
  },
});
