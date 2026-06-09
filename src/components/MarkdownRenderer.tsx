import React from "react";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  // Split content by paragraphs or lines to render systematically
  const lines = content.split("\n");

  const renderedElements = lines.map((line, index) => {
    let trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) {
      return <div key={index} className="h-2" />;
    }

    // Handle Headers: ### or ## or #
    if (trimmed.startsWith("###")) {
      const headerText = trimmed.replace(/^###\s*/, "");
      return (
        <h4 
          key={index} 
          className="text-lg font-bold text-amber-500 mt-6 mb-3 border-b border-slate-700 pb-1 flex items-center gap-2"
        >
          <span className="w-1.5 h-4 bg-amber-500 rounded-sm"></span>
          {parseBoldText(headerText)}
        </h4>
      );
    }
    
    if (trimmed.startsWith("##")) {
      const headerText = trimmed.replace(/^##\s*/, "");
      return (
        <h3 
          key={index} 
          className="text-xl font-bold text-amber-500 mt-8 mb-4 border-b-2 border-slate-700 pb-2 flex items-center gap-2"
        >
          <span className="w-2 h-5 bg-amber-500 rounded-sm"></span>
          {parseBoldText(headerText)}
        </h3>
      );
    }

    if (trimmed.startsWith("#")) {
      const headerText = trimmed.replace(/^#\s*/, "");
      return (
        <h2 
          key={index} 
          className="text-2xl font-black text-amber-500 mt-8 mb-4 tracking-tight"
        >
          {parseBoldText(headerText)}
        </h2>
      );
    }

    // Handle List Items starting with * or - or bullet points from user response
    if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
      const listText = trimmed.replace(/^[\*\-]\s*/, "");
      return (
        <ul key={index} className="list-none pl-4 my-1.5">
          <li className="text-slate-200 text-sm md:text-base leading-relaxed flex items-start gap-2">
            <span className="text-amber-500 text-xs mt-1.5 flex-shrink-0">●</span>
            <div>{parseBoldText(listText)}</div>
          </li>
        </ul>
      );
    }

    // Handle numbered list items: e.g. 1. or १.
    const numberedMatch = trimmed.match(/^(\d+|[\u0966-\u096F]+)\.\s*(.*)/);
    if (numberedMatch) {
      const num = numberedMatch[1];
      const text = numberedMatch[2];
      return (
        <div key={index} className="pl-2 my-2 flex items-start gap-3">
          <span className="bg-amber-500/10 text-amber-500 font-bold text-xs px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">
            {num}
          </span>
          <div className="text-slate-100 text-sm md:text-base leading-relaxed">
            {parseBoldText(text)}
          </div>
        </div>
      );
    }

    // Default Paragraph text
    return (
      <p key={index} className="text-slate-300 text-sm md:text-base leading-relaxed my-2">
        {parseBoldText(trimmed)}
      </p>
    );
  });

  return <div className="space-y-1.5 text-slate-100 py-1">{renderedElements}</div>;
}

// Simple parser to make **text** bold
function parseBoldText(text: string) {
  if (!text.includes("**")) {
    return text;
  }

  const parts = text.split("**");
  return parts.map((part, i) => {
    // Odd indices are surrounded by **
    if (i % 2 === 1) {
      return (
        <strong key={i} className="font-semibold text-amber-400">
          {part}
        </strong>
      );
    }
    return part;
  });
}
