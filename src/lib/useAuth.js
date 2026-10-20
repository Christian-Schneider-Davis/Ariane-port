import { useEffect, useState, useSyncExternalStore } from 'react'
import { getFirebase, isFirebaseConfigured } from './firebase'

const HINT = 'al-signed-in'
export const wasSignedIn = () => {
  try { return localStorage.getItem(HINT) === '1' } catch { return false }
}
const setHint = (on) => {
  try { on ? localStorage.setItem(HINT, '1') : localStorage.removeItem(HINT) } catch { /* ignore */ }
  window.dispatchEvent(new Event(HINT))
}
const subscribeHint = (cb) => {
  window.addEventListener(HINT, cb)
  return () => window.removeEventListener(HINT, cb)
}
/** True when this browser was last signed in (cheap check, doesn't load Firebase). */
export const useSignedInHint = () => useSyncExternalStore(subscribeHint, wasSignedIn, () => false)

export function useAuth() {
  const [state, setState] = useState({ user: null, loading: isFirebaseConfigured })
  useEffect(() => {
    if (!isFirebaseConfigured) return
    let unsub = () => {}
    getFirebase().then(({ auth, authMod }) => {
      unsub = authMod.onAuthStateChanged(auth, (user) => {
        setHint(Boolean(user))
        setState({ user, loading: false })
      })
    })
    return () => unsub()
  }, [])
  return state
}

export async function signIn(email, password) {
  const { auth, authMod } = await getFirebase()
  return authMod.signInWithEmailAndPassword(auth, email.trim(), password)
}
export async function signOutUser() {
  const { auth, authMod } = await getFirebase()
  setHint(false)
  return authMod.signOut(auth)
}
export async function resetPassword(email) {
  const { auth, authMod } = await getFirebase()
  return authMod.sendPasswordResetEmail(auth, email.trim())
}

export function authErrorMessage(err) {
  const code = err?.code || ''
  if (/invalid-credential|wrong-password|user-not-found|invalid-email/.test(code)) return 'That email and password don’t match. Check them and try again.'
  if (code.includes('too-many-requests')) return 'Too many attempts. Wait a few minutes, or reset your password.'
  if (code.includes('network')) return 'No connection. Check your internet and try again.'
  if (code.includes('permission-denied')) return 'This account isn’t allowed to edit articles.'
  return err?.message || 'Something went wrong. Try again.'
}
