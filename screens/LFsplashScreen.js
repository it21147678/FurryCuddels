import React from 'react';
import {
        View,
        Image,
        Text,
        StyleSheet,
        TouchableOpacity
    } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LFsplashScreen = () => {

    const navigation = useNavigation();

    return (

        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("LostAndFound")}>
                {/* ----------------------------------------------------------------------------------------------------------------------------- */}
                <Image
                    source={require('../assets/1558.png_860.png')} // Replace with your image source
                    style={styles.image}
                />

                <Text style={styles.text1}>Lost & Found</Text>
                <Text style={styles.text2}>Corner</Text>

                <Image
                    source={require('../assets/LFlogo.png')} // Replace with your image source
                    style={styles.imagelogo}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 270,
        height: 270,
        resizeMode: 'cover',
        alignSelf: 'center',
        borderRadius: 70,
    },
    imagelogo: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        alignSelf: 'center',
        borderRadius: 70,
        marginTop: 20
    },
    text1: {
        marginTop: 90,
        fontSize: 44,
        fontWeight: 'bold',
    },
    text2: {
        marginTop: 10,
        fontSize: 28,
        fontWeight: 'bold',
        alignSelf: 'center', marginBottom: 30
    },
});

export default LFsplashScreen;
