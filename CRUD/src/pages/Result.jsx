import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { totalQuestions, correct, wrong, category } = location.state || {
        totalQuestions: 0,
        correct: 0,
        wrong: 0,
        category: 'Unknown',
    };

    const scorePercentage = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;

    let performance = 'Needs Work';
    if (scorePercentage >= 90) performance = 'Excellent';
    else if (scorePercentage >= 70) performance = 'Good';
    else if (scorePercentage >= 50) performance = 'Average';

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8 text-center mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Results</h2>
            <p className="text-gray-500 mb-8">Category: {category}</p>

            <div className="mb-8">
                <div className="text-5xl font-bold text-blue-600 mb-2">{scorePercentage}%</div>
                <div className="text-xl font-medium text-gray-700">{performance}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <div className="text-2xl font-bold text-green-600">{correct}</div>
                    <div className="text-sm text-green-800">Correct</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <div className="text-2xl font-bold text-red-600">{wrong}</div>
                    <div className="text-sm text-red-800">Wrong</div>
                </div>
            </div>

            <div className="flex flex-col space-y-3">
                <button
                    onClick={() => navigate(`/quiz/${category}`)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                    Play Again
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default Result;
