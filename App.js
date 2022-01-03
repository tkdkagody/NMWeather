import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, ScrollView } from 'react-native';


  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  console.log(SCREEN_WIDTH,"가로넓이")
export default function App() {

  return (
      <View style={styles.container}>
        <View style={styles.city}>
          <Text style={styles.cityName}>Seoul</Text>
        </View>
        
              <ScrollView horizontal contentContainerStyle={styles.weather}>
                <View style={styles.day}>
                  <Text style={styles.temp}>27</Text>
                  <Text style={styles.desc}>Sunny</Text>
                </View>
                <View style={styles.day}>
                  <Text style={styles.temp}>27</Text>
                  <Text style={styles.desc}>Sunny</Text>
                </View>
                <View style={styles.day}>
                  <Text style={styles.temp}>27</Text>
                  <Text style={styles.desc}>Sunny</Text>
                </View>
                <View style={styles.day}>
                  <Text style={styles.temp}>27</Text>
                  <Text style={styles.desc}>Sunny</Text>
                </View>
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
  weather : {
    //flex: 3,
    backgroundColor: "blue",
    //paddingVertical: 20,
  },
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

