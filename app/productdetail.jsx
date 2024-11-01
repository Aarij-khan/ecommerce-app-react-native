import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const Productdetail = () => {
    const params = useLocalSearchParams();
    const productId = params.id;
    console.log("🚀 ~ Productdetail ~ productId:", productId)
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>Productdetail</Text>
      <Text>{productId}</Text>
    </View>
  )
}

export default Productdetail