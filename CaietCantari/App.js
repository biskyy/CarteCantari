import { StatusBar } from 'expo-status-bar';
import { Dimensions ,StyleSheet, Text, View , Button} from 'react-native';
import ProcessToateCantarile from './ToateCantarile/ProcessToateCantarile';

export default function App() {

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get("window").height
  console.log(windowWidth, windowHeight)


  return (
    <View style={styles.container}>
      <ProcessToateCantarile/>
      <Text>{windowWidth}</Text>
      <StatusBar  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding:20,
  },
  
 
});
