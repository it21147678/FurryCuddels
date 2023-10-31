import React from 'react';
import { useState } from 'react';
import { View, Text, Image, Button, FlatList, StyleSheet, TextInput  } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const Allvetenarian = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleBookPress = (item) => {
    navigation.navigate('appointmentBook', { veterinarianName: item.title });
  };

  const handleAppoinmentButtonClick = () => {
    navigation.navigate('Myappointments');
  };

  const handleLocationButtonClick = () => {
    navigation.navigate('locationmap');
  };

    const filterData = (query) => {
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredData(data);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <TouchableOpacity style={styles.button} onPress={() => handleBookPress(item)}>
            <Text style={styles.buttonText}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.topic}>All Veterinarians</Text>
          <TouchableOpacity onPress={handleLocationButtonClick}>
            <Image
              source={require('../../assets/location.png')}
              style={styles.headerImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search by name"
            onChangeText={(text) => {setSearchQuery(text);filterData(text);}}
            value={searchQuery}
          />
          <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
        />

        <TouchableOpacity
          onPress={handleAppoinmentButtonClick}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonAppText}>My Appointments</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  headerImage: {
    width: 60, 
    height: 30,
    marginRight:'4%',
  },
  flatList: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    width: '100%',
    padding: 5,
  },
  topic: {
    textAlign: 'center',
    color: 'black',
    fontSize: 28,
    // fontFamily: 'Helvetica',
    fontWeight: '700',
    lineHeight: 28,
    marginVertical: 2,
    marginLeft:'4%', 
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    width: '35%',
    height: 35,
    backgroundColor: '#1A3C54',
    borderRadius: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
    paddingTop: '7%',
    fontWeight: '700',
  },
  buttonAppText:{
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
    
    fontWeight: '700',
  },
  buttonContainer: {
    backgroundColor: '#1A3C54',
    alignItems: 'center',
    padding: 10,
    height:40,
    marginVertical: 8,
    borderRadius: 8,
    width: '90%',
    // position:'absolute',
    // bottom:'1%',
    alignSelf:'center',
  },
  buttoncText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom:'34%',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
  },
  clearButton: {
    padding: 8,
    marginLeft: 8,
  },
  clearButtonText: {
    color: '#1A3C54',
    fontWeight:'bold',
  },
});

const data = [
  {
    id: '1',
    title: ' Dr.Udaya',
    description: 'Dr. Udaya is a dedicated animal lover, known for his unwavering commitment to healing and caring for pets of all shapes and sizes.',
    image: require('../../assets/images/udaya.jpg'),
  },
  {
    id: '2',
    title: 'Dr.Ben',
    description: ' With a heart full of compassion, Dr. Ben stands out for his tireless efforts in keeping pets healthy and bringing smiles to their owners faces.',
    image: require('../../assets/images/ben.jpg'),
  },
  {
    id: '3',
    title: 'Dr.Kumari',
    description: 'Dr. Kumari is a lifelong learner, always striving to expand her knowledge to provide the best veterinary care. Her dedication knows no bounds.',
    image: require('../../assets/images/Kumari.jpeg'),
  },
  {
    id: '4',
    title: 'Dr.Jagath',
    description: 'A guardian of public health, Dr. Jagath works diligently to protect not only pets but also the community from the threat of diseases.',
    image: require('../../assets/images/jagath.jpg'),
  },
  {
    id: '5',
    title: 'Dr.S.Gallage',
    description: ' Dr. Gallage is a compassionate listener, offering support and comfort to pet owners, making every visit to his clinic a reassuring experience.',
    image: require('../../assets/images/gallage.jpg'),
  },
  {
    id: '6',
    title: 'Dr.Sanath',
    description: 'Dr. Sanath is a community builder, fostering the human-animal bond and creating a warm and welcoming atmosphere in his clinic.',
    image: require('../../assets/images/sanath.jpg'),
  },
  {
    id: '7',
    title: 'Dr.Puujitha',
    description: 'Dr. Puujitha is an everyday hero, working tirelessly to ensure the well-being of animals and brightening the lives of countless families.',
    image: require('../../assets/images/puujitha.jpg'),
  },
];

export default Allvetenarian;
