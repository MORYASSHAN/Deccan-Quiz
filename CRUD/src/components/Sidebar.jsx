import React from 'react'
import { sidebarStyles } from '../assets/dummyStyles'
import questionsData from "../assets/dummydata"
import {toast} from 'react-toastify'
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

  const handelAnswerSelect = (answerIndex) => {
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

  const getAuthHeader=()=>{
    const token =localStorage.getItem('token')||
    localStorage.getItem('authTokem')||null;
  return token? {Authorization: `Bearer ${token}`}:{};
  };

  const submitResult=async()=>{
    if(submittedRef.current) return;
    if(!selectedTech||!selectedLevel) return;

       const payload = {
      title: `${selectedTech.toUpperCase()} - ${
        selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)
      } quiz`,
      technology: selectedTech,
      level: selectedLevel,
      totalQuestions: score.total,
      correct: score.correct,
      wrong: score.total - score.correct,
    };

    try {
      submittedRef.current=true;
      toast.info('Saving your result....');
     const res=await axios.post(`${API_BASE}/api/results`,payload,{

     })
    } catch (err) {
      
    }
  }


  return (
    <div className={sidebarStyles.pageContainer}>

    </div>
  )
}

export default Sidebar
