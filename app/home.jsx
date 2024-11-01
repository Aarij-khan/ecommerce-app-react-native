import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Image } from "expo-image";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Swiper from "react-native-swiper";
import { useEffect } from "react";
import Catagory from "../components/catagory";
import { Link, router, useFocusEffect } from "expo-router";
import Toast from "react-native-toast-message";
import ProductsItem from "./ProductsItem";
import { TouchableOpacity } from "react-native";
const Home = () => {
  const [catagory, setCatagory] = useState([]);
  const [selectCatagory, setSelectCatagory] = useState(["All"]);
  const [limit, setLimit] = useState(5);
  const [mapCategory, setMapCategory] = useState([]);

  if (limit === 20) {
    Toast.show({
      type: "error",
      text1: "Something went wrong!",
    });
  }

  useFocusEffect(
    useCallback(() => {
      getCatagory();
    }, [])
  );

  const getCatagory = async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      setCatagory(data);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong!",
        text2: error,
      });
    }
  };
  useEffect(() => {
    ApiCatagory();
  }, [selectCatagory, limit]);
  const ApiCatagory = async () => {
    var uri =
      selectCatagory == "All"
        ? `https://fakestoreapi.com/products?limit=${limit}`
        : `https://fakestoreapi.com/products/category/${selectCatagory}`;
    try {
      const response = await fetch(uri);
      const arr = await response.json();
      setMapCategory(arr);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong!",
        text2: error,
      });
    }
  };

  return (
    <ScrollView>
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
        <Toast />
        <View>
          <TextInput placeholder="Search any product" style={Styles.input} />
        </View>
        {/* input end here */}
        <View style={{ height: hp("30%") }}>
          <Swiper
            showsPagination={true}
            showsButtons={true}
            autoplay={true}
            style={Styles.swiper}
          >
            <Image
              source={{
                uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3EzOf7Y8QQ8yZ47Vw7kvVIVFktBJ2n1UN0w&s'
              }}
              style={{ flex: 1, objectFit: "contain" }}
            />
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3EzOf7Y8QQ8yZ47Vw7kvVIVFktBJ2n1UN0w&s",
              }}
              style={{ flex: 1, objectFit: "cover" }}
            />
            <Image
              source={{
                uri: "https://png.pngtree.com/thumb_back/fh260/background/20201015/pngtree-black-friday-sale-banner-pink-design-template-image_417566.jpg",
              }}
              style={{ flex: 1, objectFit: "contain" }}
            />
          </Swiper>
        </View>
        <View style={Styles.filterbox}>
          <Text style={Styles.text} >All Featured</Text>
          <View style={Styles.filterMenu}>
            <Text style={Styles.text}>Filter </Text>
            <AntDesign name="filter" color="black" size={25} />
          </View>
        </View>

        {/* catagories start */}
        <View style={{ marginBottom: 10,paddingHorizontal:5 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Catagory
              props="All"
              isChosen={selectCatagory == "All"}
              onpress={() => setSelectCatagory("All")}
            />
            {catagory.map((item, index) => {
              var isChosen = selectCatagory == item;
              return (
                <Catagory
                  props={item}
                  key={index}
                  onpress={() => setSelectCatagory(item)}
                  isChosen={isChosen}
                />
              );
            })}
          </ScrollView>
        </View>
        <Toast />
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
          data={mapCategory}
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
      {/* catagories end */}
      {selectCatagory == "All" && (
        <View
          style={{
            width: wp("100%"),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => setLimit((prev) => prev + 5)}
            style={{
              height: hp("7%"),
              width: wp("70%"),
              backgroundColor: "#F83758",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 5,
              borderRadius: 30,
              flexDirection: "row",
              gap: 4,
            }}
          >
            <AntDesign name="plus" size={25} />
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 2,
              }}
            >
              Load More
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};
const Styles = StyleSheet.create({
  swiper: {
    height: hp("40%"),
    marginTop: 5,
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
    backgroundColor:'#EBEBEB'
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
