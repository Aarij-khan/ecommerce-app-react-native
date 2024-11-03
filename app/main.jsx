import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Main = () => {
  const handleMove = async () => {
    router.push('/home');
    await AsyncStorage.setItem('start','true');
  }
  return (
    <View>
       <Image source={require('../assets/getstarted.png')} style={{height:hp('105%'),width:wp('100%')}} />
       <View style={Styles.main}>
        <Text style={Styles.text} >You want</Text>
        <Text style={Styles.text} >anything here</Text>
        <Text style={Styles.text} >you go!</Text>
        <Text style={Styles.smalltext}>Find it here, buy it now!</Text>
       <TouchableOpacity style={Styles.btn} activeOpacity={0.7}>
        <Text style={Styles.btntext} onPress={handleMove}>Get Started</Text>
       </TouchableOpacity>

       </View>
    </View>
  )
}
const Styles=StyleSheet.create({
  smalltext:{
    color:'white',
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
  },
  main:{
    position:'absolute',
    bottom:hp('5%'),
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:wp('100%'),
    gap:hp('2%')
  },
  btn:{
    backgroundColor:'#F83758',
    width:wp('80%'),
    height:hp('8%'),
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:20
  },
  text:{
    color:'white',
    fontSize:45,
    fontWeight:'bold',
    textAlign:'center',
    fontFamily:'serif',
  },
  btntext:{
    color:'white',
    fontSize:20,
    fontWeight:'bold',
  }
})
export default Main