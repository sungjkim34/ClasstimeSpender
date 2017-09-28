// SimpleWeather
// September 28, 2017
// During Design & Analysis: Algorithms class

import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons' ; // 5.2.0

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      currentTemperature: 0,
      currentSky: '',
      dailyLow: 0,
      dailyHigh: 0,
      forecasts: [],
      locationCity: 'City',
      locationState: 'State'
    };
  }

  componentDidMount(){
    fetch('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22atlanta%2C%20ga%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
    .then(weather => weather.json())
    .then(data => {
      let weather = data.query.results.channel.item;
      this.setState({
        currentTemperature: weather.condition.temp,
        dailyLow: weather.forecast[0].low,
        dailyHigh: weather.forecast[0].high,
        currentSky: weather.condition.text.split(' ').length > 1 ? weather.condition.text.split(' ')[weather.condition.text.split(' ').length-1] : weather.condition.text,
        forecasts: weather.forecast.slice(1,6),
        locationCity: data.query.results.channel.location.city,
        locationState: data.query.results.channel.location.region
      });
    });
  }

  _renderWeeklyData = (forecast) => {
    let weatherIcon = 'md-help';
    switch(forecast.text.toLowerCase()){
      case 'sunny': weatherIcon = 'md-sunny'; break;
      case 'cloudy': weatherIcon = 'md-cloudy'; break;
      case 'snow': weatherIcon = 'md-snow'; break;
      case 'showers': weatherIcon = 'md-rainy'; break;
      case 'scattered showers': weatherIcon = 'md-rainy'; break;
      case 'thundershowers': weatherIcon = 'md-thunderstorm'; break;
      case 'scattered thunderstorms': weatherIcon = 'md-thunderstorm'; break;
      case 'isolated thundershowers': weatherIcon = 'md-thunderstorm'; break;
      case 'partly cloudy': weatherIcon = 'md-partly-sunny'; break;
      case 'partly sunny': weatherIcon = 'md-partly-sunny'; break;
      case 'mostly cloudy': weatherIcon = 'md-partly-sunny'; break;
      case 'mostly sunny': weatherIcon = 'md-partly-sunny'; break;
      default: weatherIcon = 'md-help'
    }
    return (<View style={styles.weekInfo}>
        <Ionicons name={weatherIcon} color="white" size={20} style={{flex:1, paddingLeft: 15}}/>
        <Text style={{color:'white', flex:4}}>{forecast.day.toUpperCase()}</Text>
        <Ionicons name="md-arrow-up" color="white" size={20}/>
        <Text style={{color:'white', flex:2, paddingLeft: 5}}>{forecast.high}&deg;</Text>
        <Ionicons name="md-arrow-down" color="white" size={20}/>
        <Text style={{color:'white', flex:2, paddingLeft: 5}}>{forecast.low}&deg;</Text>
      </View>);
  }

  render() {
    return (
      <View style={styles.container}>
        // Settings button
        // <View style={{flexDirection:'row', justifyContent:'flex-end', flex:0.55}}>
        //   <Ionicons style={{margin:10}} name="md-settings" color="white" size={25} onPress={()=>console.log('setting pressed')}/>
        // </View>
        <View style={styles.dailySection}>
          <Text style={{color: 'white'}}>{this.state.locationCity}, {this.state.locationState}</Text>
          <Text style={{fontSize: 75, color: 'white'}}>{this.state.currentTemperature}&deg;F</Text>
          <View style={styles.dailyInfo}>
            <Ionicons name="md-arrow-up" color="white" size={20}/>
            <Text style={{color: 'white', flex: 1, paddingLeft: 5}}>{this.state.dailyHigh}&deg;</Text>
            <Ionicons name="md-arrow-down" color="white" size={20}/>
            <Text style={{color: 'white', flex: 1, paddingLeft: 5}}>{this.state.dailyLow}&deg;</Text>
            <Ionicons name="md-sunny" color="white" size={20}/>
            <Text style={{color: 'white', flex: 3, paddingLeft: 5}}>{this.state.currentSky}</Text>
          </View>
        </View>
        <View style={styles.weeklySection}>
          {
            this.state.forecasts.map(forecast => this._renderWeeklyData(forecast))
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#3f91f4',
  },
  dailySection: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dailyInfo: {
    paddingLeft: 75,
    paddingRight: 25,
    flexDirection: 'row',
  },
  weeklySection: {
    flex: 4
  },
  weekInfo: {
    flex: 1,
    flexDirection: 'row'
  }
});
