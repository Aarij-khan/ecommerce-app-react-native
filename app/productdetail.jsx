import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { CartItem } from "./context/contextapi";
import { Badge } from "react-native-paper";

const Productdetail = () => {
  const { carts,handleCartItems, IsItemAdded } = useContext(CartItem);
  const [loading, setLoading] = useState(false);
  const params = useLocalSearchParams();
  const productId = params.id;
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchProductDetail();
  }, [productId]);

  const fetchProductDetail = async () => {
    setLoading(true);
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const productData = await response.json();
    setProduct([productData]);
    setLoading(false);
  };

  return (
    <SafeAreaView style={Style.main}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {loading ? (
          <ActivityIndicator size={50} color={"red"} style={{flex:1,justifyContent:'center',alignItems:'center'}} />
        ) : (
          product?.map((e, idx) => {
            return (
              <View key={idx}>
                <View style={Style.iconbox}>
                  <Ionicons
                    name="chevron-back"
                    size={30}
                    color="black"
                    onPress={() => router.back()}
                  />
                     <TouchableOpacity
              onPress={() => router.push("addtocart")}
              style={{
                position: "relative",
                width: 50, // Adjust as per design
                height: 50, // Adjust as per design
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
                <View style={Style.Imagebox}>
                  <Image
                    style={Style.Image}
                    source={{ uri: e?.image }}
                    contentFit="fill"
                  />
                </View>
                <View style={Style.box}>
                  <Text style={Style.productTitle}>
                    {e.title.length > 20 ? e?.title?.slice(0, 20) + "..." : e?.title}
                  </Text>
                  <Text style={Style.productPrice}>${e?.price}</Text>
                  <View style={Style.description}>
                    <ScrollView>
                      <Text style={Style.productDescription}>
                        {e?.description?.length > 200
                          ? e?.description.slice(0, 180) + "..."
                          : e?.description}
                      </Text>
                    </ScrollView>
                  </View>

                  <TouchableOpacity style={Style.boxes} onPress={() => handleCartItems(e)}>
                    <AntDesign name="shoppingcart" size={30} color={"white"} />
                    <Text style={Style.boxesText}>
                      {IsItemAdded(e.id) ? `${IsItemAdded(e.id)} Added` : "Add to Cart"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const Style = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
  description: {
    width: "100%",
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height: hp("20%"),
    marginTop: 10,
    padding:10,
    borderRadius: 10,
    backgroundColor: "#EBEBEB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginBottom:"5%"
  },
  productDescription: {
    fontSize: 17,
  },
  iconbox: {
    width: "100%",
    height: 50,
    marginTop: hp("5%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  Image: {
    marginTop: hp("2%"),
    width: "90%",
    height: hp("30%"),
    borderRadius: 20,
  },
  Imagebox: {
    width: "100%",
    height: hp("36%"),
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "100%",
    height:'100%',
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 15,
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  productPrice: {
    fontSize: 20,
  },
 
  boxes: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: hp("6%"),
    backgroundColor: "#F83758",
    borderRadius: 10,
    gap: 10,
  },
  boxesText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default Productdetail;
