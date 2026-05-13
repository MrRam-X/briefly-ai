import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto max-w-6xl p-4 md:p-8 min-h-screen">
      <div className="mb-12 text-center space-y-4">
        <div className="h-10 w-64 bg-slate-200 animate-pulse mx-auto rounded-md" />
        <div className="h-4 w-96 bg-slate-200 animate-pulse mx-auto rounded-md" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="h-4 w-20 bg-slate-200 animate-pulse rounded" />
            <div className="h-6 w-full bg-slate-200 animate-pulse rounded" />
            <div className="h-4 w-3/4 bg-slate-200 animate-pulse rounded" />
            <div className="h-10 w-full bg-slate-200 animate-pulse rounded-md mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}