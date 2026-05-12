// app/chat/page.tsx
"use client"; 
// We use "use client" here because this page will soon handle user input, 
// button clicks, and state management for the AI chat.

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles } from "lucide-react"; // Lucide icons come pre-installed with Shadcn!

const ChatPage = () => {
  return (
    <div className="container mx-auto max-w-6xl p-4 md:p-8 min-h-screen flex flex-col">
      <header className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-blue-600" />
          Briefly AI
        </h1>
        <p className="text-slate-500">Paste your content below and ask questions.</p>
      </header>

      {/* Main Grid Layout: 1 column on mobile, 3 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        
        {/* LEFT COLUMN: Input Area (Spans 1 column) */}
        <Card className="md:col-span-1 h-[600px] flex flex-col shadow-sm">
          <CardHeader>
            <CardTitle>Source Content</CardTitle>
            <CardDescription>Paste the article, code, or meeting notes here.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <Textarea 
              placeholder="Paste your long text here..." 
              className="flex-1 resize-none bg-slate-50 border-slate-200 p-4"
            />
            <Button className="mt-4 w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              <Sparkles className="h-4 w-4" />
              Summarize Content
            </Button>
          </CardContent>
        </Card>

        {/* RIGHT COLUMN: Chat Area (Spans 2 columns) */}
        <Card className="md:col-span-2 h-[600px] flex flex-col shadow-sm border-slate-200">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <CardTitle>AI Assistant</CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 p-0 flex flex-col">
            {/* The ScrollArea holds the chat messages */}
            <ScrollArea className="flex-1 p-4">
              {/* Dummy Message 1 */}
              <div className="flex flex-col gap-2 mb-6">
                <div className="bg-slate-100 p-3 rounded-lg max-w-[80%] self-start text-sm text-slate-800">
                  Hello! Paste some text on the left, and I&apos;ll summarize it for you. You can also ask me specific questions about it.
                </div>
              </div>
              
              {/* Dummy Message 2 (User) */}
              <div className="flex flex-col gap-2 mb-6 items-end">
                <div className="bg-blue-600 text-white p-3 rounded-lg max-w-[80%] text-sm">
                  What are the key takeaways from the text I pasted?
                </div>
              </div>
            </ScrollArea>

            {/* Chat Input Box at the bottom */}
            <div className="p-4 border-t border-slate-100 bg-white">
              <div className="relative">
                <Textarea 
                  placeholder="Ask a question about the content..." 
                  className="min-h-[60px] resize-none pr-12 bg-slate-50"
                />
                <Button 
                  size="icon" 
                  className="absolute bottom-2 right-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white h-8 w-8"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

export default ChatPage