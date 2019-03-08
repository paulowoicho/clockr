import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class Button extends Component {
	// Only for displaying symbol in BuilderX.
	static containerStyle = {
		height: 44,
		width: 100,
		defaultHeight: 'fixed',
		defaultWidth: 'auto'
	};
	render() {
		return (
			<TouchableOpacity
				style={[ styles.root, this.props.style ]}
				onPress={this.props.root ? this.props.root : null}
			>
				<Text style={styles.buttonContent}>{this.props.buttonContent ? this.props.buttonContent : 'Next'}</Text>
			</TouchableOpacity>
		);
	}
}
const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFCC00',
		paddingRight: 16,
		paddingLeft: 16,
		borderRadius: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 14 },
		shadowOpacity: 0.8,
		shadowRadius: 2
	},
	buttonContent: {
		fontSize: 17,
		fontWeight: '500',
		color: '#fff',
		fontFamily: 'AvenirNext-Bold'
	}
});