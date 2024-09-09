// SettingPopUp.js
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

const SettingPopUp = ({ visible, onClose, onSettingsChange }) => {
  const [timer, setTimer] = useState(true);
  const [sound, setSound] = useState(true);
  const [soundObject, setSoundObject] = useState(new Audio.Sound());

  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/sound.mp3')
        );
        setSoundObject(sound);
        if (sound) {
          await sound.playAsync();
        }
      } catch (error) {
        console.log('Error loading sound:', error);
      }
    };

    loadSound();

    return () => {
      if (soundObject) {
        soundObject.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    const handleSound = async () => {
      if (soundObject) {
        try {
          if (sound) {
            await soundObject.playAsync();
          } else {
            await soundObject.stopAsync();
          }
        } catch (error) {
          console.log('Error handling sound:', error);
        }
      }
    };

    handleSound();
    if (onSettingsChange) {
      onSettingsChange({ soundOn: sound });
    }
  }, [sound, soundObject, onSettingsChange]);

  const radioTimer = () => {
    setTimer(prevTimer => {
      const newTimerSetting = !prevTimer;
      if (onSettingsChange) {
        onSettingsChange({ timerOn: newTimerSetting });
      }
      return newTimerSetting;
    });
  };

  const radioSound = () => setSound(!sound);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <LinearGradient
          colors={['#002045', '#04459e', '#c9c9f9']}
          style={styles.modalContent}
        >
          <Text style={styles.title}>Settings</Text>
          
          <TouchableOpacity onPress={radioTimer} style={styles.option}>
            <Text style={styles.optionText}>Timer</Text>
            <Text style={styles.optionText}>{timer ? 'On' : 'Off'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={radioSound} style={styles.option}>
            <Text style={styles.optionText}>Sound</Text>
            <Text style={styles.optionText}>{sound ? 'On' : 'Off'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: '#ffffff',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    color: '#ffffff',
  },
  closeButton: {
    backgroundColor: '#05479b',
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SettingPopUp;
