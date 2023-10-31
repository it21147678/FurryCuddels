import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function AppointmentBook() {
  const navigation = useNavigation();
  const route = useRoute();
  const veterinarianName = route.params.veterinarianName;
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );
  

  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [startedDate, setStartedDate] = useState("12/12/2023");

  const times = ["12:30 pm", "01:00 pm", "01:30 pm", "02:00 pm", "02:30 pm", "03:00 pm","03.30 pm","04.00 pm","04.30 pm","05.00 pm","05.30 pm"];   
  const [selectedTime, setSelectedTime] = useState(null);
  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  };

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };
  
  const handleSubmitButtonClick = async () => {
    if (selectedStartDate && selectedTime) {
      try {
        // Create an object with the appointment details
        const appointmentData = {
          veterinarianName,
          selectedStartDate,
          selectedTime,
        };
  
        // Get existing appointments (if any) from storage
        const existingAppointments = await AsyncStorage.getItem('appointments');
        const parsedAppointments = existingAppointments ? JSON.parse(existingAppointments) : [];
  
        // Add the new appointment to the list
        parsedAppointments.push(appointmentData);
  
        // Save the updated list back to storage
        await AsyncStorage.setItem('appointments', JSON.stringify(parsedAppointments));
  
        navigation.navigate("congratbook");
      } catch (error) {
        console.error('Error saving appointment:', error);
      }
    } else {
      alert("Please select a Date and Time slot before proceeding.");
    }
  };
  return (
    <SafeAreaView style={styles.safe}>      
        <View style={{alignItems: "center" }}>
        <Image source={require('../../assets/images/veterinarian.png')} style={styles.image} />
        {/* <Text style={{ fontSize: 18, fontWeight:'bold' }}>{veterinarianName}</Text> */}
          <View style={{ width: "100%", paddingHorizontal: '6%', marginTop: '9%' }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight:'bold', }}>Select Date</Text>
              <TouchableOpacity
                style={styles.inputBtn}
                onPress={handleOnPressStartDate}
              >
                <Text style={{ alignSelf: "center",fontSize:20 }}>{selectedStartDate}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.textSubHeader}>Available Time Slots</Text>
            </View>

            <View style={styles.container}>
              <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.cardContainer}
              >
                  {times.map((time, index) => (
                      <View key={index} style={styles.card} onTouchEnd={() => handleTimeSelection(time)}>
                          <Text style={styles.timeText}>{time}</Text>
                      </View>
                  ))}
              </ScrollView>
              {selectedTime && (
                  <Text style={styles.selectedTimeText}>
                    Selected Time Slot:{"  "}
                    <Text style={{ fontWeight: "bold",fontSize:22,color:'#1A3C54' }}>{selectedTime}</Text>
                  </Text>
              )}
          </View>
          
            <TouchableOpacity
              onPress={handleSubmitButtonClick}
              style={styles.submitBtn}
            >
              <Text style={{ fontSize: 18, color: "white",height:30, }}>
                Set Appointment with{"  "}
                <Text style={{ fontWeight: "bold",fontSize:22, }}>{veterinarianName}</Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Create modal for date picker */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={openStartDatePicker}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="calendar"
                  minimumDate={startDate}
                  selected={startedDate}
                  onDateChanged={handleChangeStartDate}
                  onSelectedChange={(date) => setSelectedStartDate(date)}
                  options={{
                    backgroundColor: "#080516",
                    textHeaderColor: "#469ab6",
                    textDefaultColor: "#FFFFFF",
                    selectedTextColor: "#FFF",
                    mainColor: "#469ab6",
                    textSecondaryColor: "#FFFFFF",
                    borderColor: "rgba(122, 146, 165, 0.1)",
                  }}
                />

                <TouchableOpacity onPress={handleOnPressStartDate}>
                  <Text style={{ color: "white" }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          
        </View>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // safe:{
  //   marginTop:'-1%',
  // },
  textHeader: {
    fontSize: 30,
    marginTop: '14%',
    color: "#111",
    fontFamily: 'Helvetica',
    fontWeight: '600',
  },
  textSubHeader: {
    fontSize: 25,
    color: "#111",
    fontFamily: 'Helvetica',
    fontWeight: '500',
    marginTop: '13%'
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#222",
    height: 50,
    width:350,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "center",
    alignSelf:'center',
    marginTop: '6%',
    paddingHorizontal:10,
  },
  submitBtn: {
    backgroundColor: "#1A3C54",
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    paddingVertical: 12,
    marginVertical: 6,
    marginTop:'13.3%',
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#080516",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {        
      justifyContent: 'center',
      marginTop:'8%'
    },
    cardContainer: {
      flexDirection: 'row',
    },
    card: {
      width: 100, // Adjust the card width as needed
      height: 100,
      backgroundColor: 'lightgray',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 10, // Adjust the margin as needed
      borderRadius: 10,    
    },
    timeText: {
      fontSize: 21,
    },
    image: {
      marginTop:'-8%',
      //marginLeft:'28%',
      width:'58%',
      height: '33%',
      alignSelf:'center',
    },
    selectedTimeText:{
      marginTop:'8%',
      fontWeight:'bold',
      fontSize: 18,
    },
});