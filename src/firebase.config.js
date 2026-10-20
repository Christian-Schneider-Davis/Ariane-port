// Firebase web config for the "Ariane's-port" project.
// These values are not secret — they identify the project; access is
// controlled by Firebase Authentication and the Firestore rules (firestore.rules).
export const firebaseConfig = {
  apiKey: 'AIzaSyAALM40Z7dTH3i0e6U-JysAc8MwKy8wVBw',
  authDomain: 'ariane-s-port.firebaseapp.com',
  projectId: 'ariane-s-port',
  storageBucket: 'ariane-s-port.firebasestorage.app',
  messagingSenderId: '772374254159',
  appId: '1:772374254159:web:b524995ba99128d1bc103a',
}

// Accounts allowed to write posts. Must match the list in firestore.rules.
export const ADMIN_EMAILS = ['ariane.lignier@gmail.com']
