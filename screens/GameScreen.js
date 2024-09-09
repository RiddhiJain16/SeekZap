import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import { GestureHandlerRootView, PinchGestureHandler, PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useGlobalState } from './GlobalStateProvider'; // Import global state hook

const { width, height } = Dimensions.get('window');
// Define tasks and corresponding images
const tasks = [
  {
    id: 1,
    name: 'Find 5 red fruits',
    answers: ['strawberry', 'cherry', 'tomato', 'pom', 'apple'],
    completed: false,
    found: 0,
    hintIndex: 0,
  },
  {
    id: 2,
    name: 'Find 3 purple flowers',
    answers: ['clem', 'iris', 'lavender'],
    completed: false,
    found: 0,
    hintIndex: 0,
  },
  {
    id: 3,
    name: 'Find 5 dandelions',
    answers: ['d1', 'd2', 'd3', 'd4', 'd5'],
    completed: false,
    found: 0,
    hintIndex: 0,
  }
];

const GameScreen = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [taskProgress, setTaskProgress] = useState(tasks);
  const [hintImage, setHintImage] = useState(null);
  const [points, setPoints] = useGlobalState('points');  // New state for points
  const [timer, setTimer] = useState(0);    // New state for timer
  const [isTimerActive, setIsTimerActive] = useState(true); // New state for controlling timer

  const scale = useSharedValue(1);      // For pinch zoom
  const translateX = useSharedValue(0); // For pan gesture (horizontal)
  const translateY = useSharedValue(0); // For pan gesture (vertical)

  useEffect(() => {
    // Start timer
    let timerInterval;
    if (isTimerActive) {
      timerInterval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }


    // Stop timer if all tasks are completed
    if (taskProgress.every(task => task.completed)) {
      setIsTimerActive(false);
      navigation.navigate('TasksComplete');
    }

    return () => clearInterval(timerInterval);
  }, [isTimerActive, taskProgress]);

  const onPinchGesture = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      scale.value = event.nativeEvent.scale;
    }
  };


  const onPanGesture = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      translateX.value = event.nativeEvent.translationX;
      translateY.value = event.nativeEvent.translationY;
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withSpring(scale.value) },
        { translateX: withSpring(translateX.value) },
        { translateY: withSpring(translateY.value) },
      ],
    };
  });

  const images = [
    { x: 190, y: 280, id: 'cherry', source: require('../assets/Boards/board1/cherry.png'), width: 40, height: 40, rotation: '-35deg' },
    { x: 290, y: 65, id: 'clem', source: require('../assets/Boards/board1/clem.png'), width: 65, height: 90, rotation: '-30deg' },
    { x: 10, y: 480, id: 'apple', source: require('../assets/Boards/board1/apple.png'), width: 70, height: 25, rotation: '0deg' },
    { x: 220, y: 380, id: 'blackberry', source: require('../assets/Boards/board1/blackberry.png'), width: 120, height: 20, rotation: '35deg' },
    { x: 10, y: 270, id: 'iris', source: require('../assets/Boards/board1/iris.png'), width: 60, height: 30, rotation: '30deg' },
    { x: 40, y: 145, id: 'lavender', source: require('../assets/Boards/board1/lavender.png'), width: 110, height: 22, rotation: '0deg' },
    { x: 35, y: 430, id: 'orange', source: require('../assets/Boards/board1/orange.png'), width: 50, height: 50, rotation: '10deg' },
    { x: 280, y: 500, id: 'pom', source: require('../assets/Boards/board1/pom.png'), width: 60, height: 40, rotation: '0deg' },
    { x: 260, y: 280, id: 'tomato', source: require('../assets/Boards/board1/tomato.png'), width: 100, height: 20, rotation: '-20deg' },
    { x: 3, y: 170, id: 'd1', source: require('../assets/Boards/board1/d1.png'), width: 50, height: 110, rotation: '0deg' },
    { x: 320, y: 440, id: 'd2', source: require('../assets/Boards/board1/d2.png'), width: 30, height: 70, rotation: '180deg' },
    { x: 300, y: 200, id: 'd3', source: require('../assets/Boards/board1/d3.png'), width: 40, height: 85, rotation: '0deg' },
    { x: 240, y: 380, id: 'd4', source: require('../assets/Boards/board1/d4.png'), width: 20, height: 50, rotation: '110deg' },
    { x: 20, y: 385, id: 'd5', source: require('../assets/Boards/board1/d5.png'), width: 20, height: 45, rotation: '60deg' },
    { x: 60, y: 290, id: 'strawberry', source: require('../assets/Boards/board1/strawberry.png'), width: 50, height: 60, rotation: '-30deg' },
  ];

  const handleImageSelection = (imageId) => {
    if (!selectedImages.includes(imageId)) {
      setSelectedImages([...selectedImages, imageId]);

      const updatedTasks = taskProgress.map((task) => {
        if (task.answers.includes(imageId)) {
          task.found += 1;
          if (task.found === task.answers.length) {
            task.completed = true;
            setPoints(points + 20); // Update points when a task is completed
          }
        }
        return task;
      });

      setTaskProgress(updatedTasks);
    }
  };

  const handleHintClick = (taskId) => {
    const task = taskProgress.find(t => t.id === taskId);
    if (task) {
      const unselectedImage = images.find(img => task.answers.includes(img.id) && !selectedImages.includes(img.id));
      if (unselectedImage) {
        setHintImage(unselectedImage.id);
      } else {
        alert('No hints available');
      }
    }
  };

  return (
    <LinearGradient
      colors={['#002045', '#04459e', '#c9c9f9']}
      style={styles.container}
    >
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={onPanGesture}>
        <Animated.View style={animatedStyle}>
          <PinchGestureHandler onGestureEvent={onPinchGesture}>
            <Animated.View>
              <Image source={require('../assets/Boards/board1/board.jpg')} style={styles.sceneImage} />
              {images.map((img) => (
                <TouchableOpacity
                  key={img.id}
                  testID={`image-${img.id}`} 
                  style={[
                    styles.overlayImage,
                    { top: img.y, left: img.x },
                    hintImage === img.id && styles.hintImage
                  ]}
                  onPress={() => handleImageSelection(img.id)}
                >
                  <Animated.View style={{ width: img.width, height: img.height, transform: [{ rotate: img.rotation }] }}>
                    <Image source={img.source} style={styles.selectableImage} />
                  </Animated.View>
                </TouchableOpacity>
              ))}
            </Animated.View>
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>

      <View style={styles.taskContainer}>
        {taskProgress.map((task) => (
          <View key={task.id} style={[styles.taskCard, task.completed && styles.completedTask]}>
            {task.completed ? (
              <Image source={require('../assets/tick.png')} style={styles.tickIcon} />
            ) : (
              <>
                <Text style={styles.taskText}>
                  {task.name}: {`In Progress (${task.found}/${task.answers.length})`}
                </Text>
                <TouchableOpacity style={styles.hintButton} onPress={() => handleHintClick(task.id)} testID={`hint-button-${task.id}`}>
                  <Text style={styles.hintText}>Hint</Text>
                </TouchableOpacity>
                </>
            )}
          </View>
        ))}
      </View>

      <View style={styles.infoContainer}>
        <Image source={require('../assets/coin.png')} style={styles.coinIcon} />
        <Text style={styles.pointsText}>: {points}</Text>
        <Text style={styles.timerText}>Timer: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</Text>
      </View>
    </GestureHandlerRootView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sceneImage: {
    width: width * 1,
    height: height * 0.75,
  },
  overlayImage: {
    position: 'absolute',
  },
  selectableImage: {
    width: '100%',
    height: '100%',
  },
  hintImage: {
    borderWidth: 3,
    borderColor: 'black',
    backgroundColor: 'rgba(211, 211, 211, 0.5)',
  },
  taskContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  taskCard: {
    width: width / 3 - 10,
    height: 100,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  taskText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  hintText: {
    fontSize: 12,
  },
  completedTask: {
    backgroundColor: 'lightgreen',
  },
  tickIcon: {
    width: 20,
    height: 20,
    marginTop: 5,
  },
  hintButton: {
    backgroundColor: 'lightblue',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginTop: 8,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width : '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  pointsText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  timerText: {
    paddingLeft: 30,
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default GameScreen;
