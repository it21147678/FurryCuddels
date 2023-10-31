import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

    const bookvetbtnclick = () => {
        navigation.navigate('allvetenarian');
      };
    // const socialbtnclick = () => {
    //     navigation.navigate('locationmap');
    //   };
    const lostfoundbtnclick = () => {
        navigation.navigate('LFsplash');
      };
   

  return (
    <View style={styles.container}  >
      <TouchableOpacity style={styles.touchableOpacity} onPress={bookvetbtnclick}>
        <Image source={require('../../assets/vetbut.png')} style={styles.image} />        
      </TouchableOpacity>

      <TouchableOpacity style={styles.touchableOpacity}>
        <Image source={require('../../assets/sociale.png')} style={styles.image} />      
      </TouchableOpacity>

      <TouchableOpacity style={styles.touchableOpacity}  onPress={lostfoundbtnclick}>
        <Image source={require('../../assets/lostf.png')} style={styles.image} />        
      </TouchableOpacity>

      {/* <Image source={require('../../assets/dogpack.jpg')} style={{ width: 400, height: 350, marginRight: 10, borderRadius: 10 }} />  */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#ffffff',
  },
  touchableOpacity: {
    alignItems: 'center',
    marginBottom: 40,
  },
  image: {
    width: 400,
    height: 100,
    borderRadius: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
