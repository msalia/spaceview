import {Ionicons} from '@expo/vector-icons';
import React from 'react';
import {StyleSheet, Text, View,} from 'react-native';

export default class Availability extends React.Component {

	constructor(props) {
    super(props);
	}

	componentWillReceiveProps(props) {

	}

  getAmPm = (time) => {
    if (time !== ""){
      hour = parseInt(time.split(":")[0])
      return (hour === 12 ? 12 : hour%12) + ":" + time.split(":")[1] + (hour < 12 ? " am" : " pm")
    }
    return ""
  }

  render() {
    return (
      <View style={[styles.view, {backgroundColor:'black'}]}>
        <Text style={[styles.text, {color:this.props.currentEvent.name ? this.props.currentEvent.color : "#25ba51"}]}>
          {this.props.currentEvent.name ? this.props.currentEvent.name +
						"\nin progress" : "AVAILABLE"}
        </Text>
				<Text style={[styles.minText, {color:this.props.currentEvent.name ? this.props.currentEvent.color : "#25ba51"}]}>
          {this.props.currentEvent.name ? "Ends at " + this.getAmPm(this.props.currentEvent.endTime) : ""}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text:{
    fontSize:60,
    textAlign:'center',
    fontWeight:'300',
    color:'white'
  },
	minText: {
		fontSize:40,
		marginTop:30,
    textAlign:'center',
    fontWeight:'300',
    color:'white'
	},
  view: {
    position:'absolute',
    bottom:0,
    right:0,
    height:'100%',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'white',
    borderRadius:20,
    width:'100%',
  },
});
