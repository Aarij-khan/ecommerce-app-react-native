import { View, ActivityIndicator, StyleSheet } from "react-native";
import React, { useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";

const Checkuser = () => {
  async function checkID() {
    var checkUid = await AsyncStorage.getItem("uid");
    var  onboarding = await AsyncStorage.getItem('save');
    var  startScreen = await AsyncStorage.getItem('start');
    if (checkUid != null && onboarding === "true" && startScreen === "true"){
      router.push("home");
    } 
    else  router.push("screens")
  }
  useFocusEffect(
    useCallback(() => {
      checkID();
    }, [])
  );
  return (
    <View style={styles.container}>
      <ActivityIndicator size={40} color={"black"} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Checkuser;
