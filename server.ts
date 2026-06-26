import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client helper
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not configured. Falling back to robust mock responses.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Check if Gemini API Key is active
app.get("/api/health", (req, res) => {
  const hasKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY";
  res.json({
    status: "ok",
    geminiConnected: hasKey,
    environment: process.env.NODE_ENV || "development",
  });
});

// Helper to generate custom mock questions depending on role, company, type, difficulty
function generateMockQuestionsForSetup(
  role: string,
  company: string,
  type: string,
  difficulty: string,
  numQuestions: number
) {
  const categories = [type === "Mixed" ? "Technical" : type, type === "Mixed" ? "Behavioral" : type, "System Design", "HR"];
  
  const baseQuestions = [
    {
      question: `In your previous achievements, you highlighted optimizing latency or building key workflows. At ${company || "your target company"}, how would you approach scaling this system to support a 10x spike in traffic during high-profile events, and which profiling or caching layers would you introduce first?`,
      category: type === "Mixed" ? "Technical" : type,
      rationale: "Evaluates production architecture awareness and specific technical depth for the role.",
      gradingCriteria: "Look for mention of specific load-testing metrics, profiling tools (APMs, memory graphs), distributed lock caches like Redis, and query optimization."
    },
    {
      question: `Can you describe a high-stakes scenario where you had a sharp disagreement with a product lead or principal developer about an architectural tradeoff? How did you present your technical rationale, handle the professional friction, and what did you learn from the ultimate outcome?`,
      category: "Behavioral",
      rationale: "Assesses collaboration skills, level-headed alignment, and STAR method structure.",
      gradingCriteria: "Look for objective context setting, clear description of active collaboration rather than emotional pushback, and measurable team learning."
    },
    {
      question: `If you were tasked with auditing the security posture of an API gateway proxy at ${company || "our firm"} to prevent credentials exposure, list your top 3 hardening strategies and explain how you would coordinate this roll-out without causing active developer downtime.`,
      category: type === "Mixed" ? "System Design" : type,
      rationale: "Probes security-first mindset and high-risk migration strategy.",
      gradingCriteria: "Look for token-based auth, secure environment storage mechanisms, request rate-limiting (WAF), and canary deployment configurations."
    },
    {
      question: `Tell me about a time you made a critical technical error that caused a production outage or delayed a massive release milestone. What was your immediate diagnostic triage process, how did you communicate with leadership, and what safeguards did you put in place?`,
      category: "Behavioral",
      rationale: "Evaluates extreme ownership, composure, post-mortem methodology, and stress resilience.",
      gradingCriteria: "Look for rapid rollback, active dashboard profiling, empathetic peer communication, blameless post-mortem, and automated linting/integration checks."
    },
    {
      question: `Why do you want to join ${company || "our enterprise"} specifically as a ${difficulty} ${role || "Engineer"}, and what is the biggest technical or design standard we currently employ that you are most excited to iterate on?`,
      category: "HR",
      rationale: "Assesses culture fit, preparation, intrinsic motivation, and company-specific alignment.",
      gradingCriteria: "Look for direct references to the company's product, specific architectural or UX benchmarks, and genuine professional enthusiasm."
    },
    {
      question: `Explain how you manage state synchronization and data serialization across distributed services, and explain the key differences between polling, SSE (Server-Sent Events), and WebSockets under high concurrency.`,
      category: type === "Mixed" ? "System Design" : type,
      rationale: "Validates core architectural knowledge about network messaging paradigms.",
      gradingCriteria: "Expect discussion of frame overhead, TCP state management, transport fallback, and event-driven backplane synchronization."
    },
    {
      question: `Describe a scenario where you had to quickly learn an unfamiliar framework or SDK (like the Google GenAI TypeScript SDK) within a 48-hour hackathon or production crisis. What was your learning plan, and how did you verify your implementation was production-safe?`,
      category: "Behavioral",
      rationale: "Measures adaptability, rapid technical ingestion capability, and safety validation standards.",
      gradingCriteria: "Look for structured documentation scanning, building small isolated proof-of-concepts, automated unit testing, and leveraging type boundaries."
    },
    {
      question: `What are the memory and processing trade-offs when optimizing a high-frequency event stream client-side in React, and how do you prevent component re-render loops when active state is updated 60 times per second?`,
      category: type === "Mixed" ? "Technical" : type,
      rationale: "Evaluates client-side runtime knowledge and DOM rendering bottlenecks.",
      gradingCriteria: "Should mention RequestAnimationFrame, throttling/debouncing primitives, useRef for state bypass, and canvas/stage rendering if needed."
    }
  ];

  // Slice or pad to match target number of questions
  const selectedQuestions = [];
  for (let i = 0; i < numQuestions; i++) {
    const template = baseQuestions[i % baseQuestions.length];
    selectedQuestions.push({
      id: `q-${i + 1}`,
      question: template.question,
      category: template.category,
      rationale: template.rationale,
      gradingCriteria: template.gradingCriteria
    });
  }
  return selectedQuestions;
}

// Custom mock answer evaluation
function getMockAnswerFeedback(question: string, answer: string, category: string) {
  const words = (answer || "").trim().split(/\s+/).length;
  const isShort = words < 15;
  const scoreBase = isShort ? 50 : 85;

  return {
    scoreOverall: scoreBase + Math.floor(Math.random() * 10),
    scoreCommunication: scoreBase + Math.floor(Math.random() * 12),
    scoreTechnical: scoreBase + Math.floor(Math.random() * 8),
    scoreStarMethod: isShort ? 40 : 80 + Math.floor(Math.random() * 15),
    scoreGrammar: 88 + Math.floor(Math.random() * 10),
    scoreVocabulary: 85 + Math.floor(Math.random() * 12),
    scoreConfidence: isShort ? 60 : 82 + Math.floor(Math.random() * 15),
    scoreProblemSolving: scoreBase + Math.floor(Math.random() * 10),
    speakingSpeed: isShort ? 75 : 120 + Math.floor(Math.random() * 30),
    thinkingTime: 3 + Math.floor(Math.random() * 6),
    emotionIndicator: isShort ? "Anxious" : ["Confident", "Focused", "Calm", "Determined"][Math.floor(Math.random() * 4)],
    feedbackStrengths: [
      "Successfully outlined a contextual situation indicating true engineering understanding.",
      "Identified critical terms like performance optimization and customer outcomes clearly.",
      "Exhibited a clear, structured framework of explanation with strong introductory alignment."
    ],
    feedbackWeaknesses: isShort 
      ? ["Response was extremely short. Provide specific metrics, context, and detailed STAR explanations to score higher."]
      : [
          "Could go deeper into quantifying your concrete results (e.g., specific CPU usage reduced, server cost saved).",
          "Could mention more profiling and debugging tools (e.g., Datadog, Chrome Performance tab, or Explain plans)."
        ],
    grammarFeedback: "Overall great syntax. Minor active-passive structure enhancements could improve flow.",
    vocabularyFeedback: "Good technical jargon utilized. Adding specific cloud or runtime keywords would raise your index.",
    overallImpression: isShort 
      ? "The answer is brief and lacks depth. Expand heavily with actual scenarios." 
      : "Strong candidate answer exhibiting clear professional experience, strong team empathy, and architectural composure.",
    recruiterNotes: "Candidate structures concepts clearly. Good executive presence. Technical capability is apparent.",
    starMethodAnalysis: "Situation and Task were very well structured. Action was clear, but Result needs more quantifiable numbers.",
    keywordsUsed: ["optimization", "API", "collaboration", "latency", "architecture"],
    missingKeywords: ["APM profiling", "Redis caching", "EXPLAIN plans", "metrics benchmark"],
    improvementSuggestions: [
      "Reframe with quantitative metrics: 'reduced p95 latency from 800ms to 120ms'.",
      "Mention specific automated workflows or integration test guards in your action step."
    ],
    suggestedModelResponse: `To solve this performance bottleneck at our previous role, I first isolated the API endpoint using a Profiler to look for blocking event-loop transactions. I discovered a standard database N+1 query. I rewrote the querying protocol in our ORM to perform an eager-join, and established a Redis caching policy with a 10-minute TTL. This instantly reduced our average latency by 45% and scaled our concurrency from 500 up to 4500 concurrent active simulator requests, saving over 30% in cloud resource expenses.`,
    fallback: true
  };
}

// Custom mock session evaluation
function getMockSessionEvaluation(sessionHistory: any[]) {
  return {
    overallSummary: "The candidate demonstrates robust, high-fidelity engineering capabilities. They communicate with outstanding structure, maintain stable voice cadence, and address technical problems methodically using the STAR method. Some small growth opportunities exist in distributed profiling and metric quantification, which can be remedied via our custom roadmap.",
    keyStrengths: [
      "Highly structured delivery, leveraging Situations and concrete Actions smoothly.",
      "Clear articulation of React rendering loops and server proxying mechanisms.",
      "Excellent collaborative composure and stakeholder alignment paradigms."
    ],
    growthAreas: [
      "Needs to quantify personal achievements more aggressively with direct benchmarks.",
      "Should practice outlining high-concurrency microservice message broker designs.",
      "Could expand vocabulary around edge caching architectures and database query planning."
    ],
    hiringRecommendation: "Strong Hire",
    actionPlan: [
      "Infuse exact quantitative success indicators (percentages, hosting savings) into technical answers.",
      "Review advanced distributed caching layouts and real-time WebSocket connection state bounds.",
      "Continue using structured voice dictation practice with a strict 2-minute timer to prevent over-explaining."
    ],
    resumeOptimizations: [
      "Directly add: 'Datadog APM, Redis distributed caching, SQL profiling, and Google GenAI SDK' to technical skills.",
      "Rephrase key bullet point: 'Architected high-scale Express API proxies, lowering p99 response times by 40% and saving $15k yearly in server cost overhead.'"
    ],
    overallScore: 88,
    roleMatchPercentage: 92,
    interviewReadinessPercentage: 90,
    atsReadinessPercentage: 86,
    scoreProblemSolving: 89,
    scoreBehavioral: 91,
    scoreCoding: 84,
    scoreLeadership: 87,
    scoreConfidence: 93,
    shouldRecruit: "Yes" as const
  };
}

// 1. Generate customized questions
app.post("/api/interview/generate-questions", async (req, res) => {
  const { resumeText, jobDescription, role, experienceLevel, company, interviewType, difficultyLevel, numQuestions } = req.body;
  const hasKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY";

  const targetNum = numQuestions ? parseInt(numQuestions) : 5;

  if (!hasKey) {
    console.log("No active Gemini API key. Returning customized mock questions.");
    const questions = generateMockQuestionsForSetup(role, company, interviewType, difficultyLevel, targetNum);
    return res.json({
      roleAnalysis: `[MOCK MODE ACTIVE] Custom alignment analysis compiled for ${role || "Software Engineer"} at ${company || "Target Company"} (${experienceLevel || "Mid-Level"}): Strong resume overlap detected in technical skills. Tailored questions have been loaded with ${difficultyLevel} difficulty parameters.`,
      questions: questions
    });
  }

  try {
    const ai = getGeminiClient();
    const systemPrompt = `You are an elite Director of Engineering and Lead Recruiter. Your task is to analyze the candidate's Resume details, Target Job Description, Company, Role, and Interview Type to generate exactly ${targetNum} extremely targeted, high-fidelity interview questions.
Ensure the questions represent a ${difficultyLevel} difficulty tier. 
Incorporate specific details from the candidate's resume (if supplied) and custom company details to make them exceptionally realistic.
Generate exactly ${targetNum} questions of category: ${interviewType === "Mixed" ? "a balance of Technical, Behavioral, and System Design" : interviewType}.
Output must strictly match the JSON schema.`;

    const prompt = `
Candidate Target Role: ${role || "Software Engineer"}
Experience Level: ${experienceLevel || "Mid-Level"}
Target Company: ${company || "SaaS Enterprise"}
Interview Type: ${interviewType || "Mixed"}
Difficulty Level: ${difficultyLevel || "Medium"}
Number of Questions requested: ${targetNum}
Target Job Description: ${jobDescription || "Not provided"}
Candidate Resume Details: ${resumeText || "No resume supplied"}

Generate exactly ${targetNum} customized interview questions. Reference specific terms, frameworks, or metrics from their resume and target role. Include rationales and grading guidelines.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            roleAnalysis: {
              type: Type.STRING,
              description: "A summary analysis of how well the resume aligns with the target job and company, highlighting strengths and major profile gaps."
            },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  question: { type: Type.STRING, description: "A highly tailored, realistic interview question directed specifically at their resume, company, and target role." },
                  category: { type: Type.STRING, description: "Technical, Behavioral, System Design, Coding, HR, AI/ML, Cloud, Data Science, etc." },
                  rationale: { type: Type.STRING, description: "Why this question is relevant to their profile or gaps." },
                  gradingCriteria: { type: Type.STRING, description: "Actionable grading guidelines for what makes an outstanding answer." }
                },
                required: ["id", "question", "category", "rationale", "gradingCriteria"]
              }
            }
          },
          required: ["roleAnalysis", "questions"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (error: any) {
    console.error("Gemini Question Generation error:", error);
    const questions = generateMockQuestionsForSetup(role, company, interviewType, difficultyLevel, targetNum);
    res.json({
      roleAnalysis: `[FALLBACK SIMULATION ACTIVE] Could not reach Gemini live generation proxy: ${error.message || "Failed to contact Gemini API"}. Loading pre-filled custom questions.`,
      questions: questions,
      fallback: true,
      error: error.message || "Failed to generate interview questions"
    });
  }
});

// 2. Analyze individual answer
app.post("/api/interview/analyze-answer", async (req, res) => {
  const { question, answer, category, gradingCriteria, thinkingTime, speakingSpeed } = req.body;
  const hasKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY";

  if (!hasKey) {
    console.log("No active Gemini API key. Returning customized mock answer feedback.");
    const feedback = getMockAnswerFeedback(question, answer, category);
    if (thinkingTime) feedback.thinkingTime = parseInt(thinkingTime);
    if (speakingSpeed) feedback.speakingSpeed = parseInt(speakingSpeed);
    return res.json(feedback);
  }

  try {
    const ai = getGeminiClient();
    const systemPrompt = `You are a critical, constructive, elite interviewer. Analyze the candidate's answer to the provided interview question based on the category and grading criteria. Be rigorous and quantitative. 
Structure your feedback objectively. Return scores from 0 to 100 for overall, communication, technical accuracy, STAR alignment, grammar, vocabulary, confidence, and problem solving.
Determine the keywords used and missing based on industry standards. Provide improvement suggestions and a premium rewrite exemplifying a perfect 100-score response.`;

    const prompt = `
Question: ${question}
Category: ${category}
Interviewer Grading Criteria: ${gradingCriteria}
Candidate's Answer: ${answer || "[No response provided]"}

Evaluate this response. Provide objective scores and actionable feedback in JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            scoreOverall: { type: Type.INTEGER, description: "Overall score from 0 to 100." },
            scoreCommunication: { type: Type.INTEGER, description: "Communication and articulation score from 0 to 100." },
            scoreTechnical: { type: Type.INTEGER, description: "Technical correctness and accuracy score from 0 to 100." },
            scoreStarMethod: { type: Type.INTEGER, description: "STAR format logical structure score from 0 to 100." },
            scoreGrammar: { type: Type.INTEGER, description: "Grammar, tense, and layout correctness score from 0 to 100." },
            scoreVocabulary: { type: Type.INTEGER, description: "Vocabulary and industry standard terminologies score from 0 to 100." },
            scoreConfidence: { type: Type.INTEGER, description: "Calculated voice/text confidence score from 0 to 100." },
            scoreProblemSolving: { type: Type.INTEGER, description: "Problem solving velocity and correctness score from 0 to 100." },
            emotionIndicator: { type: Type.STRING, description: "Emotional tone: Confident, Focused, Calm, Anxious, or Determined" },
            feedbackStrengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific aspects they explained well." },
            feedbackWeaknesses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific missing details, technical errors, or gaps." },
            grammarFeedback: { type: Type.STRING, description: "Feedback on their speech grammar, active voice usage, or run-on sentences." },
            vocabularyFeedback: { type: Type.STRING, description: "Feedback on technical keywords or descriptors used." },
            overallImpression: { type: Type.STRING, description: "Holistic evaluation of this response." },
            recruiterNotes: { type: Type.STRING, description: "Notes specifically for a hiring manager's internal review board." },
            starMethodAnalysis: { type: Type.STRING, description: "STAR framework breakdown assessment." },
            keywordsUsed: { type: Type.ARRAY, items: { type: Type.STRING } },
            missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            improvementSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestedModelResponse: { type: Type.STRING, description: "A beautifully written, premium, perfect response to this exact question." }
          },
          required: [
            "scoreOverall", "scoreCommunication", "scoreTechnical", "scoreStarMethod", 
            "scoreGrammar", "scoreVocabulary", "scoreConfidence", "scoreProblemSolving",
            "emotionIndicator", "feedbackStrengths", "feedbackWeaknesses", "grammarFeedback",
            "vocabularyFeedback", "overallImpression", "recruiterNotes", "starMethodAnalysis",
            "keywordsUsed", "missingKeywords", "improvementSuggestions", "suggestedModelResponse"
          ]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    
    // Inject client-calculated speed and thinking time if available
    data.thinkingTime = thinkingTime ? parseInt(thinkingTime) : 4;
    data.speakingSpeed = speakingSpeed ? parseInt(speakingSpeed) : 130;
    
    res.json(data);
  } catch (error: any) {
    console.error("Gemini Answer Analysis error:", error);
    res.json({
      ...getMockAnswerFeedback(question, answer, category),
      fallback: true,
      error: error.message || "Failed to analyze answer"
    });
  }
});

// 3. Evaluate full session
app.post("/api/interview/evaluate-session", async (req, res) => {
  const { sessionHistory, setupDetails } = req.body; // Array of { question, answer, feedback }
  const hasKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY";

  if (!hasKey) {
    console.log("No active Gemini API key. Returning customized mock session evaluation.");
    return res.json(getMockSessionEvaluation(sessionHistory));
  }

  try {
    const ai = getGeminiClient();
    const systemPrompt = `You are a Principal Engineering Architect and Director of Talent Acquisition. You have monitored a complete mock interview session.
Synthesize the candidate's answers and individual feedback reports into a master candidate diagnostic report.
Provide a clear summary, overall strengths/weaknesses, hiring recommendations, specific resume optimizations, and quantified analytical subscores (0-100) for communication, technical, problem solving, behavioral, coding, leadership, confidence, and ATS readiness.`;

    const prompt = `
Interview Setup details:
${JSON.stringify(setupDetails, null, 2)}

Interview Session History:
${JSON.stringify(sessionHistory, null, 2)}

Provide a holistic master evaluation and recruitment recommendation in JSON format.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallSummary: { type: Type.STRING, description: "A high-level synthesis of their performance across the entire session." },
            keyStrengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Top 3 overarching strengths seen across the entire session." },
            growthAreas: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Top 3 systemic technical or behavioral gaps." },
            hiringRecommendation: { type: Type.STRING, description: "Strong Hire, Hire, Leaning No, or No Hire based on technical bar." },
            actionPlan: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Concrete 3-step action plan to improve for the real interview." },
            resumeOptimizations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific bullet-point ideas to make their resume stand out and reflect these skills." },
            
            // Quantified SaaS scores
            overallScore: { type: Type.INTEGER },
            roleMatchPercentage: { type: Type.INTEGER },
            interviewReadinessPercentage: { type: Type.INTEGER },
            atsReadinessPercentage: { type: Type.INTEGER },
            scoreProblemSolving: { type: Type.INTEGER },
            scoreBehavioral: { type: Type.INTEGER },
            scoreCoding: { type: Type.INTEGER },
            scoreLeadership: { type: Type.INTEGER },
            scoreConfidence: { type: Type.INTEGER },
            shouldRecruit: { type: Type.STRING, description: "Yes, Maybe, or No" }
          },
          required: [
            "overallSummary", "keyStrengths", "growthAreas", "hiringRecommendation", 
            "actionPlan", "resumeOptimizations", "overallScore", "roleMatchPercentage",
            "interviewReadinessPercentage", "atsReadinessPercentage", "scoreProblemSolving",
            "scoreBehavioral", "scoreCoding", "scoreLeadership", "scoreConfidence", "shouldRecruit"
          ]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (error: any) {
    console.error("Gemini Session Evaluation error:", error);
    res.json({
      ...getMockSessionEvaluation(sessionHistory),
      fallback: true,
      error: error.message || "Failed to evaluate session"
    });
  }
});

// 4. Resume Analyzer (PDF text extraction comparison)
app.post("/api/resume/analyze", async (req, res) => {
  const { resumeText, targetRole, targetJD } = req.body;
  const hasKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY";

  if (!hasKey) {
    console.log("No active Gemini API key. Returning mock resume analysis.");
    return res.json({
      score: 74 + Math.floor(Math.random() * 12),
      extractedSkills: ["TypeScript", "React", "Node.js", "Express", "REST APIs", "SQL", "Docker", "Git"],
      extractedProjects: ["Custom corporate RAG search engine using Vertex AI", "Interactive analytics dashboards", "Automated end-to-end Cypress test suits"],
      extractedExperience: ["AI Software Engineer at CognitiveScale Inc. (2024 - Present)", "Junior Developer at NexTech Solutions (2022 - 2024)"],
      extractedEducation: ["Bachelor of Science in Computer Science"],
      extractedCertifications: ["AWS Certified Developer Associate", "Google Professional Cloud Architect (In Progress)"],
      skillGap: ["Advanced Distributed Caching (Redis/Memcached)", "High-concurrency queues (Kafka/RabbitMQ)", "System design whiteboarding (scalability blueprints)"],
      missingKeywords: ["APM profiling", "Redis latency tuning", "PostgreSQL EXPLAIN plan metrics", "Microservice state consistency"],
      improvementSuggestions: [
        "Quantify your resume metrics further. Rephrase: 'Optimized PostgreSQL query latency by 70% with active database indexing and Redis caches'.",
        "Add a direct section highlighting experience in WebSocket or real-time event-driven setups.",
        "Explicitly list your experience in server-side security proxy patterns for key hiding."
      ],
      comparisonRole: targetRole || "Software Engineer"
    });
  }

  try {
    const ai = getGeminiClient();
    const systemPrompt = `You are an elite automated applicant tracking system (ATS) and expert Recruiter.
Analyze the provided candidate Resume Text and compare it against the Target Job Role and optional Job Description.
Extract the skills, projects, experience, education, and certifications. Calculate a quantified ATS score (0 to 100), identify skills gaps and missing high-impact keywords, and compile detailed improvement suggestions.
Return output strictly matching the JSON schema.`;

    const prompt = `
Target Job Role: ${targetRole || "Software Engineer"}
Target Job Description: ${targetJD || "Not provided"}
Candidate Resume Content:
${resumeText || "Empty"}

Perform a detailed ATS alignment analysis.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER, description: "Calculated ATS score from 0 to 100." },
            extractedSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            extractedProjects: { type: Type.ARRAY, items: { type: Type.STRING } },
            extractedExperience: { type: Type.ARRAY, items: { type: Type.STRING } },
            extractedEducation: { type: Type.ARRAY, items: { type: Type.STRING } },
            extractedCertifications: { type: Type.ARRAY, items: { type: Type.STRING } },
            skillGap: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Core skills standard in target role but missing or weak in resume." },
            missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: "High-impact technical terms or metrics indicators that would raise ATS indexing." },
            improvementSuggestions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Direct guidelines to re-word or rewrite resume sections." },
            comparisonRole: { type: Type.STRING }
          },
          required: [
            "score", "extractedSkills", "extractedProjects", "extractedExperience", 
            "extractedEducation", "extractedCertifications", "skillGap", "missingKeywords", 
            "improvementSuggestions", "comparisonRole"
          ]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (error: any) {
    console.error("Gemini Resume Analysis error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze resume" });
  }
});

// 5. Generate learning roadmap
app.post("/api/roadmap/generate", async (req, res) => {
  const { role, skillGap, missingKeywords } = req.body;
  const hasKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY";

  if (!hasKey) {
    console.log("No active Gemini API key. Returning mock learning roadmap.");
    return res.json({
      role: role || "Software Engineer",
      atsScore: 78,
      skillsGap: skillGap || ["Distributed Systems", "Database Performance"],
      missingKeywords: missingKeywords || ["Redis", "Profiling"],
      courses: [
        { title: "Advanced Node.js & Distributed Scaling Strategies", provider: "Pluralsight", duration: "12 Hours", link: "#" },
        { title: "High-Performance PostgreSQL Index Tuning", provider: "Udemy Professional", duration: "8 Hours", link: "#" },
        { title: "Generative AI Systems Application Engineering", provider: "Google Cloud Skill Boost", duration: "15 Hours", link: "#" }
      ],
      projects: [
        { title: "Distributed WebSockets Chat Backplane with Redis", description: "Build a high-performance chat system supporting horizontal scaling and Redis Pub/Sub backbones.", techStack: ["TypeScript", "Node.js", "Redis", "WebSockets"] },
        { title: "SQL APM Profiler & Query Benchmark Suite", description: "Develop an automated CLI tool that scans SQL scripts, runs EXPLAIN ANALYZE, and profiles execution spikes.", techStack: ["Go", "PostgreSQL", "Docker"] }
      ],
      certifications: [
        "Redis Certified Developer",
        "AWS Certified Solutions Architect Associate"
      ],
      books: [
        "Designing Data-Intensive Applications by Martin Kleppmann",
        "High Performance Browser Networking by Ilya Grigorik"
      ],
      practiceQuestions: [
        "Describe how you manage connection state limits in Node.js WebSockets.",
        "How does a B-Tree index structure optimize range queries in PostgreSQL?"
      ],
      leetcodeProblems: [
        { title: "LRU Cache (146)", difficulty: "Medium", link: "https://leetcode.com/problems/lru-cache/" },
        { title: "Longest Substring Without Repeating Characters (3)", difficulty: "Medium", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" }
      ],
      interviewTopics: [
        "State consistency in distributed cache clusters",
        "Event loop blocking and asynchronous callback concurrency bounds",
        "TCP vs WebSockets handshake states and HTTP/2 proxy streaming rules"
      ]
    });
  }

  try {
    const ai = getGeminiClient();
    const systemPrompt = `You are an elite engineering mentor and career architect.
Create a detailed, actionable, and personalized learning roadmap to bridge the candidate's skills gaps and help them land a role as a ${role || "Software Engineer"}.
Provide courses, hands-on projects, target certifications, books, custom practice questions, specific LeetCode problems, and critical interview topics to master.
Return output matching the JSON schema.`;

    const prompt = `
Target Job Role: ${role || "Software Engineer"}
Identified Skill Gaps: ${JSON.stringify(skillGap || [])}
Identified Missing Keywords: ${JSON.stringify(missingKeywords || [])}

Generate a comprehensive roadmap.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            role: { type: Type.STRING },
            atsScore: { type: Type.INTEGER },
            skillsGap: { type: Type.ARRAY, items: { type: Type.STRING } },
            missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            courses: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  provider: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  link: { type: Type.STRING }
                },
                required: ["title", "provider", "duration", "link"]
              }
            },
            projects: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  techStack: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["title", "description", "techStack"]
              }
            },
            certifications: { type: Type.ARRAY, items: { type: Type.STRING } },
            books: { type: Type.ARRAY, items: { type: Type.STRING } },
            practiceQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            leetcodeProblems: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  difficulty: { type: Type.STRING, description: "Easy, Medium, or Hard" },
                  link: { type: Type.STRING }
                },
                required: ["title", "difficulty", "link"]
              }
            },
            interviewTopics: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: [
            "role", "atsScore", "skillsGap", "missingKeywords", "courses", 
            "projects", "certifications", "books", "practiceQuestions", 
            "leetcodeProblems", "interviewTopics"
          ]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (error: any) {
    console.error("Gemini Roadmap Generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate roadmap" });
  }
});


// Serve static files from Vite build in production
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  // Vite Dev Server configuration is loaded programmatically if started inside dev mode
  import("vite").then(async (viteModule) => {
    const vite = await viteModule.createServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    // Fallback static files serving
    app.use("*", (req, res, next) => {
      // Direct pass to Vite's asset pipelines
      next();
    });
  }).catch(err => {
    console.error("Error launching Vite Dev middleware", err);
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`AI Interview Prep server successfully booted on port ${PORT}`);
});
