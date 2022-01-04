import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView } from 'react-native';


  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  //console.log(SCREEN_WIDTH,"가로넓이");

  const API_KEY = "7854b9762ea3af9619e6a79a67b2cd17";

  export default function App() {
    const [city, setCity] = useState("Loading...")
    const [ok, setOk] = useState(true);
    const [days, setDays] = useState([]);


  
    const getWeather = async () => {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        setOk(false);
      }
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 5 });
      const location = await Location.reverseGeocodeAsync(
        { latitude, longitude },
        { useGoogleMaps: false }
      );
      setCity(location[0].city)
      
      //api
      const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}`)
      const json = await res.json();
      setDays(json.daily)
      console.log(days,"ddddd")
    };
    // "daily": Array [
    //   Object {
    //     "clouds": 0,
    //     "dew_point": 251.72,
    //     "dt": 1641265200,
    //     "feels_like": Object {
    //       "day": 268.86,
    //       "eve": 268.99,
    //       "morn": 269.05,
    //       "night": 270.31,
    //     },
    //     "humidity": 20,
    //     "moon_phase": 0.05,
    //     "moonrise": 1641255360,
    //     "moonset": 1641290460,
    //     "pop": 0.27,
    //     "pressure": 1028,
    //     "snow": 0.12,
    //     "sunrise": 1641249986,
    //     "sunset": 1641284727,
    //     "temp": Object {
    //       "day": 272.14,
    //       "eve": 271.1,
    //       "max": 273.24,
    //       "min": 269.6,
    //       "morn": 271.53,
    //       "night": 270.31,
    //     },
    //     "uvi": 1.61,
    //     "weather": Array [
    //       Object {
    //         "description": "light snow",
    //         "icon": "13d",
    //         "id": 600,
    //         "main": "Snow",
    //       },
    //     ],
    //     "wind_deg": 292,
    //     "wind_gust": 5.64,
    //     "wind_speed": 3.18,
    //   },
    
  
    useEffect(()=> {
      getWeather();
    },[])
  
    return (
        <View style={styles.container}>
          <View style={styles.city}>
            <Text style={styles.cityName}>{city}</Text>
          </View>
          
                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={styles.weather}>
                  {days.length===0 ? (<View style={styles.day}>
                    <ActivityIndicator size="large"  color="white" style={{marginTop: 10}}/>
                  </View>) : 
                  (
                    days.map((day, index) => 
                      <View key={index} style={styles.day}>
                        <Text style={styles.temp}>{day.temp.day}</Text>
                        <Text style={styles.desc}>{day.weather[0].main}</Text>
                      </View>
                    )
                  )}
                 
                </ScrollView>
        </View>
    );
  }
  
const styles = StyleSheet.create({
  container : {
    flex:1, 
    backgroundColor: "tomato"
  },
  city : {
    flex:1.2,
    justifyContent: "center",
    alignItems: "center"
  },
  cityName : {
    fontSize :58,
    fontWeight : "500"
  },
  weather : {  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp :{
    marginTop : 50,
    fontWeight: "600",
    fontSize: 168,
  },
  desc: {
    marginTop: -30,
    fontSize: 60,
  }
})



//parameter units -> metric 
//FarseFloat