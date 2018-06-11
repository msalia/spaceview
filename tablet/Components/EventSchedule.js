import {Ionicons} from '@expo/vector-icons';
import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

time = []
heights = []
for (i = 0; i <= 23; i++) {
    time.push(i)
}

export default class EventDetail extends React.Component {

  events
  scroller

  constructor(props) {
    super(props)
    events = props.events
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
    if (time !== undefined){
      if (time === 0) {
        return "12 AM";
      } else {
        return (time === 12 ? 12 : time%12) + (time < 12 ? " AM" : " PM")
      }
    }
    return ""
  }

  updateState(state) {
    this.setState(
      state
    )
  }

  render() {
    return (
      <ScrollView style={styles.view} ref={ref=> this.scroller = ref}>
        <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'column'}}>
            {
              time.map(hour => {
                return (
                  <View style={styles.hour} key={hour}>
                    <Text style={styles.text}>{this.getAmPm(hour)}</Text>
                  </View>
                  )
              })
            }
          </View>
          <View style={{flexDirection:'column',width:'100%',padding:10}}>
            <View style={[styles.currentTime,{top: (new Date().getHours()*180) + (new Date().getMinutes() * 3) }]}>
            </View>
            {
              time.map(t => {
                return (
                  <View style={[styles.divider, {top: t > 0 ? (t*180)-t: -10000,}]} key={t}>
                  </View>
                )
              })
            }
            {
              events.map(event => {
                eventStartHour = parseInt(event.startTime.split(":")[0])
                eventStartTime = eventStartHour * 180
                eventStartTime += parseInt(event.startTime.split(":")[1]) * 3
                eventStartTime -= eventStartHour + 13
                if (events.indexOf(event) > 0) {
                  for (i = 0; i < events.indexOf(event); i++) {
                    eventStartTime -= (heights[i])
                  }
                }
                eventEndHour = parseInt(event.endTime.split(":")[0])
                eventEndTime = eventEndHour * 180
                eventEndTime += parseInt(event.endTime.split(":")[1]) * 3
                eventEndTime -= eventEndHour + 13
                if (events.indexOf(event) > 0) {
                  for (i = 0; i < events.indexOf(event); i++) {
                    eventEndTime -= (heights[i])
                  }
                }
                height = eventEndTime - eventStartTime
                heights[events.indexOf(event)] = height
                return (
                  <TouchableHighlight
                    underlayColor="#cacaca"
                    onPress={() => {this.props.updateState(event)}}
                    style={[styles.eventTab, {top:eventStartTime, height: height, borderLeftColor: event.color}]}
                    key={event.startTime}>
                    <View>
                      <Text style={styles.eventText}>{event.name}</Text>
                    </View>
                  </TouchableHighlight>
                )
              })
            }
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text:{
    color:"#fff",
    fontSize:20,
    color: 'gray',
  },
  view: {
    backgroundColor: "black",
    borderLeftWidth:20,
    height:'100%',
    width:'100%',
    padding:10,
    borderRadius:10,
  },
  hour: {
    height:180,
  },
  eventTab: {
    flexDirection: 'column',
    borderRadius:10,
    backgroundColor: '#dadada',
    borderLeftWidth:10,
    width:'80%',
    padding:1,
    margin: 1,
    marginLeft: 10,
  },
  eventText: {
    color:"#fff",
    padding:10,
    fontSize:24,
    color: 'black',
    fontWeight:'bold',
    position: 'absolute'
  },
  divider: {
    height:1,
    backgroundColor:'#ffffff30',
    width:'70%',
    marginLeft:20,
  },
  currentTime: {
    width:'81%',
    backgroundColor: '#00cc00',
    height: 3,
    borderRadius: 10
  },
})
