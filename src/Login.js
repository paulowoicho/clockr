
// import React from 'react'
// import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
// export default class Login extends React.Component {
//   state = { email: '', password: '', errorMessage: null }
//   handleLogin = () => {
//     // TODO: Firebase stuff...
//     console.log('handleLogin')
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Login</Text>
//         {this.state.errorMessage &&
//           <Text style={{ color: 'red' }}>
//             {this.state.errorMessage}
//           </Text>}
//         <TextInput
//           style={styles.textInput}
//           autoCapitalize="none"
//           placeholder="Email"
//           onChangeText={email => this.setState({ email })}
//           value={this.state.email}
//         />
//         <TextInput
//           secureTextEntry
//           style={styles.textInput}
//           autoCapitalize="none"
//           placeholder="Password"
//           onChangeText={password => this.setState({ password })}
//           value={this.state.password}
//         />
//         <Button title="Login" onPress={this.handleLogin} />
//         <Button
//           title="Don't have an account? Sign Up"
//           onPress={() => this.props.navigation.navigate('SignUp')}
//         />
//       </View>
//     )
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   textInput: {
//     height: 40,
//     width: '90%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginTop: 8
//   }
// })

//---------------------- template above ---------------

import React, { Component } from 'react';
import Button from '../components/Button';
import { Center } from '@builderx/utils';
import { View, StyleSheet, TextInput, Text, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import firebase from 'react-native-firebase'

export default class Login extends Component {
	state = {
		email: '',
		password: '',
		errorMessage: null
	}

	handleLogin = () => {
		const { email, password } = this.state
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => this.props.navigation.push('Loading'))
			.catch(error => this.setState({ errorMessage: error.message }))
	}

	render() {
		return (
			<View style={styles.root}>
				<StatusBar barStyle="light-content" style={styles.statusBar} />
				<Center horizontal>
					<Text style={styles.titleTextSmall}>GET STARTED</Text>

					<Text style={styles.titleText}>Login</Text>
					<TextInput style={styles.input} placeholder="Email" blurOnSubmit={true} inlineImagePadding={18}  onChangeText={email => this.setState({ email })}/>
					<TextInput
						style={[styles.input, styles.textInput2]}
						placeholder="Password"
						blurOnSubmit={true}
						inlineImagePadding={18}
						secureTextEntry={true}
						onChangeText={password => this.setState({ password })}
					/>
				</Center>
				<Center horizontal>
					<Button
						style={styles.button}
						buttonContent="Login"
						root={this.handleLogin}
					/>
				</Center>
				<Center horizontal>
					{
						this.state.errorMessage &&
						<Text style={styles.errorMessage}>
							{this.state.errorMessage}
						</Text>
					}
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
	errorMessage :{
		color: 'white',
		top: hp('65%'),
		position: 'absolute',
		width: wp('60%'),
		fontFamily: 'AvenirNext-Medium'
	},
	titleTextSmall: {
		top: hp('20%'),
		left: 46,
		width: '71.25%',
		height: '6.34%',
		position: 'absolute',
		borderRadius: 8,
		fontSize: hp('2.2%'),
		fontFamily: 'AvenirNext-Medium',
		color: 'rgba(255,255,255,1)'
	},
	button: {
		top: hp('53%'),
		position: 'absolute',
		height: hp('6%'),
		width: wp('60%'),
		borderRadius: 40,
		backgroundColor: '#E2A820'
	},
	titleText: {
		top: hp('22%'),
		left: wp('13%'),
		height: '8.788177339901478%',
		position: 'absolute',
		backgroundColor: 'transparent',
		fontSize: hp('5.17%'),
		fontFamily: 'AvenirNext-Bold',
		color: 'rgba(226,168,32,1)'
	},
	input: {
		top: hp('35%'),
		left: wp('13%'),
		width: '76.53333333333333%',
		height: '6.527093596059114%',
		position: 'absolute',
		backgroundColor: '#E6E6E6',
		borderRadius: 8,
		fontFamily: 'AvenirNext-Regular',
		padding: 10
	},
	textInput2: {
		top: hp('43%'),
		left: wp('13%')
	}
});