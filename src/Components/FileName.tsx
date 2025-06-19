import React, { useEffect, useState } from "react";
import { View } from "react-native";

import  Icon from "react-native-vector-icons/FontAwesome";

import { File } from "./Fields/FileField";
import { Text } from "./Text";
import useDimensions from "../Hooks/useDimensions";
import colors from "../Constants/colors";

type Props={
    file: File
}

const FileName:React.FC<Props> = ({file})=>{

    const {screen_width} = useDimensions();
    const [size, setSize] = useState<string>();

    useEffect(()=>{
        if(file.size >= 1000000) // 1MB
            setSize(`(${Math.trunc(file.size / 1000000)} Mb)`);
        else
            setSize(`(${Math.trunc(file.size / 1000)} Kb)`);
    });

    return <View style={{
        flexDirection:'row',
        paddingVertical:'2%',
        paddingHorizontal:'3%',
        marginBottom:'5%',
        alignItems:'center',
        backgroundColor: colors.bar,
        borderRadius:10
    }}>
        <Text>
            <Icon name = 'file-image-o' size={0.06 * screen_width}/>
            {`${file.name} ${size}`}
        </Text>
        
    </View>
}

export default FileName;