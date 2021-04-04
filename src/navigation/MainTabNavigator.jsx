import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { UserScreen } from '../screens/UserScreen';

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => (
	<Tab.Navigator>
		<Tab.Screen
			name="Home"
			component={HomeScreen}
			options={{
				tabBarLabel: 'ホーム',
				tabBarIcon: ({ size, color }) => (
					<Feather name="home" size={size} color={color} />
				),
			}}
		/>
		<Tab.Screen
			name="User"
			component={UserScreen}
			options={{
				tabBarLabel: 'ユーザー',
				tabBarIcon: ({ size, color }) => (
					<Feather name="user" size={size} color={color} />
				),
			}}
		/>
	</Tab.Navigator>
);
