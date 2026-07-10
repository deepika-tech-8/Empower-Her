import { auth, db } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const authService = {
  async registerUser(email, password, displayName = 'Learner') {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Initialize structured profile to prevent cold-start failures
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: email,
        displayName: displayName,
        registeredAt: new Date().toISOString(),
        momentumScore: 100,
        isPaused: false,
        helperPoints: 0,
        completedLessons: []
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async loginUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async logoutUser() {
    await signOut(auth);
  }
};