// HomePage.js
import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import SettingPopUp from './SettingPopUp';
import { useGlobalState } from './GlobalFile'; // Import global state hook

const HomePage = () => {
  const nav = useNavigation();
  const [isSettingVisible, setSettingVisible] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true); // Default sound setting

  // Global state
  const [points, setPoints] = useGlobalState('points');
  
  const openSettings = () => setSettingVisible(true);
  const closeSettings = () => setSettingVisible(false);

 
  return (
    <LinearGradient
      colors={['#002045', '#04459e', '#c9c9f9']}
      style={styles.container}
    >
      <View style={styles.topSection}>
        <TouchableOpacity onPress={openSettings} style={styles.settingsIcon}>
          <Image source={require('../assets/settings.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.pointsContainer}>
          <Image source={require('../assets/coin.png')} style={styles.pointsicon} />
          <Text style={styles.points}>: {points}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => nav.navigate('BoardLevel')}>
          <Text style={styles.buttonText}>Boards</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => nav.navigate('GameScreen')}>
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => nav.navigate('PlayroomScreen')}>
          <Text style={styles.buttonText}>Play Room</Text>
        </TouchableOpacity>
      </View>

      <SettingPopUp 
        visible={isSettingVisible} 
        onClose={closeSettings} 
        soundEnabled={soundEnabled} 
        setSoundEnabled={setSoundEnabled} 
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    padding: 10,
  },
  settingsIcon: {
    padding: 10,
    flexDirection: 'row', // Puts items in a row
    justifyContent: 'space-between',
  },
  icon: {
    width: 30,
    height: 30,
  },
  pointsicon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 20,
  },
  bottomSection: {
    flex: 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  points: {
    paddingRight:20,
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '900',
  },
  button: {
    backgroundColor: '#05479b',
    padding: 15,
    paddingLeft: 50,
    paddingRight: 50,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#c9c9f9',
    fontSize: 20,
    fontWeight: '900',
  },
});

export default HomePage;
