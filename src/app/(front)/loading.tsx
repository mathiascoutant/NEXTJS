export default function FrontLoading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-4">
        <div className="h-4 w-32 rounded bg-pitch-800" />
        <div className="h-16 w-2/3 rounded bg-pitch-800" />
        <div className="h-6 w-1/2 rounded bg-pitch-800" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-white/10 bg-pitch-900/50"
          >
            <div className="aspect-square bg-pitch-800" />
            <div className="space-y-3 p-5">
              <div className="h-3 w-20 rounded bg-pitch-800" />
              <div className="h-5 w-full rounded bg-pitch-800" />
              <div className="h-4 w-3/4 rounded bg-pitch-800" />
              <div className="h-6 w-24 rounded bg-pitch-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
