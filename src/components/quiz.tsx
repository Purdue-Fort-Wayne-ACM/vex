import React, { JSX, useState } from 'react';
import { Check, AlertTriangle } from 'lucide-react';

// Type definitions
export interface QuizComponentProps {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  onAnswerSelected?: (isCorrect: boolean) => void;
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ 
  question, 
  options, 
  correctAnswer, 
  explanation,
  onAnswerSelected 
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const handleAnswerClick = (optionIndex: number): void => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);
    
    if (onAnswerSelected) {
      onAnswerSelected(optionIndex === correctAnswer);
    }
  };

  const getOptionStyle = (index: number): string => {
    if (selectedAnswer === null) {
      return "border-gray-200 dark:bg-zinc-900 hover:border-blue-300 hover:bg-blue-50 cursor-pointer"; 
    }
    
    if (index === correctAnswer) {
      return "border-green-500 bg-green-50 dark:bg-neutral-900 text-green-900";
    }
    
    if (index === selectedAnswer && index !== correctAnswer) {
      return "border-yellow-500 bg-yellow-50 dark:bg-neutral-800 text-yellow-900";
    }
    
    return "border-gray-200 bg-gray-50 dark:bg-zinc-900 text-gray-500";
  };

  const getIcon = (index: number): JSX.Element | null => {
    if (selectedAnswer === null) return null;
    
    if (index === correctAnswer) {
      return (
        <Check 
          className="w-5 h-5 text-green-600 animate-in zoom-in duration-300" 
        />
      );
    }
    
    if (index === selectedAnswer && index !== correctAnswer) {
      return (
        <AlertTriangle 
          className="w-5 h-5 text-yellow-600 animate-in zoom-in duration-300" 
        />
      );
    }
    
    return null;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-main rounded-lg border border-gray-200 shadow-sm">
      {/* Question */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-400 mb-2">
          {question}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-200">
          Select the correct answer below:
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-4">
        {options.map((option: string, index: number) => (
          <div
            key={index}
            onClick={() => handleAnswerClick(index)}
            className={`
              p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-between
              ${getOptionStyle(index)}
              ${selectedAnswer === null ? 'transform hover:scale-[1.02]' : ''}
            `}
          >
            <span className="font-medium">{option}</span>
            <div className="flex items-center">
              {getIcon(index)}
            </div>
          </div>
        ))}
      </div>

      {/* Explanation Dropdown */}
      <div 
        className={`
          overflow-hidden transition-all duration-500 ease-in-out
          ${showExplanation ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="bg-blue-50 dark:bg-neutral-900 rounded-lg p-4 border border-blue-200">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">
                  Correct Answer: {options[correctAnswer]}
                </h4>
                <p className="text-blue-800  text-sm leading-relaxed">
                  {explanation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo Component with sample questions
const QuizInstance: React.FC = (
    {questions=[
    {
      question: "What is the primary purpose of React's useEffect hook?",
      options: [
        "To manage component state",
        "To handle side effects in functional components",
        "To create reusable components",
        "To optimize rendering performance"
      ],
      correctAnswer: 1,
      explanation: "useEffect is designed to handle side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined in class components."
    },
    {
      question: "Which Next.js feature allows you to generate static pages at build time?",
      options: [
        "Server-side Rendering (SSR)",
        "Client-side Rendering (CSR)",
        "Static Site Generation (SSG)",
        "Incremental Static Regeneration (ISR)"
      ],
      correctAnswer: 2,
      explanation: "Static Site Generation (SSG) pre-renders pages at build time, creating static HTML files that can be served quickly by a CDN. This approach is ideal for content that doesn't change frequently and provides excellent performance."
    },
    {
      question: "What is the difference between 'let' and 'const' in JavaScript?",
      options: [
        "let is function-scoped, const is block-scoped",
        "let can be reassigned, const cannot be reassigned",
        "let is hoisted, const is not hoisted",
        "There is no difference"
      ],
      correctAnswer: 1,
      explanation: "The key difference is that 'let' allows reassignment of the variable while 'const' does not. Both are block-scoped and both are hoisted (but in a temporal dead zone). const creates an immutable binding, meaning you cannot reassign the variable, though the contents of objects and arrays can still be modified."
    }
  ]} : {questions?:Question[]}) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [totalAnswered, setTotalAnswered] = useState<number>(0);

  const handleAnswerSelected = (isCorrect: boolean): void => {
    setTotalAnswered(prev => prev + 1);
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = (): void => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const resetQuiz = (): void => {
    setCurrentQuestion(0);
    setScore(0);
    setTotalAnswered(0);
  };

  return (
    <div className="max-w-5xl w-11/12 mx-auto p-6 bg-main rounded-lg shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200 mb-2">
            Educational Quiz Component
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Interactive quizzes with animations and explanations
          </p>
          
          {totalAnswered > 0 && (
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-100 rounded-full">
              <span className="text-blue-800 font-medium">
                Score: {score}/{totalAnswered}
              </span>
            </div>
          )}
        </div>

        <QuizComponent
          key={currentQuestion} // Force re-render when question changes
          question={questions[currentQuestion].question}
          options={questions[currentQuestion].options}
          correctAnswer={questions[currentQuestion].correctAnswer}
          explanation={questions[currentQuestion].explanation}
          onAnswerSelected={handleAnswerSelected}
        />

        <div className="flex justify-center mt-8 space-x-4">
          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={nextQuestion}
              disabled={totalAnswered <= currentQuestion}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Next Question
            </button>
          ) : (
            <button
              onClick={resetQuiz}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Start Over
            </button>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>
    </div>
  );
};

export default QuizInstance;