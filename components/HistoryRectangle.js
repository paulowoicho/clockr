import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class HistoryRectangle extends Component {
  // Only for displaying symbol in BuilderX.
  static containerStyle = {
    width: 332,
    height: 248
  };
  render() {
    return (
      <View style={[this.props.style]}>
        <View style={styles.rect} />
        <Text style={styles.text}>{this.props.time}</Text>
        <Text style={styles.text2}>{this.props.date}</Text>
        <Text style={styles.text3}>{this.props.location}</Text>
        <Text style={styles.text4}>{this.props.checkedIn}</Text>
        <Text style={styles.text5}>{this.props.checkOut}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  rect: {
    top: hp('1%'),
    left: "0%",
    width: wp('92%'),
    height: hp('30%'),
    position: "absolute",
    elevation: 27,
    backgroundColor: "rgb(230,230,230)",
    borderRadius: 20,
    shadowColor: "rgba(0,0,0,0.37)",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.99,
    shadowRadius: 9
  },
  text: {
    top: hp('3%'),
    left: "31.63%",
    width: wp('30%'),
    height: hp('10%'),
    position: "absolute",
    backgroundColor: "transparent",
    fontSize: 40,
    fontFamily: "AvenirNext-Heavy",
    textAlign: "center",
    color: "rgba(226,168,32,1)"
  },
  text2: {
    top: hp('8%'),
    left: "25.3%",
    position: "absolute",
    backgroundColor: "transparent",
    fontSize: 15,
    fontFamily: "AvenirNext-UltraLight"
  },
  text3: {
    top: hp('15%'),
    left: "27.71%",
    position: "absolute",
    backgroundColor: "transparent",
    fontFamily: "AvenirNext-DemiBold",
    color: "rgba(43,85,210,1)"
  },
  text4: {
    top: hp('23%'),
    left: "5%",
    position: "absolute",
    backgroundColor: "transparent",
    fontFamily: "AvenirNext-BoldItalic"
  },
  text5: {
    top: hp('23%'),
    left: "58.43%",
    position: "absolute",
    backgroundColor: "transparent",
    fontFamily: "AvenirNext-BoldItalic"
  }
});