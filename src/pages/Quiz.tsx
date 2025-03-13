import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';

export const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number | string }>({});

  const handleSliderChange = (value: number) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: value }));
  };

  const handleMultipleChoiceSelect = (value: string) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      navigate('/results');
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-2">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">{question.text}</h2>
        </div>

        {question.type === 'slider' ? (
          <div className="mb-8">
            <input
              type="range"
              min="1"
              max="10"
              value={answers[question.id] as number || 5}
              onChange={(e) => handleSliderChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Not at all</span>
              <span>Very much</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            {question.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleMultipleChoiceSelect(option)}
                className={`w-full text-left p-4 rounded-lg border ${
                  answers[question.id] === option
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={handleNext}
          className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
        </button>
      </div>
    </div>
  );
};