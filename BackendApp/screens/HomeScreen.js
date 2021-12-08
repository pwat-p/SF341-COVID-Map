import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Input, Text } from 'react-native-elements'
import { firebase, db } from '../firebase';

const HomeScreen = ({ navigation }) => {
    const [ fullname, setFullname ] = useState('')
    const [ age, setAge ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ date, setDate ] = useState('')
    const [ month, setMonth ] = useState('')
    const [ year, setYear ] = useState(new Date().getFullYear())
    const [ hour, setHour ] = useState('')
    const [ minute, setMinute ] = useState('')
    const [ eDate, setEDate ] = useState('')
    const [ eMonth, setEMonth ] = useState('')
    const [ eYear, setEYear ] = useState(new Date().getFullYear())
    const [ eHour, setEHour ] = useState('')
    const [ eMinute, setEMinute ] = useState('')
    const [ latitude, setLatitude] = useState('')
    const [ longitude, setLongitude ] = useState('')

    const insert = () => {
      setDescription('')
      setHour('')
      setMinute('')
      setEHour('')
      setEMinute('')
      setLatitude('')
      setLongitude('')
      db.collection('patientsTimeline').add({
        name: fullname,
        age: age,
        description: description,
        timeStart: new Date(year,month-1,date,hour,minute),
        timeEnd: new Date(eYear,eMonth-1,eDate,eHour,eMinute),
        location: new firebase.firestore.GeoPoint(latitude,longitude)
      })
    }

    return (
      <View style={styles.container}>
        <Text h1 style={{marginBottom: 50}}>
          Insert Data
        </Text>

        <View style={styles.inputContainer}>
          <Input 
            placeholder='Full Name'
            type='text'
            value={fullname}
            onChangeText={(text) => setFullname(text)}
          />
          <Input 
            placeholder='Age'
            type='text'
            value={age}
            onChangeText={(text) => setAge(text)}
          />
          <View style={{ height: 50 }} />
          <Input 
            placeholder='Description'
            type='text'
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <View style={styles.shortInputContainer}>
            <Text style={{fontSize: 15, marginLeft: -30,}}>Start</Text>
            <Input 
              placeholder='dd'
              type='text'
              value={date}
              onChangeText={(text) => {
                setDate(text)
                setEDate(text)
            }}
            /><Text style={{fontSize: 20, marginTop: 5}}>/</Text>
            <Input 
              placeholder='mm'
              type='text'
              value={month}
              onChangeText={(text) => {
                setMonth(text)
                setEMonth(text)
              }}
            /><Text style={{fontSize: 20, marginTop: 5}}>/</Text>
            <Input 
              placeholder='yyyy'
              type='text'
              value={year}
              onChangeText={(text) => {
                setYear(text)
                setEYear(text)
              }}
            /><Text style={{ marginLeft: 5}}></Text>
            <Input 
              placeholder='00'
              type='text'
              value={hour}
              onChangeText={(text) => setHour(text)}
            /><Text style={{fontSize: 20, marginTop: 5}}>:</Text>
            <Input 
              placeholder='00'
              type='text'
              value={minute}
              onChangeText={(text) => setMinute(text)}
            />
          </View>

          <View style={styles.shortInputContainer}>
            <Text style={{fontSize: 15, marginLeft: -25,}}>End</Text>
            <Input 
              placeholder='dd'
              type='text'
              value={eDate}
              onChangeText={(text) => setEDate(text)}
            /><Text style={{fontSize: 20, marginTop: 5}}>/</Text>
            <Input 
              placeholder='mm'
              type='text'
              value={eMonth}
              onChangeText={(text) => setEMonth(text)}
            /><Text style={{fontSize: 20, marginTop: 5}}>/</Text>
            <Input 
              placeholder='yyyy'
              type='text'
              value={eYear}
              onChangeText={(text) => setEYear(text)}
            /><Text style={{ marginLeft: 5}}></Text>
            <Input 
              placeholder='00'
              type='text'
              value={eHour}
              onChangeText={(text) => setEHour(text)}
            /><Text style={{fontSize: 20, marginTop: 5}}>:</Text>
            <Input 
              placeholder='00'
              type='text'
              value={eMinute}
              onChangeText={(text) => setEMinute(text)}
            />
          </View>
          <View style={{width:150, flex:1, flexDirection: 'row'}}>
            <Text style={{fontSize: 20, marginLeft: -75}}>Location</Text>
            <Input
                placeholder='Latitude'
                type='text'
                value={latitude}
                onChangeText={(text) => setLatitude(text)}
              />
              <Input
                placeholder='Longitude'
                type='text'
                value={longitude}
                onChangeText={(text) => setLongitude(text)}
              />
          </View>
        </View>

        <Button
          containerStyle={styles.button}
          onPress={insert}
          title='Insert'
          raised
        />

      </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ddd',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      width: 200,
      marginTop: 10,
    },
    inputContainer: {
      width: 300
    },
    shortInputContainer: {
      flex:1,
      flexDirection: 'row',
      width: 55,
      
    },
})