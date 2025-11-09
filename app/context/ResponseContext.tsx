"use client";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface Scores {
  tone_score: number;
  structure_score: number;
  skills_match_score: number;
}

interface AtsScore {
  score: number;
  justification: string;
}

interface ResponseData {
  pdfUrl: string;
  scores: Scores;
  ats_score: AtsScore;
  resume_analysis: string[];
  optimization_suggestions: string[];
}

interface ResponseContextType {
  response: ResponseData | null;
  setResponse: (data: ResponseData) => void;
  clearResponse: () => void;
}

const ResponseContext = createContext<ResponseContextType | undefined>(undefined);

export const ResponseProvider = ({ children }: { children: ReactNode }) => {
  const [response, setResponseState] = useState<ResponseData | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("resumeResponse");
    if (saved) {
      try {
        setResponseState(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse saved response:", err);
      }
    }
  }, []);

  // Save to localStorage whenever response changes
  useEffect(() => {
    if (response) {
      localStorage.setItem("resumeResponse", JSON.stringify(response));
      saveToBackend(response);
    }
  }, [response]);

  const saveToBackend = async (data: ResponseData) => {
    try {
      const res = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error || "Failed to save resume");
      console.log("✅ Saved to backend:", result.resume);
    } catch (err) {
      console.error("❌ Failed to save resume:", err);
    }
  };

  const setResponse = (data: ResponseData) => {
    setResponseState(data);
  };

  const clearResponse = () => {
    setResponseState(null);
    localStorage.removeItem("resumeResponse");
  };

  return (
    <ResponseContext.Provider value={{ response, setResponse, clearResponse }}>
      {children}
    </ResponseContext.Provider>
  );
};

export const useResponse = () => {
  const context = useContext(ResponseContext);
  if (!context) {
    throw new Error("useResponse must be used within a ResponseProvider");
  }
  return context;
};
