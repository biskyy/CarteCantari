import React from "react"
import ToateCantarile from "./ToateCantarile.json"
import { StyleSheet, Text, View } from 'react-native';

export default function(){
    return(
        <Text>{ToateCantarile[0].cantare}</Text>
    )
}