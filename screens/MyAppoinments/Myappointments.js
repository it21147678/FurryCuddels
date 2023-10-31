import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';




const Myappointments = () => {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  useEffect(() => {
    async function getAppointments() {
      try {
        const existingAppointments = await AsyncStorage.getItem('appointments');
        if (existingAppointments) {
          const parsedAppointments = JSON.parse(existingAppointments);
          setAppointments(parsedAppointments);
        }
      } catch (error) {
        console.error('Error retrieving appointments:', error);
      }
    }

    getAppointments();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDeleteAppointment = () => {
    
    const updatedAppointments = appointments.filter(
      (item) => item !== appointmentToDelete
    );
    
    AsyncStorage.setItem('appointments', JSON.stringify(updatedAppointments))
      .then(() => {
        setAppointments(updatedAppointments);
        toggleModal();
      })
      .catch((error) => {
        console.error('Error deleting appointment:', error);
        toggleModal();
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
      <FlatList
        data={appointments}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.veterinarianName}</Text>
            <View style={{ flexDirection:'row', marginTop:37,alignSelf:'center',alignContent:'space-between',marginHorizontal:-120,}}>
                <Text style={styles.description}>Date: {item.selectedStartDate}{"  "}</Text>
                <Text style={styles.description}>{"  "}Time: {item.selectedTime}</Text>
            </View>
            <Button
              icon={<Icon name="delete" color="white" />}
              title=""
              buttonStyle={styles.deleteButton}
              onPress={() => {
                setAppointmentToDelete(item);
                toggleModal();
              }}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

     
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Confirm Appointment Cancel ?</Text>
          <View style={styles.yesno}>
            <Button
                title="Yes"
                buttonStyle={styles.yesButton}
                onPress={handleDeleteAppointment}
            />
            <Button
                title="No"
                buttonStyle={styles.noButton}
                onPress={toggleModal}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    marginTop:'12%'
  },
  card: {
    marginTop:'1.2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    padding: 16,
    height:90,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    color: '#1A3C54',
  },
  deleteButton: {
    backgroundColor: '#1A3C54',
    //marginRight:25,
    borderRadius:50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    // alignItems: 'center',    
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight:'bold',
  },
  yesno:{
    flexDirection:'row',
    justifyContent:'space-between',  
  },
  yesButton: {
    backgroundColor: 'red',
    marginLeft:'25%',
    borderRadius:15,
    
  },
  noButton: {
    backgroundColor: '#1A3C54',
    marginRight:'25%',
    borderRadius:15,
  },
});

export default Myappointments;
