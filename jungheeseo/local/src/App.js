import React, { useState, useEffect } from "react";
import styled from "styled-components";

const questions = [
  "여행을 갈 때 세부적인 계획을 미리 세워두나요?",
  "일정을 미리 세우고 그에 맞춰 진행하는 편인가요?",
  "계획한 일정을 벗어나면 스트레스를 받는 편인가요?",
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
      result = "계획적인 성향";
    } else if (score <= 5) {
      result = "균형 잡힌 성향 ";
    } else {
      result = "유연한 성향";
    }
    alert(`총 점수: ${score}\n결과: ${result}`);

    setScore(0); // 점수 초기화
    setCurrentQuestionIndex(0); // 질문 인덱스 초기화
    localStorage.removeItem("score"); // 로컬 스토리지에서 점수 삭제
  };

  return (
    <Container>
      {currentQuestionIndex < questions.length ? (
        <QuestionContainer>
          <Question>{questions[currentQuestionIndex]}</Question>
          <Button onClick={() => updateScore(1)}>그렇다 (+1)</Button>
          <Button onClick={() => updateScore(2)}>보통이다 (+2)</Button>
          <Button onClick={() => updateScore(3)}>그렇지 않다 (+3)</Button>
        </QuestionContainer>
      ) : (
        <ResultContainer>
          <ResultText>모든 설문이 완료되었습니다!</ResultText>
          <Button onClick={handleComplete}>완료</Button>
        </ResultContainer>
      )}
    </Container>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const QuestionContainer = styled.div`
  text-align: center;
`;

const Question = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const Button = styled.button`
  color: black;
  padding: 0.5rem 1rem;
  margin: 1rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #dcdcdc;
  }
`;

const ResultContainer = styled.div`
  text-align: center;
`;

const ResultText = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;
