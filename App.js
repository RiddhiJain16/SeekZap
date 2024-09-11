// References : 
// icons : https://fonts.google.com/icons
// Images for board : https://www.freepik.com/
// Image editing : https://www.adobe.com/products/photoshop/landpa.html?sdid=FR7NYZM2&mv=search&mv2=paidsearch&ef_id=cfceb887530014eb6171de59f0114103:G:s&s_kwcid=AL!3085!10!79165043299287!79165251442725&msclkid=cfceb887530014eb6171de59f0114103
// background music : https://pixabay.com/music/search/slow%20soft%20%20background/?mood=quirky 
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GlobalStateProvider } from './screens/GlobalFile'; 
import HomePage from './screens/HomePage';
import GameScreen from './screens/GameScreen';
import SettingPopUp from './screens/SettingPopUp';
import BoardLevel from './screens/BoardLevel';
import SplashLoad from './screens/SplashLoad';


const Stack = createStackNavigator();

const App = () => {
  return (
    <GlobalStateProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashLoad"> 
          <Stack.Screen 
          name="SplashLoad" 
          component={SplashLoad} 
          options={{ headerShown: false }} 
          />
            <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }}/>
            <Stack.Screen name="GameScreen" component={GameScreen} options={{ headerShown: false }}/>
            <Stack.Screen 
          name="SettingPopUp" 
          component={SettingPopUp} 
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BoardLevel"
          component={BoardLevel}
          options={{ title: 'Select Board' }} 
        />
            
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </GlobalStateProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
