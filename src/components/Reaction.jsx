function Reaction({ type, message }) {
  if (!message) return null;

  return (
    <div className={`reaction reaction-${type}`}>
      <div className="reaction-emoji">
        {type === "wrong" ? "🙈" : "✨"}
      </div>

      <div>
        <strong>
          {type === "wrong" ? "Not quite!" : "That's right!"}
        </strong>

        <p>{message}</p>
      </div>
    </div>
  );
}

export default Reaction;
