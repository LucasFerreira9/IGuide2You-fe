import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import colors from "../../../Constants/colors";
import { UploadItem } from "../../../Types/Item";
import { Text } from "../../../Components/Text";

type ItemProgressProps = {
    item: UploadItem
    percentage: number
}

const ItemProgress:React.FC<ItemProgressProps> = ({item,percentage})=>{

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <View style={styles.text}><Text>{item.name}</Text></View>
                <View style={styles.text}><Text>{`${percentage}%`}</Text></View>
            </View>
            <View style={styles.bar}>
                <View style={{
                    backgroundColor: colors.default,
                    width: `${percentage}%`,
                    height: "100%"
                }}></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingVertical:"3%",
        flexDirection:"column",
        width:"100%",
        alignItems:"center",
        paddingHorizontal:"10%"
    },
    bar:{
        backgroundColor: colors.bar,
        width: "100%",
        height: 0.006 * Dimensions.get("screen").height
    },
    text:{
        alignSelf:"flex-start"
    },
    textContainer:{
        width: "100%",
        flexDirection:"row",
        justifyContent:"space-between"
    }
});

export default ItemProgress;