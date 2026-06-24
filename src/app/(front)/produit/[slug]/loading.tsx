export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="aspect-square rounded-2xl bg-pitch-800" />
        <div className="space-y-4">
          <div className="h-4 w-32 rounded bg-pitch-800" />
          <div className="h-10 w-full rounded bg-pitch-800" />
          <div className="h-8 w-24 rounded bg-pitch-800" />
          <div className="h-24 w-full rounded bg-pitch-800" />
          <div className="h-11 w-40 rounded bg-pitch-800" />
        </div>
      </div>
    </div>
  );
}
