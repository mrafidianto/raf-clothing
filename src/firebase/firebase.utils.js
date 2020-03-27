import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDq5324XIoGR8tBpnEku_l5RwnbQqSsy3s",
  authDomain: "raf-clothing.firebaseapp.com",
  databaseURL: "https://raf-clothing.firebaseio.com",
  projectId: "raf-clothing",
  storageBucket: "raf-clothing.appspot.com",
  messagingSenderId: "419319976707",
  appId: "1:419319976707:web:8978466ac0378705694f36",
  measurementId: "G-H57SFQC6EE"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`user/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("Error creating user : ", error.message)
    }

  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
