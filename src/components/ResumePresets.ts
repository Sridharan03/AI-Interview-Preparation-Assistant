import { ResumePreset } from "../types";

export const RESUME_PRESETS: ResumePreset[] = [
  {
    name: "Alex Rivera (AI & ML Specialist)",
    role: "AI Engineer",
    experienceLevel: "Mid-Level",
    resumeText: `ALEX RIVERA
AI & Machine Learning Engineer | alex.rivera@email.com | (555) 019-2831
https://github.com/alexrivera-ai

SUMMARY
Highly analytical Software Engineer with 3+ years of experience specializing in Machine Learning, Generative AI models, and production-grade API scaling. Built and fine-tuned Retrieval-Augmented Generation (RAG) pipelines that reduced query latency by 40% and improved response precision by 25%.

TECHNICAL SKILLS
- Languages: Python, TypeScript, SQL, Bash
- Frameworks: PyTorch, LangChain, @google/genai, Express, FastAPI, React
- Infrastructure: Docker, Google Cloud Platform (Vertex AI, Cloud Run), PostgreSQL, Redis

PROFESSIONAL EXPERIENCE
AI Software Engineer | CognitiveScale Inc. | 2024 - Present
- Architected a custom corporate RAG search engine using vertex AI and vector databases.
- Optimized vector search queries and database indices, reducing average query response times from 1.2s to 340ms (70% latency improvement).
- Led transition from client-side AI API keys to a secure, server-side Express proxy.

Junior Developer | NexTech Solutions | 2022 - 2024
- Built interactive analytics dashboards using React, Tailwind CSS, and D3.js.
- Implemented automated end-to-end testing with Cypress, reducing production visual bugs by 35%.`,
    jobDescription: `ROLE DESCRIPTION: Senior AI Application Engineer
We are seeking a senior AI Application Engineer to design, deploy, and scale high-fidelity LLM applications. You will work with TypeScript, Python, and modern orchestration frameworks (e.g., LangChain, Google GenAI SDK).
Key requirements:
- Deep understanding of prompt engineering, LLM system architecture, and server-side API proxying.
- Experience with performance profiling, Redis cache implementation, and distributed databases.
- Excellent communication and structured problem-solving skills.`
  },
  {
    name: "Sophia Chen (Senior Full-Stack Developer)",
    role: "Full-Stack Developer",
    experienceLevel: "Senior",
    resumeText: `SOPHIA CHEN
Senior Full-Stack Software Engineer | sophia.chen@email.com | (555) 048-1293
https://linkedin.com/in/sophiachen-dev

SUMMARY
Architect-level developer with 6+ years of full-stack experience building high-scale SaaS products. Expertise in highly modular React systems, Node.js concurrency, database replication, and system performance optimizations.

TECHNICAL SKILLS
- Frontend: React 18, Next.js, Tailwind CSS, Web Sockets, Recharts, Framer Motion
- Backend: Node.js, Express, Go, PostgreSQL, Redis, Kafka, GraphQL
- Devops: AWS (ECS, RDS, S3), Kubernetes, GitHub Actions, Terraform

PROFESSIONAL EXPERIENCE
Senior Full-Stack Engineer | StripeFlow | 2023 - Present
- Designed a real-time analytics engine handling 12,000 requests per second with a p99 latency of <50ms.
- Migrated legacy monolith systems to modular server-side microservices, lowering infrastructure costs by 22%.
- Created custom WebSpeech transcription and real-time interaction modules in React, enhancing accessibility.

Full-Stack Developer | DevCorp | 2020 - 2023
- Built dynamic checkout systems utilizing Stripe and custom security protocols.
- Maintained a core React UI component library used across 4 internal engineering teams, standardizing visual identity.`
    ,
    jobDescription: `ROLE DESCRIPTION: Lead Full-Stack Architect
StripeFlow is hiring a Lead Full-Stack Architect to scale our cloud dashboard and transaction analytics platform.
Core requirements:
- Highly proficient with React, Tailwind CSS, TypeScript, and server-side performance tuning.
- Familiarity with real-time architectures (WebSocket/SSE) and high-concurrency database queries.
- Proven leadership in technical architecture decisions and resolving collaboration friction.`
  }
];
