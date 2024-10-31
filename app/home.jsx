import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

const Home = () => {
  return (
    <View style={Styles.main}>
        <View style={Styles.innerBox}>
            <Image source={require('../assets/fashion1.png')} style={{height:hp('7%'),width:wp('40%')}} />
            <Image source={{uri:'https://img.freepik.com/premium-photo/elevate-your-brand-with-friendly-avatar-that-reflects-professionalism-ideal-sales-managers_1283595-18531.jpg?semt=ais_hybrid'}} style={{height:hp('8%'),width:wp('17%'),borderRadius:50}} />

        </View>
    </View>
  )
}
const Styles = StyleSheet.create({
  main:{
    flex:1,
   
  },
  innerBox:{
    paddingVertical:hp('8%'),
    paddingHorizontal:wp('5%'),
    height:hp('10%'),
    width:wp('100%'),
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems:'center',
  }
})
export default Home