import React from "react";
import DefaultText from "./DefaultText";
import useDimensions from "../Hooks/useDimensions";

const RequiredText:React.FC<{ children?: React.ReactNode }> = ({children})=>{

    const {getFontSize} = useDimensions()

    return <DefaultText 
        size={getFontSize(14)}
        fontWeight="500"
        color='red' 
        textAlign="left">
            {children ? children : "*campo obrigatório"}
    </DefaultText>
};

export default RequiredText;