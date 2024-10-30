import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { auth } from './firebase.config/firebase'
import { router } from 'expo-router'
import { sendPasswordResetEmail } from 'firebase/auth';

const Forgotpassword = () => {
    const [Email,setEmail]=useState('')
     const handleSendEmail = () => {
        if (Email != "") {
            sendPasswordResetEmail(auth, Email)
            .then(() => {
              router.push('login')
              showToast('success', 'Request successfull!', 'Please check your email')
            })
            .catch((e) => showToast('error', 'Something went wrong!', e.code || e.message));  
        }
     }
  return (
    <View>
      <Text>Forgot</Text>
      <Text>password</Text>
      <TextInput placeholder='Enter email' value={Email} onChangeText={text => setEmail(text)}/>
        <TouchableOpacity onPress={handleSendEmail}>
            <Text>Submit</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Forgotpassword