import React, { Component } from 'react';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import firebase from 'react-native-firebase'
//import screens
import Start from './src/Start.js';
import Onboarding from './src/Onboarding';
import Login from './src/Login';
import Register from './src/Register';
import CheckIn from './src/tabs/Checkin';
import History from './src/tabs/History';
import Loading from './src/Loading';

const styles = StyleSheet.create({
	logout: {
		paddingRight: 10
	}
});


const MainNavigation = createBottomTabNavigator(
	{
		CheckIn: CheckIn,
		History: History
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state;
				let IconComponent = Ionicons;
				let iconName;
				if (routeName === 'CheckIn') {
					iconName = `ios-timer`;
					// Sometimes we want to add badges to some icons.
					// You can check the implementation below.
					// IconComponent = HomeIconWithBadge;
				} else if (routeName === 'History') {
					iconName = `ios-calendar`;
				}

				// You can return any component that you like here!
				return <IconComponent name={iconName} size={25} color={tintColor} />;
			}
		}),
		tabBarOptions: {
			activeTintColor: '#E2A820',
			inactiveTintColor: 'gray'
		},
		navigationOptions: {
			headerLeft: null,
			headerTitle: 'Clock-r',
			headerRight: (
				<Ionicons
					name="ios-log-in"
					style={styles.logout}
					size={25}
					onPress={() => firebase.auth().signOut()}
					color="#fff"
				/>
			)
		}
	}
);

const AppNavigator = createStackNavigator(
	{
		Home: {
			screen: Start,
			navigationOptions: {
				header: null
			}
		},
		Onboarding: Onboarding,
		Login: Login,
		Register: Register,
		MainApp: MainNavigation,
		Loading: Loading
	},
	{
		initialRouteName: 'Home',
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: '#2B55D2'
			},
			headerTintColor: 'white'
		}
	}
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
	render() {
		return <AppContainer />;
	}
}