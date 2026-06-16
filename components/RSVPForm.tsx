"use client";

import { useState } from "react";
import { submitRSVP, validateRSVP, type RSVPAttendance } from "@/lib/rsvp";

const options: RSVPAttendance[] = ["Yes", "No"];

export function RSVPForm() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<RSVPAttendance | "">("");
  const [note, setNote] = useState("");
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);
    setError(null);

    const result = validateRSVP({
      name,
      attendance,
      note,
      website,
    });

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitRSVP({
        name: result.value.name,
        attendance: result.value.attendance,
        note: result.value.note,
      });
      setFeedback(response.message);
      setName("");
      setAttendance("");
      setNote("");
      setWebsite("");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit RSVP.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="mt-8 grid gap-5" onSubmit={onSubmit} noValidate>
      <label className="grid gap-2">
        <span className="text-sm uppercase tracking-[0.22em] text-rose-800">Name</span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          required
          minLength={2}
          maxLength={80}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
          className="rounded-2xl border border-amber-200 bg-white/85 px-5 py-3 text-base text-rose-900"
        />
      </label>

      <label className="hidden" aria-hidden>
        Website
        <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
      </label>

      <fieldset className="grid gap-3">
        <legend className="text-sm uppercase tracking-[0.22em] text-rose-800">Attendance Confirmation</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {options.map((option) => {
            const checked = attendance === option;
            return (
              <label
                key={option}
                className={`cursor-pointer rounded-2xl border px-5 py-4 transition ${
                  checked
                    ? "border-amber-400 bg-amber-50 text-rose-900"
                    : "border-amber-200/80 bg-white/75 text-rose-700"
                }`}
              >
                <input
                  type="radio"
                  className="sr-only"
                  name="attendance"
                  value={option}
                  checked={checked}
                  onChange={() => setAttendance(option)}
                  required
                />
                <span className="text-base">{option === "Yes" ? "Yes, I will attend" : "No, I cannot attend"}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <label className="grid gap-2">
        <span className="text-sm uppercase tracking-[0.22em] text-rose-800">Message (optional)</span>
        <textarea
          name="note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          maxLength={280}
          rows={3}
          className="rounded-2xl border border-amber-200 bg-white/85 px-5 py-3 text-base text-rose-900"
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-full border border-amber-400 bg-amber-300/25 px-7 py-3 text-sm uppercase tracking-[0.28em] text-rose-900 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Submitting..." : "Submit RSVP"}
      </button>

      {feedback && (
        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700" role="status" aria-live="polite">
          {feedback}
        </p>
      )}
      {error && (
        <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
