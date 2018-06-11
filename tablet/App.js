import { Animated, ScrollView, StatusBar, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Availability from './Components/Availability';
import CurrentEvent from './Components/CurrentEvent';
import EventDetail from './Components/EventDetail';
import EventSchedule from './Components/EventSchedule';
import {Ionicons} from '@expo/vector-icons';
import React from 'react';

list = ["12:45","13:00"]

var event1 = {startTime:"11:00",endTime:"12:00",name:"Kishore Sabha Prep",color:"brown"}
var event2 = {startTime:"12:00",endTime:"13:30",name:"Kishore Sabha",color:"orange"}
var event3 = {startTime:"13:30",endTime:"14:30",name:"Yuvak Sabha Prep",color:"turquoise"}
var event4 = {startTime:"14:30",endTime:"16:00",name:"Yuvak Sabha",color:"yellow"}
events = [event1,event2,event3,event4]
eventIP = false
counter = 0
hashmap = {}

getNextEvent = function() {
  if (events.length === 0) {
    return {};
  } else {
    currentDate = new Date()
    upcomingEvent = events.filter((event) => {
      eventHour = parseInt(event.startTime.split(":")[0])
      eventMinute = parseInt(event.startTime.split(":")[1])
      eventDate = new Date()
      eventDate.setHours(eventHour, eventMinute, 0)
      if (eventDate > currentDate) {
        return event
      }
    })
    return upcomingEvent.length > 0 ? upcomingEvent[0] : {}
  }
}

getCurrentEvent = function() {
  if (events.length === 0) {
    return {};
  } else {
    currentDate = new Date()
    currentEvent = events.filter((event) => {
      eventStartHour = parseInt(event.startTime.split(":")[0])
      eventStartMinute = parseInt(event.startTime.split(":")[1])
      eventStartDate = new Date()
      eventStartDate.setHours(eventStartHour, eventStartMinute, 0)
      eventEndHour = parseInt(event.endTime.split(":")[0])
      eventEndMinute = parseInt(event.endTime.split(":")[1])
      eventEndDate = new Date()
      eventEndDate.setHours(eventEndHour, eventEndMinute, 0)
      if (currentDate >= eventStartDate && currentDate < eventEndDate) {
        return event
      }
    })
    return currentEvent.length > 0 ? currentEvent[0] : {}
  }
}

nextEvent = this.getNextEvent()

export default class App extends React.Component {

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0
    this.animatedValue.addListener(({value}) => {
      this.value = value
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0,180],
      outputRange: ['0deg','180deg']
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0,180],
      outputRange: ['180deg', '360deg']
    })
    StatusBar.setHidden(true);
  }

  componentDidMount() {
    setInterval(() => this.updateState({nextEvent: getNextEvent(), currentEvent: getCurrentEvent()}), 1000)
  }

  state = {
    currentEvent: getCurrentEvent(),
    eventColor: "",
    eventTitle: "",
    eventStartTime: "",
    eventEndTime: "",
    nextEvent: getNextEvent()
  }


  getAmPm = (time) => {
    if (time !== ""){
      hour = parseInt(time.split(":")[0])
      return (hour === 12 ? 12 : hour%12) + ":" + time.split(":")[1] + (hour < 12 ? " am" : " pm")
    }
    return ""
  }

  flipCard = function(val) {
    if (val === 90) {
      Animated.timing(this.animatedValue, {
        toValue:0,
        duration:500
      }).start()

    } else if(val === 180) {
      Animated.timing(this.animatedValue, {
        toValue:180,
        duration:500
      }).start()
    }
  }

  updateState(state) {
    this.setState(
      state
    )
  }

  updateStateAndFlipCard(event) {
    this.updateState({
      eventColor: event.color,
      eventTitle: event.name,
      eventStartTime: event.startTime,
      eventEndTime: event.endTime,
    })
    this.flipCard(180)
  }

  render() {

    const frontAnimatedStyle = {
      transform: [{
        rotateY: this.frontInterpolate
      }]
    }

    const backAnimatedStyle = {
      transform: [{
        rotateY: this.backInterpolate
      }]
    }

    counter = 0
    return (
      <View style={styles.container}>
        <View style={{width:'50%'}}>
          <EventSchedule events={events} updateState={(s) => this.updateStateAndFlipCard(s)}></EventSchedule>
        </View>
        <View style={{width:'50%'}}>
          <View style={[{borderWidth:10, borderColor:'transparent', borderRadius:20,height:'50%', width:'100%', top: 0}]}>
            <Animated.View style={[frontAnimatedStyle, {backfaceVisibility: 'hidden',height:'100%',width:'100%',top:0,}]}>
              <CurrentEvent nextEvent={this.state.nextEvent}></CurrentEvent>
            </Animated.View>
            <Animated.View style={[backAnimatedStyle, {backfaceVisibility: 'hidden', width:'100%', height:'100%', top: 0, position:'absolute'}]}>
              <EventDetail event={this.state} flipCard={() => this.flipCard(90)}></EventDetail>
            </Animated.View>
          </View>
          <View style={{position:'absolute',bottom:0,right:0,width:'100%', height:'50%',alignContent:'center',
            justifyContent:'center', borderWidth:10, borderRadius:20, borderColor: 'transparent'}}>
            <Availability nextEvent={this.state.nextEvent} currentEvent={this.state.currentEvent}></Availability>
          </View>
        </View>
      </View>
    );
  }
}

class Event {
  startTime = ""
  endTime = ""
  name = ""
  color = ""
}

const styles = StyleSheet.create({
  available: {
    backgroundColor:'green',
    color:'#fff',
    fontSize:24,
    padding:15,
  },
  container: {
    backgroundColor: '#0a0a0a',
    flexDirection: 'row',
    height: '100%',
    width:'100%',
  },

});
