// GlobalStateProvider.js
import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [state, setState] = useState({
    points: 0,
    time: 0,
  });

  const setGlobalState = (key, value) => {
    setState(prevState => ({ ...prevState, [key]: value }));
  };

  return (
    <GlobalStateContext.Provider value={[state, setGlobalState]}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = (key) => {
  const [state, setGlobalState] = useContext(GlobalStateContext);
  return [state[key], (value) => setGlobalState(key, value)];
};
