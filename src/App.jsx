import { useState } from "react";
import confetti from "canvas-confetti";

import { questions } from "./data/questions";
import FloatingHearts from "./components/FloatingHearts";
import QuestionCard from "./components/QuestionCard";
import Reaction from "./components/Reaction";
import PhotoGallery from "./components/PhotoGallery";
import TypewriterText from "./components/TypewriterText";
import CurtainScreen from "./components/CurtainScreen";

import heroPhoto from "./assets/images/photo-silhouette.jpg";

// Set to true to enable the countdown curtain; false to skip it entirely
const CURTAIN_ENABLED = true;

const LOVE_NOTE =
  "I am really glad we found each other. From the moment we met, I knew this was something special. You bring so much warmth, laughter and calm into my life — and I hope I do the same for yours. You deserve all the happiness in the world, Teena, and I promise to do my best to give you just that. Wishing you the most beautiful year ahead. Can't wait for everything that is still to come for us. Khup khup shubhechha! ✨";

function miniConfetti() {
  confetti({
    particleCount: 60,
    spread: 70,
    origin: { y: 0.65 },
    colors: ["#ff8fb5", "#ffb7d5", "#dca6ff", "#ffd6e8"],
    scalar: 0.8,
  });
}

function App() {
  const [curtainDone, setCurtainDone] = useState(!CURTAIN_ENABLED);
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [reaction, setReaction] = useState(null);
  const [finished, setFinished] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const wrongMessages = [
    "Arre Teena, think again!",
    "That's not it — you know this one.",
    "Wrong, but still proud of you. Try again.",
    "Come on, you know me better than that.",
    "Really? Look at those options again.",
    "Almost there — one more try.",
  ];

  const correctMessages = [
    "Yes! I knew you'd get that.",
    "See? You know me so well.",
    "That's exactly it, Teena.",
    "This is why I'm marrying you.",
    "Correct! You always know.",
  ];

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);

    const correct = answer === questions[currentQuestion].answer;

    if (correct) {
      const message =
        correctMessages[Math.floor(Math.random() * correctMessages.length)];

      setReaction({ type: "correct", message });
      miniConfetti();

      setTimeout(() => {
        if (currentQuestion === questions.length - 1) {
          setFinished(true);

          confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.6 },
            colors: ["#ff8fb5", "#ffb7d5", "#dca6ff", "#ffd6e8"],
          });
        } else {
          setCurrentQuestion((prev) => prev + 1);
          setSelectedAnswer("");
          setReaction(null);
        }
      }, 1200);
    } else {
      const message =
        wrongMessages[Math.floor(Math.random() * wrongMessages.length)];

      setReaction({ type: "wrong", message });

      setTimeout(() => {
        setReaction(null);
        setSelectedAnswer("");
      }, 1800);
    }
  };

  if (!curtainDone) {
    return <CurtainScreen onOpen={() => setCurtainDone(true)} />;
  }

  if (finished && showGallery) {
    return (
      <main className="app app-gallery">
        <FloatingHearts />
        <section className="gallery-screen">
          <p className="eyebrow">Us, always</p>
          <PhotoGallery />
        </section>
      </main>
    );
  }

  if (finished) {
    return (
      <main className="app">
        <FloatingHearts />

        <section className="birthday-card final-card">
          <p className="eyebrow">See? You know me well</p>

          <h1>
            Happy Birthday,
            <span>Teena</span>
          </h1>

          <div className="birthday-note">
            <span>💌</span>
            <p>
              <TypewriterText text={LOVE_NOTE} delay={400} speed={22} />
            </p>
          </div>

          <button
            className="primary-button"
            style={{ marginTop: "20px" }}
            onClick={() => setShowGallery(true)}
          >
            See our photos
          </button>
        </section>
      </main>
    );
  }

  if (!started) {
    return (
      <main className="app">
        <FloatingHearts />

        <section className="birthday-card intro-card">
          <div className="intro-photo-wrapper">
            <img src={heroPhoto} alt="Teena" className="intro-photo" />
          </div>

          <p className="eyebrow">Happy Birthday, Teena</p>

          <h1>
            Teena,
            <span>this one's for you</span>
          </h1>

          <p className="intro-text">
            I know you, and you know me — so before you get your surprise,
            let's prove it. Answer these and I promise it's worth it.
          </p>

          <div className="warning">
            ⚠️ Wrong answers will deeply hurt my feelings.
          </div>

          <button className="primary-button pulse-button" onClick={() => setStarted(true)}>
            Okay, let's go
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="app">
      <FloatingHearts />

      <section className="game-container">
        <div className="top-bar">
          <div>
          </div>

          <div className="progress">
            {currentQuestion + 1}/{questions.length}
          </div>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <QuestionCard
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
          selectedAnswer={selectedAnswer}
          disabled={Boolean(reaction)}
        />

        <Reaction type={reaction?.type} message={reaction?.message} />
      </section>
    </main>
  );
}

export default App;
