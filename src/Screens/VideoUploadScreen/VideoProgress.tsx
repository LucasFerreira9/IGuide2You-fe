import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import colors from "../../Constants/colors";
import { Text } from "../../Components/Text";

type VideoProgressProps = {
    name:string
    percentage: number
}

const VideoProgress:React.FC<VideoProgressProps> = ({name,percentage})=>{

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <View style={styles.text}><Text>{name}</Text></View>
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

export default VideoProgress;