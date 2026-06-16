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

      const result = validateRSVP({ name, attendance, note, website });

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
      <form className="mt-6 grid gap-5 w-full max-w-md" onSubmit={onSubmit} noValidate>
          <div className="grid gap-2">
              <label htmlFor="rsvp-name" className="detail-item-label text-left">
                  Your Name
              </label>
        <input
                  id="rsvp-name"
          type="text"
          name="name"
          autoComplete="name"
          required
          minLength={2}
          maxLength={80}
          value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="lux-input"
        />
          </div>

          {/* Honeypot */}
      <label className="hidden" aria-hidden>
        Website
              <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </label>

          <div className="grid gap-2">
              <p className="detail-item-label text-left">Will you attend?</p>
              <div className="lux-radio-group">
          {options.map((option) => {
            const checked = attendance === option;
            return (
              <label
                key={option}
                    className={`lux-radio-option ${checked ? "lux-radio-option--selected" : ""}`}
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
                    {option === "Yes" ? "Joyfully Accept" : "Respectfully Decline"}
              </label>
            );
          })}
        </div>
          </div>

          <div className="grid gap-2">
              <label htmlFor="rsvp-note" className="detail-item-label text-left">
                  Message <span className="font-normal opacity-50">(optional)</span>
              </label>
        <textarea
                  id="rsvp-note"
          name="note"
          value={note}
                  onChange={(e) => setNote(e.target.value)}
          maxLength={280}
          rows={3}
                  placeholder="Share a wish or message..."
                  className="lux-input"
                  style={{ resize: "vertical", minHeight: "80px" }}
        />
          </div>

      <button
        type="submit"
        disabled={isSubmitting}
              className="lux-btn lux-btn--gold w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
              {isSubmitting ? "Sending..." : "Send Response"}
      </button>

      {feedback && (
              <p className="text-center text-sm rounded-lg px-4 py-3" style={{ color: '#5a7a5a', background: 'rgba(90,122,90,0.08)', border: '1px solid rgba(90,122,90,0.2)' }} role="status" aria-live="polite">
          {feedback}
        </p>
      )}
      {error && (
              <p className="text-center text-sm rounded-lg px-4 py-3" style={{ color: '#9a5555', background: 'rgba(154,85,85,0.08)', border: '1px solid rgba(154,85,85,0.2)' }} role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
