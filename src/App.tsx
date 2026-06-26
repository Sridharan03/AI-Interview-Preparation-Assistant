import React, { useState, useEffect } from "react";
import InterviewDashboard from "./components/InterviewDashboard";
import InterviewRoom from "./components/InterviewRoom";
import DiagnosticReport from "./components/DiagnosticReport";
import BlueprintCenter from "./components/BlueprintCenter";
import ResumeAnalyzer from "./components/ResumeAnalyzer";
import LearningRoadmap from "./components/LearningRoadmap";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import RecruiterDashboard from "./components/RecruiterDashboard";
import SettingsPage from "./components/SettingsPage";
import GamificationCenter from "./components/GamificationCenter";
import { Question, SessionHistoryItem, InterviewSetupDetails } from "./types";
import { 
  Sparkles, 
  Terminal, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  BookOpen, 
  Award,
  ChevronRight,
  HelpCircle,
  FileText,
  TrendingUp,
  Sliders,
  UserCheck,
  User,
  Settings,
  HelpCircle as QuestionIcon
} from "lucide-react";

export default function App() {
  const [currentView, setCurrentView] = useState<"setup" | "interview" | "results">("setup");
  const [activeTab, setActiveTab] = useState<
    "practice" | "resume" | "roadmap" | "analytics" | "recruiter" | "gamification" | "settings" | "blueprint"
  >("practice");
  
  // App states
  const [questions, setQuestions] = useState<Question[]>([]);
  const [roleAnalysis, setRoleAnalysis] = useState("");
  const [setupDetails, setSetupDetails] = useState<InterviewSetupDetails>({
    role: "AI Software Architect",
    company: "Vercel",
    experienceLevel: "Mid-Level",
    interviewType: "Mixed",
    difficultyLevel: "Medium",
    interviewDuration: 30,
    numQuestions: 5
  });
  const [sessionHistory, setSessionHistory] = useState<SessionHistoryItem[]>([]);

  // Health and connection check
  const [geminiConnected, setGeminiConnected] = useState(false);
  const [isCheckingHealth, setIsCheckingHealth] = useState(true);

  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        const res = await fetch("/api/health");
        const data = await res.json();
        setGeminiConnected(data.geminiConnected || false);
      } catch (err) {
        console.error("Failed to connect to backend health proxy:", err);
        setGeminiConnected(false);
      } finally {
        setIsCheckingHealth(false);
      }
    };
    checkServerHealth();
  }, []);

  // Question generation completed
  const handleQuestionsGenerated = (
    generatedQuestions: Question[], 
    analysisText: string,
    setup: InterviewSetupDetails
  ) => {
    setQuestions(generatedQuestions);
    setRoleAnalysis(analysisText);
    setSetupDetails(setup);
    setCurrentView("interview");
  };

  // Interview completed
  const handleInterviewComplete = (history: SessionHistoryItem[]) => {
    setSessionHistory(history);
    setCurrentView("results");
  };

  // Reset interview
  const handleRestart = () => {
    setQuestions([]);
    setRoleAnalysis("");
    setSessionHistory([]);
    setCurrentView("setup");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans" id="app-root">
      
      {/* Top Professional Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-4 shadow-sm print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row justify-between items-center gap-4">
          
          {/* Logo Brand Accent */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
              <Cpu className="w-5.5 h-5.5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-slate-900 dark:text-white tracking-tight text-base font-sans">
                  SaaS Interview Prep Suite
                </h1>
                <span className="text-[10px] border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono px-1.5 py-0.5 rounded uppercase tracking-wider font-bold">SECURE ENTERPRISE</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Secure Server-Side Gemini LLM Evaluation Proxy</p>
            </div>
          </div>

          {/* Central Workspace Navigation Tabs */}
          <div className="flex flex-wrap justify-center bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-1 rounded-xl gap-1 shrink-0">
            {[
              { id: "practice", label: "Practice Arena", icon: Award },
              { id: "resume", label: "Resume Optimizer", icon: FileText },
              { id: "roadmap", label: "Prep Roadmap", icon: BookOpen },
              { id: "analytics", label: "Improvement Trends", icon: TrendingUp },
              { id: "recruiter", label: "Recruiter View", icon: UserCheck },
              { id: "gamification", label: "Achievements", icon: User },
              { id: "settings", label: "Config Page", icon: Settings },
              { id: "blueprint", label: "Pitch & Slides", icon: Terminal }
            ].map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Status Badges */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-xs">
              <span className={`w-2 h-2 rounded-full ${geminiConnected ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
              <span className="text-slate-600 dark:text-slate-300">
                {isCheckingHealth ? "Checking..." : geminiConnected ? "Proxy Active" : "Local Mock Mode"}
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Workspace View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8 print:p-0">
        
        {activeTab === "practice" && (
          <div>
            {currentView === "setup" && (
              <InterviewDashboard 
                onQuestionsGenerated={handleQuestionsGenerated} 
                geminiConnected={geminiConnected}
              />
            )}

            {currentView === "interview" && (
              <InterviewRoom
                questions={questions}
                roleAnalysis={roleAnalysis}
                setupDetails={setupDetails}
                onInterviewComplete={handleInterviewComplete}
                onExit={handleRestart}
              />
            )}

            {currentView === "results" && (
              <DiagnosticReport
                sessionHistory={sessionHistory}
                setupDetails={setupDetails}
                onRestart={handleRestart}
              />
            )}
          </div>
        )}

        {activeTab === "resume" && (
          <ResumeAnalyzer />
        )}

        {activeTab === "roadmap" && (
          <LearningRoadmap />
        )}

        {activeTab === "analytics" && (
          <AnalyticsDashboard />
        )}

        {activeTab === "recruiter" && (
          <RecruiterDashboard />
        )}

        {activeTab === "gamification" && (
          <GamificationCenter />
        )}

        {activeTab === "settings" && (
          <SettingsPage />
        )}

        {activeTab === "blueprint" && (
          <div className="space-y-8">
            {/* Guide Ribbon */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex items-start gap-3 text-xs text-slate-800 dark:text-slate-200 leading-relaxed shadow-xs">
              <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white">Pitch Deck & Technical Documentation Console:</span>
                <p className="mt-1 text-slate-500 dark:text-slate-400">
                  This console contains the full execution roadmap, 2-minute winning pitch script, 8-slide deck blueprint, PostgreSQL/Drizzle DB schema models, API payloads, and anticipated judge Q&A. Judges can use this panel to assess the startup-grade planning and code architecture immediately.
                </p>
              </div>
            </div>

            <BlueprintCenter />
          </div>
        )}

      </main>

      {/* App Footnote */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 px-4 md:px-8 mt-12 text-center text-xs text-slate-500 dark:text-slate-400 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 AI SaaS Prep Engine. All Rights Reserved.</p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Enterprise Privacy Rules Active</span>
            <span>•</span>
            <span className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold font-mono hover:underline cursor-pointer" onClick={() => setActiveTab("blueprint")}>Developer Console</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
