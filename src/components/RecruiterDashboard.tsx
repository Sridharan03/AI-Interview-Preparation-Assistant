import React from "react";
import { 
  UserCheck, 
  Sparkles, 
  Cpu, 
  ShieldAlert, 
  Award, 
  TrendingUp, 
  Sliders, 
  CheckCircle,
  HelpCircle,
  Clock,
  Briefcase
} from "lucide-react";

export default function RecruiterDashboard() {
  
  const recruiterMetrics = {
    resumeMatchPercent: 88,
    skillMatchPercent: 92,
    cultureFitPercent: 85,
    riskLevel: "Low",
    hiringConfidence: 94,
    technicalReadiness: 88,
    communicationReadiness: 90,
    cohortRanking: "Top 4%",
    overallImpression: "Exceptional technical proficiency paired with smooth communication velocity. Adheres strictly to the STAR methodology on all situational architecture design questions."
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-800 dark:text-slate-100" id="recruiter-dashboard">
      
      {/* Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-black p-6 md:p-8 rounded-3xl text-white relative overflow-hidden shadow-md border border-slate-800">
        <div className="max-w-2xl relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <UserCheck className="w-3.5 h-3.5 animate-pulse" /> Recruiter Operations Console
          </span>
          <h2 className="text-2xl md:text-3xl font-black font-sans tracking-tight text-white">
            Talent Assessment Portal
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-1.5 leading-relaxed">
            Hiring Manager & Recruiter dashboard assessing candidate technical readiness, communication velocity, STAR structure adherence, and systemic risk indexes.
          </p>
        </div>
      </div>

      {/* Grid of Recruiter KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Resume Match Rate", val: `${recruiterMetrics.resumeMatchPercent}%`, sub: "ATS overlap ratio", color: "text-indigo-600 border-indigo-100 bg-indigo-50/10" },
          { label: "Cohort Talent Ranking", val: recruiterMetrics.cohortRanking, sub: "Compared to 240 candidates", color: "text-emerald-600 border-emerald-100 bg-emerald-50/10" },
          { label: "Hiring Confidence", val: `${recruiterMetrics.hiringConfidence}%`, sub: "Exceptional rating pass", color: "text-amber-600 border-amber-100 bg-amber-50/10" },
          { label: "Risk Assessment Index", val: recruiterMetrics.riskLevel, sub: "Zero behavioral alerts", color: "text-rose-600 border-rose-100 bg-rose-50/10" }
        ].map((c, i) => (
          <div key={i} className={`border p-4 rounded-2xl shadow-sm ${c.color}`}>
            <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">{c.label}</span>
            <span className="text-3xl font-black font-mono block mt-1.5">{c.val}</span>
            <span className="text-[11px] text-slate-500 block mt-1 leading-snug">{c.sub}</span>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Readiness assessments (Takes 7 columns) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-5">
          <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Sliders className="w-4.5 h-4.5 text-indigo-600" /> Candidate Competency Matrix
          </h3>

          <div className="space-y-4 text-xs">
            
            {/* Technical Readiness Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Technical & Architectural Readiness</span>
                <span className="font-mono font-black text-slate-800 dark:text-slate-200">{recruiterMetrics.technicalReadiness}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${recruiterMetrics.technicalReadiness}%` }} />
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">High proficiency in reactive client design patterns, state lifecycles, and database constraints.</p>
            </div>

            {/* Communication Readiness Slider */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Communication & Articulation Velocity</span>
                <span className="font-mono font-black text-slate-800 dark:text-slate-200">{recruiterMetrics.communicationReadiness}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${recruiterMetrics.communicationReadiness}%` }} />
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Clear structured pauses, balanced cadence, and direct answers that map perfectly to recruiter expectations.</p>
            </div>

            {/* Culture fit Gauge */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Cultural Alignment Index</span>
                <span className="font-mono font-black text-slate-800 dark:text-slate-200">{recruiterMetrics.cultureFitPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${recruiterMetrics.cultureFitPercent}%` }} />
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Matches core collaborative competencies: leadership, self-reflection, and critical problem solving.</p>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recruiter Summary & Impression</span>
            <p className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs leading-relaxed text-slate-600 dark:text-slate-300 italic">
              &ldquo;{recruiterMetrics.overallImpression}&rdquo;
            </p>
          </div>
        </div>

        {/* Talent acquisition action panel (Takes 5 columns) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-5 flex flex-col justify-between self-stretch">
          <div className="space-y-4 text-xs">
            <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
              <Clock className="w-4 h-4 text-indigo-600" /> Talent pipeline Decisions
            </h4>

            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/10 text-slate-600 dark:text-slate-300">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-slate-200">Recommended Next Stage</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">Move candidate directly to Team Lead technical deep dive interview stage.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-indigo-500/5 p-3 rounded-xl border border-indigo-500/10 text-slate-600 dark:text-slate-300">
                <Award className="w-5 h-5 text-indigo-600 shrink-0" />
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-slate-200">Competitive Offer Multiplier</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">Expected salary bracket overlap: Senior Software Architect tier target is appropriate.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-rose-500/5 p-3 rounded-xl border border-rose-500/10 text-slate-600 dark:text-slate-300">
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-slate-200">Hiring Risk Factors: None</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">Speech recognition analysis detected zero signs of structural anxiety or evasion.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-4 flex justify-between items-center text-[9px] text-slate-400 font-bold uppercase tracking-wider">
            <span>ATS Parser Pipeline: Active</span>
            <span>Ref: TA-992-04</span>
          </div>
        </div>

      </div>

    </div>
  );
}
