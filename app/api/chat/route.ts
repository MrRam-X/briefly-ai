// app/api/chat/route.ts
import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";

export const maxDuration = 30;

// We define the expected API message shape locally to avoid
// any "Missing Type" errors from the library versions.
interface SimpleMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // TRANSFORM: Convert UIMessage (Client) -> SimpleMessage (Server/API)
    // This is the a crucial step to fix the [AI_InvalidPromptError]
    const formattedMessages: SimpleMessage[] = messages.map((m: any) => {
      let textContent = "";

      // 1. Handle SDK v6 'parts' structure
      if (m.parts && Array.isArray(m.parts)) {
        textContent = m.parts
          .filter((part: any) => part.type === "text")
          .map((part: any) => part.text)
          .join("\n");
      }
      // 2. Handle standard 'content' string
      else if (typeof m.content === "string") {
        textContent = m.content;
      }
      // 3. Fallback for anything else
      else {
        textContent = JSON.stringify(m.content || "");
      }

      return {
        role: m.role,
        content: textContent,
      };
    });

    // Use the cleaned 'formattedMessages' array
    const result = await streamText({
      model: groq("llama-3.1-8b-instant"),
      messages: formattedMessages, // Pass the cleaned array here
      system: `You are Briefly AI, an expert editor. 
      Your ONLY job is to summarize the user's provided text. 
      
      CRITICAL RULES:
      1. DO NOT repeat the user's prompt.
      2. DO NOT say "Here is the summary".
      3. Start the response IMMEDIATELY with the summary.
      4. Use bullet points for key takeaways.`,
    });

    // This sends the exact protocol that useChat v6 expects!
    return result.toUIMessageStreamResponse();
    
  } catch (error: any) {
    console.error("💥 API Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
