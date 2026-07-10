import { db } from './firebase';
import { collection, addDoc, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import { mockDoubts } from '../utils/mockData';

export const doubtService = {
  async fetchDoubts() {
    try {
      const querySnapshot = await getDocs(collection(db, "doubts"));
      const doubts = [];
      querySnapshot.forEach((doc) => {
        doubts.push({ id: doc.id, ...doc.data() });
      });
      return doubts.length ? doubts : mockDoubts;
    } catch (error) {
      console.warn("Could not query doubts, falling back safely to static data", error);
      return mockDoubts;
    }
  },

  async askDoubt(question, tier = 'AI') {
    try {
      const docRef = await addDoc(collection(db, "doubts"), {
        userNickname: `Learner #${Math.floor(Math.random() * 900) + 100}`,
        question,
        upvotes: 1,
        tier,
        answer: tier === 'AI' ? 'Processing automated instant resolution. Check back in 5 seconds...' : null,
        timestamp: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error("Doubt insertion failed", error);
    }
  },

  async upvoteDoubt(doubtId) {
    try {
      const doubtRef = doc(db, "doubts", doubtId);
      await updateDoc(doubtRef, {
        upvotes: increment(1)
      });
    } catch (error) {
      console.warn("Failed to increment online vote, skipping offline");
    }
  }
};