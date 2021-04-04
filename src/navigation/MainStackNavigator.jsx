import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { UserScreen } from '../screens/UserScreen';

const Stack = createStackNavigator();

export const MainStackNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen name="Home" component={HomeScreen} />
		<Stack.Screen name="User" component={UserScreen} />
	</Stack.Navigator>
);
