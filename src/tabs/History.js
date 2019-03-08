
import React, { Component } from 'react';
import { Center } from '@builderx/utils';
import { View, StyleSheet, ScrollView, FlatList, Text } from 'react-native';
import HistoryRectangle from '../../components/HistoryRectangle';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import firebase from 'react-native-firebase';





export default class History extends Component {
	constructor() {
		super();
		this.state = {
			dataSource: [],
		}
	}



	componentDidMount() {
		//let that = this;

		firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/checkInData`).once("value", snapshot => {
			let data = snapshot.val();
			this.setState({ dataSource : data })
			console.log(data);
		})
	}



	render() {
		return (
			//<Text>{JSON.stringify(this.state.dataSource)}</Text>
			<View style={styles.container}>
				<FlatList
					data={this.state.dataSource}
					renderItem={({ item }) => (
						<HistoryRectangle
							location={item.location}
							checkedIn={this.props.checkedIn}
							checkedOut={this.props.checkedOut}
							date={this.props.date}
							time={this.props.checkedOut - this.props.checkedIn}
						/>)  
					}
					keyExtractor={(item, index) => 'key'+index}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	root: {
		flex: 1
	},
	rectangle: {
		top: hp('3%'),
		left: wp('5%'),
		right: wp('5%')
	}
});