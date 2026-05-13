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

    const result = await streamText({
      model: groq("llama-3.3-70b-versatile"),
      messages: formattedMessages,
      system: `You are Briefly AI, an expert editor. 
      Your ONLY job is to summarize the user's provided text. 
      
      STRICT FORMATTING RULES:
      1. Use ONLY standard Markdown syntax for lists. 
      2. EVERY list item MUST start with a hyphen and a space (e.g., "- Item text").
      3. DO NOT use special bullet characters like "•", "◦", or "▪".
      4. DO NOT repeat the user's prompt.
      5. DO NOT use introductory phrases like "Here is the summary".
      6. Start the response IMMEDIATELY with the summary.
      7. Use bold headers (e.g., ### Key Takeaways) to separate sections.`,
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
