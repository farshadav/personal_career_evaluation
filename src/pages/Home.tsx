import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowRight } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-12">
        <Brain className="h-16 w-16 text-indigo-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Discover Your Personal Abilities and Strengths!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Take our comprehensive assessment to uncover your strengths and find your perfect career match
        </p>
        <button
          onClick={() => navigate('/quiz')}
          className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Start Assessment
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">20 Questions</h3>
          <p className="text-gray-600">Carefully crafted questions to assess your strengths and preferences</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Scientific Analysis</h3>
          <p className="text-gray-600">Based on the proven Thomann study methodology</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Personalized Results</h3>
          <p className="text-gray-600">Get detailed insights and career recommendations</p>
        </div>
      </div>
    </div>
  );
};