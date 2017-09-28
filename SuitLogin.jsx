// SuitLogin
// September 28, 2017
// During Windowing Systems Programming

import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Image, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 5.2.0

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topBar}></View>
        <View style={styles.topSection}>
          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Ionicons name="ios-close-circle-outline" size={40} color="white" onPress={() => console.log('close pressed')}/>
          </View>
          <View style={{flex:5, justifyContent:'center', left:85}}>
            <Text style={{color:'white'}}>LOG IN</Text>
          </View>
        </View>
        <View style={styles.loginSection}>
          <TextInput placeholder="Email" style={{height:40}} underlineColorAndroid="transparent" borderBottomWidth={1} borderBottomColor="#E1E1E1"/>
          <TextInput placeholder="Password" secureTextEntry={true} style={{height:40}} underlineColorAndroid="transparent" borderBottomWidth={1} borderBottomColor="#E1E1E1"/>
          <View style={styles.loginText}>
            <Text style={{padding: 10, fontSize: 12, color: '#7C7D7F'}}>Forgot Password?</Text>
            <Text style={{fontSize: 12, color: '#7C7D7F'}}>By logging in you agree to our</Text>
            <Text style={{paddingBottom: 10, fontSize: 12, color: '#7C7D7F'}}>
              <Text style={{textDecorationLine:'underline'}}>Terms of Service</Text>
              <Text> & </Text>
              <Text style={{textDecorationLine:'underline'}}>Privacy Policy</Text>
            </Text>
          </View>
        </View>
        <TouchableHighlight style={styles.loginButton} onPress={() => console.log('log in')}>
          <Text style={{color:'white'}}>LOG IN</Text>
        </TouchableHighlight>
        <View style={styles.bottomSection}>
          <Image style={{flex:1}} source={{uri: 'https://static.pexels.com/photos/404174/pexels-photo-404174.jpeg'}}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  topBar: {
    flex: 0.75,
    paddingTop: 0,
    backgroundColor: '#262729'
  },
  topSection: {
    flex: 1.6,
    flexDirection: 'row',
    paddingTop: 0,
    backgroundColor: '#262729'
  },
  loginSection: {
    flex: 6,
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: 'center',
  },
  loginText: {
    alignItems: 'center'
  },
  loginButton: {
    flex: 1.7,
    backgroundColor: '#E5AF5C',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomSection: {
    flex: 10
  }
});
