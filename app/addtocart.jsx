import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Image } from "expo-image";
import { CartItem } from "./context/contextapi";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useToast } from "react-native-toast-notifications";
import Toast from "react-native-toast-message";

const Addtocart = () => {
  const { carts, handleCartItems, removeCartItems, decreaseItem } =
    useContext(CartItem);
  console.log("🚀 ~ Addtocart ~ carts:", carts);

  const toast = useToast();
  const [Loading, setLoading] = useState(false);
  const router = useRouter();

  const total = carts?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleOrder = () => {
    if (carts?.length > 0) {
      router.push("/users");
    } else {
      toast.show("Cart is empty", {
        type: "warning",
        placement: "top",
        duration: 3000,
        animationType: "zoom-in",
      });
    }
  };

  useEffect(() => {
    if (carts?.length === 0) {
      Toast.show("Cart is empty", {
        type: "warning",
        placement: "center",
        duration: 3000,
        animationType: "zoom-in",
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <Ionicons
        name="chevron-back-circle-sharp"
        size={35}
        color="black"
        style={styles.backIcon}
        onPress={() => router.back()}
      />
      <Text style={styles.header}>Your Cart</Text>
      <ScrollView>
        {carts?.length > 0 ? (
          carts.map((Cart, index) => (
            <Animated.View
              entering={FadeInDown.delay(index * 200).springify()}
              key={index}
              style={styles.cartItem}
            >
              <View style={styles.cartRow}>
                <Image source={{ uri: Cart.image }} cachePolicy="memory-disk" style={styles.cartImage} contentFit="fill"/>
                <View style={styles.cartDetails}>
                  <Text style={styles.cartName}>
                    {Cart?.title?.length > 14
                      ? Cart.title.slice(0, 14) + "..."
                      : Cart.title}
                  </Text>
                  <Text style={styles.cartPrice}>{Cart.price}$</Text>
                  <View style={styles.quantityRow}>
                    <TouchableOpacity>
                      <AntDesign
                        name="plus"
                        size={26}
                        color="white"
                        onPress={() => handleCartItems(Cart)}
                        style={styles.iconButton}
                      />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{Cart.quantity}</Text>
                    <TouchableOpacity>
                      <AntDesign
                        name="minus"
                        size={26}
                        color="white"
                        onPress={() => decreaseItem(Cart.id)}
                        style={styles.iconButton}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <MaterialCommunityIcons
                name="delete-circle"
                size={40}
                color="red"
                onPress={() => removeCartItems(Cart.id)}
                style={styles.deleteIcon}
              />
            </Animated.View>
          ))
        ) : (
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        )}
      </ScrollView>
      <TouchableOpacity onPress={handleOrder}>
        <View style={styles.checkoutButton}>
          {Loading ? (
            <ActivityIndicator size={33} />
          ) : (
            <View style={styles.checkoutContent}>
              <Text style={styles.totalText}>Total: {Math.round(total)}$</Text>
              <Text style={styles.checkoutText}>Checkout</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backIcon: {
    position: "absolute",
    top: 42,
    left: 15,
    zIndex: 1,
    borderRadius: 50,
  },
  header: {
    color: "#F83758",
    fontSize: 32,
    marginTop: '10%',
    textAlign: "center",
    paddingBottom: 8,
    fontWeight: "bold",
  },
  cartItem: {
    flexDirection: "row",
    height: 110,
    marginTop: 12,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 8,
  },
  cartRow: {
    flexDirection: "row",
  },
  cartImage: {
    height: 50,
    width: 50,
    marginTop: 8,
    borderRadius: 50,
  },
  cartDetails: {
    flexDirection: "column",
    gap: 8,
    paddingLeft: 8,
  },
  cartName: {
    fontSize: 18,
  },
  cartPrice: {
    fontSize: 18,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    borderRadius: 50,
    backgroundColor: "#F83758",
    marginLeft: 10,
    padding:2
  },
  quantityText: {
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 8,
    marginLeft: 8,
    fontSize: 18,
  },
  deleteIcon: {
    marginRight: 10,
  },
  checkoutButton: {
    borderRadius: 50,
    backgroundColor: "red",
    marginHorizontal: 12,
    paddingVertical: 16,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  checkoutContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  checkoutText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  emptyCartText: {
    textAlign: "center",
    fontSize: 18,
    color: "gray",
    marginTop: 20,
  },
});

export default Addtocart;
