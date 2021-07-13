import firebase from "firebase/app";
import 'firebase/storage'
import 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyAYbVANmR3KkPQ7wTSCeA6vOIxb0mnQ4Yw",
    authDomain: "storagefb-f27f0.firebaseapp.com",
    projectId: "storagefb-f27f0",
    storageBucket: "storagefb-f27f0.appspot.com",
    messagingSenderId: "177013841211",
    appId: "1:177013841211:web:d26ea551c32e51ab882b1e"
  };

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
db.settings({timestampsInSnapshots : true})
const storage = firebase.storage()

export  {storage, db}
  