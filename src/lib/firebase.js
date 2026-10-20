// Lazy Firebase setup: the SDK is only downloaded on pages that need it
// (Insights and the admin area), so the rest of the site stays light.
import { firebaseConfig, ADMIN_EMAILS } from '../firebase.config'

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)
export const isAdminEmail = (email) => ADMIN_EMAILS.includes((email || '').toLowerCase())

let ready
export function getFirebase() {
  if (!isFirebaseConfigured) return Promise.reject(new Error('Firebase is not configured.'))
  if (!ready) {
    ready = Promise.all([import('firebase/app'), import('firebase/auth'), import('firebase/firestore')]).then(
      ([appMod, authMod, fsMod]) => {
        const app = appMod.initializeApp(firebaseConfig)
        return { auth: authMod.getAuth(app), db: fsMod.getFirestore(app), authMod, fsMod }
      },
    )
  }
  return ready
}
