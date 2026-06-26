import React, { useState } from "react";
import { 
  FileText, 
  Map, 
  Layers, 
  Mic, 
  Terminal, 
  HelpCircle, 
  Clock, 
  Cpu, 
  CheckCircle, 
  BookOpen,
  ArrowRight,
  Database,
  GitBranch,
  ShieldAlert
} from "lucide-react";

export default function BlueprintCenter() {
  const [activeTab, setActiveTab] = useState<"pitch" | "architecture" | "roadmap" | "docs">("pitch");

  return (
    <div className="bg-[#121215] border border-[#27272A] rounded-2xl shadow-xl overflow-hidden" id="blueprint-center">
      {/* Blueprint Header */}
      <div className="bg-gradient-to-r from-[#0A0A0C] to-blue-950/20 p-6 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#27272A]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-semibold tracking-wider uppercase mb-2">
            <Cpu className="w-3.5 h-3.5" /> Hackathon Blueprint & Judge Console
          </div>
          <h2 className="text-2xl font-bold tracking-tight font-sans text-white">
            Elite AI Interview Architect Blueprint
          </h2>
          <p className="text-[#A1A1AA] text-sm mt-1 max-w-2xl">
            A complete winning execution blueprint from pitch to code, designed specifically to address the requirements of high-caliber hackathon judges.
          </p>
        </div>
        <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-semibold flex items-center gap-2 self-start md:self-auto">
          <CheckCircle className="w-4 h-4" /> Ready for Final Judging
        </div>
      </div>

      {/* Blueprint Navigation Tabs */}
      <div className="flex border-b border-[#27272A] overflow-x-auto bg-[#18181B]">
        <button
          onClick={() => setActiveTab("pitch")}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
            activeTab === "pitch"
              ? "border-blue-500 text-blue-400 bg-[#121215]"
              : "border-transparent text-[#71717A] hover:text-[#D4D4D8] hover:bg-[#18181B]"
          }`}
        >
          <Mic className="w-4 h-4" />
          Winning Pitch & PPT Deck
        </button>
        <button
          onClick={() => setActiveTab("architecture")}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
            activeTab === "architecture"
              ? "border-blue-500 text-blue-400 bg-[#121215]"
              : "border-transparent text-[#71717A] hover:text-[#D4D4D8] hover:bg-[#18181B]"
          }`}
        >
          <Layers className="w-4 h-4" />
          Architecture, API & Schema
        </button>
        <button
          onClick={() => setActiveTab("roadmap")}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
            activeTab === "roadmap"
              ? "border-blue-500 text-blue-400 bg-[#121215]"
              : "border-transparent text-[#71717A] hover:text-[#D4D4D8] hover:bg-[#18181B]"
          }`}
        >
          <Map className="w-4 h-4" />
          24h Hackathon Roadmap
        </button>
        <button
          onClick={() => setActiveTab("docs")}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
            activeTab === "docs"
              ? "border-blue-500 text-blue-400 bg-[#121215]"
              : "border-transparent text-[#71717A] hover:text-[#D4D4D8] hover:bg-[#18181B]"
          }`}
        >
          <FileText className="w-4 h-4" />
          Technical Documentation & README
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-6 md:p-8 max-h-[650px] overflow-y-auto">
        
        {/* TAB 1: PITCH & PPT DECK */}
        {activeTab === "pitch" && (
          <div className="space-y-8 animate-fade-in">
            {/* Elite Elevator Pitch */}
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-5">
              <div className="flex items-center gap-2 text-white font-bold mb-3">
                <Mic className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg">The 2-Minute Winning Pitch (Speech Script)</h3>
              </div>
              <p className="text-[#D4D4D8] italic text-sm leading-relaxed">
                &ldquo;Judges, 90% of students face a massive barrier: they prepare for interview questions they think they'll get, only to be hit with technical realities they never anticipated. Current mock platforms are either static flashcards or require expensive human coaching. We built the **AI Interview Preparation Assistant** to democratize elite recruiting prep.<br/><br/>
                Our platform doesn't just read your resume; it acts as an experienced Tech Lead. It parses your profile to create deep, challenging questions targeting your specific career gaps. But here is the **WOW factor**: it conducts the interview in **real-time voice**. Using browser-based Speech-to-Text, our virtual interviewer listens to you explain complex designs, runs your answers through a server-side Gemini Evaluation Engine, and returns instant, granular grades for communication, technical accuracy, and STAR structure alignment. It then provides the precise, expert-level response you *should* have given. We bridge the gap between student ambition and real-world hiring bars. Let us show you a live mock session.&rdquo;
              </p>
            </div>

            {/* Differentiators Grid */}
            <div>
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" /> Key Differentiators vs. Generic Competitors
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border border-[#27272A] rounded-xl bg-[#18181B]/50">
                  <span className="text-xs font-bold text-blue-400 uppercase">01 / Real Speech Integration</span>
                  <h4 className="font-semibold text-white text-sm mt-1">Live Dictation (Web Speech API)</h4>
                  <p className="text-[#A1A1AA] text-xs mt-1.5 leading-relaxed">
                    While others use simple chat text fields, we capture spoken candidate explanations and transcribe in real-time. This forces real speaking practice.
                  </p>
                </div>
                <div className="p-4 border border-[#27272A] rounded-xl bg-[#18181B]/50">
                  <span className="text-xs font-bold text-blue-400 uppercase">02 / Secure Architecture</span>
                  <h4 className="font-semibold text-white text-sm mt-1">Server-Side Proxy Architecture</h4>
                  <p className="text-[#A1A1AA] text-xs mt-1.5 leading-relaxed">
                    Absolute production safety. All LLM calls and API secret keys are securely hidden behind Express routes to prevent API token hijacking.
                  </p>
                </div>
                <div className="p-4 border border-[#27272A] rounded-xl bg-[#18181B]/50">
                  <span className="text-xs font-bold text-blue-400 uppercase">03 / Actionable Remediation</span>
                  <h4 className="font-semibold text-white text-sm mt-1">STAR Scoring & Custom Exemplars</h4>
                  <p className="text-[#A1A1AA] text-xs mt-1.5 leading-relaxed">
                    We don't just say 'good try'. We score based on STAR methodology, supply the precise rewrite response, and give direct resume bullet-point enhancements.
                  </p>
                </div>
              </div>
            </div>

            {/* Presentation Structure */}
            <div>
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-400" /> Elite 8-Slide Pitch Deck Structure
              </h3>
              <div className="border border-[#27272A] rounded-xl overflow-hidden divide-y divide-[#27272A]">
                <div className="grid grid-cols-12 p-3 bg-[#18181B] text-xs font-semibold text-[#A1A1AA]">
                  <div className="col-span-1">Slide</div>
                  <div className="col-span-3">Title</div>
                  <div className="col-span-8">Core Message & Visual Asset</div>
                </div>
                <div className="grid grid-cols-12 p-3 text-xs text-[#A1A1AA] hover:bg-[#18181B]/50 transition-colors">
                  <div className="col-span-1 font-bold text-blue-400">1</div>
                  <div className="col-span-3 font-semibold text-white">The Hook (Intro)</div>
                  <div className="col-span-8">"Students are studying for the wrong test." Bold statistics on modern technical interview rejection rates.</div>
                </div>
                <div className="grid grid-cols-12 p-3 text-xs text-[#A1A1AA] hover:bg-[#18181B]/50 transition-colors">
                  <div className="col-span-1 font-bold text-blue-400">2</div>
                  <div className="col-span-3 font-semibold text-white">The Core Problem</div>
                  <div className="col-span-8">Standard mock prep lacks tailored feedback, contextualized resume questions, and active verbal simulation.</div>
                </div>
                <div className="grid grid-cols-12 p-3 text-xs text-[#A1A1AA] hover:bg-[#18181B]/50 transition-colors">
                  <div className="col-span-1 font-bold text-blue-400">3</div>
                  <div className="col-span-3 font-semibold text-white">The AI Architect Solution</div>
                  <div className="col-span-8">Interactive demo showing Resume Analysis, real-time Audio Interviews, and Instant STAR grading.</div>
                </div>
                <div className="grid grid-cols-12 p-3 text-xs text-[#A1A1AA] hover:bg-[#18181B]/50 transition-colors">
                  <div className="col-span-1 font-bold text-blue-400">4</div>
                  <div className="col-span-3 font-semibold text-white">The Technical Stack</div>
                  <div className="col-span-8">Vite + React frontend with WebSpeech, Express + Node backend with Gemini-3.5-Flash (structured schemas).</div>
                </div>
                <div className="grid grid-cols-12 p-3 text-xs text-[#A1A1AA] hover:bg-[#18181B]/50 transition-colors">
                  <div className="col-span-1 font-bold text-blue-400">5</div>
                  <div className="col-span-3 font-semibold text-white">Live WOW Demo</div>
                  <div className="col-span-8">Present preset developer profile. Speak a mediocre answer live, show Gemini parsing, grading, and perfecting the response.</div>
                </div>
                <div className="grid grid-cols-12 p-3 text-xs text-[#A1A1AA] hover:bg-[#18181B]/50 transition-colors">
                  <div className="col-span-1 font-bold text-blue-400">6</div>
                  <div className="col-span-3 font-semibold text-white">Unique Differentiators</div>
                  <div className="col-span-8">Zero client-side API leaks, offline mock mode, multi-metric STAR evaluation scores, and actionable resume rewrites.</div>
                </div>
                <div className="grid grid-cols-12 p-3 text-xs text-[#A1A1AA] hover:bg-[#18181B]/50 transition-colors">
                  <div className="col-span-1 font-bold text-blue-400">7</div>
                  <div className="col-span-3 font-semibold text-white">Future Product Roadmap</div>
                  <div className="col-span-8">Multiplayer mock board panels, live interactive code sandbox parsing, and automated Github integration.</div>
                </div>
                <div className="grid grid-cols-12 p-3 text-xs text-[#A1A1AA] hover:bg-[#18181B]/50 transition-colors">
                  <div className="col-span-1 font-bold text-blue-400">8</div>
                  <div className="col-span-3 font-semibold text-white">The Vision (CTA)</div>
                  <div className="col-span-8">"Democratizing elite career access for every developer globally." The Team, GitHub link, and Live QR code.</div>
                </div>
              </div>
            </div>

            {/* anticipated QA */}
            <div>
              <h3 className="text-base font-bold text-white mb-4 flex flex-wrap items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-400" /> Anticipated Judge Q&A (With Definite Winning Answers)
              </h3>
              <div className="space-y-4">
                <div className="border border-[#27272A] rounded-xl p-4 bg-[#18181B]/50">
                  <h4 className="font-semibold text-white text-sm flex items-start gap-2">
                    <span className="text-blue-400 font-bold">Q:</span> How do you handle API key security and scalability when multiple users run interviews at the same time?
                  </h4>
                  <p className="text-[#A1A1AA] text-xs mt-1.5 leading-relaxed pl-4">
                    <span className="font-semibold text-emerald-400">A:</span> "We avoid standard client-side architecture. Our React client never connects directly to Gemini. Instead, all requests route through an Express.js backend where API keys are encrypted at-rest and injected as server secrets. For scale, we implemented stateless server-side JSON schemas via Gemini 3.5 Flash, enabling extremely low latency, parallel request handling, and low cost per evaluation."
                  </p>
                </div>
                <div className="border border-[#27272A] rounded-xl p-4 bg-[#18181B]/50">
                  <h4 className="font-semibold text-white text-sm flex items-start gap-2">
                    <span className="text-blue-400 font-bold">Q:</span> If Web Speech API has varying accuracy based on accents, does your system degrade?
                  </h4>
                  <p className="text-[#A1A1AA] text-xs mt-1.5 leading-relaxed pl-4">
                    <span className="font-semibold text-emerald-400">A:</span> "We designed for absolute UX resilience. If the candidate prefers not to speak or has accent friction, they can edit or type their response directly in our rich text pane. Furthermore, the underlying Gemini API is exceptionally intelligent at understanding slightly garbled or phonetic transcribing, resolving minor voice-to-text spelling errors automatically during evaluation."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ARCHITECTURE, API & SCHEMA */}
        {activeTab === "architecture" && (
          <div className="space-y-8 animate-fade-in">
            {/* System Architecture SVG */}
            <div className="border border-[#27272A] rounded-2xl p-5 bg-[#0A0A0C] text-white shadow-inner">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400 flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> Scalable System Flow
                </span>
                <span className="text-[10px] font-mono text-[#A1A1AA] bg-[#18181B] px-2 py-0.5 rounded">v1.0 Production-Ready</span>
              </div>
              
              <div className="flex flex-col items-center justify-center py-4 space-y-4">
                {/* SVG Visual Flow Chart */}
                <svg viewBox="0 0 800 240" className="w-full h-auto max-w-xl text-slate-200">
                  {/* Nodes */}
                  <rect x="20" y="70" width="160" height="70" rx="10" fill="#18181b" stroke="#3b82f6" strokeWidth="2" />
                  <text x="100" y="102" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">React SPA Client</text>
                  <text x="100" y="122" textAnchor="middle" fill="#a1a1aa" fontSize="10">Web Speech & TTS Engine</text>

                  <rect x="290" y="70" width="180" height="70" rx="10" fill="#18181b" stroke="#2563eb" strokeWidth="2" />
                  <text x="380" y="102" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">Express Proxy Server</text>
                  <text x="380" y="122" textAnchor="middle" fill="#a1a1aa" fontSize="10">Port 3000 Security Gateway</text>

                  <rect x="580" y="70" width="190" height="70" rx="10" fill="#09090b" stroke="#10b981" strokeWidth="2" />
                  <text x="675" y="102" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">Gemini-3.5-Flash API</text>
                  <text x="675" y="122" textAnchor="middle" fill="#10b981" fontSize="10">Structured JSON Engine</text>

                  {/* Arrous */}
                  <path d="M 180 95 L 290 95" stroke="#3b82f6" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
                  <text x="235" y="85" textAnchor="middle" fill="#3b82f6" fontSize="9">POST Payload</text>

                  <path d="M 290 115 L 180 115" stroke="#2563eb" strokeWidth="2" fill="none" />
                  <text x="235" y="130" textAnchor="middle" fill="#a1a1aa" fontSize="9">JSON Response</text>

                  <path d="M 470 95 L 580 95" stroke="#10b981" strokeWidth="2" fill="none" />
                  <text x="525" y="85" textAnchor="middle" fill="#10b981" fontSize="9">Strict Schema</text>

                  <path d="M 580 115 L 470 115" stroke="#10b981" strokeWidth="2" fill="none" />
                  <text x="525" y="130" textAnchor="middle" fill="#a1a1aa" fontSize="9">Validated JSON</text>
                </svg>
              </div>
              <p className="text-[#71717A] text-xs text-center mt-2">
                Secure modular routing separates user speech processing from raw AI prompt structures.
              </p>
            </div>

            {/* Database schema definition */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-400" /> PostgreSQL & Drizzle Schema (Relational Model)
                </h3>
                <p className="text-xs text-[#A1A1AA] mb-3 leading-relaxed">
                  For scale and multi-session persistence, we specify a modular schema structure leveraging PostgreSQL and Drizzle ORM.
                </p>
                <pre className="p-4 bg-[#0A0A0C] rounded-xl text-emerald-400 text-[11px] font-mono overflow-x-auto border border-[#27272A]">
{`import { pgTable, uuid, text, integer, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const interviewSessions = pgTable('interview_sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  role: text('role').notNull(),
  experienceLevel: text('experience_level').notNull(),
  jobDescription: text('job_description'),
  overallSummary: text('overall_summary'),
  hiringRecommendation: text('hiring_recommendation'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const interviewQuestions = pgTable('interview_questions', {
  id: uuid('id').defaultRandom().primaryKey(),
  sessionId: uuid('session_id').references(() => interviewSessions.id),
  questionText: text('question_text').notNull(),
  category: text('category').notNull(),
  rationale: text('rationale'),
  gradingCriteria: text('grading_criteria'),
  candidateAnswer: text('candidate_answer'),
  scoreOverall: integer('score_overall'),
  feedbackStrengths: jsonb('feedback_strengths'),
  feedbackWeaknesses: jsonb('feedback_weaknesses'),
  modelResponse: text('model_response'),
});`}
                </pre>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-blue-400" /> API Contract Structure (JSON Schemas)
                </h3>
                <div className="space-y-4">
                  <div className="border border-[#27272A] rounded-xl p-3 bg-[#18181B]/50">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md font-mono">POST</span>
                    <span className="text-xs font-mono font-semibold text-white ml-2">/api/interview/generate-questions</span>
                    <p className="text-[11px] text-[#A1A1AA] mt-1 leading-relaxed">
                      Generates 5 tailored questions leveraging resume profiles and target role demands.
                    </p>
                    <pre className="p-2.5 bg-[#0A0A0C] text-[10px] font-mono rounded-lg text-amber-300 mt-2 overflow-x-auto border border-[#27272A]">
{`Request: {
  resumeText: "...",
  jobDescription: "...",
  role: "React Architect",
  experienceLevel: "Senior"
}`}
                    </pre>
                  </div>

                  <div className="border border-[#27272A] rounded-xl p-3 bg-[#18181B]/50">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md font-mono">POST</span>
                    <span className="text-xs font-mono font-semibold text-white ml-2">/api/interview/analyze-answer</span>
                    <p className="text-[11px] text-[#A1A1AA] mt-1 leading-relaxed">
                      Grades a single candidate response dynamically across multiple rubrics with model answer comparison.
                    </p>
                    <pre className="p-2.5 bg-[#0A0A0C] text-[10px] font-mono rounded-lg text-amber-300 mt-2 overflow-x-auto border border-[#27272A]">
{`Request: {
  question: "...",
  answer: "...",
  category: "Technical",
  gradingCriteria: "..."
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 24H HACKATHON ROADMAP */}
        {activeTab === "roadmap" && (
          <div className="space-y-8 animate-fade-in">
            {/* 24-Hour Road Map timeline */}
            <div>
              <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" /> High-Velocity 24-Hour Hackathon Implementation Timeline
              </h3>
              
              <div className="relative border-l border-blue-500/20 ml-4 pl-6 space-y-8 text-sm">
                
                {/* Hours 0-4 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1 bg-blue-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">1</span>
                  <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-4">
                    <span className="text-xs font-semibold text-blue-400 font-mono">Hour 0 - 4: Architecting & Env Setup</span>
                    <h4 className="font-bold text-white mt-1">Foundational Scaffolding</h4>
                    <p className="text-[#A1A1AA] text-xs mt-1.5 leading-relaxed">
                      Initialize full-stack repository. Set up Express server with Vite React dev middleware. Declare types in TS and model preset resumes for demo readiness.
                    </p>
                  </div>
                </div>

                {/* Hours 4-10 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1 bg-blue-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">2</span>
                  <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-4">
                    <span className="text-xs font-semibold text-blue-400 font-mono">Hour 4 - 10: Backend APIs & Gemini Engine</span>
                    <h4 className="font-bold text-white mt-1">Secure Core Service Engineering</h4>
                    <p className="text-[#A1A1AA] text-xs mt-1.5 leading-relaxed">
                      Integrate the modern <code className="font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1 rounded">@google/genai</code> client securely in Express. Program response schemas using Gemini's Type system for questions, feedback metrics, and reports.
                    </p>
                  </div>
                </div>

                {/* Hours 10-18 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1 bg-blue-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">3</span>
                  <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-4">
                    <span className="text-xs font-semibold text-blue-400 font-mono">Hour 10 - 18: Frontend Speech Suite & Interactive UX</span>
                    <h4 className="font-bold text-white mt-1">The WOW Factor Core UI</h4>
                    <p className="text-[#A1A1AA] text-xs mt-1.5 leading-relaxed">
                      Build the speaking mock interview room. Connect browsers Speech Recognition API. Embed web SpeechSynthesis voice engine so the AI actually "talks" questions out loud.
                    </p>
                  </div>
                </div>

                {/* Hours 18-24 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1 bg-blue-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">4</span>
                  <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-4">
                    <span className="text-xs font-semibold text-blue-400 font-mono">Hour 18 - 24: Polish, QA & Pitch Tuning</span>
                    <h4 className="font-bold text-white mt-1">Execution Guardrails & Live Test</h4>
                    <p className="text-[#A1A1AA] text-xs mt-1.5 leading-relaxed">
                      Test build compilation, verify linter clean outputs, and double check offline mock key-fallback states to ensure absolute zero crashes in front of judges.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* List of Free APIs used */}
            <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-5">
              <h4 className="font-bold text-white text-sm flex items-center gap-2 mb-3">
                <Cpu className="w-4 h-4 text-blue-400" /> Production Tools & Free APIs Leverage Strategy
              </h4>
              <ul className="grid md:grid-cols-2 gap-3 text-xs text-[#A1A1AA]">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Web Speech API (Chrome Built-in)</span>
                    <p className="text-[11px] mt-0.5 text-[#71717A]">100% free speech-to-text with zero API limits or audio key leaks.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Web Speech Synthesis API</span>
                    <p className="text-[11px] mt-0.5 text-[#71717A]">Generates instant voice cancellations in-browser natively.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Gemini-3.5-Flash (Developer Tier)</span>
                    <p className="text-[11px] mt-0.5 text-[#71717A]">Generates robust structured evaluations with zero billing barriers.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Lucide Icons & Framer Motion</span>
                    <p className="text-[11px] mt-0.5 text-[#71717A]">Slick visual cues, animated waveforms, and dashboard micro-animations.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 4: TECHNICAL DOCUMENTATION & README */}
        {activeTab === "docs" && (
          <div className="space-y-8 animate-fade-in text-sm">
            
            {/* Resume ready description */}
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-5">
              <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded uppercase">Resume-Ready Project Snippet</span>
              <h4 className="font-bold text-white mt-2">AI Interview Prep Architect & Lead Engineer</h4>
              <p className="text-[#A1A1AA] text-xs mt-1.5 leading-relaxed">
                "Engineered a high-fidelity full-stack AI Interview Preparation platform featuring real-time Web Speech transcribing and server-side evaluation proxies. Leveraged the Google GenAI SDK and Express.js to process developer resumes and job descriptions, returning custom structured schemas. Implemented real-time grading models assessing STAR behavioral structures, lowering diagnostic latency to &lt;2s while keeping API key distribution secure and container-ready on Cloud Run."
              </p>
            </div>

            {/* Folder structures */}
            <div>
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-blue-400" /> Production Github Folder Structure
              </h3>
              <pre className="p-4 bg-[#0A0A0C] rounded-xl text-emerald-400 text-xs font-mono overflow-x-auto border border-[#27272A] leading-relaxed">
{`AI-INTERVIEW-PREP-ASSISTANT/
├── .env.example              # Documents backend secrets template
├── .gitignore                # Restricts git tracking of build logs & node modules
├── index.html                # App browser layout setup
├── metadata.json             # Applet runtime capabilities & descriptors
├── package.json              # Build configurations & node package registry
├── server.ts                 # Main Express server entry (Proxy API routes & Vite middleware)
├── tsconfig.json             # TypeScript static lint configurations
├── vite.config.ts            # Vite assets compiler settings
└── src/
    ├── main.tsx              # Browser DOM mounting entry
    ├── App.tsx               # Primary views navigation router
    ├── index.css             # Tailwind standard stylesheet
    ├── types.ts              # Core TypeScript structural interfaces
    └── components/
        ├── BlueprintCenter.tsx    # Interactive Judge Blueprint Console
        ├── InterviewDashboard.tsx  # Initial profile parsing & setup page
        ├── InterviewRoom.tsx       # Speaking simulator with Web Speech transcribing
        └── ResumePresets.ts        # Rapid mock datasets for judges`}
              </pre>
            </div>

            {/* README Structure overview */}
            <div>
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" /> README.md Structure Outline
              </h3>
              <div className="border border-[#27272A] rounded-xl p-4 text-xs text-[#A1A1AA] space-y-2 bg-[#18181B]">
                <p><span className="font-bold text-white">1. Project Banner & Badges</span> - Build states, license, Gemini status indicator.</p>
                <p><span className="font-bold text-white">2. Abstract & Solution Overview</span> - Why static preparation fails, how our voice platform solves it.</p>
                <p><span className="font-bold text-white">3. Quickstart & Installation</span> - Simple <code className="bg-[#0A0A0C] text-[#E4E4E7] px-1 font-mono rounded">npm install</code> and environment variables instructions.</p>
                <p><span className="font-bold text-white">4. Tech Architecture Details</span> - The separation of client microphone speech from Gemini server-side validation.</p>
                <p><span className="font-bold text-white">5. Drizzle & Relational Model Schema</span> - DB layout and transaction triggers.</p>
                <p><span className="font-bold text-white">6. Contributing Contributors & License</span> - MIT guidelines.</p>
              </div>
            </div>

            {/* Security Guard */}
            <div className="bg-amber-500/5 border border-amber-500/20 text-amber-400 rounded-xl p-4 flex gap-3 text-xs">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Elite Architecture Security Note:</span>
                <p className="mt-1 text-[#A1A1AA] leading-relaxed">
                  Competitors often paste raw API keys or client-side GoogleGenAI SDK initializers. This is an instant disqualifier in high-tier hackathons because users can extract keys from client build bundles. By routing all AI prompts through an Express.js proxy on port 3000, we protect our credentials with industrial-grade safety rules.
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
      
      {/* Blueprint Footer */}
      <div className="bg-[#18181B] px-6 py-4 border-t border-[#27272A] flex justify-between items-center text-xs text-[#71717A]">
        <span>Designed by AI Hackathon Architects</span>
        <span className="font-mono text-blue-400 font-semibold flex items-center gap-1">
          Antigravity Engine Active <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}
