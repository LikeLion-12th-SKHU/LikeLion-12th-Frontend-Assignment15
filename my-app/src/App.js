// App.js
import React, { useState, useEffect } from "react";
import "./App.css";

const questions = [
  "5 + 3 = ?",
  "12 - 4 = ?",
  "6 x 2 = ?",
  "15 ÷ 3 = ?",
  "9 + 6 = ?",
];

const correctAnswers = [8, 8, 12, 5, 15];

const App = () => {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const savedScore = localStorage.getItem("score");
    if (savedScore) {
      setScore(Number(savedScore));
    }
  }, []);

  const updateScore = (answer) => {
    const isCorrect = answer === correctAnswers[currentQuestionIndex];
    const weight = isCorrect ? 1 : 0; // +1 for correct answers, +0 for incorrect answers
    const newScore = score + weight;
    setScore(newScore);
    localStorage.setItem("score", newScore);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const getResult = () => {
    if (score <= 3) return "바보";
    if (score > 3 && score <= 5) return "멍청이";
    return "똥멍청이";
  };

  const handleComplete = () => {
    alert(`총 점수: ${score} - 결과: ${getResult()}`);
  };

  return (
    <div className="app-container">
      <h1>나만의 암산 테스트</h1>
      {currentQuestionIndex < questions.length ? (
        <div className="question-container">
          <h2>{questions[currentQuestionIndex]}</h2>
          <button onClick={() => updateScore(8)}>8</button>
          <button onClick={() => updateScore(12)}>12</button>
          <button onClick={() => updateScore(15)}>15</button>
          <button onClick={() => updateScore(5)}>5</button>
        </div>
      ) : (
        <div className="result-container">
          <h2>모든 질문이 완료되었습니다!</h2>
          <p>총 점수: {score}</p>
          <p>결과: {getResult()}</p>
          <button onClick={handleComplete}>완료</button>
        </div>
      )}
    </div>
  );
};

export default App;
