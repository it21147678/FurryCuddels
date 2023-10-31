import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Text,
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const LFsuccess = () => {

    const navigation = useNavigation();

    return (

        <View style={{ marginTop: "10%", flex: 1 }}>
            
            
            
                <View>
                    {/* Insert image here */}
                    <Image
                        source={require('../assets/LFsuccess.png')} 
                        style={styles.itemImage}
                    />
                </View>
                
           
            <View style={{ marginHorizontal: 16, position: 'absolute', bottom: 65, left: 0, right: 0, alignItems: 'center' }}>
                <TouchableOpacity
                    style={{
                        width: '100%', // Width set to 100% of the parent container
                        backgroundColor: "#1A3C54",
                        borderRadius: 14,
                        paddingVertical: 10,
                        alignItems: "center",
                        height: "120%"
                    }}
                    onPress={() => navigation.navigate("LFHome")}
                    // ----------------------------------------------------------------------------------------------------------------------------------------------------
                >
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LFsuccess

const styles = StyleSheet.create({
    

    itemImage: {
        // flex: 1,
        marginHorizontal: 20,
        marginTop:20,
        width: "75%",
        height: "75%",
        borderRadius:15,
        alignItems:"center",
        justifyContent:"center",
        marginTop:"10%",
        paddingTop:10,
        left: 30,
        top:25
    },
});