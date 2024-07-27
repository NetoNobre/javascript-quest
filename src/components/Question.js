import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import '../App.css';

const Question = ({ question, options, handleAnswer, level, explanation, showExplanation, handleNext }) => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <animated.div style={props} className={`question-container ${level}`}>
      <h2>{question}</h2>
      <div>
        {options.map((option, index) => (
          <button key={index} onClick={() => handleAnswer(option)} disabled={showExplanation}>
            {option}
          </button>
        ))}
      </div>
      {showExplanation && (
        <div className="explanation">
          <p>{explanation}</p>
          <button onClick={handleNext}>Próxima Pergunta</button>
        </div>
      )}
    </animated.div>
  );
};

export default Question;
