import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Fontisto } from '@expo/vector-icons'; 
import axios from 'axios';
import { withOrientation } from 'react-navigation';


  const { width: SCREEN_WIDTH } = Dimensions.get('window');  //Dimensions 스크린의 길이 또는 넓이를 구할 수 있음 rn 
  //console.log(SCREEN_WIDTH,"가로넓이");

  const API_KEY = "7854b9762ea3af9619e6a79a67b2cd17";   //서버쪽에 저장

  //icon name 지정
  const icons = {
    Clouds: "cloudy",
    Clear: "day-sunny",
    Atmosphere: "cloudy-gusts",
    Snow: "snow",
    Rain: "rains",
    Drizzle: "rain",
    Thunderstorm: "lightning",
  };


  export default function App() {
    const [city, setCity] = useState("Loading...");
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
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`)
      .then((res)=> {
        console.log("시작------",res.data.daily,"----------daily응답값")
        setDays(res.data.daily)
      })
      .catch(err => console.log(err))

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
                  {days.length=== 0 ? (<View style={{...styles.day, alignItems: "center"}}>
                    <ActivityIndicator size="large"  color="white" style={{marginTop: 1, marginLeft: 50}}/>
                  </View>) : 
                  (
                    days.map((day, index) => 
                      <View key={index} style={styles.day}>
                        <View style={{
                          flexDirection: "row",
                          alignItems:"center", 
                          justifyContent: "space-btween",
                          width: "100%",
                     

                        }}>
                          <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
                          <Fontisto name={icons[day.weather[0].main]} size={68} color="white" />
                        </View>
                        <Text style={styles.main}>{day.weather[0].main}</Text>
                        <Text style={styles.desc}>{day.weather[0].description}</Text>
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
    alignItems: "center",

  },
  cityName : {
    fontSize :58,
    fontWeight : "500",
    color: "white"
  },
  weather : { 
    
   },

  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    color: "white",
    paddingHorizontal : 50,
  },
  temp :{
    marginTop : 50,
    marginBottom: 50, 
    fontWeight: "600",
    fontSize: 100,
    color: "white",
    marginRight: 20

  },
  main: {
    marginTop: -30,
    fontSize:25,
    color: "white"
  },
  desc : {
    marginTop: 20,
    fontSize: 20,
    color: "white"
  },
 
})



//parameter units -> metric 
//parseFloat