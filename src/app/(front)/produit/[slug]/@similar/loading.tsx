export default function SimilarLoading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 h-8 w-48 rounded bg-pitch-800" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="aspect-[4/5] rounded-xl bg-pitch-800" />
        ))}
      </div>
    </div>
  );
}
