
import { GoogleGenAI, Type } from "@google/genai";
import { CVData, Language, AIResponse } from "../types";

export const generateCVVersions = async (data: CVData, lang: Language): Promise<AIResponse> => {
  // Always use { apiKey: process.env.API_KEY } for GoogleGenAI initialization
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are an elite CV strategist and recruiter.
    Rewrite the user's content to maximize hiring impact in ${lang === Language.EN ? 'English' : 'Turkish'}.
    Use measurable achievements and metrics where possible. If the user provided vague descriptions, estimate realistic impact metrics (e.g., "Increased efficiency by 20%").
    Eliminate weak phrasing. Keep a professional tone. No fluff. Clear bullet points.
    
    You must generate 7 different CV versions:
    1. Corporate Professional (Traditional, polished, formal language)
    2. Startup / Tech Focused (Action-oriented, focuses on tools and agility)
    3. Minimal & Direct (Extremely concise, high-impact keywords only)
    4. Creative & Storytelling (Narrative approach to professional growth)
    5. Executive Level (Focus on leadership, strategy, and business outcomes)
    6. International English Optimized (Neutral global standards, clean phrasing)
    7. ATS-Optimized Version (Keyword dense, simple structure for machines)
    
    Return a JSON object with an array called "versions". Each version should have:
    - title: The name of the style
    - description: A short 1-sentence explanation of why this style works.
    - htmlContent: A complete, self-contained HTML block (no <html> or <body> tags, just the inner content) for the CV sections. Use semantic tags like <h3> for sections, <ul> and <li> for points. Use tailwind-like classes where appropriate for typography (e.g., text-xl, font-bold).
    - styleSlug: A simple identifier (e.g. "corporate", "startup").
  `;

  const prompt = `
    Input Data:
    Personal: ${JSON.stringify(data.personal)}
    Summary: ${data.aboutMe}
    Experience: ${JSON.stringify(data.experience)}
    Education: ${JSON.stringify(data.education)}
    Skills: ${data.skills.join(', ')}
    Projects: ${data.projects.join(', ')}
    Certs: ${data.certifications.join(', ')}
    Languages: ${data.languages.join(', ')}
    References: ${data.references}

    Generate the 7 styles now. Output MUST be valid JSON.
  `;

  try {
    // Using gemini-3-pro-preview for complex reasoning task (CV Strategy)
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            versions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  htmlContent: { type: Type.STRING },
                  styleSlug: { type: Type.STRING }
                },
                required: ["title", "description", "htmlContent", "styleSlug"]
              }
            }
          },
          required: ["versions"]
        }
      },
    });

    // Access text property directly (it's a getter, not a method)
    const text = response.text || '{}';
    return JSON.parse(text) as AIResponse;
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};
