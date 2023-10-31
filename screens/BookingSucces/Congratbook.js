import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Congratbook() {
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.navigate('allvetenarian');    
  };

  return (
    
      <View style={styles.container}>
        
        <Image source={require('../../assets/congratB.png')} style={styles.image} />          
        <TouchableOpacity onPress={handleBackPress} style={styles.button}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      
    </View>
  );
}



const styles = StyleSheet.create({

  container:{
    marginTop:'20%',   
    },
 
  image: {
    width: '87%', 
    height: '70%',     
    alignSelf:'center',
    // marginTop:'10%',
    paddingBottom:10,
  },
  
  button: {
    backgroundColor: '#1A3C54',
    marginTop:100,
    borderRadius: 25,
    width: 350, 
    height: 70,
    alignSelf:'center',
    justifyContent:'center' 
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf:'center',
    fontFamily: 'Helvetica',
  },
});
