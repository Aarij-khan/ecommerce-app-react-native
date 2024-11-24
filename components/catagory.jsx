import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import Animated, {  FadeIn,FadeInRight } from "react-native-reanimated";

const Catagory = ({ props, onpress, isChosen }) => {
  return (
    <Animated.View 
    entering={FadeInRight.delay(350).springify()}
    
    >
    <TouchableOpacity
      style={[
        Styles.catagorybox,
        {
          backgroundColor: isChosen ? "#F83758" : "lightgrey",
          borderColor: isChosen ? "black" : "#F83758",
          borderWidth: isChosen ? 1 : 0,
          
        },
      ]}
      onPress={onpress}
    >
      <Text style={{color:isChosen ? "white" : "black",fontSize:15,fontFamily:"sans-serif-condensed"}}>{props}</Text>
    </TouchableOpacity>

    </Animated.View>
  );
};
const Styles = StyleSheet.create({
  catagorybox: {
    height: hp("5%"),
    width: wp("33%"),
    borderRadius: 5,
    marginLeft: 4,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: wp("1%"),
  },
});
export default Catagory;
