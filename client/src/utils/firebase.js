import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth';

const getEnvVar = (key, fallback) => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  return fallback;
};

const firebaseConfig = {
  apiKey: getEnvVar('VITE_FIREBASE_API_KEY', ''),
  authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN', 'mudralearn.firebaseapp.com'),
  projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID', 'mudralearn'),
  storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET', 'mudralearn.firebasestorage.app'),
  messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID', '160972145012'),
  appId: getEnvVar('VITE_FIREBASE_APP_ID', '1:160972145012:web:8256da2ef45d4b77562c21')
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const firebaseAuthService = {
  async loginWithEmail(email, password) {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res.user;
    } catch (err) {
      console.error('Firebase Email Login Error:', err.code, err.message);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        throw new Error('Invalid email or password. Please check your credentials or click Sign Up.');
      }
      throw new Error(err.message || 'Authentication failed.');
    }
  },

  async signUpWithEmail(name, email, password) {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (name && res.user) {
        await updateProfile(res.user, { displayName: name });
      }
      return {
        uid: res.user.uid,
        email: res.user.email,
        displayName: name || res.user.displayName || email.split('@')[0],
        photoURL: res.user.photoURL
      };
    } catch (err) {
      console.error('Firebase Email Signup Error:', err.code, err.message);
      if (err.code === 'auth/email-already-in-use') {
        throw new Error('An account with this email already exists. Please Sign In instead.');
      } else if (err.code === 'auth/weak-password') {
        throw new Error('Password should be at least 6 characters long.');
      }
      throw new Error(err.message || 'Registration failed.');
    }
  },

  async signInWithGoogle() {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      return {
        uid: res.user.uid,
        displayName: res.user.displayName || 'Google Learner',
        email: res.user.email,
        photoURL: res.user.photoURL
      };
    } catch (err) {
      console.error('Google Sign-In Popup Error:', err.code, err.message);
      if (err.code === 'auth/popup-closed-by-user') {
        throw new Error('Google Sign-In popup was closed. Please try again.');
      } else if (err.code === 'auth/unauthorized-domain') {
        throw new Error('Domain not authorized in Firebase Console. Please add your Vercel URL to Authorized Domains.');
      }
      throw new Error('Google Sign-In failed: ' + (err.message || 'Please try email sign in.'));
    }
  },

  async loginAsGuest() {
    return {
      uid: 'guest_' + Date.now(),
      displayName: 'Guest Learner',
      email: 'guest@islbuddy.org',
      isGuest: true
    };
  }
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const signOutUser = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (e) {
    console.warn('Sign out error:', e);
  }
};

export const firestoreService = {
  async saveUserProgress(userId, progress) {
    try {
      localStorage.setItem(`mudra_cloud_progress_${userId}`, JSON.stringify(progress));
    } catch (err) {
      console.warn('Firestore sync error:', err);
    }
  },

  async getUserProgress(userId) {
    try {
      const data = localStorage.getItem(`mudra_cloud_progress_${userId}`);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      return null;
    }
  }
};
