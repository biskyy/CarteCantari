import Cantari from "../Cantari.json"
 import React from "react";
 import {useState} from "react"
import {
  Button,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  Dimensions
} from "react-native";
const windowWidth = Dimensions.get('window').width;

export default function ToateCantarile(){

  const [[cantare,numarCantare], setCantare] = useState([true,-1])

  const cantareEvent = (e) =>{
   
    setCantare([false,0]);
    
  }

  const backEvent = () =>{
    setCantare([true,-1]);
  }
 


    return(
      <>
       {cantare && [...Cantari].map( (cantare,index) => <Button id={index} onPress={cantareEvent} color="#ff5c5c" key={index} title={cantare.name}/>)  }
       {!cantare && <Button onPress={backEvent} title="BACK"/>}
       </>
    )
}


