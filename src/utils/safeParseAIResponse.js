export function safeParseAIResponse(apiResponse) {
  try {
    // Validate API response structure
    if (!apiResponse || !apiResponse.choices || !Array.isArray(apiResponse.choices) || apiResponse.choices.length === 0) {
      throw new Error("Invalid API response: missing choices array");
    }

    const message = apiResponse.choices[0]?.message;
    if (!message || !message.content) {
      throw new Error("Invalid API response: missing message content");
    }

    const raw = message.content.trim();
    if (!raw) {
      throw new Error("Invalid API response: empty content");
    }

    // Parse JSON (handle cases where content might be wrapped in markdown code blocks)
    let parsed;
    try {
      // Try parsing directly first
      parsed = JSON.parse(raw);
    } catch (parseError) {
      // If that fails, try extracting JSON from markdown code blocks
      const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || raw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      } else {
        throw parseError;
      }
    }

    // Validate and sanitize data
    const resumeScore = Math.max(0, Math.min(100, Number(parsed.resumeScore) || 0));
    
    // Validate atsStatus
    const validATSStatuses = ["ATS Friendly", "Needs Improvement"];
    const atsStatus = validATSStatuses.includes(parsed.atsStatus) 
      ? parsed.atsStatus 
      : "Needs Improvement";

    // Ensure arrays are arrays and validate skill objects
    const ensureArray = (arr, defaultValue = []) => {
      if (!Array.isArray(arr)) return defaultValue;
      return arr;
    };

    const validateSkills = (skills) => {
      if (!Array.isArray(skills)) return [];
      return skills
        .filter(skill => skill && typeof skill === 'object')
        .map(skill => ({
          name: String(skill.name || ''),
          level: Math.max(1, Math.min(10, Number(skill.level) || 1))
        }))
        .filter(skill => skill.name.trim() !== '');
    };

    const validateRoadmap = (roadmap) => {
      if (!Array.isArray(roadmap)) return [];
      return roadmap
        .filter(item => item && typeof item === 'object')
        .map(item => ({
          step: String(item.step || ''),
          duration: String(item.duration || '')
        }))
        .filter(item => item.step.trim() !== '');
    };

    return {
      resumeScore,
      atsStatus,
      strengths: ensureArray(parsed.strengths).map(s => String(s || '')).filter(s => s.trim() !== ''),
      weaknesses: ensureArray(parsed.weaknesses).map(w => String(w || '')).filter(w => w.trim() !== ''),
      technicalSkills: validateSkills(parsed.technicalSkills),
      softSkills: validateSkills(parsed.softSkills),
      improvements: ensureArray(parsed.improvements).map(i => String(i || '')).filter(i => i.trim() !== ''),
      recommendedRoles: ensureArray(parsed.recommendedRoles).map(r => String(r || '')).filter(r => r.trim() !== ''),
      skillsToLearn: ensureArray(parsed.skillsToLearn).map(s => String(s || '')).filter(s => s.trim() !== ''),
      certifications: ensureArray(parsed.certifications).map(c => String(c || '')).filter(c => c.trim() !== ''),
      roadmap: validateRoadmap(parsed.roadmap)
    };
  } catch (err) {
    console.error("AI parsing failed:", err);
    const errorMessage = err.message || "Invalid AI response format";
    throw new Error(`Failed to parse AI response: ${errorMessage}`);
  }
}
