import {Ionicons} from '@expo/vector-icons';
import React from 'react';
import {StyleSheet, Text, View,} from 'react-native';

export default class CurrentEvent extends React.Component {

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
      <View style={[ styles.view, {backgroundColor: "black", borderLeftColor: this.props.nextEvent.color ? this.props.nextEvent.color : "#25ba51"}]}>
        <Ionicons style={styles.icon} name="ios-information-circle-outline" color={'white'} size={60} />
        <Text style={[styles.text, {color:this.props.nextEvent.name ? this.props.nextEvent.color : "#25ba51",}]}>{this.props.nextEvent.name ? 'Upcoming Event:\n' + this.props.nextEvent.name : "No more upcoming events today!"}</Text>
        <Text style={[styles.text, {color:this.props.nextEvent.name ? this.props.nextEvent.color : "#25ba51",}]}>{this.props.nextEvent.name ? (this.getAmPm(this.props.nextEvent.startTime) + "-" + this.getAmPm(this.props.nextEvent.endTime)) : ""}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    margin:10,
    position:'absolute',
    top:0,
    left:0
  },
  text: {
    fontSize:40,
    textAlign:'center',
    padding:10
  },
  view: {
    height:'100%',
    borderRadius:10,
    borderLeftWidth:20,
    justifyContent:'center',
    borderWidth: 1,
    borderColor:'white',
  },
});
