import { initializeApp } from '@firebase/app';
// import { getToken, onMessage } from 'firebase/messaging';
import {
    getMessaging,
    getToken,
    onMessage,
} from "@firebase/messaging";


const firebaseConfig = {
    apiKey: "AIzaSyCZS3Xkwc_3O2wgiNbJpJBnM0-TNB5NjR0",
    authDomain: "kaidemy.firebaseapp.com",
    projectId: "kaidemy",
    storageBucket: "kaidemy.appspot.com",
    messagingSenderId: "77171024969",
    appId: "1:77171024969:web:2ef170e2cffb5aec158b98",
};

// console.log('*** Environment ***', process.env.REACT_APP_ENV)
// console.log('*** Firebase Config ***', firebaseConfig)

const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);

export const getOrRegisterServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    return window.navigator.serviceWorker
      .getRegistration('/firebase-push-notification-scope')
      .then((serviceWorker) => {
        if (serviceWorker) return serviceWorker;
        return window.navigator.serviceWorker.register('/firebase-messaging-sw.js', {
          scope: '/firebase-push-notification-scope',
        });
      });
  }
  throw new Error('The browser doesn`t support service worker.');
};

export const getFirebaseToken = () =>
    getOrRegisterServiceWorker().then((serviceWorkerRegistration) =>
        getToken(messaging, {
            vapidKey:
                "BJyHar5T9yRhXWOaRm4j7f4ha2FmhDLiljs0bWyVNBkQTaZuwt7urix0OZphHTej8lbZnnBf6OwrT4bQ3bmI99U",
            serviceWorkerRegistration,
        }),
    );

export const onForegroundMessage = () =>
  new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)));
