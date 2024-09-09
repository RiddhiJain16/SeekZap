import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BoardLevel = () => {
  const navigation = useNavigation();

  // Function to handle board button press
  const handleBoardPress = () => {
    navigation.navigate('GameScreen');
  };

  return (
    <View style={styles.container}>
     
      <ScrollView contentContainerStyle={styles.grid}>
        {[...Array(9).keys()].map((_, index) => (
          <TouchableOpacity
            key={index}
            style={styles.boardButton}
            onPress={handleBoardPress}
          >
            <Text style={styles.boardButtonText}>Board {index + 1}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  boardButton: {
    width: '30%',
    backgroundColor: '#007bff',
    paddingVertical: 20,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  boardButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BoardLevel;
