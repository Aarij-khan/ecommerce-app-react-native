import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const Productdetail = () => {
  const params = useLocalSearchParams();
  const productId = params.id;
  return (
    <SafeAreaView>

    <View style={Style.main}>
      <View style={Style.iconbox}>
        <Ionicons name="chevron-back" size={30} color="black" onPress={()=>{router.back()}} />
        <AntDesign name="shoppingcart" size={30} color="black" />
      </View>

    </View>
    </SafeAreaView>
  );
};
const Style = StyleSheet.create({
  main: {
    flex: 1,
  },
  iconbox: {
    width: wp('100%') ,
    height: 50,
    marginTop:'10%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:10
  },
});

export default Productdetail;
