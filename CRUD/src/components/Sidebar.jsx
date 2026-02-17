import React, { useState, useEffect, useRef } from 'react';
import { sidebarStyles } from '../assets/dummyStyles'
import questionsData from "../assets/dummydata"
import { toast } from 'react-toastify'
import axios from 'axios'
import { Award, BookOpen, Code, Coffee, Cpu, Database, Globe, Layout, Sparkles, Star, Target, Terminal, Trophy, Zap } from 'lucide-react';

const API_BASE = "http://localhost:4000";

const Sidebar = () => {

  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const submittedRef = useRef(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const asideRef = useRef(null);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    if (window.innerWidth < 768) {
      if (isSidebarOpen) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);


  //tech
  const technologies = [
    {
      id: "html",
      name: "HTML",
      icon: <Globe size={20} />,
      color: "bg-orange-50 text-orange-600 border-orange-200",
    },
    {
      id: "css",
      name: "CSS",
      icon: <Layout size={20} />,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      id: "js",
      name: "JavaScript",
      icon: <Code size={20} />,
      color: "bg-yellow-50 text-yellow-600 border-yellow-200",
    },
    {
      id: "react",
      name: "React",
      icon: <Cpu size={20} />,
      color: "bg-cyan-50 text-cyan-600 border-cyan-200",
    },
    {
      id: "node",
      name: "Node.js",
      icon: <Code size={20} />,
      color: "bg-green-50 text-green-600 border-green-200",
    },
    {
      id: "mongodb",
      name: "MongoDB",
      icon: <Database size={20} />,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
    {
      id: "java",
      name: "Java",
      icon: <Coffee size={20} />,
      color: "bg-red-50 text-red-600 border-red-200",
    },
    {
      id: "python",
      name: "Python",
      icon: <Terminal size={20} />,
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
    {
      id: "cpp",
      name: "C++",
      icon: <Code size={20} />,
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      id: "bootstrap",
      name: "Bootstrap",
      icon: <Layout size={20} />,
      color: "bg-pink-50 text-pink-600 border-pink-200",
    },
  ];

  //levels

  const levels = [
    {
      id: "basic",
      name: "Basic",
      questions: 20,
      icon: <Star size={16} />,
      color: "bg-green-50 text-green-600",
    },
    {
      id: "intermediate",
      name: "Intermediate",
      questions: 40,
      icon: <Zap size={16} />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: "advanced",
      name: "Advanced",
      questions: 60,
      icon: <Target size={16} />,
      color: "bg-purple-50 text-purple-600",
    },
  ];


  const handleTechSelect = (techId) => {
    if (selectedTech === techId) {
      setSelectedTech(null);
      setSelectedLevel(null);
    } else {
      setSelectedTech(techId);
      setSelectedLevel(null);
    }
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    submittedRef.current = false;

    if (window.innerWidth < 768) setIsSidebarOpen(true);

    setTimeout(() => {
      const el = asideRef.current?.querySelector(`[data-tech="${techId}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
  };

  const handleLevelSelect = (levelId) => {
    setSelectedLevel(levelId);
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false)
    submittedRef.current = false;

    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleAnswerSelect = (answerIndex) => {
    const newAnswers = {
      ...userAnswers,
      [currentQuestion]: answerIndex
    };
    setUserAnswers(newAnswers)
    setTimeout(() => {
      if (currentQuestion < getQuestions().length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      }
      else {
        setShowResults(true);
      }
    }, 500)
  }

  const getQuestions = () => {
    if (!selectedTech || !selectedLevel) return [];
    return questionsData[selectedTech]?.[selectedLevel] || [];
  }

  //calculate score

  const calculateScore = () => {
    const questions = getQuestions();
    let correct = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: questions.length
        ? Math.round((correct / questions.length) * 100)
        : 0,
    };
  };

  //reset Quiz

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    submittedRef.current = false;
  }

  const questions = getQuestions();
  const currentQ = questions[currentQuestion];
  const score = calculateScore();


  //performance  logic

  const getPerformanceStatus = () => {
    if (score.percentage >= 90)
      return {
        text: "Outstanding!",
        color: "bg-gradient-to-r from-amber-200 to-amber-300",
        icon: <Sparkles className="text-amber-800" />,
      };
    if (score.percentage >= 75)
      return {
        text: "Excellent!",
        color: "bg-gradient-to-r from-blue-200 to-indigo-200",
        icon: <Trophy className="text-blue-800" />,
      };
    if (score.percentage >= 60)
      return {
        text: "Good Job!",
        color: "bg-gradient-to-r from-green-200 to-teal-200",
        icon: <Award className="text-green-800" />,
      };
    return {
      text: "Keep Practicing",
      color: "bg-gradient-to-r from-gray-200 to-gray-300",
      icon: <BookOpen className="text-gray-800" />,
    };
  };
  const performance = getPerformanceStatus();
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token') ||
      localStorage.getItem('authTokem') || null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const submitResult = async () => {
    if (submittedRef.current) return;
    if (!selectedTech || !selectedLevel) return;

    const payload = {
      title: `${selectedTech.toUpperCase()} - ${selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)
        } quiz`,
      technology: selectedTech,
      level: selectedLevel,
      totalQuestions: score.total,
      correct: score.correct,
      wrong: score.total - score.correct,
    };

    try {
      submittedRef.current = true;
      toast.info('Saving your result....');
      await axios.post(`${API_BASE}/api/results`, payload, {
        headers: getAuthHeader()
      })
    } catch (err) {
      console.warn(err);
    }
  }


  return (
    <div className={sidebarStyles.pageContainer}>
      {/* Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-lg shadow-lg md:hidden hover:bg-indigo-700 transition-colors`}
      >
        {isSidebarOpen ? <Layout size={24} /> : <Layout size={24} />}
      </button>

      {/* Sidebar / Tech Selection */}
      <aside
        ref={asideRef}
        className={`${sidebarStyles.sidebar} ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Layout className="text-white" size={24} />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            TechQuiz
          </h2>
        </div>

        <div className="space-y-4">
          {technologies.map((tech) => (
            <div
              key={tech.id}
              onClick={() => handleTechSelect(tech.id)}
              data-tech={tech.id}
              className={`${sidebarStyles.techItem} ${selectedTech === tech.id
                ? "border-indigo-600 bg-indigo-50 shadow-md transform scale-[1.02]"
                : "border-gray-100 hover:border-indigo-200 hover:bg-gray-50"
                } ${tech.color}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-white bg-opacity-60`}>
                  {tech.icon}
                </div>
                <span className="font-semibold">{tech.name}</span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={sidebarStyles.mainContent}>
        {!selectedTech ? (
          <div className="animate-fadeIn w-full max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 font-sans">
                Explore Quizzes
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Test your knowledge across various technologies. Select a topic below to get started!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 pb-10">
              {technologies.map((tech) => (
                <div
                  key={tech.id}
                  onClick={() => handleTechSelect(tech.id)}
                  className={`
                    group relative bg-white rounded-2xl p-6 cursor-pointer
                    border border-gray-100 shadow-sm hover:shadow-xl
                    transition-all duration-300 transform hover:-translate-y-1
                    overflow-hidden
                  `}
                >
                  <div className={`
                    absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8
                    rounded-full opacity-10 transition-transform group-hover:scale-150
                    ${tech.color.split(' ')[0].replace('bg-', 'bg-')}
                  `}></div>

                  <div className="flex items-center gap-4 mb-4 relative z-10">
                    <div className={`p-3 rounded-xl ${tech.color} bg-opacity-20`}>
                      {React.cloneElement(tech.icon, { size: 32 })}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                        {tech.name}
                      </h3>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Topic
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 relative z-10">
                    <span className="text-sm text-gray-500 font-medium group-hover:text-gray-700">
                      Start Quiz
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : !selectedLevel ? (
          <div className="animate-fadeIn">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
              <span className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                {technologies.find((t) => t.id === selectedTech)?.icon}
              </span>
              Select Difficulty Level
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {levels.map((level) => (
                <div
                  key={level.id}
                  onClick={() => handleLevelSelect(level.id)}
                  className={`${sidebarStyles.levelCard} ${level.color} group`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-white bg-opacity-60 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      {level.icon}
                    </div>
                    <span className="text-sm font-bold opacity-70 bg-white bg-opacity-40 px-3 py-1 rounded-full">
                      {level.questions} Q
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{level.name}</h3>
                  <p className="opacity-80 font-medium">start quiz &rarr;</p>
                </div>
              ))}
            </div>
          </div>
        ) : !showResults ? (
          <div className="max-w-3xl mx-auto animate-fadeIn">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div>
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Question {currentQuestion + 1}/{questions.length}
                </span>
                <h2 className="text-lg font-bold text-gray-800 mt-1">
                  {selectedTech.toUpperCase()} -{" "}
                  {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}
                </h2>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-lg text-indigo-600 font-bold">
                <Target size={20} />
                <span>
                  {Math.round(
                    ((currentQuestion + 1) / questions.length) * 100
                  )}
                  %
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-gray-100 rounded-full mb-8 overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-500 ease-out rounded-full"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              />
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-indigo-50/50 border border-gray-100 overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
                  {currentQ?.question}
                </h3>

                <div className="space-y-4">
                  {currentQ?.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`${sidebarStyles.optionButton} ${userAnswers[currentQuestion] === index
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md ring-2 ring-indigo-100"
                        : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                        }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-colors border-2 ${userAnswers[currentQuestion] === index
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-500 group-hover:border-indigo-300"
                        }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1 text-left font-medium text-lg">
                        {option}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center animate-fadeIn">
            <div className={`${sidebarStyles.resultCard} mb-8`}>
              <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${performance.color} shadow-lg animate-bounce-slow`}>
                {performance.icon}
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                {performance.text}
              </h2>
              <p className="text-gray-500 text-lg mb-8">
                You completed the {selectedTech.toUpperCase()} quiz!
              </p>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {score.correct}
                  </div>
                  <div className="text-sm font-medium text-green-700">
                    Correct
                  </div>
                </div>
                <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                  <div className="text-3xl font-bold text-red-600 mb-1">
                    {score.total - score.correct}
                  </div>
                  <div className="text-sm font-medium text-red-700">
                    Wrong
                  </div>
                </div>
                <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                  <div className="text-3xl font-bold text-indigo-600 mb-1">
                    {score.percentage}%
                  </div>
                  <div className="text-sm font-medium text-indigo-700">
                    Score
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="px-8 py-3 bg-white border-2 border-indigo-100 text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                Try Another Level
              </button>
              <button
                onClick={submitResult}
                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300 flex items-center gap-2"
              >
                <Trophy size={20} />
                Save Result
              </button>
            </div>
          </div>
        )}
      </main>

    </div>
  )
}

export default Sidebar