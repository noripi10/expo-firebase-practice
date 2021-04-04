import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from './MainStackNavigator';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';

export const AppNavigator = () => {
	const { user } = useContext(UserContext);

	return (
		<NavigationContainer>
			{user ? <MainTabNavigator /> : <AuthNavigator />}
		</NavigationContainer>
	);
};
