import React from "react";
import { 
  Award, 
  Sparkles, 
  Flame, 
  UserCheck, 
  TrendingUp, 
  CheckCircle,
  HelpCircle,
  Clock,
  User,
  Medal,
  Crown,
  Trophy,
  Check
} from "lucide-react";

export default function GamificationCenter() {
  
  const achievements = [
    { title: "STAR Master", desc: "Successfully articulated Situation, Task, Action, and Result parameters on 3 consecutive answers.", unlocked: true, icon: Trophy, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/20 border-amber-200" },
    { title: "Speech Cadence Outlier", desc: "Maintained a perfect 130-150 words-per-minute articulation cadence throughout a full 5-question mock.", unlocked: true, icon: Medal, color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200" },
    { title: "No Leak Champion", desc: "Conducted 5 mock simulations without exposing any browser-side client credentials.", unlocked: true, icon: Crown, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200" },
    { title: "ATS Overlord", desc: "Synthesized a resume draft obtaining a certified 90% ATS compatibility score.", unlocked: false, icon: Sparkles, color: "text-slate-400 bg-slate-50 dark:bg-slate-950/20 border-slate-200" }
  ];

  const badges = [
    { name: "Gemini Pioneer", level: "Gold Tier", color: "from-indigo-600 to-indigo-400" },
    { name: "Speech Virtuoso", level: "Silver Tier", color: "from-emerald-600 to-emerald-400" },
    { name: "Cognitive Aligner", level: "Bronze Tier", color: "from-amber-600 to-amber-400" }
  ];

  const leaderboard = [
    { rank: 1, name: "Marcus Thompson", role: "DevOps Engineer", score: 96 },
    { rank: 2, name: "Sophia Williams (You)", role: "React Architect", score: 92, active: true },
    { rank: 3, name: "Alex Chen", role: "Full Stack Engineer", score: 88 },
    { rank: 4, name: "Diana Prince", role: "Product Manager", score: 84 },
    { rank: 5, name: "James Holden", role: "AI Integration Lead", score: 81 }
  ];

  return (
    <div className="space-y-6 animate-fade-in text-slate-800 dark:text-slate-100" id="gamification-center">
      
      {/* Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-black p-6 md:p-8 rounded-3xl text-white relative overflow-hidden shadow-md border border-slate-800">
        {/* Dynamic flame decoration background */}
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Flame className="w-56 h-56 rotate-12" />
        </div>
        
        <div className="max-w-2xl relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> Gamification Console
          </span>
          <h2 className="text-2xl md:text-3xl font-black font-sans tracking-tight text-white">
            Candidate Profile & Achievements
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-1.5 leading-relaxed">
            Practice continuously to earn prestigious performance badges, extend your daily streak multiplier, and rank amongst elite global tech candidates on our real-time simulated leaderboard.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Achievements list (Takes 7 columns) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Award className="w-4.5 h-4.5 text-indigo-600" /> Unlocked Achievements
            </h3>

            <div className="space-y-3.5">
              {achievements.map((ach, idx) => {
                const Icon = ach.icon;
                return (
                  <div key={idx} className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition duration-200 ${
                    ach.unlocked 
                      ? "bg-slate-50/50 dark:bg-slate-950/20 border-slate-200 dark:border-slate-800" 
                      : "opacity-50 border-slate-100 dark:border-slate-850"
                  }`}>
                    <div className={`p-2.5 rounded-xl border ${ach.color} shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="space-y-1 text-xs min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">{ach.title}</h4>
                        {ach.unlocked ? (
                          <span className="text-[9px] bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold px-1.5 py-0.5 rounded uppercase">Unlocked</span>
                        ) : (
                          <span className="text-[9px] bg-slate-100 border border-slate-200 text-slate-500 font-bold px-1.5 py-0.5 rounded uppercase">Locked</span>
                        )}
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{ach.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Badges strip */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-indigo-600" /> Digital Badges Showcase
            </h3>

            <div className="grid grid-cols-3 gap-4">
              {badges.map((badge, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center space-y-2">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${badge.color} text-white flex items-center justify-center font-bold text-base shadow`}>
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-slate-200 text-[11px] leading-tight">{badge.name}</h5>
                    <span className="text-[9px] text-slate-400 block mt-0.5">{badge.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Competitive Leaderboard (Takes 5 columns) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Crown className="w-4.5 h-4.5 text-indigo-600" /> Competitive Cohort Leaderboard
            </h3>

            <div className="space-y-2.5 text-xs">
              {leaderboard.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-xl border flex justify-between items-center transition ${
                    item.active 
                      ? "border-indigo-300 dark:border-indigo-700 bg-indigo-50/10" 
                      : "border-slate-100 dark:border-slate-800 bg-slate-50/30"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono font-black text-slate-400 shrink-0 text-sm">#{item.rank}</span>
                    <div className="min-w-0">
                      <h5 className={`font-bold truncate ${item.active ? "text-indigo-600 dark:text-indigo-400" : "text-slate-800 dark:text-slate-200"}`}>
                        {item.name}
                      </h5>
                      <span className="text-[10px] text-slate-400 block">{item.role}</span>
                    </div>
                  </div>

                  <span className="font-mono font-black text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded shrink-0">
                    {item.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-4 flex justify-between items-center text-[9px] text-slate-400 font-bold uppercase tracking-wider">
            <span>Score tracking ver: v2.4</span>
            <span>Secure Candidate audit</span>
          </div>
        </div>

      </div>

    </div>
  );
}
