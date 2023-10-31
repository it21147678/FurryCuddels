//Navigation.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Allvetenarian from './screens/AllVetenarian/Allvetenarian';
import AppoinmentBook from './screens/AppointmentBook/AppointmentBook';
import Congratbook from './screens/BookingSucces/Congratbook';
import Locationmap from './screens/Location/Locationmap';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
   <NavigationContainer>
      <Stack.Navigator initialRouteName="allvetenarian">
        <Stack.Screen name="allvetenarian" component={Allvetenarian} />
        <Stack.Screen name="appointmentBook" component={AppoinmentBook} />
        <Stack.Screen name="locationmap" component={Locationmap} />
        <Stack.Screen name="congratbook" component={Congratbook} />
        
      </Stack.Navigator>
   </NavigationContainer>
  );
}
