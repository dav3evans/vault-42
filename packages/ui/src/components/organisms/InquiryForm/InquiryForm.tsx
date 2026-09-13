"use client";

import { useState, type FormEvent } from "react";
import { Button } from "../../atoms/Button/Button";
import { cn } from "../../../lib/cn";

export type InquiryFormField = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea";
  required?: boolean;
};

export type InquiryFormProps = {
  fields: InquiryFormField[];
  submitLabel?: string;
  successMessage?: string;
  className?: string;
};

/**
 * A real, accessible form with local submit-state — no backend wired up yet.
 * Swap the onSubmit handler for a real API/CMS call when one exists.
 */
export function InquiryForm({
  fields,
  submitLabel = "Send",
  successMessage = "Thanks — we'll be in touch shortly.",
  className,
}: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className={cn("border border-gold/20 bg-gold/10 px-6 py-8", className)}>
        <p className="font-display text-xl tracking-[0.03em] text-gold">{successMessage}</p>
      </div>
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className={cn("grid gap-4", className)} onSubmit={handleSubmit}>
      {fields.map((field) => (
        <label key={field.name} className="grid gap-1.5">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-2">
            {field.label}
            {field.required && " *"}
          </span>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              required={field.required}
              rows={4}
              className="border border-white/10 bg-bg-2 px-3.5 py-2.5 text-text outline-none focus:border-gold/50"
            />
          ) : (
            <input
              name={field.name}
              type={field.type ?? "text"}
              required={field.required}
              className="border border-white/10 bg-bg-2 px-3.5 py-2.5 text-text outline-none focus:border-gold/50"
            />
          )}
        </label>
      ))}
      <Button type="submit" className="mt-2 justify-self-start">
        {submitLabel}
      </Button>
    </form>
  );
}
