import { app } from "./firebase";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  onSnapshot,
  where,
  QuerySnapshot,
  type DocumentData,
  doc,
  getDoc,
  DocumentSnapshot,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const db = getFirestore(app);

export const setDocument = function (
  col: string,
  document: string,
  data: object
) {
  const docRef = doc(db, col, document);
  const d = JSON.parse(JSON.stringify(data));
  return setDoc(docRef, d);
};

export const addDocument = function (col: string, data: object) {
  const colRef = collection(db, col);
  const d = JSON.parse(JSON.stringify(data));
  return addDoc(colRef, d);
};
export const updateDocument = function (
  col: string,
  document: string,
  data: object
) {
  const docRef = doc(db, col, document);
  const d = JSON.parse(JSON.stringify(data));
  return updateDoc(docRef, d);
};
export const deleteDocument = function (col: string, document: string) {
  const docRef = doc(db, col, document);
  return deleteDoc(docRef);
};
export const getDocument = function (col: string, document: string) {
  const docRef = doc(db, col, document);
  return getDoc(docRef);
};
export const getDocuments = function (col: string) {
  const colRef = collection(db, col);
  const que = query(colRef, orderBy("timestamp", "desc"), limit(100));
  return getDocs(que);
};

export const docListener = function (
  col: string,
  document: string,
  callback: (snapshot: DocumentSnapshot<DocumentData, DocumentData>) => void
) {
  const docRef = doc(db, col, document);
  return onSnapshot(docRef, callback);
};

export const docsListener = function (
  col: string,
  callback: (snapshot: QuerySnapshot<DocumentData, DocumentData>) => void
) {
  const colRef = collection(db, col);
  const que = query(
    colRef,
    orderBy("timestamp", "desc"),
    where("timestamp", ">", Date.now())
  );
  return onSnapshot(que, callback);
};
