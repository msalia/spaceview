import {Ionicons} from '@expo/vector-icons';
import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';

export default class EventDetail extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(props) {
		this.updateState(props.event)
	}

  state = {
		eventColor: "transparent",
		eventEndTime: "",
		eventTitle: "",
		eventStartTime: "",
  }

  getAmPm = (time) => {
		if (time !== ""){
			hour = parseInt(time.split(":")[0])
			return (hour === 12 ? 12 : hour%12) + ":" + time.split(":")[1] + (hour < 12 ? " am" : " pm")
		}
		return ""
  }

  updateState(state) {
		this.setState(
			state
		)
  }

  render() {
		counter = 0
		return (
			<View style={[styles.view,{ borderLeftColor: this.state.eventColor ? this.state.eventColor : "transparent",}]}>
				<Ionicons style={styles.infoIcon} name="ios-information-circle-outline" color={'black'} size={60} />
				<TouchableHighlight underlayColor="transparent" style={styles.touch} onPress={() => {this.props.flipCard(90)}}>
					<Ionicons style={styles.closeIcon} name="ios-close-circle-outline" color={this.state.eventTitle !== "" ? 'black' : 'black'} size={32}/>
				</TouchableHighlight>
				<Text style={[styles.text, {color:this.state.eventColor !== "" ? 'black' : "transparent"}]}>{this.state.eventTitle}</Text>
				<Text style={[styles.text, {color:this.state.eventColor !== "" ? 'black' : "transparent"}]}>{this.state.eventTitle !== "" ? (this.getAmPm(this.state.eventStartTime) + "-" + this.getAmPm(this.state.eventEndTime)) : ""}</Text>
			</View>
		);
  }
}

const styles = StyleSheet.create({
	closeIcon:{
		padding:10,
		margin:10,
		top:0,
		right:0,
		position:'absolute',
	},
	infoIcon: {
		margin:10,
		position:'absolute',
		top:0,
		left:0,
	},
	text:{
		color:"#fff",
		fontSize:40,
		textAlign:'center',
		padding:10,
	},
	touch: {
		top:0,
		right:0,
		position:'absolute',
	},
  view: {
		backgroundColor: "#dadada",
		borderLeftWidth:20,
		height:'100%',
		borderRadius:10,
		justifyContent:'center',
		borderWidth: 1,
		borderColor:'white',
	},
});
