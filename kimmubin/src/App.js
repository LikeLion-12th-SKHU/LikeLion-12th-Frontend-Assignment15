import React, { useState, useEffect } from 'react';
import './App.css'; // Link to your CSS file

const questions = ['수학을 잘하나요?', '영어를 잘하나요?', '코딩을 잘하나요?'];

const App = () => {
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [result, setResult] = useState(null);

    useEffect(() => {
        const savedScore = localStorage.getItem('score');
        if (savedScore) {
            setScore(Number(savedScore));
        }
    }, []);

    const updateScore = (weight) => {
        const newScore = score + weight;
        setScore(newScore);
        localStorage.setItem('score', newScore);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handleComplete = () => {
        let resultText = '';
        if (score <= 3) resultText = '살짝 바보';
        else if (score <= 5) resultText = '바보';
        else resultText = '똥멍청이';

        setResult(resultText);
        alert(`총 점수: ${score}, 결과: ${resultText}`);
    };

    return (
        <div className="app">
            <h1>나만의 바보 테스트</h1>
            {currentQuestionIndex < questions.length ? (
                <div className="question-container">
                    <h2>{questions[currentQuestionIndex]}</h2>
                    <button onClick={() => updateScore(1)}>
                        그렇다 (가중치: 1)
                    </button>
                    <button onClick={() => updateScore(2)}>
                        보통이다 (가중치: 2)
                    </button>
                    <button onClick={() => updateScore(3)}>
                        그렇지 않다 (가중치: 3)
                    </button>
                </div>
            ) : (
                <div className="result-container">
                    <h2>모든 질문이 완료되었습니다!</h2>
                    {result ? <p>결과: {result}</p> : null}
                    <button onClick={handleComplete}>완료</button>
                </div>
            )}
        </div>
    );
};

export default App;
