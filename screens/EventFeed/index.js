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

export default function EventFeed({ navigation, route }) {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://172.20.10.2:8080/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.searchInputContainer}>
          <AntDesign name="search1" size={27} color="black" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Events"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate(Routes.ADDEVENT)}>
          <Image
            source={require("../../../assets/plus1.png")}
            style={styles.headerImage}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.eventContainer}>
            <Text style={styles.itemText}>Event: {item.name}</Text>
            <Text style={styles.subText}>Place: {item.place}</Text>
            <Text style={styles.subText}>Date: {item.date}</Text>
            <Text style={styles.subText}>Time: {item.time}</Text>
          </View>
        )}
      />
      <Pressable
        onPress={() => navigation.navigate(Routes.HOME)}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  eventContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    margin: 10,
    marginHorizontal: 15,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 6,
  },
  subText: {
    fontSize: 16,
    color: "#555",
    marginVertical: 4,
  },
  itemText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#1A3C54",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 8,
    marginLeft: "3%",
    width: 295,
  },
  searchInput: {
    flex: 1, // Take remaining space
    height: 30,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
  },
  headerImage: {
    width: 55,
    height: 55,
    marginRight: "2%",
    borderColor: "#1A3C54",
  },
  addButton: {
    width: 200,
    backgroundColor: "#1A3C54",
    borderRadius: 6,
    padding: 15,
    marginHorizontal: 115,
    marginTop: 850,
    position: "absolute",
    alignItems: "center",
  },
  addButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
