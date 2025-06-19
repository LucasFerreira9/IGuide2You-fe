import { Appearance } from "react-native";

const main = {
    main1: "#45b65a",
    main2: "#00a84f",
    main3: "#009748"
}

const light = {
        lvl1: "#D4D4D6",
        lvl2: "#EAEAEB",
        lvl3: "#F4F4F5",
        lvl4: "#F8F8F8",
        text: 'black',
        background: "#EAEAEB",
        touchable: '#F4F4F5',
        icons: main.main3,
        buttons: main.main3,  
        icons2:  main.main3,  
        default: main.main3,
        bar: '#CDCDCD',
        ...main      
};

const dark = {
    
        lvl4: "#263240",
        lvl3: "#1E2833",
        lvl2: "#131920",
        lvl1: "#0D1116",
        text: 'white',
        background: "#121212",
        touchable: '#282828',
        icons: main.main3 ,
        buttons: "#3F3F3F", 
        icons2: main.main1,  
        default: main.main3,
        bar: '#282828',
        ...main
    
};

let colors = light;

if(Appearance.getColorScheme() === 'dark') colors = dark;

export default colors;


