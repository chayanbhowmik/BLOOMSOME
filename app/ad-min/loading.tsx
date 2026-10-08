export default function AdminLoading() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-paper border border-line rounded-3xl p-8 sm:p-10 shadow-sm animate-pulse">
        <div className="h-3 w-32 bg-line rounded mb-5" />
        <div className="h-9 w-56 bg-line rounded mb-4" />
        <div className="h-3 w-full bg-line rounded mb-2" />
        <div className="h-3 w-4/5 bg-line rounded mb-8" />
        <div className="h-11 w-full bg-line rounded mb-4" />
        <div className="h-11 w-full bg-line rounded" />
      </div>
    </main>
  );
}