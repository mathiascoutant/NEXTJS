async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function LoadingTestPage() {
  await delay(3000);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="font-display text-4xl text-white">Page de test — Loading</h1>
      <p className="mt-4 text-pitch-300">
        Cette page attend 3 secondes pour afficher le skeleton global du front.
      </p>
    </div>
  );
}
