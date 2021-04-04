import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import {FirebaseRecaptcha} from 'expo-firebase-recaptcha';
import firebase from 'firebase';
import {getFirebaseAppOptions, getVerificationID} from '../util/firebase';

export const RecaptchaScreen = () => {
  const [recapthcaToken, setRecapthcaToken] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const {phoneNumber} = route.params;
  const firebaseConfig = getFirebaseAppOptions();
  // const unmountedRef = useRef(false);

  const func = async () => {
    try {
      if (phoneNumber && recapthcaToken) {
        // console.log(phoneNumber, recapthcaToken);
        // if (!unmountedRef.current) {
        // console.log({recapthcaToken});
        // console.log({phoneNumber});

        const verificationID = await getVerificationID(
          phoneNumber,
          recapthcaToken,
        );
        if (verificationID) {
          navigation.navigate('Verification', {verificationID});
        }
        // }
      }
    } catch (err) {
      alert(err);
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'SignIn'}],
        }),
      );
    }
  };

  useEffect(() => {
    func();
    return () => {
      // unmountedRef.current = true;
    };
  }, [phoneNumber, recapthcaToken]);

  return (
    <View style={styles.container}>
      <FirebaseRecaptcha
        firebaseConfig={firebaseConfig}
        onVerify={(token) => {
          setRecapthcaToken(token);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
