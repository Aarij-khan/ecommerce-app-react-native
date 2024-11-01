import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Swiper from "react-native-swiper";
import { useEffect } from "react";
import Catagory from "../components/catagory";

const Home = () => {
  const [catagory, setCatagory] = useState([]);
  const [selectCatagory, setSelectCatagory] = useState([]);
  console.log("🚀 ~ Home ~ selectCatagory:", selectCatagory);
  useEffect(() => {
    getCatagory();
  }, []);

  const getCatagory = async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    const data = await response.json();
    setCatagory(data);
  };

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
          <Text style={Styles.text}>Filter </Text>
          <AntDesign name="filter" color="black" size={25} />
        </View>
      </View>
      {/* catagories start */}
      <View style={{ marginBottom: 10 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {catagory.map((item, index) => {
            return(
              <Catagory props={item} key={index} onpress={()=> setSelectCatagory(item)} />

            )})}
        </ScrollView>
      </View>

      <View style={{ height: hp("30%") }}>
        <Swiper
          showsPagination={true}
          showsButtons={true}
          autoplay={true}
          style={Styles.swiper}
        >
          <Image
            source={{
              uri: "https://i.pinimg.com/736x/03/35/14/03351403ae27d274e94f1383358f003a.jpg",
            }}
            style={{ flex: 1, objectFit: "contain" }}
          />
          <Image
            source={{
              uri: "https://i.pinimg.com/736x/03/35/14/03351403ae27d274e94f1383358f003a.jpg",
            }}
            style={{ flex: 1, objectFit: "cover" }}
          />
          <Image
            source={{
              uri: "https://images.pexels.com/photos/28787817/pexels-photo-28787817/free-photo-of-assorted-gourmet-brazilian-brigadeiros.jpeg?auto=compress&cs=tinysrgb&w=600",
            }}
            style={{ flex: 1, objectFit: "cover" }}
          />
        </Swiper>
      </View>
    </View>
  );
};
const Styles = StyleSheet.create({
  swiper: {
    height: hp("40%"),
    marginTop: 3,
  },
  filterMenu: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "lightgrey",
    padding: 5,
    gap: 2,
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "800",
    fontFamily: "sans-serif-condensed",
  },
  filterbox: {
    width: wp("100%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("5%"),
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
