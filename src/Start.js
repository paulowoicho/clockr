import React, { Component } from 'react';
import { Center } from '@builderx/utils';
import Button from '../components/Button';
import { View, StyleSheet, Text, Image, SafeAreaView, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class Start extends Component {
	render() {
		return (
			<SafeAreaView style={styles.safeArea}>
				<StatusBar barStyle="light-content" style={styles.statusBar} />
				<View style={styles.root}>
					<Center horizontal>
						<Text style={styles.text}>CLOCK-R</Text>
					</Center>
					<Center horizontal>
						<Image source={require('../assets/teamwork.png')} style={styles.image} />
					</Center>
					<Center horizontal>
						<Text style={styles.text2}>Great Teams are Always in Sync</Text>
					</Center>
					<Center horizontal>
						<Button
							style={styles.button}
							root={() => {
								this.props.navigation.push('Loading');
							}}
						/>
					</Center>
				</View>
			</SafeAreaView>
		);
	}
}
const styles = StyleSheet.create({
	root: {
		backgroundColor: '#2B55D2',
		flex: 1
	},
	text: {
		backgroundColor: 'transparent',
		fontFamily: 'AvenirNext-Heavy',
		fontSize: hp('5.91%'),
		color: 'rgba(245,239,239,1)',
		transform: [
			{
				rotate: '360.23deg'
			}
		],
		alignSelf: 'center',
		marginRight: wp('10%'),
		marginTop: hp('5%'),
		paddingRight: 0,
		marginLeft: wp('20%'),
		position: 'absolute',
		top: hp('10%'),
		left: '0%'
	},
	image: {
		height: hp('30%'),
		width: hp('30%'),
		position: 'absolute',
		top: '31.13%',
		borderWidth: 1,
		borderColor: 'transparent'
	},
	text2: {
		top: hp('60%'),
		position: 'absolute',
		backgroundColor: 'transparent',
		color: 'rgba(255,255,255,1)',
		fontFamily: 'AvenirNext-Bold',
		width: '62.77777777777778%',
		paddingLeft: wp('5%'),
		paddingRight: wp('1%')
	},
	button: {
		top: hp('68%'),
		position: 'absolute',
		height: hp('6%'),
		width: wp('60%'),
		borderRadius: 40,
		backgroundColor: '#E2A820'
	},
	safeArea: {
		flex: 1,
		backgroundColor: '#2B55D2'
	}
});