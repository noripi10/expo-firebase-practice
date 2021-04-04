import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignInScreen} from '../screens/SignInScreen';
import {SignUpScreen} from '../screens/SignUpScreen';
import {PhoneInputScreen} from '../screens/PhoneInputScreen';
import {RecaptchaScreen} from '../screens/RecaptchaScreen';
import {VerificationScreen} from '../screens/VerificationScreen';
import {RecaptchaScreenNew} from '../screens/RecaptchaScreenNew';

const Stack = createStackNavigator();

const PhoneAuthNavigator = () => (
  <Stack.Navigator initialRouteName="PhoneInput" mode="card">
    <Stack.Screen
      name="PhoneInput"
      component={PhoneInputScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen name="Recaptcha" component={RecaptchaScreen} />
    <Stack.Screen name="Verification" component={VerificationScreen} />
  </Stack.Navigator>
);

export const AuthNavigator = () => (
  <Stack.Navigator initialRouteName="SignUp" mode="modal">
    <Stack.Screen
      name="SignIn"
      component={SignInScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUpScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Phone"
      component={PhoneAuthNavigator}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="RecaptchaNew"
      component={RecaptchaScreenNew}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);
