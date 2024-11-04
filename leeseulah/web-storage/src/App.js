import React, { useState, useEffect } from "react";
import "./App.css";

const questions = [
  "팀원들에게 먼저 다가가 대화를 시작하는 편인가요?",
  "팀의 목표를 위해 항상 최우선으로 해야 할 일을 정리하는 편인가요?",
  "팀원들의 의견을 적극적으로 듣고 반영하는 것을 중요하게 생각하나요?",
];

const App = () => {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState("");

  // 점수를 초기화하여 0으로 설정
  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 초기화
    setScore(0);
    setCurrentQuestionIndex(0);
    setResult(""); // 결과 초기화
  }, []);

  // 점수를 업데이트하고 다음 질문으로 이동하는 함수
  const updateScore = (weight) => {
    const newScore = score + weight;
    setScore(newScore);
    setCurrentQuestionIndex(currentQuestionIndex + 1);

    // 모든 질문이 끝났을 때 결과 계산
    if (currentQuestionIndex === questions.length - 1) {
      calculateResult(newScore);
    }
  };

  // 점수에 따라 결과를 계산하여 설정
  const calculateResult = (finalScore) => {
    if (finalScore <= 3) {
      setResult("소통형 리더");
    } else if (finalScore <= 5) {
      setResult("목표 지향형 리더");
    } else {
      setResult("지원형 리더");
    }
  };

  return (
    <div className="app-container">
      <h1>당신은 어떤 유형의 리더인가요?</h1>
      {currentQuestionIndex < questions.length ? (
        <div className="box question-container">
          <h2>{questions[currentQuestionIndex]}</h2>
          <div className="button-container">
            <div className="box">
              <button onClick={() => updateScore(1)}>
                그렇지 않다
                <br />
                (1점)
              </button>
            </div>
            <div className="box">
              <button onClick={() => updateScore(2)}>
                보통이다
                <br />
                (2점)
              </button>
            </div>
            <div className="box">
              <button onClick={() => updateScore(3)}>
                그렇다
                <br />
                (3점)
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="box result-container">
          <h3>{result}</h3>
          <p>총 {score}점</p>
        </div>
      )}
    </div>
  );
};

export default App;
