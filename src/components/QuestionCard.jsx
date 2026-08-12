function QuestionCard({ question, onAnswer, selectedAnswer, disabled }) {
  return (
    <div className="question-card">
      <div className="question-number">Question</div>

      <h2>{question.question}</h2>

      <div className="options">
        {question.options.map((option, i) => (
          <button
            key={option}
            className={`answer-button${selectedAnswer === option ? " selected" : ""}`}
            style={{ animationDelay: `${i * 80}ms` }}
            onClick={() => onAnswer(option)}
            disabled={disabled}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
