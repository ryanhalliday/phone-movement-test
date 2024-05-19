import { useCallback, useEffect, useState } from 'react'
import './App.css'
import Viewport from './Viewport';

function App() {
  const [readyState, _setReadyState] = useState(window.localStorage.getItem('readyState') === 'true');
  const setReadyState = useCallback((value: boolean) => {
    window.localStorage.setItem('readyState', value.toString());
    _setReadyState(value);
  }, [_setReadyState]);

  const requestPermission = useCallback(() => {
    // @ts-ignore
    window.DeviceOrientationEvent.requestPermission().then((response) => {
      if (response === 'granted') {
        setReadyState(true);
      }
    }).catch(console.error);
  }, []);

  useEffect(() => {
    // @ts-ignore
    if (!readyState && window.DeviceOrientationEvent !== undefined && typeof window.DeviceOrientationEvent.requestPermission === 'function') {
      console.log("Requesting permission via button click...")
    } else {
      // We either do not need to ask or we already have permission
      setReadyState(true);
    }
  }, []);

  return (
    <>
      <h1>Phone Movement</h1>
      {readyState ? 
          <Viewport />
        :
          <button onClick={requestPermission}>Request permission</button>
      }
    </>
  )
}

export default App
