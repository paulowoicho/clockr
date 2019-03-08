import React, { Component } from 'react';
import { Center } from '@builderx/utils';
import moment from 'moment';
import { View, StyleSheet, Text, Button, TouchableOpacity, ActivityIndicator, PermissionsAndroid, Alert, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import firebase from 'react-native-firebase';
import haversine from 'haversine';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import PushNotification from 'react-native-push-notification';


export default class Checkin extends Component {
	state = {
		currentUser: '',
		checkInTime: null,
		checkInDate: null,
		checkedInAddress: null,
		hours: null,
		quote: null,
		author: null,
		latitude: null,
		longitude: null,
		error: null,
		address: null,
		isCheckedIn: null,
		currentTime: null
	}

	componentWillMount() {
		PushNotification.configure({
			onNotification: function(notification) {
				console.log('NOTIFICATION:', notification);
			}
		});
		BackgroundGeolocation.configure({
			desiredAccuracy: 10,
			stationaryRadius: 50,
			distanceFilter: 50,
			debug: false,
			startOnBoot: false,
			stopOnTerminate: true,
			locationProvider:
				Platform.OS === 'ios'
					? BackgroundGeolocation.DISTANCE_FILTER_PROVIDER
					: BackgroundGeolocation.ACTIVITY_PROVIDER,
			interval: 10000,
			fastestInterval: 5000,
			activitiesInterval: 10000,
			stopOnStillActivity: true,
			saveBatteryOnBackground: true
		});

		BackgroundGeolocation.on('authorization', (status) => {
			console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
			if (status !== BackgroundGeolocation.AUTHORIZED) {
				Alert.alert('Location services are disabled', 'Would you like to open location settings?', [
					{
						text: 'Yes',
						onPress: () =>
							//changed from showLocationSettings
							BackgroundGeolocation.showAppSettings()
					},
					{
						text: 'No',
						onPress: () => console.log('No Pressed'),
						style: 'cancel'
					}
				]);
			}
		});

		BackgroundGeolocation.start();

		BackgroundGeolocation.on('location', (location) => {
			const positionCoords = {
				latitude: location.latitude,
				longitude: location.longitude
			};

			this.getCoords(positionCoords).then((address) => {
				this.setState({ address });
				if (!this.state.isCheckedIn && this.state.address !== 'You are not at a Branch!') {
					this.checkInEmployee(address);
				} else if (this.state.isCheckedIn && this.state.address === 'You are not at a Branch!') {
					this.checkOutEmployee(address)
				}
			});





		})

		this.time = setInterval(() => {
			this.setState({ currentTime: moment().format('HH:mm') });
		}, 1000);

		let hours = new Date().getHours();
		this.setState({ hours });

	}






	componentDidMount() {

		//read user's name from database
		const userId = firebase.auth().currentUser.uid;
		firebase.database().ref(`/users/${userId}/firstName`).once("value", snapshot => {
			this.setState({ currentUser: snapshot.val() })
		})

		//get current hours for greeting
		let hours = new Date().getHours();
		this.setState({ hours });

		//quote at the bottom of the screen
		this.getQuote();


	}

	componentWillUnmount() {
        clearInterval(this.time);
        navigator.geolocation.clearWatch(this.watchID);
		BackgroundGeolocation.events.forEach((event) => BackgroundGeolocation.removeAllListeners(event));
		
		PushNotification.cancelAllLocalNotifications();
    }



	getCoords = async (positionCoords) => {
		const { latitude, longitude } = positionCoords;
		let address;

		const searchBranchUrl = "https://api.myjson.com/bins/dqi1y";
		const response = await fetch(searchBranchUrl);
		const json = await response.json();


		for (let i = 0; i < json.Branches.length; i++) {
			let latitude = json.Branches[i].Latitude;
			let longitude = json.Branches[i].Longitude
			// console.log(haversine(positionCoords, {latitude, longitude}, {unit: 'meter'}));
			if (haversine(positionCoords, { latitude, longitude }, { unit: 'meter' }) <= 350) {
				address = json.Branches[i].Branch;
				return address;
			}
		}

		address = 'You are not at a Branch!'
		return address;

	}

	checkInEmployee = (address) => {
		const userId = firebase.auth().currentUser.uid;
		let checkInDate = moment().format('MMMM Do YYYY, h:mm:ss a');
		this.setState({ checkInDate})
		let checkInTime = moment().format('HH:mm');
		this.setState({ checkInTime });
		this.setState({ checkedInAddress : address})

		firebase.database().ref(`users/${userId}/checkInData/${checkInDate}`).set({
			location: address,
			checkedIn: checkInTime,
			date: moment().format('MMM Do YYYY')
		})

		
		PushNotification.localNotificationSchedule({
			message: `You've checked into ${this.state.address}`,
			date: new Date(Date.now())
		});
		

		this.setState({ isCheckedIn: true });
		
	}

	checkOutEmployee = (address) => {
		const userId = firebase.auth().currentUser.uid;
		let checkOutTime = moment().format('HH:mm');

		firebase.database().ref(`users/${userId}/checkInData/${this.state.checkInDate}`).update({
			checkedOut: checkOutTime,
		})

		
		PushNotification.localNotificationSchedule({
			message: "You've been checked out!",
			date: new Date(Date.now())
		});
		

		this.setState({ isCheckedIn: false });

	}



	getQuote = () => {
		let catagories = ['art', 'funny', 'inspire', 'life', 'love', 'management', 'sports'];
		let randomCategory = Math.floor(Math.random() * (catagories.length - 1) + 0);
		fetch(`https://quotes.rest/qod.json?category=${catagories[randomCategory]}`, {
			method: 'GET'
		})
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					quote: responseJson.contents.quotes[0].quote,
					author: responseJson.contents.quotes[0].author
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<View style={styles.root}>
				<View style={styles.topHalf}>
					<View style={styles.greyBackground} />
					<View style={styles.greeting}>
						<Center>
							<Text style={styles.salutation}>Good{' '}
								{this.state.hours < 12 ?
									(
										'Morning,'
									)
									: this.state.hours >= 16 ?
										(
											'Evening,'
										)
										:
										(
											'Afternoon,'
										)
								}
							</Text>
							<Text style={styles.name}>{this.state.currentUser}</Text>
						</Center>
					</View>
					<View style={styles.dateTime}>
						<Center horizontal>
							<Text style={styles.time}>{this.state.currentTime}</Text>
							<Text style={styles.date}>{moment().format('dddd, MMMM Do YYYY')}</Text>
						</Center>
					</View>
				</View>
				<Center horizontal>
					<Text style={styles.location} numberOfLines={1}>
						{this.state.address}
					</Text>
				</Center>
				<Center horizontal>
					<TouchableOpacity style={styles.quote} onPress={this.getQuote}>
						{this.state.quote === null || this.state.author === null ?
							(<ActivityIndicator color={'black'} />) : (
								<View>
									<Text style={styles.quotation}>{this.state.quote}</Text>
									<Text style={styles.author}>{this.state.author}</Text>
								</View>
							)}
					</TouchableOpacity>
				</Center>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	root: {
		backgroundColor: 'white',
		flex: 1
	},
	location: {
		position: 'absolute',
		backgroundColor: 'transparent',
		fontFamily: 'AvenirNext-Regular',
		fontSize: 15,
		top: '65%',
		color: 'red'
	},
	quote: {
		height: 38,
		width: wp('95%'),
		top: hp('62%'),
		position: 'absolute'
	},
	quotation: {
		top: 0,
		left: '3%',
		right: '3%',
		position: 'absolute',
		backgroundColor: 'transparent',
		fontSize: 14,
		width: wp('95%'),
		fontFamily: 'AvenirNext-Bold',
		color: 'rgba(43,85,210,1)'
	},
	author: {
		top: hp('12%'),
		left: '36.77%',
		position: 'absolute',
		backgroundColor: 'transparent',
		fontFamily: 'AvenirNext-UltraLightItalic'
	},
	topHalf: {
		height: hp('60%'),
		width: wp('98%'),
		top: 0,
		left: 0,
		position: 'absolute'
	},
	greyBackground: {
		top: hp('3%'),
		left: wp('3%'),
		right: wp('3%'),
		width: wp('95%'),
		height: hp('55%'),
		position: 'absolute',
		backgroundColor: 'rgb(230,230,230)',
		shadowColor: '#CDCDCD',
		shadowOffset: { width: 1, height: 14 },
		shadowOpacity: 0.8,
		shadowRadius: 2
	},
	greeting: {
		top: '17.2%',
		left: '29.97%',
		width: 150,
		height: 83,
		position: 'absolute'
	},
	name: {
		position: 'absolute',
		backgroundColor: 'transparent',
		fontSize: 40,
		fontFamily: 'AvenirNext-Heavy',
		color: 'rgba(226,168,32,1)'
	},
	salutation: {
		top: 0,
		left: '0%',
		width: 149,
		height: '38.55%',
		position: 'absolute',
		backgroundColor: 'transparent',
		fontSize: 20,
		fontFamily: 'AvenirNext-Regular',
		textAlign: 'center',
		color: 'rgba(0,0,0,1)'
	},
	dateTime: {
		top: hp('29%'),
		left: '22.02%',
		width: wp('60%'),
		height: 99,
		position: 'absolute'
	},
	time: {
		top: '-5.1%',
		position: 'absolute',
		backgroundColor: 'transparent',
		fontSize: 78,
		fontFamily: 'AvenirNext-Heavy',
		color: 'rgba(43,85,210,1)',
		width: wp('70%')
	},
	date: {
		top: 77,
		width: 181,
		height: '20.15%',
		position: 'absolute',
		backgroundColor: 'transparent',
		fontSize: 14,
		fontFamily: 'AvenirNext-Regular'
	}
});


/*
----notes-----
1. branch data is hosted on myjson.com :  http://myjson.com/dqi1y
2. URI to access data restfully: https://api.myjson.com/bins/dqi1y
3. URI to access radius restfully: https://api.myjson.com/bins/sjohy
*/