import { useState, useEffect, useRef } from "react";
import {
  Accuracy,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from "expo-location";

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    let subscriber;
    const startWatching = async () => {
      try {
        const { granted } = await requestForegroundPermissionsAsync();
        if (!granted) {
          throw new Error("Location permission not granted");
        }
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          (location) => {
            callbackRef.current(location);
          }
        );
      } catch (e) {
        setErr(e);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null;
    }

    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack]);

  return [err];
};
