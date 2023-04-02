// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyCc4c6XoBcgnamYV-ruY_-aujyFiVHb4-Q',
    authDomain: 'pet-she.firebaseapp.com',
    projectId: 'pet-she',
    storageBucket: 'pet-she.appspot.com',
    messagingSenderId: '170465119310',
    appId: '1:170465119310:web:cb8f10e817eeae74cb471f',
    measurementId: 'G-5M2M8FG6P8',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const auth = getAuth(app)
export const db = getFirestore(app)
