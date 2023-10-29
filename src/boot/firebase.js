// import { boot } from 'quasar/wrappers'
import * as firebase from 'firebase/app'
import * as auth from 'firebase/auth'
import * as db from 'firebase/database'
import config from './config'

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const firebaseAuth = auth
const firebaseDb = db

export { firebaseAuth, firebaseDb }
// export default boot(async (/* { app, router, ... } */) => {
//   // something to do
// })
