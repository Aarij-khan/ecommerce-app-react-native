import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

const Catagory = ({ props, onpress, isChosen }) => {
  return (
    <TouchableOpacity
      style={[
        Styles.catagorybox,
        { backgroundColor: isChosen ? "pink" : "#F83758" },
      ]}
      onPress={onpress}
    >
      <Text>{props}</Text>
    </TouchableOpacity>
  );
};
const Styles = StyleSheet.create({
  catagorybox: {
    height: hp("5%"),
    width: wp("30%"),
    borderRadius: 5,
    marginLeft:4,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: wp("1%"),
  },
});
export default Catagory;
