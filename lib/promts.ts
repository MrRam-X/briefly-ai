// lib/prompts.ts
export type PromptTemplate = {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: 'Professional' | 'Creative' | 'Technical';
};

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'exec-summary',
    title: 'Executive Summary',
    description: 'Condense long reports into high-level bullet points for leadership.',
    prompt: 'Please provide a professional executive summary of the following text. Focus on key outcomes, risks, and next steps.',
    category: 'Professional',
  },
  {
    id: 'tech-deep-dive',
    title: 'Technical Deep-Dive',
    description: 'Extract technical specifications and architectural decisions from documentation.',
    prompt: 'Analyze the following technical text. Extract all architectural decisions, technology stack mentions, and technical constraints.',
    category: 'Technical',
  },
  {
    id: 'social-thread',
    title: 'LinkedIn Thread',
    description: 'Convert a long article into a viral-style LinkedIn thread.',
    prompt: 'Transform the following content into a high-engaging LinkedIn thread. Use a hook at the start and a call to action at the end.',
    category: 'Creative',
  },
  {
    id: 'action-items',
    title: 'Action Item Extractor',
    description: 'Turn meeting notes into a clear list of tasks and owners.',
    prompt: 'Extract all action items and deadlines from these meeting notes. Format them as a checklist.',
    category: 'Professional',
  },
  {
    id: 'ELI5',
    title: 'Explain Like I\'m 5',
    description: 'Simplify complex jargon into easy-to-understand language.',
    prompt: 'Explain the following content as if I am 5 years old. Use simple analogies and avoid all jargon.',
    category: 'Creative',
  },
];