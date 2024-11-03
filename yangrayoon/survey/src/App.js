import React, { useState, useEffect } from "react";
import "./App.css";
const questions = [
  "김치찌개를 좋아하나요?",
  "야구를 좋아하나요?",
  "멋사를 좋아하나요?",
];

const App = () => {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 점수 가져오기
  useEffect(() => {
    const savedScore = localStorage.getItem("score");
    if (savedScore) {
      setScore(Number(savedScore));
    }
  }, []);

  // 점수를 업데이트하고 로컬 스토리지에 저장하는 함수
  const updateScore = (weight) => {
    const newScore = score + weight;
    setScore(newScore);
    localStorage.setItem("score", newScore);
    setCurrentQuestionIndex(currentQuestionIndex + 1); // 다음 질문으로 이동
  };

  // 완료 버튼 클릭 시 점수 표시
  const handleComplete = () => {
    let message;
    if (score <= 3) {
      message = "총 점수: " + score + " - 바보";
    } else if (score <= 5) {
      message = "총 점수: " + score + " - 멍청이";
    } else {
      message = "총 점수: " + score + " - 똥멍청이";
    }
    alert(message);
  };

  return (
    <div className="app">
      <h1>점수 계산기</h1>
      {currentQuestionIndex < questions.length ? (
        <div className="question-container">
          <h2>{questions[currentQuestionIndex]}</h2>
          <div className="button-container">
            <button onClick={() => updateScore(1)}>그렇다 (1점)</button>
            <button onClick={() => updateScore(2)}>보통이다 (2점)</button>
            <button onClick={() => updateScore(3)}>그렇지 않다 (3점)</button>
          </div>
        </div>
      ) : (
        <div className="completion-container">
          <h2>모든 질문이 완료되었습니다!</h2>
          <button onClick={handleComplete}>완료</button>
        </div>
      )}
    </div>
  );
};

export default App;
