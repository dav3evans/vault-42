import { Accent, Button, Eyebrow, Heading } from "@vault42/ui";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-(--container-max) flex-col items-start justify-center gap-6 px-6 py-16">
      <Eyebrow>Component library wired up</Eyebrow>
      <Heading as="h1" size="section">
        Vault 42 <Accent>UI package</Accent> is live in this app
      </Heading>
      <p className="max-w-xl text-muted">
        This page imports <code>@vault42/ui</code> straight from the workspace to prove the
        pipeline end to end. Run <code>npm run storybook</code> to browse the full style guide and
        component set.
      </p>
      <Button href="https://vault42.uk">Example Button</Button>
    </main>
  );
}
