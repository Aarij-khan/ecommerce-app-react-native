import { View, Text } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const ProductsItem = ({ rating, price, title, img, id }) => {
  return (
    <View style={{ marginTop: 15 }}>
      <Link href={`productdetail?id=${id}`}>
        <View
         
          style={{
            height: hp("38%"),
            width: wp("45%"),
            backgroundColor: "white",
            marginBottom: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <Image
            source={{ uri: img }}
            style={{
              height: hp("25%"),
              width: wp("45%"),
              paddingBottom: 6,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
            contentFit="fill"
          />
          <View
            style={{
              paddingHorizontal: 10,
              marginTop: 10,
              backgroundColor: "#DADADA",
              height: hp("12%"),
              width: wp("45%"),
              gap: 4,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "semibold",
                fontSize: 18,
                fontFamily: "sans-serif-condensed",
              }}
            >
              {title.length > 12 ? title.slice(0, 12) +"..." : title}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "semibold",
                fontSize: 16,
                marginTop: 2,
              }}
            >
              ${price}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "semibold",
                  fontSize: 16,
                  marginTop: 2,
                }}
              >
                {rating}{" "}
              </Text>
              <Ionicons name="star-half-outline" size={20} color={"#e1ad01"} />
              <Ionicons name="star-half-outline" size={20} color={"#e1ad01"} />
              <Ionicons name="star-half-outline" size={20} color={"#e1ad01"} />
              <Ionicons name="star-half-outline" size={20} color={"#e1ad01"} />
            </View>
          </View>
        </View>
      </Link>
    </View>
  );
};

export default ProductsItem;
