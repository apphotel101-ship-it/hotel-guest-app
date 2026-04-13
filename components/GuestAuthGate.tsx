"use client";

import type { ReactNode } from "react";
import { FormEvent, useEffect, useMemo, useState } from "react";

const STORAGE_KEYS = {
  accessToken: "guest_access_token",
  refreshToken: "guest_refresh_token",
  guest: "guest_profile",
} as const;

type GuestProfile = {
  guest_id: number;
  guest_name: string;
  room_number: string;
  check_in: string;
  check_out: string;
};

type GuestLoginResponse = {
  access_token: string;
  refresh_token: string;
  guest: GuestProfile;
};

export function GuestAuthGate({ children }: { children: ReactNode }) {
  const [roomNumber, setRoomNumber] = useState("");
  const [guestName, setGuestName] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const existingToken = localStorage.getItem(STORAGE_KEYS.accessToken);
    setIsAuthed(Boolean(existingToken));
    setLoading(false);
  }, []);

  const canSubmit = useMemo(
    () => roomNumber.trim().length > 0 && guestName.trim().length > 0,
    [roomNumber, guestName],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/auth/guest/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            room_number: roomNumber.trim(),
            guest_name: guestName.trim(),
          }),
        },
      );

      const data = (await response.json()) as GuestLoginResponse & {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(data.message || "Unable to verify guest details.");
      }

      localStorage.setItem(STORAGE_KEYS.accessToken, data.access_token);
      localStorage.setItem(STORAGE_KEYS.refreshToken, data.refresh_token);
      localStorage.setItem(STORAGE_KEYS.guest, JSON.stringify(data.guest));
      setIsAuthed(true);
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Login failed. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-black/90 px-5">
        <p className="text-sm text-white/90">Verifying guest session...</p>
      </div>
    );
  }

  if (isAuthed) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#d6bf89] bg-[#18130b] p-6 shadow-2xl">
        <h2 className="font-serif text-2xl text-gold-soft">Guest Verification</h2>
        <p className="mt-2 text-sm text-[#e9dcc2]">
          Enter your room number and guest name to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="room_number" className="mb-1.5 block text-sm text-[#d7c49c]">
              Room Number
            </label>
            <input
              id="room_number"
              type="text"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="101"
              className="w-full rounded-xl border border-[#9e8657] bg-[#23190c] px-3 py-2.5 text-white outline-none transition focus:border-gold"
              autoComplete="off"
              required
            />
          </div>

          <div>
            <label htmlFor="guest_name" className="mb-1.5 block text-sm text-[#d7c49c]">
              Guest Name
            </label>
            <input
              id="guest_name"
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Akash Kumar"
              className="w-full rounded-xl border border-[#9e8657] bg-[#23190c] px-3 py-2.5 text-white outline-none transition focus:border-gold"
              autoComplete="name"
              required
            />
          </div>

          {error ? (
            <p className="rounded-lg border border-red-300/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="w-full rounded-xl bg-gold px-4 py-2.5 font-semibold text-[#24190a] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Verifying..." : "Access Application"}
          </button>
        </form>
      </div>
    </div>
  );
}
