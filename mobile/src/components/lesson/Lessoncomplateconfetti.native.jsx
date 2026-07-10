// LessonCompleteConfetti.jsx
// React Native / Expo version
//
// SETUP (run once in project root, inside your mobile/ or app folder):
//   npx expo install react-native-confetti-cannon
//
// Usage in SnackLesson screen:
//
//   import LessonCompleteConfetti from "../components/LessonCompleteConfetti";
//
//   const [showConfetti, setShowConfetti] = useState(false);
//
//   function handleLessonComplete() {
//     setShowConfetti(true);
//     // ...rest of your completion logic (save score, navigate, etc)
//   }
//
//   return (
//     <View style={{ flex: 1 }}>
//       {/* your screen content */}
//       {showConfetti && (
//         <LessonCompleteConfetti onDone={() => setShowConfetti(false)} />
//       )}
//     </View>
//   );

import React from "react";
import { StyleSheet } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

export default function LessonCompleteConfetti({ onDone }) {
  return (
    <ConfettiCannon
      count={120}
      origin={{ x: 200, y: -20 }}
      fadeOut
      colors={["#7c3aed", "#ec4899", "#facc15"]}
      onAnimationEnd={onDone}
      style={styles.overlay}
    />
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});

// --- Simple toast to pair with it (optional) ---
// import { View, Text, StyleSheet } from "react-native";
//
// export function CompletionToast({ message = "Lesson complete! 🎉", show }) {
//   if (!show) return null;
//   return (
//     <View style={toastStyles.toast}>
//       <Text style={toastStyles.text}>{message}</Text>
//     </View>
//   );
// }
//
// const toastStyles = StyleSheet.create({
//   toast: {
//     position: "absolute",
//     bottom: 40,
//     alignSelf: "center",
//     backgroundColor: "#1f2937",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   text: { color: "#fff", fontSize: 14 },
// });
