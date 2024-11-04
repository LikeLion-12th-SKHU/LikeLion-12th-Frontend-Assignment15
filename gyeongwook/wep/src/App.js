import React, { useEffect, useState } from "react";
import "./App.css";

// function App() {
//   const [userId, setUserId] = useState("");

//   const controlLocalStorage = () => {
//     localStorage.setItem("userId", "adjh54");
//   };

//   useEffect(() => {
//     controlLocalStorage();
//     const storedUserId = localStorage.getItem("userId");
//     if (storedUserId) {
//       setUserId(storedUserId);
//     }
//   }, []);

//   return (
//     <div className="App">
//       <p>User ID:{userId}</p>
//     </div>
//   );
// }

// export default App;

const questions = [
  "김치찌개를 좋아하나요?",
  "야구를 좋아하나요?",
  "멋사를 좋아하나요?",
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

  const updateScore = (weight) => {
    const newScore = score + weight;
    setScore(newScore);
    localStorage.setItem("score", newScore); // 로컬 스토리지에 점수 저장
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleComplete = () => {
    let finalResult = "";
    if (score <= 3) {
      finalResult = "바보";
    } else if (score > 3 && score <= 5) {
      finalResult = "멍청이";
    } else {
      finalResult = "똥멍청이";
    }
    setResult(finalResult);
    alert(`총 점수 : ${score}\n결과: ${finalResult}`);
    localStorage.removeItem("score"); // 완료 후 점수 초기화
  };

  return (
    <div className="app-container">
      <h1>나만의 테스트</h1>
      {currentQuestionIndex < questions.length ? (
        <div>
          <h2>{questions[currentQuestionIndex]}</h2>
          <button onClick={() => updateScore(1)}>그렇다 (가중치:1)</button>
          <button onClick={() => updateScore(2)}>보통이다 (가중치:2)</button>
          <button onClick={() => updateScore(3)}>그렇지 않다 (가중치:3)</button>
        </div>
      ) : (
        <div>
          <h2>모든 질문이 완료되었습니다!</h2>
          <button onClick={handleComplete}>완료</button>
        </div>
      )}
      {result && <h3>결과: {result}</h3>}
    </div>
  );
};

export default App;
