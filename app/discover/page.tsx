// app/discover/page.tsx
import Link from "next/link";
import { PROMPT_TEMPLATES } from "@/lib/promts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

// This is a Server Component. It fetches data on the server.
const DiscoverPage = async () => {
  // Simulate a database delay to show off our loading state later
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="container mx-auto max-w-6xl p-4 md:p-8 min-h-screen">
      <header className="mb-12 text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 flex items-center justify-center gap-3">
          <Sparkles className="h-10 w-10 text-blue-600" />
          Prompt Library
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Not sure how to start? Choose a professionally crafted prompt to get the best results from Briefly AI.
        </p>
      </header>

      {/* Grid Layout for Prompt Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROMPT_TEMPLATES.map((template) => (
          <Card key={template.id} className="flex flex-col hover:shadow-md transition-shadow border-slate-200">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                  {template.category}
                </span>
              </div>
              <CardTitle className="text-xl">{template.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {template.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-xs text-slate-400 italic line-clamp-3">
                {template.prompt}
              </p>
            </CardContent>
            <CardFooter>
              {/* 
                 INTERVIEW FLEX: URL Search Params. 
                 We pass the prompt via the URL so the Chat page can read it.
              */}
              <Link href={`/chat?prompt=${encodeURIComponent(template.prompt)}`} className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Use this Prompt
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DiscoverPage