import React, { useState } from "react";
import { Question, ResumePreset, InterviewSetupDetails } from "../types";
import { RESUME_PRESETS } from "./ResumePresets";
import { 
  Briefcase, 
  FileText, 
  Sparkles, 
  Cpu, 
  HelpCircle, 
  AlertCircle, 
  Play, 
  ArrowRight,
  Database,
  CheckCircle,
  Clock,
  Building2,
  ListOrdered,
  Gauge,
  Sliders,
  Sparkle
} from "lucide-react";

interface InterviewDashboardProps {
  onQuestionsGenerated: (questions: Question[], roleAnalysis: string, setupDetails: InterviewSetupDetails) => void;
  geminiConnected: boolean;
}

export default function InterviewDashboard({ onQuestionsGenerated, geminiConnected }: InterviewDashboardProps) {
  const [role, setRole] = useState("AI Engineer");
  const [company, setCompany] = useState("Vercel");
  const [experienceLevel, setExperienceLevel] = useState<"Junior" | "Mid-Level" | "Senior">("Mid-Level");
  const [interviewType, setInterviewType] = useState<InterviewSetupDetails["interviewType"]>("Mixed");
  const [difficultyLevel, setDifficultyLevel] = useState<InterviewSetupDetails["difficultyLevel"]>("Medium");
  const [interviewDuration, setInterviewDuration] = useState<number>(30);
  const [numQuestions, setNumQuestions] = useState<number>(5);
  
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const loadingSteps = [
    "Reading resume structure and parsing core experience metrics...",
    "Scanning target job description competencies...",
    "Detecting technology skill gaps and architectural strengths...",
    "Injecting STAR framework criteria parameters...",
    "Contacting Gemini API to compile customized, high-fidelity interview questions...",
    "Formatting responsive speech recognition bindings..."
  ];

  // Apply a preset
  const applyPreset = (preset: ResumePreset) => {
    setRole(preset.role);
    setExperienceLevel(preset.experienceLevel);
    setResumeText(preset.resumeText);
    setJobDescription(preset.jobDescription);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim()) {
      setError("Please paste your resume or apply one of our elite presets below to start!");
      return;
    }

    setIsLoading(true);
    setError(null);
    setLoadingStep(0);

    // Dynamic step updates to keep the user engaged
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepInterval);
        return prev;
      });
    }, 1800);

    try {
      const response = await fetch("/api/interview/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          jobDescription,
          role,
          experienceLevel,
          company,
          interviewType,
          difficultyLevel,
          numQuestions
        })
      });

      if (!response.ok) {
        let errMsg = "Failed to generate questions. Server returned an error.";
        try {
          const errBody = await response.json();
          if (errBody && errBody.error) {
            errMsg = `Server Error: ${errBody.error}`;
          }
        } catch (e) {}
        throw new Error(errMsg);
      }

      const data = await response.json();
      clearInterval(stepInterval);

      if (data.questions && data.questions.length > 0) {
        onQuestionsGenerated(
          data.questions, 
          data.roleAnalysis || "Alignment Analysis: Setup completed.",
          { 
            role, 
            company, 
            experienceLevel, 
            interviewType, 
            difficultyLevel, 
            interviewDuration, 
            numQuestions 
          }
        );
      } else {
        throw new Error("No questions were returned. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please check your network connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in" id="interview-dashboard">
      
      {/* Overview Card */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-black rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Briefcase className="w-56 h-56 rotate-12" />
        </div>
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Next-Generation Prep Engine
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-sans tracking-tight leading-tight text-white">
            Verify Your Real-World Interview Readiness
          </h1>
          <p className="text-slate-400 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
            Upload your resume, select your target role, and let our secure server-side Gemini AI interviewer challenge you. Speak your answers natively using real-time Speech-to-Text and get graded instantly under actual STAR-framework stress parameters.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg text-xs border border-white/10 text-slate-300">
              <span className={`w-2.5 h-2.5 rounded-full ${geminiConnected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`}></span>
              <span>Gemini Connection: <strong className="text-white">{geminiConnected ? "Active Secure Proxy" : "Offline Simulation Mode"}</strong></span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg text-xs border border-white/10 text-slate-300">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Engine Type: <strong className="text-white">Structured JSON Output</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Setup Form (Takes 2 Columns) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-600" /> Customize Interview Settings
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Select your career targets, duration, and difficulty level. The AI interviewer will tailor questions precisely to these attributes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row 1: Role and Company */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-500" /> Target Job Title
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm transition-all duration-200 text-slate-800 dark:text-slate-200 placeholder-slate-400"
                  placeholder="e.g. Frontend Engineer, Product Manager"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-indigo-500" /> Target Company
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm transition-all duration-200 text-slate-800 dark:text-slate-200 placeholder-slate-400"
                  placeholder="e.g. Stripe, Vercel, Google"
                  required
                />
              </div>
            </div>

            {/* Row 2: Exp level & Interview Type */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-indigo-500" /> Experience Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Junior", "Mid-Level", "Senior"] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setExperienceLevel(level)}
                      className={`py-2.5 px-3 border text-xs font-medium rounded-xl transition-all duration-200 cursor-pointer ${
                        experienceLevel === level
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                          : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <Sparkle className="w-3.5 h-3.5 text-indigo-500" /> Interview Focus Type
                </label>
                <select
                  value={interviewType}
                  onChange={(e) => setInterviewType(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm transition-all duration-200 text-slate-800 dark:text-slate-200 cursor-pointer"
                >
                  <option value="Mixed">Mixed (Balanced Arena)</option>
                  <option value="Technical">Technical (Coding & Architecture)</option>
                  <option value="Behavioral">Behavioral (STAR Competencies)</option>
                  <option value="HR">HR & Cultural Alignment</option>
                  <option value="System Design">System Design (Distributed Systems)</option>
                  <option value="Coding">Coding (Algorithms & Complexities)</option>
                  <option value="AI/ML">AI / ML (Deep Learning & GenAI)</option>
                  <option value="Cloud">Cloud & Infrastructure (AWS/GCP)</option>
                  <option value="Data Science">Data Science & Analytics</option>
                </select>
              </div>
            </div>

            {/* Row 3: Difficulty Level, Duration, and Num Questions */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-indigo-500" /> Difficulty Level
                </label>
                <select
                  value={difficultyLevel}
                  onChange={(e) => setDifficultyLevel(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm transition-all duration-200 text-slate-800 dark:text-slate-200 cursor-pointer"
                >
                  <option value="Easy">Easy (Introduction)</option>
                  <option value="Medium">Medium (Standard Assessment)</option>
                  <option value="Hard">Hard (Senior Architect)</option>
                  <option value="Expert">Expert (Principal Outlier)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" /> Duration (Minutes)
                </label>
                <select
                  value={interviewDuration}
                  onChange={(e) => setInterviewDuration(parseInt(e.target.value))}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm transition-all duration-200 text-slate-800 dark:text-slate-200 cursor-pointer"
                >
                  <option value={10}>10 Minutes (Quick Quiz)</option>
                  <option value={20}>20 Minutes (Standard Express)</option>
                  <option value={30}>30 Minutes (Deep Interview)</option>
                  <option value={45}>45 Minutes (Full Simulation)</option>
                  <option value={60}>60 Minutes (Elite Marathon)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <ListOrdered className="w-3.5 h-3.5 text-indigo-500" /> No. of Questions
                </label>
                <input
                  type="number"
                  min={3}
                  max={10}
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(Math.max(3, Math.min(10, parseInt(e.target.value) || 3)))}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm transition-all duration-200 text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>

            {/* Resume Text Area */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-500" /> Paste Professional Resume Text
                </label>
                <span className="text-[10px] text-slate-400 font-medium">Quantified benchmarks raise scores</span>
              </div>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-xs font-mono transition-all duration-200 text-slate-800 dark:text-slate-200 placeholder-slate-400"
                placeholder="Paste your plain text resume here, or click one of the pre-configured mock templates below to populate instantly..."
                required
              />
            </div>

            {/* Job Description */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-500" /> Target Job Description (Optional)
                </label>
                <span className="text-[10px] text-slate-400 font-medium">Align questions with real role specs</span>
              </div>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-xs transition-all duration-200 text-slate-800 dark:text-slate-200 placeholder-slate-400"
                placeholder="Paste the target job description here to help Gemini customize question criteria precisely..."
              />
            </div>

            {error && (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl flex items-start gap-3 text-xs shadow-xs">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
                <div>
                  <span className="font-bold text-rose-700">Execution Error:</span>
                  <p className="mt-0.5 text-rose-600/90">{error}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div>
              {isLoading ? (
                <div className="w-full p-6 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-400 font-semibold">
                    <span className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-indigo-600 animate-spin" /> {loadingSteps[loadingStep]}
                    </span>
                    <span className="font-mono text-indigo-600">{Math.round(((loadingStep + 1) / loadingSteps.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                    />
                  </div>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md transition-all duration-200 group cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current text-white shrink-0 group-hover:scale-110 transition-transform" />
                  Generate Customized AI Interview Questions ({numQuestions} Questions)
                  <ArrowRight className="w-4 h-4 text-indigo-300 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>

          </form>
        </div>

        {/* Presets Sidebar */}
        <div className="space-y-6">
          
          {/* Preset templates */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" /> Elite Demo Presets
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Click one of our mock resumes to pre-fill the form instantly. Perfect for demonstrating the platform's exact technical capability with zero setup friction.
            </p>

            <div className="space-y-3">
              {RESUME_PRESETS.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => applyPreset(preset)}
                  className="w-full text-left p-4 border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 hover:bg-indigo-50/40 hover:dark:bg-indigo-950/20 hover:border-indigo-400 dark:hover:border-indigo-600 rounded-xl transition-all duration-200 group cursor-pointer"
                >
                  <div className="flex justify-between items-start gap-1">
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-xs group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{preset.name}</span>
                    <span className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded uppercase font-semibold font-mono tracking-wider shrink-0">{preset.experienceLevel}</span>
                  </div>
                  <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold block mt-1">{preset.role} Prep Kit</span>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 italic leading-relaxed">
                    {preset.resumeText.substring(0, 150)}...
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats Panel */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl space-y-4 shadow-sm">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-600" /> Platform Security Hardening
            </h4>
            
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
                <p><strong className="text-slate-800 dark:text-slate-200">100% Client-Safe:</strong> Secrets remain hidden. All API invocations are mediated safely on Node server channels.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
                <p><strong className="text-slate-800 dark:text-slate-200">WebSpeech Native Engine:</strong> High fidelity dictation and synthesis. Smooth transitions without network lags.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
                <p><strong className="text-slate-800 dark:text-slate-200">Structured STAR Schema:</strong> Precise logical mapping compiles clear feedback and customized course roadmaps.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
