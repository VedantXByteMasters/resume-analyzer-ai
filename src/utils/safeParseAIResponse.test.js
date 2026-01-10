import { describe, it, expect, vi, beforeEach } from 'vitest';
import { safeParseAIResponse } from './safeParseAIResponse.js';

describe('safeParseAIResponse', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createMockAPIResponse = (content) => ({
    choices: [
      {
        message: {
          content: typeof content === 'string' ? content : JSON.stringify(content)
        }
      }
    ]
  });

  describe('Valid API responses', () => {
    it('should parse valid JSON response correctly', () => {
      const mockResponse = createMockAPIResponse({
        resumeScore: 85,
        atsStatus: "ATS Friendly",
        strengths: ["Strong technical skills", "Good communication"],
        weaknesses: ["Missing certifications"],
        technicalSkills: [
          { name: "JavaScript", level: 9 },
          { name: "React", level: 8 }
        ],
        softSkills: [
          { name: "Leadership", level: 7 }
        ],
        improvements: ["Add more metrics"],
        recommendedRoles: ["Senior Developer"],
        skillsToLearn: ["TypeScript"],
        certifications: ["AWS Certified"],
        roadmap: [
          { step: "Learn TypeScript", duration: "2 weeks" }
        ]
      });

      const result = safeParseAIResponse(mockResponse);

      expect(result.resumeScore).toBe(85);
      expect(result.atsStatus).toBe("ATS Friendly");
      expect(result.strengths).toHaveLength(2);
      expect(result.weaknesses).toHaveLength(1);
      expect(result.technicalSkills).toHaveLength(2);
      expect(result.softSkills).toHaveLength(1);
    });

    it('should clamp resumeScore to 0-100 range', () => {
      const testCases = [
        { input: -10, expected: 0 },
        { input: 0, expected: 0 },
        { input: 50, expected: 50 },
        { input: 100, expected: 100 },
        { input: 150, expected: 100 },
        { input: null, expected: 0 },
        { input: undefined, expected: 0 },
        { input: "85", expected: 85 }
      ];

      testCases.forEach(({ input, expected }) => {
        const mockResponse = createMockAPIResponse({
          resumeScore: input,
          atsStatus: "ATS Friendly",
          strengths: [],
          weaknesses: [],
          technicalSkills: [],
          softSkills: [],
          improvements: [],
          recommendedRoles: [],
          skillsToLearn: [],
          certifications: [],
          roadmap: []
        });

        const result = safeParseAIResponse(mockResponse);
        expect(result.resumeScore).toBe(expected);
      });
    });

    it('should validate atsStatus and default to "Needs Improvement" for invalid values', () => {
      const testCases = [
        { input: "ATS Friendly", expected: "ATS Friendly" },
        { input: "Needs Improvement", expected: "Needs Improvement" },
        { input: "Invalid Status", expected: "Needs Improvement" },
        { input: null, expected: "Needs Improvement" },
        { input: undefined, expected: "Needs Improvement" }
      ];

      testCases.forEach(({ input, expected }) => {
        const mockResponse = createMockAPIResponse({
          resumeScore: 50,
          atsStatus: input,
          strengths: [],
          weaknesses: [],
          technicalSkills: [],
          softSkills: [],
          improvements: [],
          recommendedRoles: [],
          skillsToLearn: [],
          certifications: [],
          roadmap: []
        });

        const result = safeParseAIResponse(mockResponse);
        expect(result.atsStatus).toBe(expected);
      });
    });

    it('should validate and clamp skill levels to 1-10', () => {
      const mockResponse = createMockAPIResponse({
        resumeScore: 50,
        atsStatus: "ATS Friendly",
        strengths: [],
        weaknesses: [],
        technicalSkills: [
          { name: "JavaScript", level: -5 },
          { name: "React", level: 0 },
          { name: "Node.js", level: 5 },
          { name: "Python", level: 15 },
          { name: "TypeScript", level: 10 }
        ],
        softSkills: [],
        improvements: [],
        recommendedRoles: [],
        skillsToLearn: [],
        certifications: [],
        roadmap: []
      });

      const result = safeParseAIResponse(mockResponse);
      
      expect(result.technicalSkills[0].level).toBe(1); // -5 clamped to 1
      expect(result.technicalSkills[1].level).toBe(1); // 0 clamped to 1
      expect(result.technicalSkills[2].level).toBe(5); // Valid
      expect(result.technicalSkills[3].level).toBe(10); // 15 clamped to 10
      expect(result.technicalSkills[4].level).toBe(10); // Valid
    });

    it('should filter out invalid skill objects', () => {
      const mockResponse = createMockAPIResponse({
        resumeScore: 50,
        atsStatus: "ATS Friendly",
        strengths: [],
        weaknesses: [],
        technicalSkills: [
          { name: "JavaScript", level: 8 },
          { name: "", level: 5 }, // Empty name - should be filtered
          null,
          undefined,
          { level: 5 }, // Missing name - should be filtered
          { name: "React" }, // Missing level - should use default 1
          { name: "Node.js", level: 7 }
        ],
        softSkills: [],
        improvements: [],
        recommendedRoles: [],
        skillsToLearn: [],
        certifications: [],
        roadmap: []
      });

      const result = safeParseAIResponse(mockResponse);
      
      expect(result.technicalSkills).toHaveLength(3); // Only valid ones
      expect(result.technicalSkills[0].name).toBe("JavaScript");
      expect(result.technicalSkills[1].name).toBe("React");
      expect(result.technicalSkills[1].level).toBe(1); // Default level
      expect(result.technicalSkills[2].name).toBe("Node.js");
    });

    it('should handle empty arrays and filter empty strings', () => {
      const mockResponse = createMockAPIResponse({
        resumeScore: 50,
        atsStatus: "ATS Friendly",
        strengths: ["Valid strength", "", "   ", null, undefined],
        weaknesses: [],
        technicalSkills: [],
        softSkills: [],
        improvements: [],
        recommendedRoles: [],
        skillsToLearn: [],
        certifications: [],
        roadmap: []
      });

      const result = safeParseAIResponse(mockResponse);
      
      expect(result.strengths).toHaveLength(1);
      expect(result.strengths[0]).toBe("Valid strength");
      expect(result.weaknesses).toHaveLength(0);
    });

    it('should validate roadmap items', () => {
      const mockResponse = createMockAPIResponse({
        resumeScore: 50,
        atsStatus: "ATS Friendly",
        strengths: [],
        weaknesses: [],
        technicalSkills: [],
        softSkills: [],
        improvements: [],
        recommendedRoles: [],
        skillsToLearn: [],
        certifications: [],
        roadmap: [
          { step: "Learn TypeScript", duration: "2 weeks" },
          { step: "", duration: "1 week" }, // Empty step - filtered
          { step: "Build project", duration: "" }, // Valid
          null,
          { duration: "3 weeks" } // Missing step - filtered
        ]
      });

      const result = safeParseAIResponse(mockResponse);
      
      expect(result.roadmap).toHaveLength(2);
      expect(result.roadmap[0].step).toBe("Learn TypeScript");
      expect(result.roadmap[0].duration).toBe("2 weeks");
      expect(result.roadmap[1].step).toBe("Build project");
    });

    it('should handle JSON wrapped in markdown code blocks', () => {
      const jsonContent = {
        resumeScore: 75,
        atsStatus: "ATS Friendly",
        strengths: ["Good"],
        weaknesses: [],
        technicalSkills: [],
        softSkills: [],
        improvements: [],
        recommendedRoles: [],
        skillsToLearn: [],
        certifications: [],
        roadmap: []
      };

      const mockResponse = {
        choices: [
          {
            message: {
              content: "```json\n" + JSON.stringify(jsonContent) + "\n```"
            }
          }
        ]
      };

      const result = safeParseAIResponse(mockResponse);
      expect(result.resumeScore).toBe(75);
      expect(result.atsStatus).toBe("ATS Friendly");
    });
  });

  describe('Invalid API responses - should throw errors', () => {
    it('should throw error if API response is null', () => {
      expect(() => safeParseAIResponse(null)).toThrow("Failed to parse AI response");
      expect(console.error).toHaveBeenCalled();
    });

    it('should throw error if choices array is missing', () => {
      expect(() => safeParseAIResponse({})).toThrow("missing choices array");
      expect(console.error).toHaveBeenCalled();
    });

    it('should throw error if choices array is empty', () => {
      expect(() => safeParseAIResponse({ choices: [] })).toThrow("missing choices array");
    });

    it('should throw error if message content is missing', () => {
      const mockResponse = {
        choices: [{ message: {} }]
      };
      
      expect(() => safeParseAIResponse(mockResponse)).toThrow("missing message content");
    });

    it('should throw error if content is empty', () => {
      const mockResponse = {
        choices: [{ message: { content: "" } }]
      };
      
      expect(() => safeParseAIResponse(mockResponse)).toThrow(/empty content|missing message content/);
    });

    it('should throw error if content is not valid JSON', () => {
      const mockResponse = {
        choices: [{ message: { content: "This is not JSON" } }]
      };
      
      expect(() => safeParseAIResponse(mockResponse)).toThrow("Failed to parse AI response");
    });

    it('should throw error if JSON is malformed', () => {
      const mockResponse = {
        choices: [{ message: { content: '{"resumeScore": 85, invalid json}' } }]
      };
      
      expect(() => safeParseAIResponse(mockResponse)).toThrow("Failed to parse AI response");
    });
  });

  describe('Edge cases', () => {
    it('should handle non-array values for array fields', () => {
      const mockResponse = createMockAPIResponse({
        resumeScore: 50,
        atsStatus: "ATS Friendly",
        strengths: "not an array",
        weaknesses: null,
        technicalSkills: "invalid",
        softSkills: {},
        improvements: 123,
        recommendedRoles: [],
        skillsToLearn: [],
        certifications: [],
        roadmap: []
      });

      const result = safeParseAIResponse(mockResponse);
      
      expect(Array.isArray(result.strengths)).toBe(true);
      expect(Array.isArray(result.weaknesses)).toBe(true);
      expect(Array.isArray(result.technicalSkills)).toBe(true);
      expect(Array.isArray(result.softSkills)).toBe(true);
      expect(Array.isArray(result.improvements)).toBe(true);
    });

    it('should handle very large resumeScore values', () => {
      const mockResponse = createMockAPIResponse({
        resumeScore: 999999,
        atsStatus: "ATS Friendly",
        strengths: [],
        weaknesses: [],
        technicalSkills: [],
        softSkills: [],
        improvements: [],
        recommendedRoles: [],
        skillsToLearn: [],
        certifications: [],
        roadmap: []
      });

      const result = safeParseAIResponse(mockResponse);
      expect(result.resumeScore).toBe(100);
    });
  });
});
