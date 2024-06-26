import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAq8wiYHG5dGKoXCZHP62NRNph3-C_2mmk",
  authDomain: "server-mehmetuysal-dev.firebaseapp.com",
  projectId: "server-mehmetuysal-dev",
  storageBucket: "server-mehmetuysal-dev.appspot.com",
  messagingSenderId: "845216815789",
  appId: "1:845216815789:web:12db545daeafb2659c0424",
};

export const app = initializeApp(firebaseConfig);
