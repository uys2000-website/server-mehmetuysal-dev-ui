import { app } from "./firebase";
import {
  signOut as _signOut,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  type NextOrObserver,
  type User,
} from "firebase/auth";

export const auth = getAuth(app);

export const signOut = function () {
  return _signOut(auth);
};

export const signIn = function (mail: string, pass: string) {
  return signInWithEmailAndPassword(auth, mail, pass);
};

export const authListener = function (callback: NextOrObserver<User>) {
  onAuthStateChanged(auth, callback);
};
