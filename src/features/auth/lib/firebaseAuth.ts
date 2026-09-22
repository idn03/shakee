import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAuth,
  // Firebase's React Native runtime exports this helper, but its public TypeScript
  // entry currently omits the native declaration.
  // @ts-expect-error See https://github.com/firebase/firebase-js-sdk/issues/9316
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { firebaseApp } from "@/src/shared/lib/firebase";

export const auth = (() => {
  try {
    return initializeAuth(firebaseApp, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    // Reuse the existing instance during Expo Fast Refresh.
    return getAuth(firebaseApp);
  }
})();
