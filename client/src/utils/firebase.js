const getEnvVar = (key, fallback) => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  return fallback;
};

const firebaseConfig = {
  apiKey: getEnvVar('VITE_FIREBASE_API_KEY', 'AIzaSyDemoKeyMudraLearn12345'),
  authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN', 'mudra-learn.firebaseapp.com'),
  projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID', 'mudra-learn'),
  storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET', 'mudra-learn.appspot.com'),
  messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID', '109876543210'),
  appId: getEnvVar('VITE_FIREBASE_APP_ID', '1:109876543210:web:mudra12345learn')
};

export const firebaseAuthService = {
  async loginWithEmail(email, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          uid: 'user_' + btoa(email).substring(0, 10),
          email,
          displayName: email.split('@')[0],
          photoURL: null
        };
        resolve(user);
      }, 400);
    });
  },

  async signUpWithEmail(name, email, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          uid: 'user_' + Math.random().toString(36).substring(2, 9),
          email,
          displayName: name || email.split('@')[0],
          photoURL: null
        };
        resolve(user);
      }, 400);
    });
  },

  async signInWithGoogle() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          uid: 'google_user_' + Date.now(),
          displayName: 'Google Learner',
          email: 'google.learner@gmail.com',
          photoURL: 'https://lh3.googleusercontent.com/a/default-user'
        };
        resolve(user);
      }, 500);
    });
  },

  async loginAsGuest() {
    return {
      uid: 'guest_' + Date.now(),
      displayName: 'Guest Learner',
      email: 'guest@mudralearn.org',
      isGuest: true
    };
  }
};

export const onAuthChange = (callback) => {
  return () => {};
};

export const signOutUser = async () => {
  return Promise.resolve();
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
