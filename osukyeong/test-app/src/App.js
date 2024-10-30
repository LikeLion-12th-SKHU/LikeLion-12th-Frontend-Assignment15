import React, { useState, useEffect } from "react";
import './App.css'; 

const questions = [
  "김치찌개를 좋아하나요?",
  "야구를 좋아하나요?",
  "멋사를 좋아하나요?",
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

  const getResultMessage = () => {
    if (score <= 3) return "바보";
    if (score > 3 && score <= 5) return "멍청이";
    return "똥멍청이";
  };

  const handleComplete = () => {
    alert(`총 점수: ${score}\n 결과: ${getResultMessage()}`);
    localStorage.removeItem("score");
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  return (
    <div style={styles.container}>
      <div className="background">
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
        <div className="cloud cloud3"></div>
      </div>
      <h1 style={styles.title}>점수 계산기</h1>
      {currentQuestionIndex < questions.length ? (
        <div style={styles.questionContainer}>
          <h2 style={styles.question}>{questions[currentQuestionIndex]}</h2>
          <button style={styles.button} onClick={() => updateScore(1)}>
            그렇다 💖 (+1)
          </button>
          <button style={styles.button} onClick={() => updateScore(2)}>
            보통이다 😐 (+2)
          </button>
          <button style={styles.button} onClick={() => updateScore(3)}>
            그렇지 않다 🙅 (+3)
          </button>
        </div>
      ) : (
        <div style={styles.resultContainer}>
          <h2>모든 질문이 완료되었습니다.</h2>
          <button style={styles.completeButton} onClick={handleComplete}>
            결과 확인 👀
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    height: "100vh",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
  },
  title: {
    fontSize: "40px",
    marginBottom: "20px",
    color: "#ffffff",
    textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)",
  },
  questionContainer: {
    textAlign: "center",
    backgroundColor: "#FFFDF1",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    animation: "shake 0.5s",
  },
  question: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#000000", 
  },
  button: {
    margin: "10px",
    padding: "15px 30px",
    fontSize: "18px",
    backgroundColor: "#497248",
    color: "#ffffff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.2s ease, background-color 0.3s ease",
    fontWeight: "bold",
  },
  completeButton: {
    padding: "15px 30px",
    fontSize: "20px",
    backgroundColor: "#39553F",
    color: "#ffffff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    marginTop: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.2s ease, background-color 0.3s ease",
  },
  resultContainer: {
    textAlign: "center",
    padding: "30px",
    backgroundColor: "#FEFCF0",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  },
};

export default App;
