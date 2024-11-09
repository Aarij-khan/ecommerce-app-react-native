import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";

const Productdetail = () => {
  const params = useLocalSearchParams();
  const productId = params.id;
  const [product, setproduct] = useState([]);

  useEffect(() => {
    Productdetail();
  }, [productId]);

  const Productdetail = async () => {
    var data = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const arr = await data.json();
    setproduct([arr]);
  };

  return (
    <SafeAreaView>
      <View style={Style.main}>
        {product.map((e, idx) => {
          return (
            <View key={idx}>
              <View style={Style.iconbox}>
                <Ionicons
                  name="chevron-back"
                  size={30}
                  color="black"
                  onPress={() => {
                    router.back();
                  }}
                />
                <AntDesign name="shoppingcart" size={30} color="black" />
              </View>
              <View style={Style.Imagebox}>
                <Image
                  style={Style.Image}
                  source={{
                    uri: e.image,
                  }}
                  contentFit="cover"
                />
              </View>
              <View style={Style.box}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    marginTop: 10,
                  }}
                >
                  {e.title.length > 20
                    ? e.title.slice(0, 20) + "..."
                    : e.title}
                </Text>
                <Text style={{ fontSize: 23 }}>
                  $ {e.price}
                </Text>
              <View style={Style.description}>
                <ScrollView>
                <Text style={{ fontSize: 20}}>
                  {e.description.length > 200 ? e.description.slice(0,200)+'...': e.description}
                </Text>
                </ScrollView>
              </View>

                <TouchableOpacity style={Style.boxes}>
                  <AntDesign name="shoppingcart" size={30} color={'white'} />
                  <Text style={Style.boxesText}>add to cart</Text>
                </TouchableOpacity>
              </View>
              
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};
const Style = StyleSheet.create({
  main: {
    height: hp("100%"),
    width: wp("100%"),
    backgroundColor: "#EBEBEB",
    
  },
  description:{
    width:wp('90%'),
    height:hp('30%'),
    marginTop:10,
  },
  iconbox: {
    width: wp("100%"),
    height: 50,
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  Image: {
    marginTop: "5%",
    width: wp("94%"),
    height: hp("30%"),
    borderRadius: 20,
  },
  Imagebox: {
    width: wp("100%"),
    height: hp("36%"),
    alignItems: "center",
  
  },
  box: {
    width: wp("100%"),
    height: hp("100%"),
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    gap:10
  },
  boxes:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:wp('90%'),
    height:hp('6%'),
    backgroundColor:'#F83758',
    borderRadius:10,
    marginTop:8,
    flexDirection:'row',
    gap:10,
    alignItems:'center'
  },
  boxesText:{
    fontSize:20,
    fontWeight:'bold',
    color:'white'
  }
});

export default Productdetail;
