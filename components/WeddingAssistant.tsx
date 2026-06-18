"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

/* ═══════════════════════════════════════════
   QUIZ DATA
   ═══════════════════════════════════════════ */

type Question = {
  question: string;
  options: string[];
  correctIndex: number;
};

const quizQuestions: Question[] = [
  {
    question: "Who proposed first?",
    options: ["Groom", "Both Together", "Bride", "It Was a Surprise"],
    correctIndex: 2,
  },
  {
    question: "Where did they first meet?",
    options: ["Through Friends", "Workplace", "School/College", "Through Family"],
    correctIndex: 2,
  },
  {
    question: "Which food do they both love?",
    options: ["Pizza", "Biryani", "Pasta", "Ice Cream"],
    correctIndex: 1,
  },
  {
    question: "Who do you think will spend more time getting ready?",
    options: ["Groom", "Neither", "Both", "Bride"],
    correctIndex: 3,
  },
  {
    question: "Who is the better cook?",
    options: ["Both", "Bride", "Groom", "Neither"],
    correctIndex: 1,
  },
  {
    question: "What is the groom's nickname?",
    options: ["Siri", "He doesn't have one", "Sonu", "Sona"],
    correctIndex: 3,
  },
  {
    question: "When is their wedding date?",
    options: ["July 4, 2026", "June 30, 2026", "June 29, 2026", "July 14, 2026"],
    correctIndex: 2,
  },
];

/* ═══════════════════════════════════════════
   STORAGE HELPERS
   ═══════════════════════════════════════════ */

const STORAGE_KEY = "wedding_quiz_state";

type StoredState = {
  completed: boolean;
  bestScore: number;
};

function loadState(): StoredState {
  if (typeof window === "undefined") return { completed: false, bestScore: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as StoredState;
  } catch { /* ignore */ }
  return { completed: false, bestScore: 0 };
}

function saveState(state: StoredState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* ignore */ }
}

/* ═══════════════════════════════════════════
   PROGRESS BAR
   ═══════════════════════════════════════════ */

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="wa-progress-track">
      <motion.div
        className="wa-progress-fill"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════
   FLOATING BUTTON
   ═══════════════════════════════════════════ */

function FloatingButton({ onClick, hasCompleted }: { onClick: () => void; hasCompleted: boolean }) {
  return (
    <motion.button
      className="wa-fab"
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      aria-label="Open Wedding Quiz"
    >
      <span className="wa-fab-text">
        {hasCompleted ? "Quiz Done!" : "Play Quiz"}
      </span>
    </motion.button>
  );
}

/* ═══════════════════════════════════════════
   QUIZ QUESTION
   ═══════════════════════════════════════════ */

function QuizQuestion({
  question,
  index,
  total,
  onAnswer,
}: {
  question: Question;
  index: number;
  total: number;
  onAnswer: (selectedIndex: number) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (optIdx: number) => {
    if (revealed) return;
    setSelected(optIdx);
    setRevealed(true);
    setTimeout(() => onAnswer(optIdx), 900);
  };

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <p className="wa-q-counter">Question {index + 1} of {total}</p>
      <ProgressBar current={index} total={total} />
      <h3 className="wa-q-title">{question.question}</h3>
      <div className="wa-options">
        {question.options.map((opt, i) => {
          let cls = "wa-option";
          if (revealed && i === question.correctIndex) cls += " wa-option--correct";
          else if (revealed && i === selected && i !== question.correctIndex) cls += " wa-option--wrong";
          else if (i === selected) cls += " wa-option--selected";

          return (
            <motion.button
              key={i}
              className={cls}
              onClick={() => handleSelect(i)}
              whileHover={!revealed ? { scale: 1.02 } : {}}
              whileTap={!revealed ? { scale: 0.98 } : {}}
              disabled={revealed}
            >
              {opt}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   QUIZ RESULT
   ═══════════════════════════════════════════ */

function QuizResult({
  score,
  total,
  onPlayAgain,
  onClose,
  guestName,
}: {
  score: number;
  total: number;
  onPlayAgain: () => void;
  onClose: () => void;
  guestName: string | null;
}) {
  useEffect(() => {
    // Fire confetti
    const duration = 2500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#8b7355", "#a0865e", "#d4af37", "#f4f2ef"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#8b7355", "#a0865e", "#d4af37", "#f4f2ef"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  const message = useMemo(() => {
    const pct = score / total;
    if (pct === 1) return "Perfect! You know us so well! 💛";
    if (pct >= 0.8) return "Amazing! You really know our story!";
    if (pct >= 0.6) return "Great job! You know us pretty well!";
    if (pct >= 0.4) return "Not bad! You're getting there!";
    return "You'll get to know us better at the wedding! 😄";
  }, [score, total]);

  return (
    <motion.div
      className="wa-result"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <span className="wa-result-emoji">🎉</span>
      <h3 className="wa-result-title">
        {guestName ? `${guestName}, ` : ""}Congratulations!
      </h3>
      <div className="wa-result-score">
        <span className="wa-result-number">{score}</span>
        <span className="wa-result-divider">/</span>
        <span className="wa-result-number">{total}</span>
      </div>
      <p className="wa-result-msg">{message}</p>
      <div className="wa-result-actions">
        <button className="wa-btn wa-btn--gold" onClick={onPlayAgain}>
          Play Again
        </button>
        <button className="wa-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   COMPLETED STATE
   ═══════════════════════════════════════════ */

function CompletedView({
  bestScore,
  total,
  onPlayAgain,
  onClose,
  guestName,
}: {
  bestScore: number;
  total: number;
  onPlayAgain: () => void;
  onClose: () => void;
  guestName: string | null;
}) {
  return (
    <motion.div
      className="wa-result"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <span className="wa-result-emoji">🏆</span>
      <h3 className="wa-result-title">Quiz Completed</h3>
      {guestName && <p className="wa-result-msg">Welcome back, {guestName}!</p>}
      <div className="wa-result-score">
        <span className="wa-result-number">{bestScore}</span>
        <span className="wa-result-divider">/</span>
        <span className="wa-result-number">{total}</span>
      </div>
      <p className="wa-result-msg" style={{ marginTop: "0.25rem" }}>Your Best Score</p>
      <div className="wa-result-actions">
        <button className="wa-btn wa-btn--gold" onClick={onPlayAgain}>
          Play Again
        </button>
        <button className="wa-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   WELCOME SCREEN
   ═══════════════════════════════════════════ */

function WelcomeScreen({
  guestName,
  onStart,
  onClose,
}: {
  guestName: string | null;
  onStart: () => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="wa-welcome"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <span className="wa-welcome-icon">💍</span>
      <h3 className="wa-welcome-title">Wedding Fun Zone</h3>
      <p className="wa-welcome-text">
        {guestName
          ? `${guestName}, let's see how well you know us!`
          : "Think you know our story? Take our Wedding Quiz and find out!"}
      </p>
      <div className="wa-welcome-actions">
        <button className="wa-btn wa-btn--gold" onClick={onStart}>
          Start Quiz
        </button>
        <button className="wa-btn" onClick={onClose}>
          Maybe Later
        </button>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN ASSISTANT COMPONENT
   ═══════════════════════════════════════════ */

type Screen = "welcome" | "quiz" | "result" | "completed";

export function WeddingAssistant() {
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState<Screen>("welcome");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [stored, setStored] = useState<StoredState>({ completed: false, bestScore: 0 });
  const [guestName, setGuestName] = useState<string | null>(null);

  useEffect(() => {
    setStored(loadState());
    const params = new URLSearchParams(window.location.search);
    const guest = params.get("guest");
    if (guest) setGuestName(decodeURIComponent(guest));
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
    if (stored.completed) {
      setScreen("completed");
    } else {
      setScreen("welcome");
    }
  }, [stored.completed]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleStart = useCallback(() => {
    setQuestionIndex(0);
    setScore(0);
    setScreen("quiz");
  }, []);

  const handleAnswer = useCallback(
    (selectedIndex: number) => {
      const correct = selectedIndex === quizQuestions[questionIndex].correctIndex;
      const newScore = correct ? score + 1 : score;
      if (correct) setScore(newScore);

      if (questionIndex + 1 < quizQuestions.length) {
        setQuestionIndex((prev) => prev + 1);
      } else {
        const newBest = Math.max(stored.bestScore, newScore);
        const newState: StoredState = { completed: true, bestScore: newBest };
        setStored(newState);
        saveState(newState);
        setScreen("result");
      }
    },
    [questionIndex, score, stored.bestScore]
  );

  const handlePlayAgain = useCallback(() => {
    setQuestionIndex(0);
    setScore(0);
    setScreen("quiz");
  }, []);

  return (
    <>
      {/* Floating Action Button */}
      {!open && (
        <FloatingButton onClick={handleOpen} hasCompleted={stored.completed} />
      )}

      {/* Modal Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="wa-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
          >
            <motion.div
              className="wa-modal"
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 30 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button className="wa-close" onClick={handleClose} aria-label="Close quiz">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              <AnimatePresence mode="wait">
                {screen === "welcome" && (
                  <WelcomeScreen
                    key="welcome"
                    guestName={guestName}
                    onStart={handleStart}
                    onClose={handleClose}
                  />
                )}
                {screen === "quiz" && (
                  <QuizQuestion
                    key={`q-${questionIndex}`}
                    question={quizQuestions[questionIndex]}
                    index={questionIndex}
                    total={quizQuestions.length}
                    onAnswer={handleAnswer}
                  />
                )}
                {screen === "result" && (
                  <QuizResult
                    key="result"
                    score={score}
                    total={quizQuestions.length}
                    onPlayAgain={handlePlayAgain}
                    onClose={handleClose}
                    guestName={guestName}
                  />
                )}
                {screen === "completed" && (
                  <CompletedView
                    key="completed"
                    bestScore={stored.bestScore}
                    total={quizQuestions.length}
                    onPlayAgain={handlePlayAgain}
                    onClose={handleClose}
                    guestName={guestName}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
