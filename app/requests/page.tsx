 "use client";
 
 import Link from "next/link";
 import { useState } from "react";
 import { BottomNav } from "../../components/BottomNav";
 import { GuestScaffold } from "../../components/GuestScaffold";
 import { useGuestTheme } from "../../components/GuestThemeProvider";
 
 type Status = "onway" | "pending" | "done";
 
 const REQS = [
   {
     status: "onway" as const,
     icon: "🍝",
     title: "Pasta Carbonara + Lemonade",
     sub: "Ordered 12 min ago · ETA 8 min",
     badge: { label: "On way", variant: "green" as const },
     timeline: ["Received", "Preparing", "On way", "Delivered"] as const,
     activeStep: 2,
     actions: ["Call Delivery", "Track Live"],
   },
   {
     status: "pending" as const,
     icon: "❄️",
     title: "AC Temperature Issue",
     sub: "Reported 1 hr ago · Maintenance assigned",
     badge: { label: "Pending", variant: "amber" as const },
     timeline: ["Reported", "Assigned", "In progress", "Resolved"] as const,
     activeStep: 1,
     actions: ["Add Note", "Call Front Desk"],
   },
   {
     status: "done" as const,
     icon: "🛎️",
     title: "Extra Towels ×2",
     sub: "2 hrs ago · Delivered successfully",
     badge: { label: "Done", variant: "slate" as const },
     timeline: ["Requested", "Assigned", "On way", "Delivered"] as const,
     activeStep: 3,
     actions: ["Rate Service", "Request Again"],
   },
 ] as const;
 
 function Badge({
   variant,
   children,
 }: {
   variant: "green" | "amber" | "slate";
   children: React.ReactNode;
 }) {
   const styles =
     variant === "green"
       ? "bg-emerald-500/15 text-emerald-200 border-emerald-500/30"
       : variant === "amber"
         ? "bg-amber-500/15 text-amber-200 border-amber-500/30"
         : "bg-slate-400/10 text-slate-200 border-slate-400/25";
 
   return (
     <span className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold ${styles}`}>
       {children}
     </span>
   );
 }
 
 export default function RequestsPage() {
   const { dark } = useGuestTheme();
   const [tab, setTab] = useState<Status | "all">("all");
 
   const t = dark
     ? {
         title: "text-white",
         muted: "text-[#d1c4a8]",
         section: "text-gold tracking-[0.2em]",
         tabOn: "bg-[rgba(245,240,230,0.08)] text-[#f5f0e6] border-[rgba(245,240,230,0.12)]",
         tabOff:
           "bg-[rgba(16,16,16,0.35)] text-[#d1c4a8] border-[rgba(200,169,106,0.18)]",
         card:
           "border border-[rgba(200,169,106,0.18)] bg-[rgba(22,22,22,0.5)] backdrop-blur-lg shadow-[0_0_16px_rgba(200,169,106,0.10)]",
         divider: "border-[rgba(200,169,106,0.16)]",
       }
     : {
         title: "text-brown",
         muted: "text-brown-muted",
         section: "text-brown tracking-[0.2em]",
         tabOn: "bg-brown text-white border-brown",
         tabOff: "bg-[rgba(255,255,255,0.55)] text-brown-muted border-brown/15",
         card:
           "border border-[rgba(74,55,40,0.12)] bg-[rgba(255,255,255,0.58)] backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.05)]",
         divider: "border-[rgba(74,55,40,0.12)]",
       };
 
   const list = tab === "all" ? REQS : REQS.filter((r) => r.status === tab);
 
   return (
     <GuestScaffold>
       <header className="mb-4">
         <Link
           href="/"
           className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"
         >
           <span aria-hidden>‹</span> Home
         </Link>
         <h1 className={`mt-3 font-serif text-[2rem] leading-tight ${t.title}`}>
           Active Requests
         </h1>
         <p className={`mt-1 text-sm ${t.muted}`}>Room 412 · 3 active</p>
       </header>
 
       <div className="mb-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
         {[
           ["all", "All (3)"],
           ["onway", "On Way"],
           ["pending", "Pending"],
           ["done", "Done"],
         ].map(([k, label]) => (
           <button
             key={k}
             type="button"
             onClick={() => setTab(k as Status | "all")}
             className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
               tab === k ? t.tabOn : t.tabOff
             }`}
           >
             {label}
           </button>
         ))}
       </div>
 
       <div className="space-y-3">
         {list.map((r) => (
           <div key={r.title} className={`rounded-[22px] p-4 ${t.card}`}>
             <div className="flex gap-3">
               <div
                 className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                   dark ? "bg-[rgba(200,169,106,0.1)]" : "bg-[rgba(200,169,106,0.12)]"
                 }`}
                 aria-hidden
               >
                 <span className="text-xl">{r.icon}</span>
               </div>
               <div className="min-w-0 flex-1">
                 <p className={`text-sm font-semibold ${t.title}`}>{r.title}</p>
                 <p className={`mt-0.5 text-xs ${t.muted}`}>{r.sub}</p>
               </div>
               <Badge variant={r.badge.variant}>{r.badge.label}</Badge>
             </div>
 
             <div className={`mt-4 border-t pt-4 ${t.divider}`}>
               <div className="grid grid-cols-4 gap-2">
                 {r.timeline.map((label, idx) => {
                   const done = idx < r.activeStep;
                   const active = idx === r.activeStep;
                   return (
                     <div key={label} className="text-center">
                       <div
                         className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold ${
                           done
                             ? "border-emerald-500/40 bg-emerald-600 text-white"
                             : active
                               ? "border-gold/45 bg-gold text-white"
                               : dark
                                 ? "border-[rgba(200,169,106,0.18)] bg-[rgba(16,16,16,0.35)] text-[#d1c4a8]"
                                 : "border-brown/15 bg-white/50 text-brown-muted"
                         }`}
                         aria-hidden
                       >
                         {done ? "✓" : ""}
                       </div>
                       <p className={`mt-1 text-[10px] leading-tight ${t.muted}`}>
                         {label}
                       </p>
                     </div>
                   );
                 })}
               </div>
             </div>
 
             <div className={`mt-4 flex gap-2 border-t pt-4 ${t.divider}`}>
               {r.actions.map((a, idx) => (
                 <button
                   key={a}
                   type="button"
                   className={`flex-1 rounded-2xl border px-3 py-2 text-xs font-semibold transition active:opacity-90 ${
                     idx === 1
                       ? "border-gold bg-gold text-white"
                       : dark
                         ? "border-[rgba(200,169,106,0.18)] bg-[rgba(16,16,16,0.35)] text-[#d1c4a8]"
                         : "border-brown/15 bg-white/50 text-brown-muted"
                   }`}
                 >
                   {a}
                 </button>
               ))}
             </div>
           </div>
         ))}
       </div>
 
       <BottomNav />
     </GuestScaffold>
   );
 }
