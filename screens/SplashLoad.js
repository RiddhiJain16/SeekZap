import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const SplashLoad = () => {

    const nav = useNavigation();
    

    useEffect(() => {

        const timer = setTimeout(() => {
            nav.replace('HomePage');
        }, 2000);

        return() => clearTimeout(timer);

    },[nav]);

    return(
        <LinearGradient
         colors={['#002045', '#04459e', '#c9c9f9']}
        style={styles.container}>
        <View style={styles.container}>
             <Text style={styles.head}>SEEK</Text>
             <Text style={styles.head}>ZAP</Text>
        </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      head: {
        fontSize: 30,
        color: 'white',
        fontWeight: '900',
      },

});

export default SplashLoad;