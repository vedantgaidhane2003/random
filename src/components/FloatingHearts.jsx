const hearts = [
  { icon: "💗", left: "5%",  delay: "0s", duration: "7s"  },
  { icon: "💖", left: "15%", delay: "2s", duration: "9s"  },
  { icon: "💕", left: "28%", delay: "4s", duration: "6s"  },
  { icon: "✨", left: "40%", delay: "1s", duration: "8s"  },
  { icon: "💓", left: "55%", delay: "3s", duration: "10s" },
  { icon: "🌸", left: "70%", delay: "5s", duration: "7s"  },
  { icon: "💗", left: "85%", delay: "2s", duration: "9s"  },
  { icon: "💖", left: "92%", delay: "4s", duration: "8s"  },
];

function FloatingHearts() {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((heart, index) => (
        <span
          key={index}
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
          }}
        >
          {heart.icon}
        </span>
      ))}
    </div>
  );
}

export default FloatingHearts;