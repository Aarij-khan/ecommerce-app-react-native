import { View, Text } from 'react-native'
import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { Image } from 'expo-image';

const ProductsItem = ({rating,price,title,img,id}) => {
  return (
    <View style={{height:hp('38%'),width:wp('45%'),backgroundColor:'lightgray',borderRadius:10,marginBottom:10,marginTop:6}}>
      <Image
        source={{uri:img}}
        style={{height:hp('25%'),width:wp('45%'),paddingBottom:6}}
        contentFit="fill"
      />
      <Text style={{textAlign:'center',fontWeight:'bold',fontSize:18}}>{title.length >17 ? title.slice(0,17)+'...': title}</Text>
      <Text style={{textAlign:'center',fontWeight:'bold',fontSize:15,marginTop:2}}>${price}</Text>
    </View>
  )
}

export default ProductsItem