import React, { useEffect, useState } from 'react';
import MapView, { Circle, Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { db } from '../firebase';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const HomeScreen = ({ navigation }) => {
      const [ current, setCurrent ] = useState({
        latitude: 13.71485,
        longitude: 100.72971,
      })    
  
      const [ region, setRegion ] = useState({
            latitude: current.latitude,
            longitude: current.longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008
      })

      const [ area, setArea ] = useState([])

      const [ opacity, setOpacity ] = useState(0.8)

      function getNumberOfDays(start) {
        const date1 = start.toDate()
        const date2 = new Date()

        if (date1.getFullYear() == date2.getFullYear()) {
          return parseInt(Math.round(date2-date1)/(1000*60*60*24))
        } else {
          return 365
        }
      }

      useEffect (() => {
          const unsubscribe = db
          .collection('patientsTimeline')
          .onSnapshot(snapshot => (
            setArea(snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
        })))
    ))

    return unsubscribe
    }, [])

    return (
    <View>
      <View style={styles.searchBox}>
        <GooglePlacesAutocomplete
          placeholder="   Search here"
          fetchDetails={true}
          GooglePlacesSearchQuery={{
            rankby: "distance"
          }}
          onPress={(data, details = null) => {
            // console.log(data, details)
            setRegion({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            })
          }}
          query={{
            key: '',
            language: 'en',
            components: "country:th",
            types: "establishment",
            radius: 30000,
            location: `${region.latitude}, ${region.longitude}`
          }}
        />
      </View>
        <MapView 
          style={styles.map} 
          initialRegion={{
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
          }}
          region={{
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
          }}
          provider="google"
          showsCompass={false}       
        >
          {area.map(({id, data: { location, timeEnd }}) => (
              <Circle
              key={id}
                center={{
                  latitude: location.latitude,
                  longitude: location.longitude
                }}
                radius={300}
                strokeWidth={0}
                fillColor={ 
                  getNumberOfDays(timeEnd) <= 7 ? "rgba(255,5,5,0.4)":
                  getNumberOfDays(timeEnd) > 7 && getNumberOfDays(timeEnd) <= 14 ? "rgba(255,143,0,0.4)":
                  getNumberOfDays(timeEnd) > 14 && getNumberOfDays(timeEnd) <= 21 ? "rgba(255,246,0,0.4)": 
                  "rgba(0,0,0,0)"}
              />
            ))}

            <Marker
              coordinate={{ latitude: current.latitude, longitude: current.longitude }}
              pinColor={'green'}
            />
          </MapView>

          <TouchableOpacity
            style={styles.currentButton}
            onPress={() => {
              setRegion({
                latitude: current.latitude,
                longitude: current.longitude,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008
              })
            }}
          >
            <Image
              style={styles.image}
              source={require('../img/current-location-button.png')}
            />
          </TouchableOpacity>
        
    </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    searchBox: {
      zIndex: 1,
      position: 'absolute',
      alignSelf: 'center',
      width: '95%',
      marginTop: 30,
      borderRadius: 24,
      overflow: 'hidden',
    },
    currentButton: {
      zIndex: 0,
      borderRadius: 50,
      position: 'absolute',
      backgroundColor: 'white',
      width: 70,
      height: 70,
      bottom: '7%',
      right: 10,
    },
    image: {
      zIndex: 1,
      borderRadius: 50,
      position: 'absolute',
      width: 70,
      height: 70,
    }
})