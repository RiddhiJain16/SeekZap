// App.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GlobalStateProvider } from './screens/GlobalStateProvider'; // Import global state provider
import HomePage from './screens/HomePage';
import GameScreen from './screens/GameScreen';
import SettingPopUp from './screens/SettingPopUp';
import BoardLevel from './screens/BoardLevel';
import SplashLoad from './screens/SplashLoad';
// Import other screens here

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
            {/* Add other screens here */}
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
