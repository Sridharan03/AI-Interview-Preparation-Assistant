import React, { useState, useEffect, useRef } from "react";
import { Question, AnswerAnalysis, SessionHistoryItem, InterviewSetupDetails } from "../types";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Cpu, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  ChevronRight, 
  Clock, 
  RotateCcw, 
  Sparkles,
  Award,
  BookOpen,
  MessageSquare,
  Pause,
  Play,
  Activity,
  Smile,
  ShieldAlert,
  UserCheck,
  Flame,
  Check,
  HelpCircle,
  TrendingUp,
  XCircle,
  FileText
} from "lucide-react";

interface InterviewRoomProps {
  questions: Question[];
  roleAnalysis: string;
  setupDetails: InterviewSetupDetails;
  onInterviewComplete: (sessionHistory: SessionHistoryItem[]) => void;
  onExit: () => void;
}

export default function InterviewRoom({ 
  questions, 
  roleAnalysis, 
  setupDetails, 
  onInterviewComplete, 
  onExit 
}: InterviewRoomProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerText, setAnswerText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [isTtsSpeaking, setIsTtsSpeaking] = useState(false);
  
  // Timers and metrics tracking
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [thinkingTime, setThinkingTime] = useState(0);
  const [isThinking, setIsThinking] = useState(true);
  const [simulatedNoiseLevel, setSimulatedNoiseLevel] = useState(15);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const noiseIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Evaluation states
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnswerAnalysis | null>(null);
  const [evaluationError, setEvaluationError] = useState<string | null>(null);

  // Complete session history tracker
  const [sessionHistory, setSessionHistory] = useState<SessionHistoryItem[]>(() => {
    return questions.map(q => ({ question: q, answer: "", analysis: null, timeTakenSeconds: 0 }));
  });

  // Web Speech recognition object
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    } else {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "en-US";

      rec.onresult = (event: any) => {
        if (isPaused || isMuted) return;

        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          setAnswerText((prev) => {
            const trimmed = prev.trim();
            // Freeze thinking time on first real utterance
            if (isThinking) {
              setIsThinking(false);
            }
            return trimmed ? `${trimmed} ${finalTranscript.trim()}` : finalTranscript.trim();
          });
        }
      };

      rec.onerror = (event: any) => {
        console.error("Speech Recognition Error:", event.error);
        if (event.error === "not-allowed") {
          setIsRecording(false);
          setEvaluationError("Microphone permission was denied. Please allow microphone access or type your response.");
        }
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
    }

    // Audio noise level generator for visualization
    noiseIntervalRef.current = setInterval(() => {
      setSimulatedNoiseLevel((prev) => {
        if (!isRecording) return 5 + Math.floor(Math.random() * 5); // baseline ambient noise
        // fluctuated speech signals
        return 20 + Math.floor(Math.random() * 65);
      });
    }, 150);

    // Auto-read first question when loaded
    const timeout = setTimeout(() => {
      speakQuestion();
    }, 1000);

    // Cleanup speech on unmount
    return () => {
      clearTimeout(timeout);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (timerRef.current) clearInterval(timerRef.current);
      if (noiseIntervalRef.current) clearInterval(noiseIntervalRef.current);
    };
  }, []);

  // Monitor text change to freeze thinking timer on manually typed keys
  useEffect(() => {
    if (answerText.trim().length > 2 && isThinking) {
      setIsThinking(false);
    }
  }, [answerText]);

  // Master Clock & Question-Level Clock
  useEffect(() => {
    setElapsedSeconds(0);
    setThinkingTime(0);
    setIsThinking(true);
    
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      if (isPaused) return;

      setElapsedSeconds(prev => prev + 1);
      setTotalSeconds(prev => prev + 1);
      
      if (isThinking) {
        setThinkingTime(prev => prev + 1);
      }
    }, 1000);

    // Auto-read question when index changes
    speakQuestion();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex]);

  const currentQuestion = questions[currentIndex];

  // Text-To-Speech: Read Question aloud
  const speakQuestion = () => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    if (isMuted) {
      setIsTtsSpeaking(false);
      return;
    }

    setIsTtsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(currentQuestion.question);
    
    // Choose professional english voice if possible
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith("en") && v.name.includes("Google")) || voices.find(v => v.lang.startsWith("en"));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    
    utterance.onend = () => {
      setIsTtsSpeaking(false);
    };
    utterance.onerror = () => {
      setIsTtsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Toggle Microphone
  const toggleRecording = () => {
    if (!speechSupported) {
      setEvaluationError("Real-time voice dictation is not supported in this browser. Please type your response.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      if (isPaused) {
        setIsPaused(false); // Auto resume if paused
      }
      try {
        recognitionRef.current.start();
        setIsRecording(true);
        // Cancel TTS if speaking to avoid loopback
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
          setIsTtsSpeaking(false);
        }
      } catch (e) {
        console.error("Error starting speech recognition", e);
      }
    }
  };

  const handlePauseToggle = () => {
    setIsPaused((prev) => {
      const next = !prev;
      if (next && isRecording) {
        // stop micro if we pause
        recognitionRef.current.stop();
        setIsRecording(false);
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsTtsSpeaking(false);
      }
      return next;
    });
  };

  const handleMuteToggle = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (next && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsTtsSpeaking(false);
      }
      return next;
    });
  };

  // Live Speech Speed (Words per Minute) calculation
  const getWpm = () => {
    const words = answerText.trim().split(/\s+/).filter(Boolean).length;
    if (words === 0) return 0;
    const minutes = elapsedSeconds / 60;
    if (minutes < 0.1) return 130; // standard speaking rate baseline
    return Math.round(words / minutes);
  };

  // Format Elapsed Time
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  // Submit Answer to AI grader
  const handleEvaluateAnswer = async () => {
    if (!answerText.trim() || answerText.trim().length < 10) {
      setEvaluationError("Your answer is too short. Please speak or type at least 2 complete sentences to allow Gemini to perform a professional evaluation.");
      return;
    }

    setIsEvaluating(true);
    setEvaluationError(null);

    // Stop recording if active
    if (isRecording && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        setIsRecording(false);
      } catch (e) {}
    }

    try {
      const calculatedWpm = getWpm();
      const response = await fetch("/api/interview/analyze-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQuestion.question,
          answer: answerText,
          category: currentQuestion.category,
          gradingCriteria: currentQuestion.gradingCriteria,
          thinkingTime: thinkingTime,
          speakingSpeed: calculatedWpm
        })
      });

      if (!response.ok) {
        let errMsg = "Answer analysis failed on server.";
        try {
          const errBody = await response.json();
          if (errBody && errBody.error) {
            errMsg = `Server Error: ${errBody.error}`;
          }
        } catch (e) {}
        throw new Error(errMsg);
      }

      const data: AnswerAnalysis = await response.json();
      setCurrentAnalysis(data);

      // Save to local session history state
      setSessionHistory((prev) => {
        const updated = [...prev];
        updated[currentIndex] = {
          question: currentQuestion,
          answer: answerText,
          analysis: data,
          timeTakenSeconds: elapsedSeconds
        };
        return updated;
      });

    } catch (err: any) {
      console.error(err);
      setEvaluationError(err.message || "Failed to analyze response. Proceeding with mock fallback evaluation.");
    } finally {
      setIsEvaluating(false);
    }
  };

  // Move to Next Question
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      // Retrieve already saved answer if exists
      const nextHistoryItem = sessionHistory[currentIndex + 1];
      setAnswerText(nextHistoryItem?.answer || "");
      setCurrentAnalysis(nextHistoryItem?.analysis || null);
      setEvaluationError(null);
    } else {
      // All questions completed! Trigger master session evaluation
      onInterviewComplete(sessionHistory);
    }
  };

  // Reset/Clear current response box
  const handleClear = () => {
    setAnswerText("");
    setCurrentAnalysis(null);
    setEvaluationError(null);
    setIsThinking(true);
    setThinkingTime(0);
  };

  const currentProgressPercent = Math.round(((currentIndex) / questions.length) * 100);

  return (
    <div className="space-y-6 animate-fade-in text-slate-800 dark:text-slate-100" id="interview-room">
      
      {/* Dynamic Header Stats Strip */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold font-mono">
            Q{currentIndex + 1}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Active Simulation</span>
              <span className="text-[10px] bg-indigo-50 border border-indigo-200 text-indigo-600 dark:bg-indigo-950/40 dark:border-indigo-800 dark:text-indigo-400 px-2 py-0.5 rounded font-bold font-mono uppercase">{setupDetails.difficultyLevel} Tier</span>
            </div>
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {setupDetails.experienceLevel} {setupDetails.role} &bull; {setupDetails.company}
            </h2>
          </div>
        </div>

        {/* Global Progress and Timer indicators */}
        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
          <div className="text-right">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Question Progress</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-24 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
              </div>
              <span className="font-mono text-xs font-black text-slate-700 dark:text-slate-300">{currentIndex + 1}/{questions.length}</span>
            </div>
          </div>

          <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 hidden md:block"></div>

          <div>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Target duration</span>
            <span className="font-mono text-xs font-bold text-slate-500 block mt-0.5">{setupDetails.interviewDuration} mins limit</span>
          </div>

          <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 hidden md:block"></div>

          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl">
            <Clock className={`w-4 h-4 text-indigo-600 ${isPaused ? "" : "animate-spin"}`} style={{ animationDuration: "12s" }} />
            <span className="font-mono font-black text-sm text-slate-800 dark:text-slate-200">
              {formatTime(elapsedSeconds)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Two-column workspace */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Left Side: Question, Audio Visualizer, Editor (Takes 7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Question Display Card */}
          <div className="bg-gradient-to-br from-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 text-white relative shadow-md">
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-[10px] bg-white/10 text-indigo-300 border border-white/10 px-2 py-0.5 rounded uppercase font-bold tracking-widest font-mono">
                  Focus: {currentQuestion.category}
                </span>
                <p className="text-base md:text-lg font-bold mt-3 leading-relaxed font-sans">
                  &ldquo;{currentQuestion.question}&rdquo;
                </p>
              </div>

              {/* Speech Controls */}
              <div className="flex gap-1.5 shrink-0">
                <button 
                  onClick={handleMuteToggle}
                  title={isMuted ? "Unmute system voices" : "Mute system voices"}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isMuted 
                      ? "border-rose-500/30 bg-rose-500/10 text-rose-400" 
                      : "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-750"
                  }`}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={speakQuestion}
                  title="Read question aloud"
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isTtsSpeaking 
                      ? "border-indigo-500 bg-indigo-600 text-white animate-pulse" 
                      : "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-750"
                  }`}
                >
                  <Volume2 className={`w-4 h-4 ${isTtsSpeaking ? "scale-110" : ""}`} />
                </button>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-bold block">Interviewer Rationale:</span>
                <p className="text-slate-300 mt-1 italic">{currentQuestion.rationale}</p>
              </div>
              <div>
                <span className="text-slate-400 font-bold block">Outstanding Response Standard:</span>
                <p className="text-slate-300 mt-1 italic">{currentQuestion.gradingCriteria}</p>
              </div>
            </div>

            {isPaused && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur rounded-2xl flex flex-col items-center justify-center space-y-3 z-10">
                <Pause className="w-10 h-10 text-amber-500 animate-bounce" />
                <h4 className="font-bold text-white text-lg">Interview Paused</h4>
                <p className="text-slate-400 text-xs">Timers and recording bounds are currently frozen.</p>
                <button 
                  onClick={handlePauseToggle} 
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow"
                >
                  Resume Interview Session
                </button>
              </div>
            )}
          </div>

          {/* Answer Transcribing Pane */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-600" /> Response Capture
              </h3>
              
              <div className="flex items-center gap-3">
                {/* Thinking timer readout */}
                <div className="text-xs text-slate-400 font-mono">
                  Thinking Time: <strong className="text-slate-600 dark:text-slate-300">{thinkingTime}s</strong>
                </div>
                
                {/* WPM readout */}
                <div className="text-xs text-slate-400 font-mono">
                  Speech Rate: <strong className="text-slate-600 dark:text-slate-300">{getWpm()} WPM</strong>
                </div>

                {/* Pause interview trigger */}
                <button 
                  type="button"
                  onClick={handlePauseToggle}
                  className="px-2.5 py-1 text-[11px] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-850 flex items-center gap-1 cursor-pointer"
                >
                  {isPaused ? <Play className="w-3 h-3 text-emerald-600" /> : <Pause className="w-3 h-3 text-amber-600" />}
                  {isPaused ? "Resume" : "Pause"}
                </button>
              </div>
            </div>

            {/* Audio waveform simulated meter when recording */}
            {isRecording && (
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span>Microphone Active (Streaming Transcription)</span>
                </div>
                
                {/* Simulated equalizer waves */}
                <div className="flex items-end gap-1.5 h-6">
                  {[...Array(8)].map((_, i) => {
                    const hVal = Math.max(10, Math.min(100, simulatedNoiseLevel * (0.3 + 0.7 * Math.sin((i + Date.now()) * 0.1))));
                    return (
                      <div 
                        key={i} 
                        className="w-1.5 bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-150" 
                        style={{ height: `${hVal}%` }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Core Text Input / Transcription text */}
            <div className="relative">
              <textarea
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                disabled={isPaused}
                rows={7}
                className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm font-sans text-slate-800 dark:text-slate-200 placeholder-slate-400 leading-relaxed"
                placeholder="Start speaking using your microphone or type your detailed response manually using the STAR framework structure..."
              />
              
              {!speechSupported && (
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-500">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Speech Recognition API unavailable in this browser
                </div>
              )}
            </div>

            {evaluationError && (
              <div className="p-3 bg-rose-50 border border-rose-150 text-rose-600 rounded-xl flex items-start gap-2.5 text-xs">
                <AlertCircle className="w-4.5 h-4.5 text-rose-500 shrink-0 mt-0.5" />
                <p>{evaluationError}</p>
              </div>
            )}

            {/* Recording Controls & Submit buttons row */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleRecording}
                  disabled={isPaused}
                  className={`py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
                    isRecording
                      ? "bg-rose-600 hover:bg-rose-700 text-white animate-pulse"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                  }`}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  {isRecording ? "Stop Dictation" : "Voice Dictation"}
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-xs cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex gap-2">
                {currentAnalysis && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {currentIndex < questions.length - 1 ? (
                      <>Next Question <ChevronRight className="w-4 h-4" /></>
                    ) : (
                      <>Compile Diagnostic Report <Award className="w-4 h-4 shrink-0" /></>
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleEvaluateAnswer}
                  disabled={isEvaluating || !answerText.trim() || isPaused}
                  className="py-2.5 px-5 bg-slate-900 dark:bg-slate-100 hover:bg-black hover:dark:bg-white text-white dark:text-slate-900 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isEvaluating ? (
                    <>
                      <Cpu className="w-4 h-4 animate-spin text-indigo-400" />
                      Evaluating...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 fill-current" />
                      Submit & Grade via Gemini
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Right Side: Analytical Grader Dashboard (Takes 5 columns) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-indigo-600" /> AI Evaluation Grader
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Detailed metrics compiled instantly based on your answers' completeness, accuracy, and flow.
              </p>
            </div>

            {isEvaluating ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-4 text-center">
                <Cpu className="w-12 h-12 text-indigo-600 animate-spin" />
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Evaluating Response</h4>
                  <p className="text-slate-400 text-xs max-w-xs mt-1 leading-relaxed">
                    Analyzing technical parameters, STAR structure alignment, communication metrics, and vocabulary depth via Gemini...
                  </p>
                </div>
                {/* Simulated progress indicator */}
                <div className="w-36 bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-1 rounded-full animate-pulse w-full" />
                </div>
              </div>
            ) : currentAnalysis ? (
              <div className="space-y-4 text-xs animate-fade-in">
                
                {/* Scoring Ring and Emotion Indicator */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/60 p-3 rounded-xl flex items-center gap-3">
                    <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                      {currentAnalysis.scoreOverall}%
                    </span>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Overall Score</span>
                      <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-400">
                        {currentAnalysis.scoreOverall >= 90 ? "Excellent" : currentAnalysis.scoreOverall >= 80 ? "Above Bar" : "Needs Tuning"}
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 rounded-xl flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-600">
                      <Smile className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Tone & Emotion</span>
                      <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                        {currentAnalysis.emotionIndicator || "Confident"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Slider Metrics Grid */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">SaaS Evaluation Indicators</span>
                  
                  {[
                    { label: "Technical Accuracy", val: currentAnalysis.scoreTechnical },
                    { label: "Communication Flow", val: currentAnalysis.scoreCommunication },
                    { label: "STAR Structure Align", val: currentAnalysis.scoreStarMethod },
                    { label: "Grammar Index", val: currentAnalysis.scoreGrammar },
                    { label: "Vocabulary Density", val: currentAnalysis.scoreVocabulary },
                    { label: "Voice Confidence", val: currentAnalysis.scoreConfidence },
                    { label: "Problem Solving Velocity", val: currentAnalysis.scoreProblemSolving }
                  ].map((m, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-semibold text-slate-600 dark:text-slate-400">{m.label}</span>
                        <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{m.val}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            (m.val || 70) >= 90 ? "bg-emerald-500" : (m.val || 70) >= 80 ? "bg-indigo-600" : "bg-amber-500"
                          }`}
                          style={{ width: `${m.val || 70}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Strengths & Weaknesses list */}
                <div className="space-y-2.5 pt-2">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider mb-1.5">Direct Answer Strengths</span>
                    <div className="space-y-1.5">
                      {currentAnalysis.feedbackStrengths.map((str, i) => (
                        <div key={i} className="flex gap-2 items-start bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10 text-slate-700 dark:text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider mb-1.5">Development Gaps</span>
                    <div className="space-y-1.5">
                      {currentAnalysis.feedbackWeaknesses.map((gap, i) => (
                        <div key={i} className="flex gap-2 items-start bg-amber-500/5 p-2 rounded-lg border border-amber-500/10 text-slate-700 dark:text-slate-300">
                          <XCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>{gap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recruiter Notes / STAR method critique */}
                {currentAnalysis.recruiterNotes && (
                  <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-2">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Recruiter Assessment Profile</span>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed italic">
                      &ldquo;{currentAnalysis.recruiterNotes}&rdquo;
                    </p>
                    {currentAnalysis.starMethodAnalysis && (
                      <div className="text-[10px] text-indigo-600 dark:text-indigo-400 border-t border-slate-100 dark:border-slate-800 pt-1.5 mt-1">
                        <strong>STAR Critique:</strong> {currentAnalysis.starMethodAnalysis}
                      </div>
                    )}
                  </div>
                )}

                {/* Keywords blocks */}
                {currentAnalysis.keywordsUsed && (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider mb-1">Keywords Used</span>
                      <div className="flex flex-wrap gap-1">
                        {currentAnalysis.keywordsUsed.map((kw, i) => (
                          <span key={i} className="text-[9px] bg-emerald-50 border border-emerald-200 text-emerald-700 px-1 rounded font-bold">{kw}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider mb-1">Missing Keywords</span>
                      <div className="flex flex-wrap gap-1">
                        {currentAnalysis.missingKeywords?.map((kw, i) => (
                          <span key={i} className="text-[9px] bg-rose-50 border border-rose-200 text-rose-700 px-1 rounded font-bold">{kw}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Suggested model answer dropdown reveal */}
                {currentAnalysis.suggestedModelResponse && (
                  <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
                    <details className="group">
                      <summary className="flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer list-none text-[11px]">
                        <ChevronRight className="w-3.5 h-3.5 transition-transform group-open:rotate-90" />
                        Reveal Model 100-Score Answer Guide
                      </summary>
                      <p className="mt-2 bg-slate-50 dark:bg-slate-950 p-3 rounded-lg text-slate-600 dark:text-slate-400 font-mono text-[10px] leading-relaxed border border-slate-200/50 dark:border-slate-850">
                        {currentAnalysis.suggestedModelResponse}
                      </p>
                    </details>
                  </div>
                )}

              </div>
            ) : (
              <div className="py-24 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center space-y-2.5">
                <Cpu className="w-8 h-8 text-slate-300" />
                <span className="font-bold text-slate-500 text-xs">Waiting for Candidate Response</span>
                <p className="text-[10px] text-slate-400 max-w-xs px-4">
                  Speak using your microphone or type your response, then click "Submit & Grade via Gemini" to generate real-time feedback.
                </p>
              </div>
            )}
          </div>

          {/* Bottom guidelines footnote */}
          <div className="border-t border-slate-150 dark:border-slate-800 pt-4 mt-4 flex justify-between items-center text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" /> SECURE AUDIT PROTOCOL
            </span>
            <span>ID: SECURE-SANDBOX-104</span>
          </div>
        </div>

      </div>

    </div>
  );
}
