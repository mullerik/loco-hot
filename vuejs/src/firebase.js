import Firebase from 'firebase'
let config = {
  apiKey: 'AIzaSyCxsYEvSZCZnToRlig9jHlVnLghD_r7qoI',
  authDomain: 'locohot-66478.firebaseapp.com',
  databaseURL: 'https://locohot-66478.firebaseio.com',
  projectId: 'locohot-66478',
  storageBucket: 'locohot-66478.appspot.com',
  messagingSenderId: '212676851127'
}
let firebaseApp = Firebase.initializeApp(config)
export const db = firebaseApp.database()
