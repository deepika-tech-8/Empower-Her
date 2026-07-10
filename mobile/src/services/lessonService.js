import { db } from './firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { mockDataLessons } from '../utils/mockData';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const lessonService = {
  async fetchLesson(lessonId, isOffline = false) {
    if (isOffline) {
      // Fetch from local cache or fall back to mock seed data
      const cached = await AsyncStorage.getItem(`cached_lesson_${lessonId}`);
      if (cached) return JSON.parse(cached);
      return mockDataLessons[lessonId] || mockDataLessons['excel_vlookup'];
    }

    try {
      const lessonRef = doc(db, "lessons", lessonId);
      const lessonSnap = await getDoc(lessonRef);
      if (lessonSnap.exists()) {
        const data = lessonSnap.data();
        await AsyncStorage.setItem(`cached_lesson_${lessonId}`, JSON.stringify(data));
        return data;
      }
      return mockDataLessons[lessonId] || mockDataLessons['excel_vlookup'];
    } catch (error) {
      console.warn("Firestore error, falling back to safe mock payload", error);
      return mockDataLessons[lessonId] || mockDataLessons['excel_vlookup'];
    }
  }
};