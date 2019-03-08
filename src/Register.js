import React, { Component } from 'react';
import Button from '../components/Button';
import { Center } from '@builderx/utils';
import { View, StyleSheet, StatusBar, Text, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import firebase from 'react-native-firebase'

export default class Register extends Component {
	state = {
		firstName: '',
		lastName: '',
		organization: '',
		email: '',
		password: '',
		errorMessage: null
	}

	handleSignUp = () => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then((res) => {
				firebase.database().ref('users/' + res.user.uid).set({
					firstName: this.state.firstName,
					lastName: this.state.lastName,
					organization: this.state.organization,
					email: this.state.email
				})
			})
			.then(() => this.props.navigation.navigate('MainApp'))
			.catch(error => this.setState({ errorMessage: error.message }))
	}

	render() {
		return (
			<View style={styles.root}>
				<StatusBar barStyle="light-content" style={styles.statusBar} />
				<Text style={styles.titleTextSmall}>LET US GET TO KNOW YOU</Text>
				<Text style={styles.titleText}>Register</Text>
				<Center horizontal>
					<TextInput
						style={styles.input}
						placeholder="First Name"
						blurOnSubmit={true}
						dataDetectorTypes="none"
						onChangeText={firstName => this.setState({ firstName })}
					/>
				</Center>
				<TextInput
					style={[styles.input, styles.lastNameInput]}
					placeholder="Last Name"
					blurOnSubmit={true}
					dataDetectorTypes="address"
					onChangeText={lastName => this.setState({ lastName })}
				/>
				<Center horizontal>
					<Button style={styles.button} root={this.handleSignUp} />
				</Center>
				<Center>
					<TextInput
						style={[styles.input, styles.emailInput]}
						placeholder="Email"
						blurOnSubmit={true}
						dataDetectorTypes="none"
						onChangeText={email => this.setState({ email })}
					/>
				</Center>
				<Center horizontal>
					<TextInput
						style={[styles.input, styles.organizationInput]}
						placeholder="Organization"
						blurOnSubmit={true}
						dataDetectorTypes="none"
						onChangeText={organization => this.setState({ organization })}
					/>
				</Center>
				<Center horizontal>
					<TextInput
						style={[styles.input, styles.passwordInput]}
						placeholder="Password"
						blurOnSubmit={true}
						secureTextEntry={true}
						dataDetectorTypes="none"
						onChangeText={password => this.setState({ password })}
					/>
				</Center>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	root: {
		backgroundColor: '#2B55D2',
		flex: 1
	},
	titleTextSmall: {
		top: hp('10%'),
		width: '71.25%',
		height: '3.34%',
		position: 'absolute',
		fontSize: hp('2.2%'),
		fontFamily: 'AvenirNext-Medium',
		color: 'rgba(255,255,255,1)',
		left: '11.73%'
	},
	titleText: {
		top: hp('12%'),
		left: '11.73%',
		height: '8.81%',
		position: 'absolute',
		backgroundColor: 'transparent',
		fontSize: hp('5.17%'),
		fontFamily: 'AvenirNext-Bold',
		color: 'rgba(226,168,32,1)'
	},
	input: {
		top: hp('25%'),
		width: '76.53333333333333%',
		height: '6.527093596059114%',
		position: 'absolute',
		backgroundColor: '#E6E6E6',
		borderRadius: 8,
		fontFamily: 'AvenirNext-Regular',
		padding: 10,
		left: '11.73%'
	},
	lastNameInput: {
		top: hp('33%')
	},
	button: {
		top: hp('67%'),
		position: 'absolute',
		height: hp('6%'),
		width: wp('60%'),
		borderRadius: 40,
		backgroundColor: '#E2A820'
	},
	emailInput: {
		top: hp('41%')
	},
	organizationInput: {
		top: hp('49%')
	},
	passwordInput: {
		top: hp('57%')
	}
});