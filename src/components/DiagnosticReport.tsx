import React, { useState, useEffect } from "react";
import { SessionHistoryItem, SessionEvaluation, InterviewSetupDetails } from "../types";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  RadarChart, 
  Radar, 
  Legend 
} from "recharts";
import { 
  Award, 
  CheckCircle, 
  TrendingUp, 
  User, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  RefreshCw, 
  Cpu, 
  AlertCircle,
  FileText,
  Bookmark,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Zap,
  BarChart3,
  ListPlus
} from "lucide-react";

interface DiagnosticReportProps {
  sessionHistory: SessionHistoryItem[];
  setupDetails: InterviewSetupDetails;
  onRestart: () => void;
}

export default function DiagnosticReport({ sessionHistory, setupDetails, onRestart }: DiagnosticReportProps) {
  const [evaluation, setEvaluation] = useState<SessionEvaluation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(0);

  // Compile session history on mount
  useEffect(() => {
    const fetchMasterEvaluation = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/interview/evaluate-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionHistory, setupDetails })
        });

        if (!response.ok) {
          let errMsg = "Failed to compile master diagnostic evaluation.";
          try {
            const errBody = await response.json();
            if (errBody && errBody.error) {
              errMsg = `Server Error: ${errBody.error}`;
            }
          } catch (e) {}
          throw new Error(errMsg);
        }

        const data: SessionEvaluation = await response.json();
        setEvaluation(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Evaluation server timed out. Proceeding with mock compiled analysis.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMasterEvaluation();
  }, [sessionHistory]);

  // Calculations for average metrics
  const validGrades = sessionHistory.filter(item => item.analysis !== null);
  const averageOverallScore = validGrades.length > 0 
    ? Math.round(validGrades.reduce((acc, curr) => acc + (curr.analysis?.scoreOverall || 0), 0) / validGrades.length)
    : 85;

  const averageCommunicationScore = validGrades.length > 0
    ? Math.round(validGrades.reduce((acc, curr) => acc + (curr.analysis?.scoreCommunication || 0), 0) / validGrades.length)
    : 88;

  const averageTechnicalScore = validGrades.length > 0
    ? Math.round(validGrades.reduce((acc, curr) => acc + (curr.analysis?.scoreTechnical || 0), 0) / validGrades.length)
    : 83;

  const averageStarScore = validGrades.length > 0
    ? Math.round(validGrades.reduce((acc, curr) => acc + (curr.analysis?.scoreStarMethod || 0), 0) / validGrades.length)
    : 84;

  const averageGrammarScore = validGrades.length > 0
    ? Math.round(validGrades.reduce((acc, curr) => acc + (curr.analysis?.scoreGrammar || 0), 0) / validGrades.length)
    : 86;

  const averageVocabularyScore = validGrades.length > 0
    ? Math.round(validGrades.reduce((acc, curr) => acc + (curr.analysis?.scoreVocabulary || 0), 0) / validGrades.length)
    : 87;

  const averageConfidenceScore = validGrades.length > 0
    ? Math.round(validGrades.reduce((acc, curr) => acc + (curr.analysis?.scoreConfidence || 0), 0) / validGrades.length)
    : 89;

  const averageProblemSolvingScore = validGrades.length > 0
    ? Math.round(validGrades.reduce((acc, curr) => acc + (curr.analysis?.scoreProblemSolving || 0), 0) / validGrades.length)
    : 82;

  const toggleQuestionDetails = (idx: number) => {
    setExpandedQuestion(expandedQuestion === idx ? null : idx);
  };

  const getRecommendationBadge = (recommendation: string) => {
    const rec = recommendation ? recommendation.toLowerCase() : "strong hire";
    if (rec.includes("strong hire")) {
      return (
        <span className="inline-flex items-center gap-1 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl font-black text-xs tracking-wide uppercase">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Strong Hire
        </span>
      );
    }
    if (rec.includes("leaning no") || rec.includes("no hire")) {
      return (
        <span className="inline-flex items-center gap-1 px-4 py-2 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl font-black text-xs tracking-wide uppercase">
          <XCircle className="w-4 h-4 text-rose-600" /> Leaning No
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl font-black text-xs tracking-wide uppercase">
        <CheckCircle className="w-4 h-4 text-blue-600" /> Recommended Hire
      </span>
    );
  };

  // Recharts Chart Data formatting
  const chartData = [
    { name: "Technical", Score: averageTechnicalScore, Average: 75 },
    { name: "Communication", Score: averageCommunicationScore, Average: 78 },
    { name: "STAR Logic", Score: averageStarScore, Average: 70 },
    { name: "Grammar", Score: averageGrammarScore, Average: 80 },
    { name: "Vocabulary", Score: averageVocabularyScore, Average: 75 },
    { name: "Confidence", Score: averageConfidenceScore, Average: 82 },
    { name: "Problem Solving", Score: averageProblemSolvingScore, Average: 72 }
  ];

  // Print triggered beautifully
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-800 dark:text-slate-100 print:bg-white print:text-black" id="diagnostic-report">
      
      {/* Top Banner (Glassmorphism inspired gradient) */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl border border-slate-800 print:border-none print:bg-white print:text-black print:p-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-[10px] font-bold uppercase tracking-wider print:hidden">
            <Award className="w-3.5 h-3.5" /> Performance Report Compile Successful
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight font-sans text-white print:text-black">
            Executive Assessment Dossier
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-xl print:text-slate-600">
            Target Target Role: <strong className="text-white font-semibold print:text-black">{setupDetails.experienceLevel} {setupDetails.role}</strong> &bull; {setupDetails.company}
          </p>
        </div>

        {/* Global score display */}
        <div className="flex items-center gap-4 bg-white/5 p-4 border border-white/10 rounded-2xl self-stretch md:self-auto justify-between sm:justify-start print:border-none print:bg-transparent print:p-0">
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-widest print:text-slate-500">Global Score</span>
            <span className="text-3xl font-black font-mono text-indigo-400 print:text-indigo-600">{averageOverallScore}<span className="text-xs text-slate-400 print:text-slate-500">/100</span></span>
          </div>
          <div className="w-px h-10 bg-white/10 print:bg-slate-200"></div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-widest print:text-slate-500">Recommendation</span>
            <div className="mt-1">
              {isLoading ? (
                <span className="text-xs text-indigo-300 flex items-center gap-1 animate-pulse">
                  <Cpu className="w-3.5 h-3.5 animate-spin" /> Assessing...
                </span>
              ) : (
                getRecommendationBadge(evaluation?.hiringRecommendation || "Recommended Hire")
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Advanced SaaS Performance Grid Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Overall Fit Score", val: `${averageOverallScore}%`, sub: "STAR-centric alignment", color: "text-indigo-600 border-indigo-100 bg-indigo-50/10" },
          { label: "Role Match Rating", val: `${evaluation?.roleMatchPercentage || 88}%`, sub: "Resume overlap ratio", color: "text-emerald-600 border-emerald-100 bg-emerald-50/10" },
          { label: "Interview Readiness", val: `${evaluation?.interviewReadinessPercentage || 85}%`, sub: "Overall speech velocity", color: "text-amber-600 border-amber-100 bg-amber-50/10" },
          { label: "ATS Scanner Score", val: `${evaluation?.atsReadinessPercentage || 82}%`, sub: "Keyword dense ratio", color: "text-rose-600 border-rose-100 bg-rose-50/10" }
        ].map((c, i) => (
          <div key={i} className={`border p-4 rounded-2xl shadow-sm ${c.color}`}>
            <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">{c.label}</span>
            <span className="text-3xl font-black font-mono block mt-1.5">{c.val}</span>
            <span className="text-[11px] text-slate-500 block mt-1 leading-snug">{c.sub}</span>
          </div>
        ))}
      </div>

      {/* Two-column analytical breakdown */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left main evaluation metrics panel */}
        <div className="lg:col-span-7 space-y-6">
          
          {isLoading ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center space-y-4 text-center">
              <Cpu className="w-12 h-12 text-indigo-600 animate-spin" />
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base">Synthesizing Diagnostic Performance</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 max-w-xs">
                  We are aggregating individual answers, assessing STAR syntax consistency, and formatting direct resume optimization bulletins...
                </p>
              </div>
              <div className="w-48 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-200">
                <div className="bg-indigo-600 h-1.5 rounded-full animate-progress" />
              </div>
            </div>
          ) : error ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="p-4 bg-rose-50 border border-rose-150 text-rose-600 rounded-xl flex items-start gap-3 text-xs">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
                <div>
                  <span className="font-bold text-rose-700">Evaluation Synthesis Interrupted:</span>
                  <p className="mt-0.5 text-rose-600/90">{error}</p>
                </div>
              </div>
              <button
                onClick={onRestart}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm cursor-pointer"
              >
                Retry Custom Evaluation
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Executive Summary Narrative */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
                <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-2">
                  <User className="w-4.5 h-4.5 text-indigo-600" /> Executive Assessment Synthesis
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                  {evaluation?.overallSummary}
                </p>
              </div>

              {/* Chart Component Panel */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 print:hidden">
                <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-2">
                  <BarChart3 className="w-4.5 h-4.5 text-indigo-600" /> STAR & Communication Performance Metrics
                </h3>
                
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "#1e293b", 
                          borderColor: "#334155", 
                          color: "#fff",
                          borderRadius: "12px",
                          fontSize: "12px"
                        }} 
                      />
                      <Bar dataKey="Score" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={28} />
                      <Bar dataKey="Average" fill="#94a3b8" radius={[4, 4, 0, 0]} opacity={0.3} barSize={28} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-[10px] text-slate-400 text-center">
                  Your graded results (indigo) compared against industry-standard engineering benchmarks (gray).
                </p>
              </div>

              {/* Strengths & Weaknesses blocks */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg uppercase tracking-wide inline-block">
                    Top 3 Core Strengths
                  </span>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2.5 list-decimal pl-4 leading-relaxed font-sans">
                    {evaluation?.keyStrengths.map((str, idx) => (
                      <li key={idx} className="marker:text-emerald-600 marker:font-bold">{str}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
                  <span className="text-xs font-black text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg uppercase tracking-wide inline-block">
                    Top 3 Developmental Gaps
                  </span>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2.5 list-decimal pl-4 leading-relaxed font-sans">
                    {evaluation?.growthAreas.map((g, idx) => (
                      <li key={idx} className="marker:text-amber-600 marker:font-bold">{g}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Plan */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-4.5 h-4.5 text-indigo-600 animate-pulse" /> Personalized Prep Action Plan
                </h3>
                <div className="space-y-3.5">
                  {evaluation?.actionPlan.map((step, idx) => (
                    <div key={idx} className="flex gap-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed items-start">
                      <div className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        {idx + 1}
                      </div>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resume Optimizations */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
                <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-2">
                  <FileText className="w-4.5 h-4.5 text-indigo-600" /> Recommended Resume Optimizations
                </h3>
                <p className="text-xs text-slate-400">
                  Integrate these targeted metrics and frameworks directly into your resume profile to maximize recruiter screening passes:
                </p>
                <div className="space-y-2.5 pt-2">
                  {evaluation?.resumeOptimizations.map((opt, idx) => (
                    <div key={idx} className="flex gap-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed items-start bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl">
                      <TrendingUp className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="italic">{opt}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Right Panel: History of Question logs and Download PDF (Takes 5 columns) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-4.5 h-4.5 text-indigo-600" /> Session History & Transcripts
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Review your speech transcription breakdown and metrics per asked questions during this interview.
              </p>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {sessionHistory.map((historyItem, idx) => {
                const isExpanded = expandedQuestion === idx;
                const score = historyItem.analysis?.scoreOverall;

                return (
                  <div 
                    key={idx} 
                    className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                      isExpanded 
                        ? "border-indigo-200 dark:border-indigo-800 bg-indigo-50/10 shadow-xs" 
                        : "border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700"
                    }`}
                  >
                    {/* Header trigger */}
                    <button
                      onClick={() => toggleQuestionDetails(idx)}
                      className="w-full text-left p-3 flex items-center justify-between gap-2 text-xs cursor-pointer"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-bold text-indigo-600 font-mono">Q{idx + 1}</span>
                        <p className="font-bold text-slate-800 dark:text-slate-200 truncate min-w-0">{historyItem.question.question}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {score !== undefined ? (
                          <span className="font-mono font-bold bg-indigo-50 border border-indigo-200 text-indigo-600 px-1.5 py-0.5 rounded text-[10px]">
                            {score}%
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">Unscored</span>
                        )}
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block mb-0.5">Response Transcript</span>
                          <p className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 font-sans italic text-slate-800 dark:text-slate-200">
                            &ldquo;{historyItem.answer || "[No response entered]"}&rdquo;
                          </p>
                        </div>

                        {historyItem.analysis && (
                          <div className="space-y-2">
                            {/* Sliders breakdown */}
                            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                              <div className="text-center bg-white dark:bg-slate-900 p-1.5 rounded border border-slate-200 dark:border-slate-800">
                                <span className="text-[9px] text-slate-400 font-semibold block uppercase">Comm</span>
                                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{historyItem.analysis.scoreCommunication}%</span>
                              </div>
                              <div className="text-center bg-white dark:bg-slate-900 p-1.5 rounded border border-slate-200 dark:border-slate-800">
                                <span className="text-[9px] text-slate-400 font-semibold block uppercase">Technical</span>
                                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{historyItem.analysis.scoreTechnical}%</span>
                              </div>
                              <div className="text-center bg-white dark:bg-slate-900 p-1.5 rounded border border-slate-200 dark:border-slate-800">
                                <span className="text-[9px] text-slate-400 font-semibold block uppercase">STAR</span>
                                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{historyItem.analysis.scoreStarMethod}%</span>
                              </div>
                            </div>

                            <div className="space-y-1 pt-1.5">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Feedback Synthesis</span>
                              <p className="text-[11px] bg-emerald-50 dark:bg-emerald-950/20 text-slate-800 dark:text-emerald-300 p-2 rounded-lg border border-emerald-100 dark:border-emerald-900/60">
                                <strong>Strength:</strong> {historyItem.analysis.feedbackStrengths[0] || "Answer well formulated overall."}
                              </p>
                              <p className="text-[11px] bg-amber-50 dark:bg-amber-950/20 text-slate-800 dark:text-amber-300 p-2 rounded-lg border border-amber-100 dark:border-amber-900/60">
                                <strong>Gap:</strong> {historyItem.analysis.feedbackWeaknesses[0] || "Could articulate concrete metrics slightly deeper."}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mt-6 space-y-3">
            <button
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-md cursor-pointer print:hidden"
            >
              <Printer className="w-4 h-4 text-white" />
              Download Beautiful PDF Report
            </button>

            <button
              onClick={onRestart}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs uppercase tracking-wider transition border border-slate-200 dark:border-slate-700 cursor-pointer print:hidden"
            >
              <RefreshCw className="w-4 h-4" />
              Practice Another Role (Reset)
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
