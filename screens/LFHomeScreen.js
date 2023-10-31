// HomeScreen.js
import React, { useState, useEffect, Button } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    FlatList,
    ScrollView

} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    // --------------------------------
    const [inputDetailList, setInputDetailList] = useState([]);

    const [searchText, setSearchText] = useState('');

    const [refreshKey, setRefreshKey] = useState(0); // Add refreshKey state

    // Load the data from AsyncStorage
    useEffect(() => {
        AsyncStorage.getItem('inputDetailList')
            .then((data) => {
                if (data) {
                    setInputDetailList(JSON.parse(data));
                }
            })
            .catch((error) => {
                console.error('Error loading data:', error);
            });
    }, []);

    const renderPets = ({ item, index }) => {
        return (
            <View
                style={{
                    backgroundColor: "#D9D9D9",
                    borderRadius: 16,
                    paddingVertical: 6, paddingTop: 15,
                    paddingHorizontal: 12,
                    marginBottom: 12,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    flexDirection: "row", // Make it a row
                    alignItems: "center", // Center items vertically

                }}>
                {/* Add an image */}
                <Image
                    source={require('../assets/dog1.png')}
                    style={{ width: 90, height: 90, marginRight: 10, borderRadius: 10 }}
                />
                <View>
                    <Text style={styles.cardstyle}>Breed: {item.Breed}</Text>
                    <Text style={styles.cardstyle}>Area: {item.Area}</Text>
                    <Text style={styles.cardstyle}>Date: {item.Date}</Text>
                    <Text style={styles.cardstyle}>Contact: {item.Contact}</Text>
                </View>

                {/* <Text style={styles.cardstyle}>Breed : {item.Breed}</Text>
                <Text style={styles.cardstyle}>Area : {item.Area}</Text>
                <Text style={styles.cardstyle}>Date : {item.Date}</Text>
                <Text style={styles.cardstyle}>Contact : {item.Contact}</Text> */}

                {/* <Text style={styles.cardstyle}>Identification : {item.Identification}</Text>
                <Text style={styles.cardstyle}>Reward : $ {item.Reward}</Text> */}
                {/*------------------------------------------------------*/}

                <View key={item.id} style={{ flexDirection: "column", position: "absolute", right: 10, bottom: 10 }}>
                    <Text style={{ flex: 1 }}></Text>

                    <TouchableOpacity
                        style={{
                            backgroundColor: "#1A3C54",
                            borderRadius: 10,
                            paddingVertical: 10,
                            marginVertical: 10,
                            alignItems: "center",
                            height: 40,
                            width: 80
                        }}
                        // {/*------------------------------------------------------*/}
                        onPress={() => handleSeeMore(item)}
                    >
                        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>See more</Text>
                    </TouchableOpacity>



                </View>



            </View>
        )
    }
    {/*------------------------------------------------------*/ }
    // Function to navigate to the item details screen
    const handleSeeMore = (item) => {
        navigation.navigate('ItemDetails', { item });
        // -----------------------------------------------------------------------------------------------------------------------------------
    };
    {/*------------------------------------------------------*/ }

    // Function to filter the list by Breed
    const filterListByBreed = (list, searchText) => {
        return list.filter((item) => item.Breed.toLowerCase().includes(searchText.toLowerCase()));
    };

    // Use useEffect to refresh the FlatList every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            // Update the refreshKey to trigger a re-render
            setRefreshKey((prevKey) => prevKey + 1);
        }, 10000); // 10000 milliseconds = 10 seconds

        return () => clearInterval(interval);
    }, []); // Empty dependency array to run the effect only once

    //---------------------------------



    return (
        
        <View style={{ marginTop: "10%", flex: 1 }}>

            <View style={{ marginHorizontal: 16, flex: 1 }}
                contentContainerStyle={{ flexGrow: 1, paddingRight: 1 }}>



                <Text style={{ marginTop: 16, fontWeight: "800", fontSize: 20, marginLeft: "32%" }}>LOST & FOUND</Text>

                {/* Search Bar */}
                <TextInput
                    style={{
                        borderWidth: 2,
                        borderColor: "#1A3C54",
                        borderRadius: 9,
                        // borderRadius: 14,
                        paddingVertical: 6,
                        paddingHorizontal: 16,
                        marginTop: 20, marginBottom: 20,
                        height: "7%"
                    }}
                    placeholder="Search by Breed"
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />

                <View key={refreshKey}>
                    <FlatList data={filterListByBreed(inputDetailList, searchText)} renderItem={renderPets} />
                </View>

                


            </View>
            
            <View style={{ marginHorizontal: 12, position: 'absolute', bottom: 50, left: 0, right: 0, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        style={{
                            width: '48.5%', // Takes up 48.5% of the parent container
                            backgroundColor: "#1A3C54",
                            borderRadius: 14,
                            paddingVertical: 10,
                            alignItems: "center",
                        }}
                        onPress={() => {

                            navigation.navigate("home");
                            // -----------------------------------------------------------------------------------------------------------------------
                        }}
                    >
                        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 19 }}>Back to Main</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            width: '48.5%', // Takes up 48.5% of the parent container
                            backgroundColor: "#1A3C54",
                            borderRadius: 14,
                            paddingVertical: 10,
                            alignItems: "center",
                        }}
                        onPress={() => {

                            navigation.navigate("LostAndFound");
                            // --------------------------------------------------------------------------------------------------------------------------
                        }}
                    >
                        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 19 }}>Add New Notice</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>


    )
}


export default HomeScreen;

const styles = StyleSheet.create({
    cardstyle: {
        color: "#000",
        fontWeight: "700"
    },
    inputfeildstyle: {
        borderWidth: 2,
        borderColor: "#1e90ff",
        borderRadius: 9,
        // borderRadius: 14,
        paddingVertical: 6,
        paddingHorizontal: 16,
        marginTop: 20,
        // height:"6%"
    },
    submitbtnstyle: {
        marginTop: 39,
        backgroundColor: "#1A3C54",
        borderRadius: 14,
        paddingVertical: 10,
        marginVertical: 24,
        alignItems: "center",
        // height:"6%",justifyContent:"center"
    }
})

