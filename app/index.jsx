import { View, Text,Image ,} from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { router } from 'expo-router';



const Index = () => {
  const sendToLogin = () => {
    router.push("login");

  }
  return (
    <Onboarding
    onDone={sendToLogin}
    onSkip={sendToLogin}
    pages={[
      {
        backgroundColor: '#fff',
        image:(
            <Image source={require('../assets/fashion.png')} style={{height:hp('40%'),width:wp('80%')}} />   
        ),
        title: 'Choose Products',
        subtitle: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
      },
      {
        backgroundColor: '#fff',
        image:(
            <Image source={require('../assets/fashion2.png')} style={{height:hp('40%'),width:wp('80%')}}/>
        ),
        title: 'Make Payment',
        subtitle: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
      },
      {
        backgroundColor: '#fff',
        image:(
            <Image source={require('../assets/fashion3.png')} style={{height:hp('40%'),width:wp('80%')}} />
        ),
        title: 'Get Your Order',
        subtitle: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
      },
      
    ]}
  />
  )
}

export default Index