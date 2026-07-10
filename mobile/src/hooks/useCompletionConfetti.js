// useCompletionConfetti.js
// Drop into src/hooks/useCompletionConfetti.js
//
// SETUP (run once in project root):
//   npm install canvas-confetti
//
// Usage in SnackLesson.jsx or wherever a lesson finishes:
//
//   import { fireCompletionConfetti } from "../hooks/useCompletionConfetti";
//
//   function handleLessonComplete() {
//     fireCompletionConfetti();
//     // ...rest of your completion logic (save score, navigate, etc)
//   }

import confetti from "canvas-confetti";

export function fireCompletionConfetti() {
  confetti({
    particleCount: 120,
    spread: 90,
    origin: { y: 0.6 },
    colors: ["#7c3aed", "#ec4899", "#facc15"],
  });

  // second burst for extra celebration feel
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.7 },
    });
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.7 },
    });
  }, 200);
}

// Optional: simple toast to pair with confetti
// Drop this component near your lesson completion screen
export function CompletionToast({ message = "Lesson complete! 🎉", show }) {
  if (!show) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#1f2937",
        color: "#fff",
        padding: "12px 20px",
        borderRadius: "8px",
        fontSize: "14px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
    >
      {message}
    </div>
  );
}
