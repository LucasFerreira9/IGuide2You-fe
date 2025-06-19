import React,{useRef,useEffect,useState,useMemo} from "react";
import { StyleSheet,Animated} from "react-native";
import colors from "../../Constants/colors";
import ScreenView from "../../Components/ScreenView";
import { RootStackParamList } from "../../Navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import EncryptedStorage from 'react-native-encrypted-storage';
import useDimensions from "../../Hooks/useDimensions";
import { UserContextType } from "../../Types/User";

type Props = {
    navigation: LoadingScreenNavigationProp
}

type LoadingScreenNavigationProp = StackNavigationProp<RootStackParamList, "Loading">;

const Loading:React.FC<Props> = ({navigation})=>{

    const pulseAnimation = useRef(new Animated.Value(1)).current;
    const sliceAnimation = useRef(new Animated.Value(0)).current;
    
    const animations = useRef(Array(10).fill(0).map(()=>useRef(new Animated.Value(0)).current)).current
    const letters = useMemo(()=>[..."IGuide2You"],[]);

    const [userData,setUserData] = useState<UserContextType| null>(null);
    const [loading, setloading] = useState(true);

    const [showLogo, setShowLogo] = useState<boolean>(false);

    const {screen_width} = useDimensions();

    useEffect(()=>{
        const animation = Animated.loop(Animated.sequence([
            Animated.timing(pulseAnimation,{
                 toValue: 1.2,
                 duration:1000,
                 useNativeDriver:false
             }),
             Animated.timing(pulseAnimation,{
                 toValue: 1,
                 duration:1000,
                 useNativeDriver:false
             })
         ]));
         animation.start();
    },[]);

    useEffect(()=>{
        EncryptedStorage.getItem("user_context").then((context)=>{
            if(context)
                setUserData(JSON.parse(context))
            pulseAnimation.stopAnimation()
            sliceLogo() 
        });      
    },[]);

    useEffect(()=>{
        if(!loading){
            setTimeout(()=>{
                if(userData)
                    navigation.navigate('Home',userData)
                else
                    navigation.navigate('Login')
            },500)
        }
    },[loading])


    const sliceLogo = ()=>{
        Animated.timing(sliceAnimation,{
            toValue:-1,
            duration:800,
            useNativeDriver:false
        }).start(()=>{
            setShowLogo(true);
            sliceAnimation.setValue(0);
            fadeIn();
        });
    }

    const fadeIn = ()=>{
        Animated.sequence(
            animations.map((letter:Animated.Value)=>{
                return Animated.timing(letter,{
                    toValue : 1,
                    duration : 100,
                    useNativeDriver: false
                })
            })      
        ).start(()=>{
            setloading(false);
        });   
    }



    return <ScreenView style={styles.container}>
       
        <Animated.Image 
            source={require('../../Assets/logoicon.png')} 
            style={{
                ...styles.image,
                transform:[
                    {
                        scale : pulseAnimation
                    },
                    {
                        translateX: sliceAnimation.interpolate({
                            inputRange:[-1,1],
                            outputRange: [-screen_width/3,screen_width/3]
                        })   
                    }
                ], 
            }}
        />
        
        {
        showLogo && 
            letters.map(
                (letter,index)=>
                    <Animated.Text 
                        key={index}
                        style ={{
                            textAlign:'center',
                            opacity: animations[index],
                            fontSize: 0.14 * screen_width,
                            fontFamily:'PoppinsMedium',
                            fontWeight:'800',
                            color: colors.main3,
                        }}>
                        {letter}
                    </Animated.Text>
            )}
    </ScreenView>
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:'10%'
    },
    image:{
        resizeMode:'contain',
        marginRight:'3%'
    },
    loading:{
        width:'80%',
        height:'30%'
    }
})

export default Loading;