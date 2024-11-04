import React, { useState, useEffect } from "react";
import "./App.css";

const questions = [
  "최근에 기분이 자주 다운되나요?",
  "자신이 외롭다고 느끼나요?",
  "요즘 즐거운 일이 많나요?",
];

const App = () => {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState(""); // 결과 상태 추가

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

  // 점수에 따른 결과 계산
  const calculateResult = (finalScore) => {
    if (finalScore < 4) {
      return "우울";
    } else if (finalScore <= 6) {
      return "보통";
    } else {
      return "행복";
    }
  };

  // 완료 버튼 클릭 시 결과 표시
  const handleComplete = () => {
    const finalResult = calculateResult(score);
    setResult(finalResult);
    alert(`총 점수: ${score} - 결과: ${finalResult}`);
  };

  return (
    <div className="app-container">
      <h1>심리 테스트</h1>
      {currentQuestionIndex < questions.length ? (
        <div>
          <h2>{questions[currentQuestionIndex]}</h2>
          <button onClick={() => updateScore(1)}>그렇다</button>
          <button onClick={() => updateScore(2)}>보통이다</button>
          <button onClick={() => updateScore(3)}>그렇지 않다</button>
        </div>
      ) : (
        <div className="result-container">
          <h2>테스트 완료!</h2>
          <p>총 점수: {score}</p>
          <p>
            결과: <span className="result">{result}</span>
          </p>
          <button onClick={handleComplete}>결과 보기</button>
        </div>
      )}
    </div>
  );
};

export default App;
