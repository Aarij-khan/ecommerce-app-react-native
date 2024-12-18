import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Image } from "expo-image";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Badge } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Swiper from "react-native-swiper";
import Catagory from "../components/catagory";
import { router, useFocusEffect } from "expo-router";
import Toast from "react-native-toast-message";
import ProductsItem from "./ProductsItem";
import { CartItem } from "./context/contextapi";
import Animated, { FadeInDown } from "react-native-reanimated";
const Home = () => {
  const { carts } = useContext(CartItem);
  const btnref = useRef(null);
  const [catagory, setCatagory] = useState([]);
  const [selectCatagory, setSelectCatagory] = useState(["All"]);
  const [limit, setLimit] = useState(5);
  const [mapCategory, setMapCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    if (limit == 20) {
      btnref.current.setNativeProps({ style: { display: "none" } });
    }
  }, [limit]);

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
      var x = data.reverse()
      setCatagory(x);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong!",
        text2: error,
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      ApiCatagory();
    }, [selectCatagory, limit])
  );

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
  const LoadMore = () => {
    setLoading(true)
    setLimit((prev) => prev + 5)
    setLoading(false)
  }

  return (
    <ScrollView>
      <View style={Styles.main}>
        <View style={Styles.innerBox}>
          <Image
            source={require("../assets/fashion1.png")}
            style={{ height: hp("7%"), width: wp("40%") }}
          />
          <View style={Styles.iconsbox}>
            <TouchableOpacity onPress={() => router.push("/profile")}>
              <Image
                source={require("../assets/images/aarij.png")}
                style={{ height: hp("7%"), width: wp("14%"), borderRadius: 50 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("addtocart")}
              style={{
                position: "relative",
                width: 50, 
                height: 50, 
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Badge
                style={{
                  position: "fived",
                  top: 7,
                  backgroundColor: "red",
                }}
              >
                {carts.length}
              </Badge>
              <AntDesign name="shoppingcart" size={32} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {/* input start here */}
        <Toast />
        <TouchableOpacity
          activeOpacity={0.7}
          style={Styles.searchbox}
          onPress={() => router.push("/search")}
        >
          <View style={Styles.Innerbox}>
            <AntDesign name="search1" size={32} color="black" />
            <TextInput
              placeholder="Search any product"
              style={Styles.input}
              editable={false}
            />
          </View>
        </TouchableOpacity>
        {/* input end here */}
        <View style={{ height: hp("30%") }}>
          <Swiper
            showsPagination={true}
            showsButtons={true}
            autoplay={true}
            style={Styles.swiper}
          >
            <Image
              source={require('../assets/images/baner.png')}
              contentFit="fill"
              style={{ flex: 1 }}
            />
            <Image
              source={{
                uri: "https://png.pngtree.com/thumb_back/fh260/background/20201015/pngtree-black-friday-sale-banner-pink-design-template-image_417566.jpg",
              }}
              contentFit="fill"
              style={{ flex: 1 }}
            />
              <Image
                source={require("../assets/images/img.webp")}
                contentFit="fill"
                style={{ flex: 1 }}
              />
          </Swiper>
        </View>
        <View style={Styles.filterbox}>
          <Text style={Styles.text}>All Featured</Text>
          <View style={Styles.filterMenu}>
            <Text style={Styles.text}>Filter </Text>
            <AntDesign name="filter" color="black" size={25} />
          </View>
        </View>

        {/* catagories start */}
        <View style={{ marginBottom: 10, paddingHorizontal: 5 }}>
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
        <View style={Styles.container}>
      <View>
        <Text style={Styles.title}>Top brands</Text>
        <Text style={Styles.subtitle}>Arrivals</Text>
      </View>
      <TouchableOpacity>
        <Text style={Styles.link}>See All</Text>
      </TouchableOpacity>
    </View>
        <FlatList
          numColumns={2}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
            paddingTop: 10,
            paddingHorizontal: wp("3%"),
            position: "relative",
          }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          data={mapCategory}
          renderItem={({ item, idx }) => (
            <Animated.View entering={FadeInDown.delay(idx * 350).springify()}>
              <ProductsItem
                id={item.id}
                img={item.image}
                title={item.title}
                price={item.price}
                rating={item.rating.rate}
              />
            </Animated.View>
          )}
        />
      </View>
      {/* catagories end */}
      {selectCatagory == "All" && (
        <View
          ref={btnref}
          style={{
            width: wp("100%"),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={LoadMore}
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
             { loading ? <ActivityIndicator size={50} color={"red"}/> :'Load More'}
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
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20, 
    marginTop: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20, 
  },
  subtitle: {
    fontSize: 16, 
  },
  link: {
    fontWeight: 'bold', 
    fontSize: 16, 
    color: 'red', 
  },
  filterMenu: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "lightgrey",
    padding: 5,
    gap: 2,
    borderRadius: 5,
  },
  iconsbox: {
    height: hp("22%"),
    width: wp("20%"),
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
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
    backgroundColor: "#EBEBEB",
  },
  innerBox: {
    paddingHorizontal: wp("3%"),
    marginBottom: 20,
    marginVertical: 30,
    height: hp("10%"),
    width: wp("100%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
export default Home;
