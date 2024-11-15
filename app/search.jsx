import { useEffect, useState } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import ProductsItem from "./ProductsItem";

const Search = () => {
  const [map, setMap] = useState([]);
  const [orignalArr, setOrignalArr] = useState([]);
  useEffect(() => {
    ApiCatagory();
  }, []);

  const ApiCatagory = async () => {
    var uri = "https://fakestoreapi.com/products?limit=20";

    try {
      const response = await fetch(uri);
      const arr = await response.json();
      setMap(arr);
      setOrignalArr(arr)
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong!",
        text2: error,
      });
    }
  };
  const handleSearch = (text) => {
    let filterItem = orignalArr.filter((e)=>e.title.toLowerCase().includes(text.toLowerCase()) )
    setMap(filterItem)

  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={Styles.main}>
      <TouchableOpacity activeOpacity={0.7} style={Styles.searchbox} o>
        <View style={Styles.Innerbox}>
          <AntDesign name="search1" size={32} color="black" />
          <TextInput placeholder="Search any product" style={Styles.input} onChangeText={(text)=>handleSearch(text)}/>
        </View>
      </TouchableOpacity>
      <FlatList
        numColumns={2}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
          paddingTop: 20,
          paddingHorizontal: wp("3%"),
          position: "relative",
        }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={map}
        renderItem={({ item }) => (
          <ProductsItem
            id={item.id}
            img={item.image}
            title={item.title}
            price={item.price}
            rating={item.rating.rate}
          />
        )}
      />
    </View>
    </ScrollView>
  );
};
const Styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  input: {
    height: hp("6%"),
    width: wp("72%"),
    fontSize: 20,
    marginLeft: 4,
  },
  searchbox: {
    width: wp("100%"),
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
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
});

export default Search;
