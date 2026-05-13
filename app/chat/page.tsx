"use client";

import { useChat } from "@ai-sdk/react";
import { UIMessage } from "ai";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, Sparkles, Loader2, User, Bot, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSearchParams } from "next/navigation";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const [sourceText, setSourceText] = useState<string>("");
  const [chatInput, setChatInput] = useState<string>("");

  // State to hold the active prompt from the Discover page
  const [activePrompt, setActivePrompt] = useState<string | null>(() => {
    // We check the URL immediately. If a prompt exists, it's the initial state.
    return searchParams.get("prompt");
  });
  const { messages, sendMessage, status } = useChat();

  const handleSummarize = async () => {
    if (!sourceText.trim()) return;

    const finalPrompt = activePrompt
      ? `${activePrompt}\n\nSource Text:\n${sourceText}`
      : `Please provide a professional summary of the following text:\n\n${sourceText}`;

    await sendMessage({
      text: finalPrompt,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    await sendMessage({
      text: chatInput,
    });
    setChatInput("");
  };

  /**
   * THE FIX FOR 'm.content' ERROR:
   * In v6, we must iterate through 'parts' to find the text.
   */
  const getMessageText = (message: UIMessage): string => {
    if (!message.parts) return "";

    return message.parts
      .filter(
        (part): part is { type: "text"; text: string } => part.type === "text",
      )
      .map((part) => part.text)
      .join("");
  };

  const isLoading = status === "submitted" || status === "streaming";

  return (
    <div className="container mx-auto max-w-6xl p-4 md:p-8 min-h-screen flex flex-col">
      <header className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-blue-600" />
          Briefly AI
        </h1>
        <p className="text-slate-500">Next.js 16 & AI SDK v6 Stable</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        {/* LEFT COLUMN */}
        <Card className="md:col-span-1 h-[600px] flex flex-col shadow-sm overflow-hidden">
          <CardHeader className="shrink-0">
            <CardTitle>Source Content</CardTitle>
            <CardDescription>Paste your text here.</CardDescription>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col overflow-hidden p-4 gap-4">
            <div className="flex-1 overflow-hidden rounded-xl border-2 border-slate-200 focus-within:border-blue-500 transition-colors">
              <Textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Paste your long text here..."
                className="h-full w-full resize-none bg-slate-50 border-none p-4 focus-visible:ring-0 outline-none"
              />
            </div>

            {/* ACTIVE PROMPT BADGE: This is the key UX fix */}
            {activePrompt && (
              <div className="flex items-center justify-between bg-blue-50 border border-blue-100 p-2 rounded-lg animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Badge
                    variant="outline"
                    className="bg-white text-blue-600 border-blue-200 shrink-0"
                  >
                    Active Prompt
                  </Badge>
                  <p className="text-xs text-blue-700 truncate italic">
                    {`"${activePrompt.substring(0, 60)}..."`}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 p-0 text-blue-400 hover:text-blue-600"
                  onClick={() => setActivePrompt(null)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}

            <Button
              onClick={handleSummarize}
              disabled={isLoading || !sourceText.trim()}
              className="shrink-0 w-full gap-2 bg-blue-600 hover:bg-blue-700 h-11"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              Summarize Content
            </Button>
          </CardContent>
        </Card>

        {/* RIGHT COLUMN */}
        <Card className="md:col-span-2 h-[600px] flex flex-col shadow-sm overflow-hidden">
          {/* shrink-0 keeps the header exactly where it is */}
          <CardHeader className="bg-slate-50/50 border-b shrink-0">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              AI Assistant
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 p-0 flex flex-col overflow-hidden bg-white">
            {/* THE FIX: flex-1 makes it fill the middle, overflow-y-auto makes it scrollable */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 mt-20">
                  <Bot className="h-12 w-12 opacity-20 mb-4" />
                  <p>Ready to summarize...</p>
                </div>
              )}

              {messages.map((m: UIMessage) => (
                <div
                  key={m.id}
                  className={`flex gap-3 mb-6 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      m.role === "user" ? "bg-blue-100" : "bg-slate-100"
                    }`}
                  >
                    {m.role === "user" ? (
                      <User className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Bot className="h-4 w-4 text-slate-600" />
                    )}
                  </div>

                  <div
                    className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-none whitespace-pre-wrap"
                        : "bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200 shadow-sm"
                    }`}
                  >
                    {m.role === "user" ? (
                      getMessageText(m)
                    ) : (
                      /* 
                         FIX: Wrap ReactMarkdown in a div. 
                         The 'prose' classes are applied to the wrapper, 
                         which then styles all the HTML children generated by the parser.
                      */
                      <div
                        className="prose prose-sm prose-slate max-w-none break-words 
                                      prose-p:leading-relaxed prose-pre:bg-slate-800 prose-pre:text-slate-50"
                      >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {getMessageText(m)}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* THE FIX: shrink-0 anchors the input box to the bottom */}
            <form
              onSubmit={handleFormSubmit}
              className="p-4 border-t shrink-0 bg-slate-50"
            >
              <div className="relative flex items-center">
                <Textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="min-h-[60px] max-h-[120px] pr-14 bg-white border-slate-200 focus-visible:ring-1 focus-visible:ring-blue-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      const form = e.currentTarget.form;
                      if (form) form.requestSubmit();
                    }
                  }}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !chatInput.trim()}
                  className="absolute right-3 rounded-lg h-9 w-9 p-0 bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
