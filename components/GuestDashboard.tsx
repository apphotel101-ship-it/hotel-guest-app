"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGuestTheme } from "./GuestThemeProvider";
import { GuestScaffold } from "./GuestScaffold";
import { BottomNav } from "./BottomNav";

/** Place design PNGs in `public/images/` using the filenames below. */
const ASSETS = {
  food: "/images/food.png",
  roomService: "/images/room-service.png",
  maintenance: "/images/maintenance.png",
  complaints: "/images/complaints.png",
} as const;

function IconWrench({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function IconBellNav({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function IconTray({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 10h16l-1.5 8.5a2 2 0 0 1-2 1.5H7.5a2 2 0 0 1-2-1.5L4 10Z" />
      <path d="M8 10V8a4 4 0 0 1 8 0v2" />
    </svg>
  );
}

function IconBellSmall({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function StatusPill({
  label,
  variant,
  dark,
}: {
  label: string;
  variant: "green" | "orange" | "gray";
  dark: boolean;
}) {
  const base =
    "shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide";
  const styles = dark
    ? {
        green: "border-emerald-400/50 text-emerald-300",
        orange: "border-amber-400/50 text-amber-300",
        gray: "border-white/25 text-zinc-400",
      }
    : {
        green: "border-emerald-700/40 text-emerald-800",
        orange: "border-amber-700/45 text-amber-800",
        gray: "border-stone-400/60 text-stone-600",
      };
  return (
    <span className={`${base} ${styles[variant]}`}>{label}</span>
  );
}

export function GuestDashboard() {
  const { dark } = useGuestTheme();
  const [guestName, setGuestName] = useState("Guest");
  const [roomNumber, setRoomNumber] = useState("—");

  useEffect(() => {
    const guestRaw = localStorage.getItem("guest_profile");
    if (!guestRaw) return;

    try {
      const guest = JSON.parse(guestRaw) as {
        guest_name?: string;
        room_number?: string;
      };
      if (guest.guest_name) {
        setGuestName(guest.guest_name);
      }
      if (guest.room_number) {
        setRoomNumber(guest.room_number);
      }
    } catch {
      // Ignore malformed local storage and keep UI defaults.
    }
  }, []);

  const t = dark
    ? {
        page: "text-[#f5f0e6]",
        muted: "text-[#d1c4a8]",
        brand: "text-gold",
        name: "text-gold-soft",
        pillBorder: "border-gold/45 text-gold",
        glass:
          "border border-[rgba(200,169,106,0.22)] bg-[rgba(18,18,18,0.58)] shadow-[0_0_18px_rgba(200,169,106,0.12)] backdrop-blur-xl",
        glassSoft:
          "border border-[rgba(200,169,106,0.18)] bg-[rgba(22,22,22,0.5)] backdrop-blur-lg",
        sectionTitle: "text-gold tracking-[0.2em]",
        nav: "border-[rgba(200,169,106,0.2)] bg-[rgba(16,16,16,0.72)] shadow-[0_0_24px_rgba(200,169,106,0.15)]",
        navMuted: "text-[#b9a67e]/80",
        navActive: "text-gold",
        labelCaps: "text-[#a89b82]",
        value: "text-[#f7f4ec]",
        roomPill:
          "border border-gold/50 bg-transparent text-gold shadow-[0_0_12px_rgba(200,169,106,0.15)]",
        requestsWrap:
          "border border-[rgba(200,169,106,0.2)] bg-[rgba(14,14,14,0.55)] shadow-[0_0_20px_rgba(200,169,106,0.1)] backdrop-blur-xl",
        feedbackBadge: "bg-[rgba(200,169,106,0.2)] text-gold border border-gold/30",
        statusDot: "bg-emerald-400",
        dividerColor: "border-[rgba(200,169,106,0.22)]",
        foodRing: "ring-1 ring-[rgba(200,169,106,0.35)]",
      }
    : {
        page: "text-brown",
        muted: "text-brown-muted",
        brand: "text-brown tracking-[0.35em]",
        name: "text-brown",
        pillBorder: "border-brown/20 text-brown",
        glass:
          "border border-[rgba(200,169,106,0.28)] bg-[rgba(255,255,255,0.52)] shadow-[0_10px_32px_rgba(0,0,0,0.07)] backdrop-blur-xl",
        glassSoft:
          "border border-[rgba(74,55,40,0.12)] bg-[rgba(255,255,255,0.42)] backdrop-blur-lg",
        sectionTitle: "text-brown tracking-[0.2em]",
        nav: "border border-[rgba(74,55,40,0.12)] bg-[rgba(255,255,255,0.62)] shadow-[0_12px_40px_rgba(0,0,0,0.08)]",
        navMuted: "text-brown-muted",
        navActive: "text-brown",
        labelCaps: "text-brown-muted",
        value: "text-brown font-semibold",
        roomPill: "border-0 bg-brown text-white shadow-md shadow-brown/15",
        requestsWrap:
          "border border-[rgba(74,55,40,0.1)] bg-[rgba(255,255,255,0.72)] shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl",
        feedbackBadge: "bg-brown text-white",
        statusDot: "bg-emerald-600",
        dividerColor: "border-brown/20",
        foodRing: "ring-2 ring-[#c8a96a] ring-offset-2 ring-offset-transparent shadow-[0_0_20px_rgba(200,169,106,0.25)]",
      };

  return (
    <GuestScaffold>
      <div className={t.page}>
        {/* Status bar (decorative) */}
        <div
          className={`mb-3 flex items-center justify-between text-[13px] font-medium opacity-90 ${dark ? "text-[#e8dcc4]" : "text-brown"}`}
        >
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px]">●●●●</span>
            <svg width="18" height="10" viewBox="0 0 18 10" aria-hidden>
              <rect
                x="1"
                y="2"
                width="14"
                height="6"
                rx="1.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <rect x="16" y="3.5" width="1.5" height="3" rx="0.5" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Header */}
        <header className="relative mb-5 animate-fade-in-up">
          <div className="flex items-start justify-between gap-3">
            <p
              className={`font-sans text-[10px] font-semibold uppercase ${t.brand}`}
            >
              The Grand Meridian
            </p>
            <Link
              href="/notifications"
              className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 hover:scale-105 active:scale-95 ${dark ? "bg-[rgba(200,169,106,0.12)] shadow-[0_0_18px_rgba(200,169,106,0.25)]" : "bg-[rgba(200,169,106,0.15)] shadow-[0_0_16px_rgba(200,169,106,0.2)]"}`}
              aria-label="Notifications, 2 unread"
            >
              <IconBellNav
                className={`h-[22px] w-[22px] shrink-0 ${dark ? "text-gold" : "text-[#9a7b4f]"}`}
              />
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white shadow-sm">
                2
              </span>
            </Link>
          </div>

          <p className={`mt-4 font-sans text-sm ${t.muted}`}>Welcome back,</p>
          <h1 className="font-serif text-[1.65rem] font-semibold leading-tight sm:text-[1.85rem]">
            <span className={dark ? "text-gold-soft" : "text-brown"}>
              {guestName}
            </span>
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${t.roomPill}`}
            >
              Room {roomNumber}
            </span>
            <span
              className={`h-3 w-px shrink-0 ${dark ? "bg-gold/40" : "bg-brown/30"}`}
              aria-hidden
            />
            <span className={`min-w-0 font-sans text-sm ${t.muted}`}>
              Deluxe Suite — Floor 4
            </span>
          </div>
        </header>

        {/* Stay info */}
        <section
          className={`mb-6 rounded-[20px] p-4 animate-fade-in-up [animation-delay:60ms] ${t.glass}`}
        >
          <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-4 sm:gap-y-0">
            {[
              { label: "Check-in", value: "Apr 5" },
              { label: "Check-out", value: "Apr 8" },
              { label: "Nights", value: "3" },
              {
                label: "Status",
                value: (
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${t.statusDot}`}
                    />
                    Active
                  </span>
                ),
              },
            ].map((cell, i) => {
              const dividers = [
                "",
                `border-l ${t.dividerColor} pl-3 sm:pl-4`,
                `border-t ${t.dividerColor} pt-4 sm:border-t-0 sm:pt-0 sm:border-l sm:pl-4`,
                `border-t border-l ${t.dividerColor} pl-3 pt-4 sm:border-t-0 sm:pt-0 sm:pl-4`,
              ][i];
              return (
              <div
                key={cell.label}
                className={`min-w-0 ${dividers}`}
              >
                <p
                  className={`font-sans text-[10px] font-semibold uppercase tracking-wider ${t.labelCaps}`}
                >
                  {cell.label}
                </p>
                <p
                  className={`mt-1 font-sans text-sm sm:text-base ${t.value}`}
                >
                  {cell.value}
                </p>
              </div>
            );
            })}
          </div>
        </section>

        {/* Services */}
        <section className="mb-2">
          <h2
            className={`mb-3 font-sans text-[11px] font-bold uppercase animate-fade-in-up [animation-delay:100ms] ${t.sectionTitle}`}
          >
            Services
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                title: "Food & Dining",
                sub: "Order meals to your room",
                img: ASSETS.food,
                alt: "Food and dining",
                highlight: !dark,
                badge: null as string | null,
                href: "/food",
              },
              {
                title: "Room Service",
                sub: "Request amenities",
                img: ASSETS.roomService,
                alt: "Room service",
                highlight: false,
                badge: null,
                href: "/room-service",
              },
              {
                title: "Maintenance",
                sub: "Report an issue",
                img: ASSETS.maintenance,
                alt: "Maintenance",
                highlight: false,
                badge: null,
                href: "/maintenance",
              },
              {
                title: "Complaints",
                sub: "Share concerns",
                img: ASSETS.complaints,
                alt: "Complaints",
                highlight: false,
                badge: "Feedback",
                href: "/complaints",
              },
            ].map((card, idx) => (
              <Link
                key={card.title}
                href={card.href}
                className={`group relative flex flex-col overflow-hidden rounded-[20px] p-3 text-left animate-fade-in-up transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${t.glassSoft} ${card.highlight ? t.foodRing : "shadow-[0_0_12px_rgba(200,169,106,0.08)]"}`}
                style={{ animationDelay: `${140 + idx * 70}ms` }}
              >
                {card.badge ? (
                  <span
                    className={`absolute right-2 top-2 z-10 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${t.feedbackBadge}`}
                  >
                    {card.badge}
                  </span>
                ) : null}
                <div className="relative mx-auto mt-1 h-[108px] w-full max-w-[188px] sm:h-[116px] sm:max-w-[200px]">
                  <Image
                    src={card.img}
                    alt={card.alt}
                    fill
                    sizes="(max-width:640px) 188px, 200px"
                    className="object-contain object-bottom animate-float-y drop-shadow-md"
                    priority={idx < 2}
                  />
                </div>
                <h3
                  className={`mt-2 font-sans text-sm font-bold ${dark ? "text-white" : "text-brown"}`}
                >
                  {card.title}
                </h3>
                <p className={`mt-0.5 font-sans text-[11px] leading-snug ${t.muted}`}>
                  {card.sub}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Active requests */}
        <section className="mt-6">
          <div className="mb-3 flex items-baseline justify-between animate-fade-in-up [animation-delay:420ms]">
            <h2
              className={`font-sans text-[11px] font-bold uppercase ${t.sectionTitle}`}
            >
              Active requests
            </h2>
            <Link
              href="/requests"
              className={`font-sans text-xs font-medium underline-offset-2 transition hover:underline ${t.muted}`}
            >
              See all
            </Link>
          </div>

          <div
            className={`overflow-hidden rounded-[20px] animate-fade-in-up [animation-delay:460ms] ${t.requestsWrap}`}
          >
            {[
              {
                title: "Pasta Carbonara + Lemonade",
                meta: "Ordered 12 min ago · ETA 8 min",
                status: "On way" as const,
                variant: "green" as const,
                Icon: IconTray,
              },
              {
                title: "AC temperature issue",
                meta: "Reported 1 hr ago",
                status: "Pending" as const,
                variant: "orange" as const,
                Icon: IconWrench,
              },
              {
                title: "Extra towels x2",
                meta: "2 hrs ago · Delivered",
                status: "Done" as const,
                variant: "gray" as const,
                Icon: IconBellSmall,
              },
            ].map((row, i) => (
              <div
                key={row.title}
                className={`flex items-center gap-3 px-3 py-3.5 sm:px-4 ${i > 0 ? `border-t ${t.dividerColor}` : ""}`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${dark ? "bg-[rgba(200,169,106,0.1)] text-gold" : "bg-[rgba(200,169,106,0.18)] text-[#8a6f48]"}`}
                >
                  <row.Icon className="h-[22px] w-[22px] shrink-0" />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate font-sans text-sm font-semibold ${dark ? "text-white" : "text-brown"}`}
                  >
                    {row.title}
                  </p>
                  <p className={`mt-0.5 font-sans text-[11px] ${t.muted}`}>
                    {row.meta}
                  </p>
                </div>
                <StatusPill
                  label={row.status}
                  variant={row.variant}
                  dark={dark}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
      <BottomNav />
    </GuestScaffold>
  );
}
