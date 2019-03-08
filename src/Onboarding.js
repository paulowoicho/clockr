import React, { Component } from 'react';
import { Center } from '@builderx/utils';
import Button from '../components/Button';
import { View, StyleSheet, Image, Text, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class Onboarding extends Component {
	render() {
		return (
			<View style={styles.root}>
				<StatusBar barStyle="light-content" style={styles.statusBar} />
				<Center horizontal>
					<Image source={require('../assets/onboarding.png')} style={styles.image} />
				</Center>
				<Center horizontal>
					<Text style={styles.text}>Monitor when your team members resume and close from work</Text>
				</Center>
				<Center horizontal>
					<Button
						style={styles.button51}
						buttonContent="Sign in"
						root={() => {
							this.props.navigation.push('Login');
						}}
					/>
				</Center>
				<Center horizontal>
					<Button
						style={styles.button512}
						buttonContent="Sign Up"
						root={() => {
							this.props.navigation.push('Register');
						}}
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
	image: {
		height: hp('30%'),
		width: hp('30%'),
		position: 'absolute',
		top: '20.98%'
	},
	text: {
		top: hp('53%'),
		position: 'absolute',
		backgroundColor: 'transparent',
		transform: [
			{
				rotate: '0deg'
			}
		],
		width: wp('80%'),
		textAlign: 'center',
		color: 'rgba(255,255,255,1)',
		fontFamily: 'AvenirNext-Bold',
		paddingLeft: wp('5%'),
		paddingRight: wp('1%')
	},
	button51: {
		top: hp('62%'),
		width: '60.8%',
		height: '6.52%',
		position: 'absolute',
		elevation: 120,
		borderRadius: 40,
		overflow: 'visible',
		backgroundColor: '#E2A820'
	},
	button512: {
		top: hp('73%'),
		width: '60.8%',
		height: '6.52%',
		position: 'absolute',
		elevation: 120,
		borderRadius: 40,
		overflow: 'visible',
		backgroundColor: '#000000'
	}
});