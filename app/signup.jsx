import { View, Text, StyleSheet, TextInput, Modal } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import { auth } from "./firebase.config/firebase";
import Toast from "react-native-toast-message";
import { Image, ImageBackground } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { StatusBar } from "expo-status-bar";
import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const handleSignup = () => {
    if (email != "" && password != "") {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const uid = userCredential.user.uid;
          console.log("signup -> uid", uid);
          var saveUId = await AsyncStorage.setItem("uid", uid);
          console.log("🚀saveUId:from signup ", saveUId);
          setLoading(false);
          setEmail("");
          setPassword("");
          router.push("main");
        })
        .catch((error) => {
          alert(error.message);
          setLoading(false);
        });
    } else {
      Toast.show({
        type: "error",
        text1: "Something went wrong!",
        text2: "Please fill all the fields",
      });
    }
  };
  // const uploadCamera = () => {
    
  // }
  return (
    <View style={styles.container}>
      <StatusBar style="black" />
      <View style={styles.textView}>
        <Text style={styles.text}>Create an</Text>
        <Text style={styles.text}>account</Text>
        <Toast />
      </View>

      <View style={styles.main}>
        <View>
          <Image style={styles.img}  source={{uri: 'https://i.sstatic.net/l60Hf.png'}}/>
        <View >
          <TouchableOpacity onPress={()=> setIsModal(true)}>
          <Image style={styles.imgcamera}  source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRIFfsz_8k7frSoR7trMed_Fdzh_PRH6u7hQ&s'}}/>
          </TouchableOpacity>
        </View>
        </View>
        <View style={styles.Innerbox}>
          <AntDesign name="mail" size={32} color="black" />
          <TextInput
            placeholder="Enter email"
            style={styles.input1}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.Innerbox}>
          <Feather name="unlock" size={30} color="black" />
          <TextInput
            placeholder="Enter password"
            style={styles.input1}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity onPress={handleSignup} style={styles.btn}>
          {loading ? (
            <ActivityIndicator size={40} color={"white"} />
          ) : (
            <Text style={styles.innerBtn}>Create account</Text>
          )}
        </TouchableOpacity>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>or continue with</Text>
        <TouchableOpacity>
          <Image
            source={require("../assets/google.png")}
            style={{ height: hp("7%"), width: wp("13%") }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 15 }}>
          Already have an account
          <Text
            style={{ color: "#2e7dab" }}
            onPress={() => router.push("login")}
          >
            Login
          </Text>
        </Text>
        <Modal visible={isModal}>
          <View style={styles.Modalcontainer}>
          <View style={styles.btnBox} >
            <TouchableOpacity style={styles.buttons}  activeOpacity={0.7}>
              <FontAwesome6 size={22} name="camera" color="white" />
              <Text style={styles.btnText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}  activeOpacity={0.7}>
              <AntDesign size={22} name="folderopen" color="white" />
              <Text style={styles.btnText}>Gallery</Text>
            </TouchableOpacity>
          </View>
          </View> 
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Modalcontainer:{
    height:hp("100%"),
    width:wp("100%"),
    backgroundColor:'lightgrey',
    justifyContent:'center',
  
  },
  buttons: {
    width: '40%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F83758',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 15,


  },
  btnBox: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
   justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    gap: 20,
  },
  btnText: {
    fontFamily: 'serif',
    color: 'white'

  },
  forgetContainer: {
    width: wp("80%"),
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  img:{
    height:hp("15%"),
    width:wp("30%"),
    borderRadius:100
  },
  innerBtn: {
    fontSize: 20,
    color: "white",
  },
  main: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 30,
  },
  input1: {
    height: hp("6%"),
    width: wp("72%"),
    fontSize: 20,
    marginLeft: 4,
  },
  input: {
    height: hp("7%"),
    width: wp("80%"),
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    fontSize: 17,
    color: "black",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
    marginTop: 5,
    marginLeft: 20,
    fontFamily: "serif",
  },
  textView: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  imgcamera:{
    height:hp("5%"),
    width:wp("10%"),
    position:'absolute',
    bottom:0,
    right:0,
    borderRadius:100
  },
  btn: {
    height: hp("7%"),
    width: wp("80%"),
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#F83758",
    justifyContent: "center",
    alignItems: "center",
  },
  forget: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    marginTop: 5,
    marginLeft: 20,
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
    gap:5
  },
});
export default Signup;
