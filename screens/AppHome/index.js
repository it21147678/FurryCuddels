import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Alert,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Import the AntDesign component
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "@calendar/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AppHome({ navigation, route }) {
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    navigation.replace(Routes.LOGIN);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => navigation.navigate(Routes.EVENTFEED)}
      >
        <Image
          source={require("../../../assets/vetbut.png")}
          style={styles.image}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => navigation.navigate(Routes.EVENTFEED)}
      >
        <Image
          source={require("../../../assets/sociale.png")}
          style={styles.image}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => navigation.navigate(Routes.EVENTFEED)}
      >
        <Image
          source={require("../../../assets/lostf.png")}
          style={styles.image}
        />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
          width: 80,
        }}
      >
        <Pressable
          onPress={logout}
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  touchableOpacity: {
    alignItems: "center",
    marginBottom: 50,
  },
  image: {
    width: 400,
    height: 100,
    borderRadius: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});
