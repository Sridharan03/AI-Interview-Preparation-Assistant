import React from "react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { 
  TrendingUp, 
  Sparkles, 
  Award, 
  Clock, 
  Layers, 
  Cpu, 
  ThumbsUp, 
  ThumbsDown,
  Activity,
  AwardIcon,
  ChevronRight,
  ListPlus
} from "lucide-react";

export default function AnalyticsDashboard() {
  
  // Mock performance data trends
  const trendData = [
    { name: "June 1", Score: 72, Benchmark: 75 },
    { name: "June 6", Score: 76, Benchmark: 75 },
    { name: "June 12", Score: 79, Benchmark: 75 },
    { name: "June 18", Score: 85, Benchmark: 75 },
    { name: "June 24", Score: 88, Benchmark: 75 },
    { name: "June 26", Score: 92, Benchmark: 75 }
  ];

  const categoryScores = [
    { name: "System Design", Score: 82, color: "#6366f1" },
    { name: "Coding Logic", Score: 90, color: "#10b981" },
    { name: "STAR Answers", Score: 85, color: "#3b82f6" },
    { name: "CI/CD Platforms", Score: 78, color: "#f59e0b" },
    { name: "Behavioral", Score: 89, color: "#ec4899" }
  ];

  const pieData = [
    { name: "Strong Skills", value: 65, color: "#10b981" },
    { name: "Moderate Skills", value: 25, color: "#3b82f6" },
    { name: "Requires Work", value: 10, color: "#ef4444" }
  ];

  return (
    <div className="space-y-6 animate-fade-in text-slate-800 dark:text-slate-100" id="analytics-dashboard">
      
      {/* Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-black p-6 md:p-8 rounded-3xl text-white relative overflow-hidden shadow-md border border-slate-800">
        <div className="max-w-2xl relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <TrendingUp className="w-3.5 h-3.5 animate-pulse" /> Analytics Center
          </span>
          <h2 className="text-2xl md:text-3xl font-black font-sans tracking-tight text-white">
            Candidate Analytics Console
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-1.5 leading-relaxed">
            Track and visualize historical interview scores, communication rates, and tech competency milestones. Your real-world data points are compiled instantly using secure telemetry buffers.
          </p>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Overall average score", val: "84%", sub: "Top 8% of candidates", color: "text-indigo-600 border-indigo-100 bg-indigo-50/10" },
          { label: "Interviews completed", val: "6 Sessions", sub: "100% completion rate", color: "text-emerald-600 border-emerald-100 bg-emerald-50/10" },
          { label: "Practice Duration", val: "180 Mins", sub: "3.2 hours active practice", color: "text-amber-600 border-amber-100 bg-amber-50/10" },
          { label: "Current streak", val: "5 Days", sub: "Streak multiplier: x1.5", color: "text-rose-600 border-rose-100 bg-rose-50/10" }
        ].map((c, i) => (
          <div key={i} className={`border p-4 rounded-2xl shadow-sm ${c.color}`}>
            <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">{c.label}</span>
            <span className="text-3xl font-black font-mono block mt-1.5">{c.val}</span>
            <span className="text-[11px] text-slate-500 block mt-1 leading-snug">{c.sub}</span>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Trend chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
          <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Activity className="w-4 h-4 text-indigo-600" /> Score Improvement Timeline
          </h4>
          
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis domain={[50, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#1e293b", 
                    borderColor: "#334155", 
                    color: "#fff",
                    borderRadius: "12px",
                    fontSize: "12px"
                  }} 
                />
                <Line type="monotone" dataKey="Score" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Benchmark" stroke="#94a3b8" strokeDasharray="5 5" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Bar chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
          <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Layers className="w-4 h-4 text-indigo-600" /> Skills Coverage Efficiency
          </h4>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryScores} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                <Bar dataKey="Score" radius={[4, 4, 0, 0]} barSize={32}>
                  {categoryScores.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Strong & Weak Skills Breakdown List */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Core Strengths */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
          <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-1.5 text-emerald-600">
            <ThumbsUp className="w-4 h-4" /> Strong Technical Domain
          </h4>
          
          <div className="space-y-3 text-xs">
            {[
              { skill: "Structured STAR framework methodology consistency", percentage: 92, status: "Mastered" },
              { skill: "React modular components structure reusability", percentage: 89, status: "Proficient" },
              { skill: "REST API custom routing middleware implementation", percentage: 86, status: "Proficient" }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-slate-200">{item.skill}</h5>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5 block">{item.status}</span>
                </div>
                <span className="font-mono font-black text-emerald-600 shrink-0 ml-4">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Development Opportunities */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
          <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-1.5 text-amber-600">
            <ThumbsDown className="w-4 h-4" /> Gaps & Development Targets
          </h4>

          <div className="space-y-3 text-xs">
            {[
              { skill: "Redis memory cache distributed setups configurations", percentage: 58, status: "Needs Work" },
              { skill: "STAR Answers quantitative metrics & KPIs integration", percentage: 65, status: "Needs Practice" },
              { skill: "Advanced container deployment orchestrations", percentage: 60, status: "Needs Practice" }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-slate-200">{item.skill}</h5>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold mt-0.5 block">{item.status}</span>
                </div>
                <span className="font-mono font-black text-amber-600 shrink-0 ml-4">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
