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
} from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Routes } from "@calendar/navigation";

export default function AddEvent({ navigation, route }) {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleEvent = () => {
    const event = {
      name: name,
      place: place,
      date: date,
      time: time,
    };

    // send a POST  request to the backend API to register the user
    axios
      .post("http://172.20.10.2:8080/events", event)
      .then((response) => {
        console.log(response);
        Alert.alert("Event Added");
        setName("");
        setPlace("");
        setDate("");
        setTime("");
        navigation.replace(Routes.EVENTFEED);
      })
      .catch((error) => {
        Alert.alert("Insertion Error", "An error occurred while Inserting");
        console.log("event inserting failed", error);
      });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
      }}
    >
      <ScrollView>
        <KeyboardAvoidingView>
          <View style={{ marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <Ionicons
                style={{ marginLeft: 8 }}
                name="ios-person"
                size={24}
                color="gray"
              />
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: name ? 16 : 16,
                }}
                placeholder="enter Event Name"
              />
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <Ionicons
                style={{ marginLeft: 8 }}
                name="location"
                size={24}
                color="gray"
              />
              <TextInput
                value={place}
                onChangeText={(text) => setPlace(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: place ? 16 : 16,
                }}
                placeholder="Place"
              />
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <Ionicons
                style={{ marginLeft: 8 }}
                name="date"
                size={24}
                color="gray"
              />
              <TextInput
                value={date}
                onChangeText={(text) => setDate(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: date ? 16 : 16,
                }}
                placeholder=" Date"
              />
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <Ionicons
                style={{ marginLeft: 8 }}
                name="time"
                size={24}
                color="gray"
              />
              <TextInput
                value={time}
                onChangeText={(text) => setTime(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: time ? 16 : 16,
                }}
                placeholder="Time"
              />
            </View>
          </View>

          <View style={{ marginTop: 80 }} />
          <Pressable
            onPress={handleEvent}
            style={{
              width: 200,
              backgroundColor: "#1A3C54",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Add
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
