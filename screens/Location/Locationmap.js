import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

export default function Locationmap() {
  const [userLocation, setUserLocation] = useState(null);
  const [locations, setLocations] = useState([
    {id: 1,name: 'True Care Vet Hospital Kaduwela-Dr.Udaya',latitude: 6.929479999252805,longitude: 79.98312359555469,},
    {id: 2,name: 'Dr.Ben',latitude: 6.920518700394477,longitude: 79.84690013344319,},
    {id: 3,name: 'Pets RX Centre - Dr.Kumari',latitude: 6.901151210364253,longitude: 79.89520533158796,},
    {id: 4,name: 'Pet Care Animal Clinic and Surgery - Dr.Jagath',latitude: 6.883309574676383,longitude: 79.90054626061654,},
    {id: 5,name: 'Animal Clinic & Surgery - Dr.S.Gallage',latitude: 6.9149081572229045,longitude: 79.89419488532492,},
    {id: 6,name: 'Pet Care - Dr.Sanath',latitude: 6.9314544415591675,longitude: 79.83985361983855,},
    {id: 7,name: 'Pet Hospital - Dr.Puujitha',latitude: 6.91059005450067, longitude: 79.97209168739423,},
    {id: 8,name: 'Pet Channel Animal Clinic - Dr.Laal',latitude: 6.909902252526256,longitude: 79.94229555039666,},
    {id: 9,name: 'Dr Percy Vet',latitude: 6.919273294004447,longitude: 79.91708510393053,},
    {id: 10,name: 'Waliwita Pet Care - Dr.Saumya',latitude:6.915699462627994,longitude: 79.96977413623549,},
    {id: 11,name: 'Vet Line Animal Clinic - Dr.Sathush',latitude: 6.907910030272947,longitude: 79.96613283999318,},
    {id: 12,name: 'Pet Zone Animal Hospital - Dr.Wickramasinghe',latitude: 6.918999690603114,longitude: 79.97428848990921,},
    {id: 13,name: 'High Care - Dr.Jayawardhana',latitude: 6.91916706070748,longitude: 79.9671832903355,},
  ]);
  const [closestLocation, setClosestLocation] = useState(null);

  useEffect(() => {
    // Fetch the user's current location
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    })();
  }, []);

  useEffect(() => {
    // Calculate the distances and find the closest location
    if (userLocation && locations) {
      let closest = null;
      let minDistance = Number.MAX_VALUE;
      for (const location of locations) {
        const distance = haversineDistance(
          userLocation.latitude,
          userLocation.longitude,
          location.latitude,
          location.longitude
        );
        if (distance < minDistance) {
          closest = location;
          minDistance = distance;
        }
      }
      setClosestLocation(closest);
    }
  }, [userLocation, locations]);

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="You are here!"
          />

          
          {locations.map((location) => (
            <Marker
              key={location.id}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={location.name}
              pinColor={
                closestLocation && location.id === closestLocation.id
                  ? 'green' 
                  : 'orange' 
              }
            />
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});