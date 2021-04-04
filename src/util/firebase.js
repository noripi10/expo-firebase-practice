import firebase from 'firebase';
import 'firebase/firestore';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import {FirebaseRecaptchaVerifier} from 'expo-firebase-recaptcha';
import * as Analytics from 'expo-firebase-analytics';
import Env from '../../Env.json';

export const firebaseConfig = Env['firebase'];
const facebookConfig = Env['facebookConfig'];
const googleConfig = Env['googleConfig'];

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  // initialSettings
  // console.log(firebase.app().options);
}

export const auth = firebase.auth();

export const getFirebaseAppOptions = () => {
  if (firebase.apps.length) {
    return firebase.app().options;
  } else {
    return null;
  }
};

export const signUpEmailPassword = async (email, password) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password,
    );
  } catch (err) {
    alert(err);
  }
};

export const signInEmailPassword = async (email, password) => {
  try {
    const {user} = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const {uid} = user;
    const db = firebase.firestore();
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      await db.collection('users').doc(uid).set({
        name: '',
        createDate: firebase.firestore.Timestamp.now(),
        updateDate: firebase.firestore.Timestamp.now(),
      });
    }
  } catch (err) {
    alert(err);
  }
};

export const signInFacebook = async () => {
  try {
    await Facebook.initializeAsync(facebookConfig);
    const {type, token} = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      const user = await firebase.auth().signInWithCredential(credential);
    }
  } catch (err) {
    alert(err);
  }
};

export const signInGoogle = async () => {
  try {
    const {type, idToken, accessToken} = await Google.logInAsync(googleConfig);
    if (type === 'success') {
      const credential = firebase.auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      const user = await auth.signInWithCredential(credential);
      console.log({user});
    }
  } catch (err) {
    alert(err);
  }
};

export const getVerificationID = async (phoneNumber, token) => {
  const applicationVerifier = new FirebaseRecaptchaVerifier(token);
  const provider = new firebase.auth.PhoneAuthProvider();
  const verificationID = await provider.verifyPhoneNumber(
    phoneNumber,
    applicationVerifier,
  );
  return verificationID;
};

export const signInPhoneNumber = async (verificationID, verificationCode) => {
  try {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationID,
      verificationCode,
    );
    const user = await firebase.auth().signInWithCredential(credential);
    console.log({user});
  } catch (err) {
    alert('コードを正しく入力してください');
  }
};

export const signUpAnonymous = async () => {
  try {
    const {user} = await firebase.auth().signInAnonymously();
    const {uid} = user;
    return {uid, err: null};
  } catch (err) {
    return {uid: null, err};
  }
};

export const signOut = async () => {
  try {
    if (firebase.auth().currentUser) {
      await firebase.auth().signOut();
      return true;
    }
  } catch (err) {
    alert(err);
  }
};

export const createUserDoc = async (userId) => {
  const db = firebase.firestore();

  const userDoc = await db.collection('users').doc(userId).get();
  if (!userDoc.exists) {
    await db.collection('users').doc(userId).set({
      name: '',
      createDate: firebase.firestore.Timestamp.now(),
      updateDate: firebase.firestore.Timestamp.now(),
    });
  }
};

export const logEvent = async (name, properties = {}) => {
  await Analytics.logEvent(name, properties);
  console.log(name, properties);
};

export default firebase;
