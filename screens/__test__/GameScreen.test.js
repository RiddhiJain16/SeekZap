import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import GameScreen from './screens/GameScreen'; // Adjust path as needed
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useGlobalState } from './screens/GlobalStateProvider'; // Mocking global state hook

// Mock Global State Provider for points
jest.mock('../GlobalStateProvider', () => ({
  useGlobalState: jest.fn(),
}));

describe('GameScreen Component', () => {
  beforeEach(() => {
    // Mocking global state for points
    useGlobalState.mockReturnValue([0, jest.fn()]);
  });

  it('should render correctly and match the snapshot', () => {
    const { toJSON } = render(<GestureHandlerRootView><GameScreen /></GestureHandlerRootView>);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should start the timer at 0 and increment it', async () => {
    const { getByText } = render(<GestureHandlerRootView><GameScreen /></GestureHandlerRootView>);

    await waitFor(() => {
      expect(getByText('Timer: 0:01')).toBeTruthy(); // After 1 second
    });
  });

  it('should update the task progress when an image is selected', () => {
    const { getByTestId } = render(<GestureHandlerRootView><GameScreen /></GestureHandlerRootView>);

    // Simulate clicking on an image to trigger the selection
    const imageButton = getByTestId('image-cherry');
    fireEvent.press(imageButton);

    // Check if task progress updated correctly for the selected image
    const taskProgressText = getByText('Find 5 red fruits: In Progress (1/5)');
    expect(taskProgressText).toBeTruthy();
  });

  it('should complete a task when all related images are selected', () => {
    const { getByTestId, getByText } = render(<GestureHandlerRootView><GameScreen /></GestureHandlerRootView>);

    // Simulate selecting all images for the first task (e.g., cherries, apples, etc.)
    const cherryButton = getByTestId('image-cherry');
    fireEvent.press(cherryButton);

    const appleButton = getByTestId('image-apple');
    fireEvent.press(appleButton);

    // ... repeat for all images

    // Check if the task is completed
    const taskCompleteText = getByText('Find 5 red fruits: Completed');
    expect(taskCompleteText).toBeTruthy();
  });

  it('should display a hint when hint button is pressed', () => {
    const { getByText, getByTestId } = render(<GestureHandlerRootView><GameScreen /></GestureHandlerRootView>);

    // Click the hint button
    const hintButton = getByTestId('hint-button-1'); // For task with ID 1
    fireEvent.press(hintButton);

    // Check if a hint is displayed
    const hintImage = getByTestId('hint-image');
    expect(hintImage).toBeTruthy();
  });
});
