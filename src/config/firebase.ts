import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const config = {
    apiKey: "AIzaSyC5T4TwikMYMw0N5R6YUEg0hvdmuEdJQnE",
    authDomain: "hrs-1-8f88d.firebaseapp.com",
    projectId: "hrs-1-8f88d",
    storageBucket: "hrs-1-8f88d.appspot.com",
    messagingSenderId: "606669540530",
    appId: "1:606669540530:web:46d5c85ffe48180d184dab",
    measurementId: "G-W760RLEB1C"
};

const firebaseApp = initializeApp(config);
const auth = getAuth(initializeApp(config));
const firestore = getFirestore(initializeApp(config));
const storage = getStorage(initializeApp(config));

let analytics;


export function docToJSON(doc: any) {
    const data = doc.data();
    return {
        ...data,
        id: doc.id,
        createdAt: data?.createdAt?.toMillis() || 0,
        updatedAt: data?.updatedAt?.toMillis() || 0,
    };
}
export { firestore, auth, analytics, firebaseApp, storage };