import React, { useState, useEffect } from "react";
import "./App.css";

const questions = [
  "혼자 공포영화를 볼수없나요?",
  "바퀴벌레 바로 잡을수없죠?",
  "폐가체험을 못하죠 ㅋ?",
];

const App = () => {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState("");

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

  const calculateResult = () => {
    if (score <= 3) {
      setResult("쫄보 중의 쫄보");
    } else if (score > 3 && score <= 5) {
      setResult("조금 쫄보");
    } else {
      setResult("강심장");
    }
  };

  const handleComplete = () => {
    calculateResult();
    alert(`총 점수: ${score} - 당신은 ${result}입니다!`);
  };

  return (
    <div className="container">
      <h1>쫄보 테스트</h1>
      {currentQuestionIndex < questions.length ? (
        <div>
          <h2>{questions[currentQuestionIndex]}</h2>
          <button onClick={() => updateScore(1)}>그렇다 (가중치: 1)</button>
          <button onClick={() => updateScore(2)}>보통이다 (가중치: 2)</button>
          <button onClick={() => updateScore(3)}>그렇지 않다 (가중치: 3)</button>
        </div>
      ) : (
        <div>
          <h2>모든 질문이 완료되었습니다!</h2>
          <button onClick={handleComplete}>결과 확인</button>
          {result && <h3>당신의 테스트 결과: {result}</h3>}
        </div>
      )}
    </div>
  );
};

export default App;
