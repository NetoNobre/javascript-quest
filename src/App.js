import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Question from './components/Question';
import Score from './components/Score';
import questions from './data/questions';
import './App.css';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [currentLevel, setCurrentLevel] = useState('easy');
  const [timeLeft, setTimeLeft] = useState(10); // Temporizador de 10 segundos para cada pergunta
  const [showExplanation, setShowExplanation] = useState(false);

  const levels = ['easy', 'medium', 'hard'];
  const currentQuestions = questions.filter(q => q.level === currentLevel);

  useEffect(() => {
    if (timeLeft === 0 && !showExplanation) {
      handleAnswer('');
    }

    const timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showExplanation]);

  const handleAnswer = (answer) => {
    if (answer === currentQuestions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < currentQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setTimeLeft(10); // Reinicia o temporizador
    } else if (currentLevel !== 'hard') {
      const nextLevelIndex = levels.indexOf(currentLevel) + 1;
      setCurrentLevel(levels[nextLevelIndex]);
      setCurrentQuestionIndex(0);
      setTimeLeft(10); // Reinicia o temporizador
    } else {
      setShowScore(true);
    }
  };

  const barWidth = useSpring({ width: `${(timeLeft / 10) * 100}%`, from: { width: '100%' } });

  return (
    <div className="App">
      {showScore ? (
        <Score score={score} />
      ) : (
        <>
          <div className="timer-container">
            <div className="timer">
              <animated.div style={barWidth} className="timer-bar" />
              <span>{timeLeft} segundos</span>
            </div>
          </div>
          <Question
            question={currentQuestions[currentQuestionIndex].question}
            options={currentQuestions[currentQuestionIndex].options}
            handleAnswer={handleAnswer}
            level={currentLevel}
            explanation={currentQuestions[currentQuestionIndex].explanation}
            showExplanation={showExplanation}
            handleNext={handleNextQuestion}
          />
        </>
      )}
    </div>
  );
}

export default App;
