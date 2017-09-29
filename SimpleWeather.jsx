// SimpleWeather
// September 28, 2017
// During Design & Analysis: Algorithms class

import React, { Component } from 'react';
import { Text, View, StyleSheet, Switch, TextInput, Keyboard } from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons' ; // 5.2.0
import Drawer from 'react-native-drawer' // 2.5.0

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      location: '30092',
      currentTemperature: 0,
      currentSky: '',
      dailyLow: 0,
      dailyHigh: 0,
      forecasts: [],
      locationCity: 'City',
      locationState: 'State',
      drawerOpen: false,
      isFahr: true
    };
  }

  componentDidMount(){
    this.fetchLocation();
  }

  toggleConversion = () => {
    this.setState({isFahr: !this.state.isFahr});
  }

  updateLocation = (inputLocation) => {
    this.setState({location: inputLocation});
  }

  fetchUpdatedLocation = () => {
    Keyboard.dismiss();
    this.fetchLocation();
  }

  fetchLocation = () => {
    fetch('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+ this.state.location + '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
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

  fahrenheitToCelcius = (fahrTemp) => Math.round((fahrTemp - 32) * 0.5556);

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
        <Text style={{color:'white', flex:2, paddingLeft: 5}}>{this.state.isFahr ? forecast.high : this.fahrenheitToCelcius(forecast.high)}&deg;</Text>
        <Ionicons name="md-arrow-down" color="white" size={20}/>
        <Text style={{color:'white', flex:2, paddingLeft: 5}}>{this.state.isFahr ? forecast.low : this.fahrenheitToCelcius(forecast.low)}&deg;</Text>
      </View>);
  }

  render() {
    const { isFahr, currentTemperature, dailyHigh, dailyLow } = this.state;

    return (
      <Drawer open={this.state.drawerOpen} onCloseStart={this.fetchUpdatedLocation} openDrawerOffset={0.2} tapToClose={true} content={
        <SettingScreen isFahr={this.state.isFahr} handleToggleConversion={this.toggleConversion} location={this.state.location} handleUpdateLocation={this.updateLocation}/>
      }>
        <View style={styles.container}>
        <View style={{flexDirection:'row', justifyContent:'flex-end', flex:0.55}}>
          <Ionicons style={{margin:10}} name="md-settings" color="white" size={25} onPress={()=>this.setState({drawerOpen:true})}/>
        </View>
          <View style={styles.dailySection}>
            <Text style={{color: 'white'}}>{this.state.locationCity}, {this.state.locationState}</Text>
            <Text style={{fontSize: 75, color: 'white'}}>{isFahr ? currentTemperature : this.fahrenheitToCelcius(currentTemperature)}&deg;F</Text>
            <View style={styles.dailyInfo}>
              <Ionicons name="md-arrow-up" color="white" size={20}/>
              <Text style={{color: 'white', flex: 1, paddingLeft: 5}}>{isFahr ? dailyHigh : this.fahrenheitToCelcius(dailyHigh)}&deg;</Text>
              <Ionicons name="md-arrow-down" color="white" size={20}/>
              <Text style={{color: 'white', flex: 1, paddingLeft: 5}}>{isFahr ? dailyLow : this.fahrenheitToCelcius(dailyLow)}&deg;</Text>
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
      </Drawer>
    );
  }
}

export class SettingScreen extends Component {
  constructor(props){
    super(props);
    this.props = props;
  }
  render(){
    return (
      <View style={styles.drawerContainer}>
        <Text style={{fontSize:20, marginBottom: 10, color: 'white'}}>Settings</Text>
        <Text style={{fontWeight:'bold', color: 'white'}}>Location</Text>
        <TextInput placeholder={this.props.location} placeholderTextColor="#555555" style={{width:70, borderWidth: 1, borderColor:'white', borderRadius: 5, textAlign:'center', color: 'white'}} underlineColorAndroid="transparent" maxLength={5} keyboardType='numeric' onChangeText={(text) => this.props.handleUpdateLocation(text)}/>
        <Text style={{fontWeight:'bold', color: 'white'}}>Background Color</Text>
        <Text style={{color: 'white'}}>Color 1</Text>
        <Text style={{fontWeight:'bold', color: 'white'}}>Unit</Text>
        <View style={{flexDirection:'row'}}>
          <Text style={{color: 'white'}}>celcius</Text>
          <Switch value={this.props.isFahr} onValueChange={() => this.props.handleToggleConversion()}/>
          <Text style={{color: 'white'}}>fahrenheit</Text>
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
  },
  drawerContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#3B3B3B',
    alignItems: 'center'
  }
});
