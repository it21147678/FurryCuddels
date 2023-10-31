//App.js
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AppoinmentBook from './screens/AppointmentBook/AppointmentBook';
import Congratbook from './screens/BookingSucces/Congratbook';
import Locationmap from './screens/Location/Locationmap';
import Allvetenarian from './screens/AllVetenarian/Allvetenarian';
import Myappointments from './screens/MyAppoinments/Myappointments';
import LFHomeScreen from './screens/LFHomeScreen';
import LostandFoundHome from './screens/LostandFoundHome';
import ItemDetailsScreen from './screens/ItemDetailsScreen';
import LFsplashScreen from './screens/LFsplashScreen';
import LFsuccess from './screens/LFsuccess';
import home from './screens/Home/home';
import Navigation from './Navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>  
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="home" component={home} options={{headerShown: false,}}/>
        <Stack.Screen name="allvetenarian" 
                      component={Allvetenarian} 
                      options={{ headerShown: false, headerStyle: {height:15,}, headerTitleStyle: {fontSize: 20, }, 
                      }} />
                      
        <Stack.Screen name="Myappointments" 
                      component={Myappointments} 
                      options={{headerShown: false,}}/>

        <Stack.Screen name="appointmentBook" 
                      component={AppoinmentBook} 
                      options={{ title: 'Select date and time', headerStyle: {height:115,}, headerTitleStyle: {fontSize: 20, },
                      }} />

        <Stack.Screen name="locationmap" 
                      component={Locationmap} 
                      options={{ title: 'Veterinarian Locations', headerStyle: {height:115,}, headerTitleStyle: {fontSize: 20, },
                      }}/>

        <Stack.Screen name="congratbook" 
                      component={Congratbook} 
                      options={{headerShown: false,
                      }}/>
        <Stack.Screen name="LFsplash" component={LFsplashScreen} options={{headerShown: false,}}/>
        <Stack.Screen name="LostAndFound" component={LostandFoundHome} options={{headerShown: false,}}/>
        <Stack.Screen name="LFHome" component={LFHomeScreen} options={{headerShown: false,}}/>
        <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} options={{headerShown: false,}}/>
        <Stack.Screen name="LFsuccess" component={LFsuccess} options={{headerShown: false,}}/> 
      </Stack.Navigator>   
    </NavigationContainer>
  );
}