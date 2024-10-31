import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { Image } from "expo-image";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Home = () => {
  return (
    <View style={Styles.main}>
      <View style={Styles.innerBox}>
        <Image
          source={require("../assets/fashion1.png")}
          style={{ height: hp("7%"), width: wp("39%") }}
        />
        <Image
          source={{
            uri: "https://img.freepik.com/premium-photo/elevate-your-brand-with-friendly-avatar-that-reflects-professionalism-ideal-sales-managers_1283595-18531.jpg?semt=ais_hybrid",
          }}
          style={{ height: hp("8%"), width: wp("17%"), borderRadius: 50 }}
        />
      </View>
      {/* input start here */}
      <View>
        <TextInput placeholder="Search any product" style={Styles.input} />
      </View>
      {/* input end here */}
      <View style={Styles.filterbox}>
        <Text style={Styles.text}>All Featured</Text>
        <View style={Styles.filterMenu}>
          <Text>Filter </Text>
          <AntDesign name="filter" color="#4F8EF7" size={20} />
        </View>
      </View>
    </View>
  );
};
const Styles = StyleSheet.create({
  filterMenu: {
    flexDirection: "row",
  },
  text: {
    fontSize: 30,
    fontWeight: "800",
    fontFamily: "sans-serif-condensed",
  },
  filterbox: {
    width: wp("100%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("9%"),
    paddingVertical: hp("2%"),
  },
  main: {
    flex: 1,
  },
  innerBox: {
    paddingVertical: hp("8%"),
    paddingHorizontal: wp("5%"),
    height: hp("10%"),
    width: wp("100%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    height: hp("6%"),
    width: wp("90%"),
    borderRadius: 2,
    borderWidth: 1,
    marginHorizontal: wp("5%"),
    paddingHorizontal: wp("5%"),
  },
});
export default Home;
