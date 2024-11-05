// // import React, { useEffect, useState } from "react";

// // function App() {
// //   const [userId, setUserId] = useState("");

// //   const controlLocalStorage = () => {
// //     localStorage.setItem("userId", "asjh54");
// //   };

// //   useEffect(() => {
// //     controlLocalStorage();
// //     const storedUserId = localStorage.getItem("userId");
// //     if (storedUserId) {
// //       setUserId(storedUserId);
// //     }
// //   }, []);

// //   return (
// //     <div className='App'>
// //       <p>User ID: {userId}</p>
// //     </div>
// //   );
// // }

// // export default App;

// import React, { useEffect, useState } from "react";

// const questions = ["김치찌개", "야구", "멋사"];

// const App = () => {
//   const [score, setScore] = useState(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   useEffect(() => {
//     const savedScore = localStorage.getItem("score");
//     if (savedScore) {
//       setScore(Number(savedScore));
//     }
//   }, []);

//   const updateScore = (weight) => {
//     const newScore = score + weight;
//     setScore(newScore);
//     localStorage.setItem("score", newScore);
//     setCurrentQuestionIndex(currentQuestionIndex + 1);
//   };

//   const handeleComplete = () => {
//     alert(`총 점수: ${score}`);
//   };

//   return (
//     <div>
//       <h1>점수 계산기</h1>
//       {currentQuestionIndex < questions.length ? (
//         <div>
//           <h2>{questions[currentQuestionIndex]}</h2>
//           <button onClick={() => updateScore(1)}>그렇다 (가중치: 1)</button>
//           <button onClick={() => updateScore(2)}>보통이다 (가중치: 2)</button>
//           <button onClick={() => updateScore(3)}>
//             그렇지 않다 (가중치: 3)
//           </button>
//         </div>
//       ) : (
//         <div>
//           <h2>모든 질문이 완료되었습니다!</h2>
//           <button onClick={handeleComplete}>완료</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
import "./App.css";

const questions = [
  "나는 음악을 많이 듣는다",
  "나는 음악을 사랑한다",
  "나는 다양한 장르의 음악을 듣는다",
];

const App = () => {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const savedScore = localStorage.getItem("score");
    if (savedScore) {
      setScore(Number(savedScore));
    }
  }, []);

  const updateScore = (weight) => {
    const newScore = score + weight;
    setScore(newScore);
    localStorage.setItem("score", newScore);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleComplete = () => {
    let result;
    if (score <= 3) {
      result = "일반 리스너";
    } else if (score <= 5) {
      result = "음잘알";
    } else {
      result = "모차르트";
    }
    alert(`총 점수: ${score} - 결과: ${result}`);

    localStorage.clear();
  };

  return (
    <div className='App'>
      <h1>점수 계산기</h1>
      {currentQuestionIndex < questions.length ? (
        <div>
          <h2>{questions[currentQuestionIndex]}</h2>
          <button
            onClick={() => updateScore(1)}
            className='btn'>
            그렇다 (가중치: 1)
          </button>
          <button
            onClick={() => updateScore(2)}
            className='btn'>
            보통이다 (가중치: 2)
          </button>
          <button
            onClick={() => updateScore(3)}
            className='btn'>
            그렇지 않다 (가중치: 3)
          </button>
        </div>
      ) : (
        <div>
          <h2>모든 질문이 완료되었습니다!</h2>
          <button
            onClick={handleComplete}
            className='btn'>
            완료
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
