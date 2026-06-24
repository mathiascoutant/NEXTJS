import { ErrorTrigger } from "../../_components/page-transition";

export default function ErrorTestPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="font-display text-4xl text-white">Page de test — Error</h1>
      <p className="mt-4 text-pitch-300">
        Cette page déclenche volontairement une erreur pour tester error.tsx.
      </p>
      <ErrorTrigger />
    </div>
  );
}
