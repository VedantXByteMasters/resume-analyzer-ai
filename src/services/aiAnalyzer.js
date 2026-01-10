import { safeParseAIResponse } from "../utils/safeParseAIResponse.js";

const PROMPT_TEMPLATE = `You are an expert ATS resume analyzer, recruiter, and career advisor with deep knowledge of
ATS parsing systems, hiring standards, and job market trends.

Analyze the resume text provided below and return a STRICT JSON object.
DO NOT include explanations, markdown, comments, or any extra text.
Return ONLY valid JSON that can be parsed using JSON.parse().

GLOBAL RULES:
- resumeScore must be an INTEGER between 0 and 100
- atsStatus must be EXACTLY one of:
  "ATS Friendly" or "Needs Improvement"
- Skill levels must be INTEGER values between 1 and 10
- Arrays MUST NOT be empty — infer realistic data if missing
- Strengths and weaknesses must be factual and resume-based
- Improvements must be actionable and concise
- Career recommendations must align with detected skills
- Roadmap must be logical, progressive, and time-based
- Keep language concise and professional
- Output MUST be valid JSON

SCORING GUIDELINES (INTERNAL):
- ATS Compatibility: formatting, headings, keyword presence
- Skills Depth: relevance, usage context, balance
- Experience Quality: projects, impact, clarity
- Content Strength: action verbs, clarity, conciseness
- Structure & Readability: section order, length, consistency

ATS STATUS LOGIC:
- If resumeScore >= 75 → "ATS Friendly"
- Else → "Needs Improvement"

SKILL INFERENCE RULES:
- If a skill is mentioned in projects or experience → level 6–9
- If a skill is only listed → level 4–6
- If inferred indirectly → level 3–5
- Soft skills inferred from action verbs and responsibilities

ROADMAP RULES:
- Steps must move from fundamentals → intermediate → advanced
- Durations should be realistic (e.g., "2 weeks", "1 month", "3 months")

Resume Text:
"""
{{RESUME_TEXT}}
"""

Return the JSON in the EXACT structure below:

{
  "resumeScore": 0,
  "atsStatus": "ATS Friendly",
  "strengths": [
    "Strong project-based technical experience",
    "Clear and ATS-compatible resume structure"
  ],
  "weaknesses": [
    "Limited quantified achievements",
    "Soft skills could be demonstrated more clearly"
  ],
  "technicalSkills": [
    { "name": "JavaScript", "level": 7 },
    { "name": "React", "level": 8 }
  ],
  "softSkills": [
    { "name": "Communication", "level": 7 },
    { "name": "Problem Solving", "level": 8 }
  ],
  "improvements": [
    "Add measurable results to project descriptions",
    "Include a short professional summary at the top"
  ],
  "recommendedRoles": [
    "Frontend Developer",
    "Software Engineer"
  ],
  "skillsToLearn": [
    "System Design",
    "Performance Optimization"
  ],
  "certifications": [
    "AWS Cloud Practitioner",
    "Google Professional Web Developer"
  ],
  "roadmap": [
    { "step": "Strengthen core technical skills and revise resume", "duration": "2 weeks" },
    { "step": "Build 2–3 impact-driven projects", "duration": "1 month" },
    { "step": "Apply to relevant roles and prepare for interviews", "duration": "2 months" }
  ]
}`;

export async function analyzeResume(resumeText) {
  // Input validation
  if (!resumeText || typeof resumeText !== 'string' || resumeText.trim().length === 0) {
    throw new Error('Resume text is required and cannot be empty');
  }

  // Environment variable validation with safe logging
  const apiUrl = import.meta.env.VITE_AI_API_URL;
  const apiKey = import.meta.env.VITE_AI_API_KEY;

  console.log('Environment check:', {
    hasApiUrl: !!apiUrl,
    hasApiKey: !!apiKey,
    apiUrlValue: apiUrl ? 'defined' : 'undefined',
    apiKeyLength: apiKey ? apiKey.length : 0
  });

  if (!apiUrl || !apiKey) {
    throw new Error('AI API configuration is missing. Please check VITE_AI_API_URL and VITE_AI_API_KEY environment variables.');
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: PROMPT_TEMPLATE.replace("{{RESUME_TEXT}}", resumeText.trim())
        }
      ],
      temperature: 0.3
    })
  });

  if (!response.ok) {
    // Log full error response for debugging
    let errorDetails = `AI API error: ${response.status} ${response.statusText}`;
    try {
      const errorBody = await response.text();
      console.error('Full API error response:', errorBody);
      errorDetails += ` - ${errorBody}`;
    } catch {
      console.error('Could not read error response body');
    }
    throw new Error(errorDetails);
  }

  const data = await response.json();
  return safeParseAIResponse(data);
}
