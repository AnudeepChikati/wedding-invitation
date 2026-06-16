import { sanitizeText } from "@/lib/sanitize";

export type RSVPAttendance = "Yes" | "No";

export type RSVPInput = {
  name: string;
  attendance: string;
  note?: string;
  website?: string;
};

export type ValidRSVP = {
  name: string;
  attendance: RSVPAttendance;
  note: string;
};

export type RSVPResult = {
  message: string;
};

export type RSVPValidationResult =
  | { ok: false; error: string }
  | { ok: true; value: ValidRSVP };

const isAttendance = (value: string): value is RSVPAttendance => value === "Yes" || value === "No";

export const validateRSVP = (payload: RSVPInput): RSVPValidationResult => {
  const name = sanitizeText(payload.name);
  const note = sanitizeText(payload.note ?? "").slice(0, 280);

  if (payload.website) {
    return { ok: false, error: "Spam submission rejected." };
  }

  if (name.length < 2 || name.length > 80) {
    return { ok: false, error: "Please enter a valid name (2-80 characters)." };
  }

  if (!isAttendance(payload.attendance)) {
    return { ok: false, error: "Please select your attendance confirmation." };
  }

  return {
    ok: true,
    value: {
      name,
      attendance: payload.attendance,
      note,
    },
  };
};

export const submitRSVP = async (payload: RSVPInput): Promise<RSVPResult> => {
  const response = await fetch("/api/rsvp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as RSVPResult;

  if (!response.ok) {
    throw new Error(data.message || "Unable to submit RSVP right now.");
  }

  return data;
};
