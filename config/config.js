import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBKpxokpsKAV2mUShfLEsbE2E8QqQqv0qY",
  authDomain: "simplaq-test.firebaseapp.com",
  projectId: "simplaq-test",
  storageBucket: "simplaq-test.appspot.com",
  messagingSenderId: "807265972752",
  appId: "1:807265972752:web:53fb053052025431301095",
  measurementId: "G-NV4E11RPG6",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
