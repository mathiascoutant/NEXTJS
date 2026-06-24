import { PageTransition } from "./_components/page-transition";

export default function FrontTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PageTransition>{children}</PageTransition>;
}
