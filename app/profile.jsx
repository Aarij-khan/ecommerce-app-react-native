import { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";

const Profile = () => {
  const [profle, setProfile] = useState("");
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={style.main}>
      <View style={style.inner}>
        <Image
          style={{ borderRadius: 80, height: hp("20%"), width: wp("40%") }}
          source={{
            uri: "https://img.freepik.com/premium-photo/elevate-your-brand-with-friendly-avatar-that-reflects-professionalism-ideal-sales-managers_1283595-18531.jpg?semt=ais_hybrid",
          }}
        />

        <View style={style.Innerbox}>
          <AntDesign name="user" size={32} color="black" />
          <TextInput
            placeholder="Enter name"
            style={style.input1}
            value={profle}
            onChangeText={(text) => setProfile(text)}
          />
        </View>
        <View style={style.Innerbox}>
          <AntDesign name="mail" size={32} color="black" />
          <TextInput
            placeholder="email"
            style={style.input1}
            editable={false}
          />
        </View>
        <TouchableOpacity style={style.btn}>
            <Text style={style.innerBtn}>update</Text>
        </TouchableOpacity>

      </View>
    </View>
    </ScrollView>
  );
};
const style = StyleSheet.create({
    btn: {
    height: hp("7%"),
    width: wp("80%"),
    backgroundColor: "#F83758",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 20,
  },
  innerBtn: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "sans-serif-condensed",
  },
  main: {
    height: "100%",
    width: "100%",
    paddingTop:10
  },

  inner: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "sans-serif-condensed",
  },
  Innerbox: {
    backgroundColor: "lightgrey",
    height: hp("7%"),
    width: wp("90%"),
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 30,
    paddingLeft: 10,
    gap: 5,
  },
  input1: {
    height: hp("6%"),
    width: wp("72%"),
    fontSize: 20,
    marginLeft: 4,
  },
});

export default Profile;
