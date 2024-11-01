import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { View, Text,StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

const Catagory = ({ props ,onpress}) => {
  return (
    <TouchableOpacity style={Styles.catagorybox} onPress={onpress}>
      <Text >{props}</Text>
    </TouchableOpacity>
  );
};
const Styles = StyleSheet.create({
  catagorybox: {
    height: hp("5%"),
    width: wp("32%"),
    borderRadius: 5,
    backgroundColor: "#F83758",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: wp("1%"),
  },
});
export default Catagory;
