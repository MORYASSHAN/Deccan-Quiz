import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizData } from '../data/quizData';

const Quiz = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);

    const quiz = quizData.find((q) => q.category === category);

    if (!quiz) {
        return <div className="text-center mt-10 text-red-500">Quiz not found!</div>;
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const totalQuestions = quiz.questions.length;

    const handleAnswerSelect = (option) => {
        setSelectedAnswer(option);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer === currentQuestion.answer) {
            setScore(score + 1); // Increment raw score count (internal logic)
            setCorrectAnswers(correctAnswers + 1);
        } else {
            setWrongAnswers(wrongAnswers + 1);
        }

        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < totalQuestions) {
            setCurrentQuestionIndex(nextIndex);
            setSelectedAnswer(null);
        } else {
            // Logic for when quiz ends needs to pass updated state
            // We need to calculate the *final* counters because setState is async
            const finalCorrect = selectedAnswer === currentQuestion.answer ? correctAnswers + 1 : correctAnswers;
            const finalWrong = selectedAnswer !== currentQuestion.answer ? wrongAnswers + 1 : wrongAnswers;

            finishQuiz(finalCorrect, finalWrong);
        }
    };

    const finishQuiz = (finalCorrect, finalWrong) => {
        navigate('/result', {
            state: {
                totalQuestions,
                correct: finalCorrect,
                wrong: finalWrong,
                category
            }
        });
    };

    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 mt-4">
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-500">
                        Question {currentQuestionIndex + 1} of {totalQuestions}
                    </span>
                    <span className="text-sm font-medium text-blue-600">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">{currentQuestion.question}</h2>

            <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerSelect(option)}
                        className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${selectedAnswer === option
                            ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium ring-2 ring-blue-200'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                            }`}
                    >
                        {option}
                    </button>
                ))}
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswer}
                    className={`py-2 px-6 rounded-lg font-medium transition-colors duration-200 ${selectedAnswer
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    {currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
            </div>
        </div>
    );
};

export default Quiz;
