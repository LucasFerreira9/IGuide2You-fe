import { useEffect,useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const usePreventGoBack = () => {
  useFocusEffect(
    useCallback(() => {
        const onBackPress = () => {
            return true;
        };

        BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );
};

export default usePreventGoBack;
