// app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <div className="max-w-4xl space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
          Understand Long Content <br className="hidden sm:block" />
          <span className="text-blue-600">in Seconds.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Paste your articles, meeting notes, or code. Briefly AI will summarize it instantly so you can get back to work.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/chat" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            Start Chatting
          </Link>
          <Link href="/discover" className="bg-white text-slate-900 border border-slate-300 px-8 py-3 rounded-lg font-medium hover:bg-slate-50 transition">
            Explore Prompts
          </Link>
        </div>

        {/* Next.js Image Optimization Flex */}
        <div className="mt-16 w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
          <Image 
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop" 
            alt="AI Interface Preview"
            width={1200}
            height={600}
            priority // Preloads the image for a 100/100 LCP score
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </main>
  );
}