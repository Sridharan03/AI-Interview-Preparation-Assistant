import React, { useState } from "react";
import { 
  BookOpen, 
  Sparkles, 
  Cpu, 
  CheckCircle, 
  ArrowRight,
  TrendingUp,
  FolderCode,
  Award,
  Book,
  GraduationCap,
  ListTodo,
  CheckCircle2
} from "lucide-react";

interface RoadmapNode {
  title: string;
  duration: string;
  milestones: string[];
  projects: string[];
  skillsGained: string[];
}

interface LearningRoadmapResult {
  role: string;
  courses: { name: string; url: string; platform: string; duration: string }[];
  projects: { title: string; stack: string; description: string }[];
  certifications: string[];
  leetcodeTopics: string[];
  recommendedBooks: string[];
  nodes: RoadmapNode[];
}

export default function LearningRoadmap() {
  const [role, setRole] = useState("AI Integration Engineer");
  const [experienceLevel, setExperienceLevel] = useState<"Junior" | "Mid-Level" | "Senior">("Mid-Level");
  const [isLoading, setIsLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<LearningRoadmapResult | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/roadmap/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, experienceLevel })
      });

      if (!response.ok) {
        throw new Error("Roadmap generation failed.");
      }

      const data = await response.json();
      setRoadmap(data);
    } catch (err) {
      console.error(err);
      // Fallback mock roadmap data if API isn't available
      setRoadmap({
        role: `${experienceLevel} ${role}`,
        courses: [
          { name: "Deep Learning Specialization", url: "#", platform: "Coursera / Stanford", duration: "12 Weeks" },
          { name: "TypeScript Advanced Enterprise Design Patterns", url: "#", platform: "Vercel Academy", duration: "4 Weeks" },
          { name: "Distributed System Design & Redis Architectures", url: "#", platform: "Redis University", duration: "6 Weeks" }
        ],
        projects: [
          { title: "Real-time STAR Answer Feedback Engine", stack: "React, WebSpeech, Express, Gemini Flash API", description: "Design a scalable sandbox capturing speech transcript stream and rendering immediate STAR scorecard evaluation stats." },
          { title: "Distributed Web Crawler with Redis Broker", stack: "Node.js, Redis, PostgreSQL, Kubernetes", description: "Engineer a high-throughput async processing pipeline crawling tech specs and storing semantic tags." }
        ],
        certifications: [
          "Google Cloud Professional Machine Learning Engineer",
          "AWS Certified Solutions Architect – Professional"
        ],
        leetcodeTopics: [
          "Graph Depth-First-Search (DFS / BFS) patterns for dependency trees",
          "LRU Cache memory optimizations using hash structures",
          "Backtracking algorithms for decision-tree calculations"
        ],
        recommendedBooks: [
          "Designing Data-Intensive Applications by Martin Kleppmann",
          "Patterns of Enterprise Application Architecture by Martin Fowler"
        ],
        nodes: [
          {
            title: "Phase 1: Foundations & Semantic Engineering",
            duration: "Weeks 1 - 4",
            milestones: ["Master prompt templates", "Configure robust Express.js async route middleware wrappers", "Bind WebSpeech transcription buffers"],
            projects: ["Offline-first Speech sandbox recorder"],
            skillsGained: ["Speech-to-Text syncing", "JSON parsing security schemas"]
          },
          {
            title: "Phase 2: Scale, Cache, and Infrastructure",
            duration: "Weeks 5 - 8",
            milestones: ["Integrate Redis memory caches", "Optimize database schema via Drizzle indexes", "Dockerize container clusters for ingress"],
            projects: ["High-throughput query broker"],
            skillsGained: ["System Design", "Cloud resource optimization"]
          }
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" id="learning-roadmap">
      
      {/* Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-black p-6 md:p-8 rounded-3xl text-white relative overflow-hidden shadow-md border border-slate-800">
        <div className="max-w-2xl relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5 animate-pulse" /> Precision Skill Scaling
          </span>
          <h2 className="text-2xl md:text-3xl font-black font-sans tracking-tight text-white">
            Personalized AI Learning Roadmap
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-1.5 leading-relaxed">
            Generate a custom career-scaling syllabus. Our secure engine checks target role specs, selects matching LeetCode exercises, book resources, and hands-on projects to ensure you scale fast.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Setup Parameters Panel */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-5">
          <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-2">
            <GraduationCap className="w-4.5 h-4.5 text-indigo-600" /> Syllabus Parameters
          </h3>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Career Goal Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-xs transition text-slate-800 dark:text-slate-200"
                placeholder="e.g. AI Integration Engineer"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Target Experience Level</label>
              <div className="grid grid-cols-3 gap-2">
                {(["Junior", "Mid-Level", "Senior"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setExperienceLevel(lvl)}
                    className={`py-2 px-1 border text-[10px] font-bold rounded-xl transition cursor-pointer ${
                      experienceLevel === lvl
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Cpu className="w-4 h-4 animate-spin text-indigo-300" />
                  Generating Roadmap...
                </>
              ) : (
                <>
                  <span>Compile Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Output Roadmap Nodes & Details */}
        <div className="lg:col-span-8 space-y-6">
          {roadmap ? (
            <div className="space-y-6 animate-fade-in text-xs">
              
              {/* Chronological Timeline Milestone Blocks */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <TrendingUp className="w-4 h-4 text-indigo-600" /> Chronological Phase Milestones
                </h4>

                <div className="space-y-6 relative pl-4 border-l border-slate-200 dark:border-slate-800 ml-1 mt-4">
                  {roadmap.nodes.map((node, index) => (
                    <div key={index} className="relative space-y-2">
                      {/* Node Bullet point */}
                      <span className="absolute -left-[21px] top-0.5 w-3 h-3 rounded-full bg-indigo-600 border-2 border-white dark:border-slate-900 shadow-sm" />
                      
                      <div className="flex justify-between items-center">
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{node.title}</h5>
                        <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 px-2 py-0.5 rounded-lg font-mono font-bold">{node.duration}</span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 pt-1">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Key Milestones</span>
                          <ul className="space-y-1 pl-4 list-disc text-slate-600 dark:text-slate-400">
                            {node.milestones.map((m, i) => <li key={i}>{m}</li>)}
                          </ul>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Build Target</span>
                          <div className="flex flex-wrap gap-1">
                            {node.projects.map((p, i) => (
                              <span key={i} className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono text-[9px] text-slate-700 dark:text-slate-300 font-bold">{p}</span>
                            ))}
                          </div>
                          <span className="text-[9px] uppercase font-bold text-slate-400 block mt-2 mb-1">Skills Mastered</span>
                          <div className="flex flex-wrap gap-1">
                            {node.skillsGained.map((s, i) => (
                              <span key={i} className="bg-emerald-50 dark:bg-emerald-950/10 border border-emerald-200 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-lg text-[9px] font-semibold">{s}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning projects blueprints */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-1.5">
                  <FolderCode className="w-4 h-4 text-indigo-600" /> Recommended Portfolio Blueprints
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {roadmap.projects.map((proj, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold text-slate-400">Project Blueprint {idx + 1}</span>
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs">{proj.title}</h5>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px] pt-1">{proj.description}</p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800 text-[10px] text-indigo-600 dark:text-indigo-400 font-mono">
                        <strong>Stack:</strong> {proj.stack}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resource checklists */}
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Courses & Books */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-xs font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg uppercase tracking-wide inline-block">
                    Recommended Syllabi
                  </span>
                  <div className="space-y-3 pt-1">
                    {roadmap.courses.map((c, idx) => (
                      <div key={idx} className="flex gap-2 items-start leading-relaxed text-slate-600 dark:text-slate-400">
                        <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-800 dark:text-slate-200">{c.name}</strong>
                          <span className="block text-[10px] text-slate-400">{c.platform} &bull; {c.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* LeetCode Topics & Certifications */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg uppercase tracking-wide inline-block">
                    Elite Leetcode & Cert Objectives
                  </span>
                  <div className="space-y-3 pt-1">
                    {roadmap.leetcodeTopics.map((topic, idx) => (
                      <div key={idx} className="flex gap-2 items-start leading-relaxed text-slate-600 dark:text-slate-400">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <p>{topic}</p>
                      </div>
                    ))}
                    {roadmap.certifications.map((cert, idx) => (
                      <div key={idx} className="flex gap-2 items-start leading-relaxed text-slate-600 dark:text-slate-400">
                        <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <p>{cert}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 py-32 text-center rounded-2xl flex flex-col items-center justify-center space-y-3 shadow-sm">
              <ListTodo className="w-10 h-10 text-slate-300" />
              <span className="font-bold text-slate-500 text-xs">Waiting for Target parameters</span>
              <p className="text-[10px] text-slate-400 max-w-xs px-4">
                Define your target career goal and click "Compile Roadmap". We will analyze skill gaps and construct an interactive, itemized curriculum checklist.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
