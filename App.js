/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import { RNUSBPrinter } from 'react-native-usb-printer';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {
  state = {
    printedSelected: "",
    devices: []
  }
  componentDidMount = async () => {
    var devices = await RNUSBPrinter.getUSBDeviceList();
    var printedSelected
    if (devices && devices.length > 0) {
       printedSelected = await RNUSBPrinter.connectPrinter(
         devices[0].vendor_id,
         devices[0].product_id
       );
 }
    this.setState({
        printedSelected: printedSelected,
        devices: devices,
      });
  }
 
  printTest = () => {
    if(this.state.printedSelected) {
      RNUSBPrinter.printText("<C>这是一段打印测试文字</C>\n");
    }else{
      console.log("没有找到打印设备")
    }
    
  }
 
  printRawDataTest = () => {
    if(this.state.printedSelected) {
      RNUSBPrinter.printBillTextWithCut("<C>这是一段打印测试文字</C>");
    }else{
      console.log("没有找到打印设备")
    }
  }
  render() {
    return (
      <View style={styles.container}>
        { 
          this.state.devices.map(device => (
            <Text key={device.device_id}>
              {`device_name: ${device.device_name}, device_id: ${device.device_id}, vendor_id: ${device.vendor_id}, product_id: ${device.product_id}`}
            </Text>
            ))
        }
        <TouchableOpacity onPress={() => this.printTest()}>
          <Text> Print Text </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.printRawDataTest()}>
          <Text> Print Bill Text </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
