// ItemDetailsScreen.js
import React from 'react';
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,

} from 'react-native';

import { useNavigation } from '@react-navigation/native';

const ItemDetailsScreen = ({ route }) => {

    const { item } = route.params; // Get the item details from the navigation route
    const navigation = useNavigation();

    return (
        <View style={{ marginTop: "10%", flex: 1 }}>
            <Text style={{ marginTop: 16, fontWeight: "800", fontSize: 20, marginLeft: "32%" }}>LOST & FOUND</Text>

            <View style={styles.externalViewCardStyle}>
                <View>

                    {/* Insert image here */}
                    <Image
                        source={require('../assets/dog.png')}
                        style={styles.itemImage}
                    />

                    <Text style={styles.styletext1}>Details about the Pet :</Text>
                    <Text style={styles.styletext2}>Disclaimer : All the Details are up to date.</Text>
                </View>

                <View style={styles.internalViewCard}>
                    <Text style={{ marginTop: -70 }}></Text>

                    <Text style={styles.Detailedcardstyle}>Area:   {item.Area}</Text>
                    <Text style={styles.Detailedcardstyle}>Date:   {item.Date}</Text>
                    <Text style={styles.Detailedcardstyle}>Contact:   {item.Contact}</Text>
                    <Text style={styles.Detailedcardstyle}>Breed:   {item.Breed}</Text>
                    <Text style={styles.Detailedcardstyle}>Identification:   {item.Identification}</Text>
                    <Text style={styles.Detailedcardstyle}>Reward:   Rs: {item.Reward}</Text>

                </View>
            </View>
            <View style={{ marginHorizontal: 16, position: 'absolute', bottom: 65, left: 0, right: 0, alignItems: 'center' }}>
                <TouchableOpacity
                    style={styles.gobackbutton}
                    onPress={() => navigation.navigate("LFHome")}
                >
                    {/* ------------------------------------------------------------------------------------------------------------------------ */}
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>Go Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ItemDetailsScreen

const styles = StyleSheet.create({
    Detailedcardstyle: {
        marginHorizontal: 16,
        // marginVertical: 10,
        fontWeight: "bold", marginTop: 10
    },
    Detailedcardstyle1: {
        marginHorizontal: 67,
        // marginVertical: 10,
        marginTop: 2,
        fontWeight: "600"
    },

    externalViewCardStyle: {
        // backgroundColor: "red",
        backgroundColor: "#fff",
        height: "75%",
        marginHorizontal: 16,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2, marginTop: 25,
        justifyContent: "center"

    },

    internalViewCard: {
        //backgroundColor: "blue",
        backgroundColor: "#fff",
        height: "30%",
        marginHorizontal: 16,
        borderRadius: 10

    },
    itemImage: {
        // flex: 1,
        marginHorizontal: 20, marginTop: 20,
        width: "63%",
        height: "55%",
        borderRadius: 10,
        marginLeft: "19%",
        marginTop: "10%", paddingTop: 10
    },
    styletext1: {
        marginTop: 16,
        fontWeight: "700",
        fontSize: 15,
        marginLeft: "3%"
    },
    styletext2: {
        marginTop: 16,
        fontWeight: "400",
        fontSize: 11,
        marginLeft: "20%"
    },
    gobackbutton: {
        width: '100%', // Width set to 100% of the parent container
        backgroundColor: "#1A3C54",
        borderRadius: 14,
        paddingVertical: 10,
        alignItems: "center",
        height: "120%"
    }
})

ItemDetailsScreen