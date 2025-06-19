/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { enableLatestRenderer } from 'react-native-maps';
import Navigation from './src/Navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserType } from './src/Types/User';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Animated, StyleSheet } from 'react-native';
import useDimensions from './src/Hooks/useDimensions';
import ScreenView from './src/Components/ScreenView';
import colors from './src/Constants/colors';
import { UserProvider } from './src/Providers/UserProvider';

enableLatestRenderer();

const App = () => {
  const [user, setUser] = useState<UserType | undefined>();
  
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const sliceAnimation = useRef(new Animated.Value(0)).current;
  const animations = useRef(Array(10).fill(0).map(() => useRef(new Animated.Value(0)).current)).current
  const letters = useMemo(() => [..."IGuide2You"], []);
  const [loading, setloading] = useState(true);
  const [showLogo, setShowLogo] = useState<boolean>(false);
  const { screen_width } = useDimensions();

  useEffect(() => {
    EncryptedStorage.getItem('user_context').then(user_context => {
      if (user_context) setUser(JSON.parse(user_context))

      pulseAnimation.stopAnimation()
      sliceLogo()
    })
  }, [])

  useEffect(() => {
    const animation = Animated.loop(Animated.sequence([
      Animated.timing(pulseAnimation, {
        toValue: 1.2,
        duration: 1000,
        useNativeDriver: false
      }),
      Animated.timing(pulseAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false
      })
    ]));
    animation.start();
  }, []);

  const sliceLogo = () => {
    Animated.timing(sliceAnimation, {
      toValue: -1,
      duration: 800,
      useNativeDriver: false
    }).start(() => {
      setShowLogo(true);
      sliceAnimation.setValue(0);
      fadeIn();
    });
  }

  const fadeIn = () => {
    Animated.sequence(
      animations.map((letter: Animated.Value) => {
        return Animated.timing(letter, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false
        })
      })
    ).start(() => {
      setloading(false);
    });
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {
        loading && (
          <ScreenView style={styles.container}>

            <Animated.Image
              source={require('./src/Assets/logoicon.png')}
              style={{
                ...styles.image,
                transform: [
                  {
                    scale: pulseAnimation
                  },
                  {
                    translateX: sliceAnimation.interpolate({
                      inputRange: [-1, 1],
                      outputRange: [-screen_width / 3, screen_width / 3]
                    })
                  }
                ],
              }}
            />

            {
              showLogo &&
              letters.map(
                (letter, index) =>
                  <Animated.Text
                    key={index}
                    style={{
                      textAlign: 'center',
                      opacity: animations[index],
                      fontSize: 0.14 * screen_width,
                      fontFamily: 'PoppinsMedium',
                      fontWeight: '800',
                      color: colors.main3,
                    }}>
                    {letter}
                  </Animated.Text>
              )}
          </ScreenView>
        )
      }

      {
        !loading && (
          <UserProvider user={user}>
            <Navigation/>
          </UserProvider>
        )
      }
    </GestureHandlerRootView>
  );
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

export default App;