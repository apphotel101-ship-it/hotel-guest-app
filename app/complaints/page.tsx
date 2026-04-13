 "use client";
 
 import Link from "next/link";
 import { useState } from "react";
 import { BottomNav } from "../../components/BottomNav";
 import { GuestScaffold } from "../../components/GuestScaffold";
 import { useGuestTheme } from "../../components/GuestThemeProvider";
 
 export default function ComplaintsPage() {
   const { dark } = useGuestTheme();
   const [type, setType] = useState<string | null>(null);
   const [urgency, setUrgency] = useState<"low" | "med" | "high" | null>(null);
   const [submitted, setSubmitted] = useState(false);
 
   const t = dark
     ? {
         title: "text-white",
         muted: "text-[#d1c4a8]",
         section: "text-gold tracking-[0.2em]",
         glass:
           "border border-[rgba(200,169,106,0.18)] bg-[rgba(22,22,22,0.5)] backdrop-blur-lg shadow-[0_0_16px_rgba(200,169,106,0.10)]",
         input:
           "bg-[rgba(16,16,16,0.4)] border-[rgba(200,169,106,0.18)] text-white placeholder:text-[#8f7f63]",
       }
     : {
         title: "text-brown",
         muted: "text-brown-muted",
         section: "text-brown tracking-[0.2em]",
         glass:
           "border border-[rgba(74,55,40,0.12)] bg-[rgba(255,255,255,0.58)] backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.05)]",
         input:
           "bg-[rgba(255,255,255,0.62)] border-[rgba(74,55,40,0.18)] text-brown placeholder:text-brown-muted/70",
       };
 
   const types = [
     {
       id: "service",
       icon: "😤",
       title: "Service Complaint",
       sub: "Staff behaviour, delays, or poor service",
     },
     {
       id: "room",
       icon: "🏨",
       title: "Room Complaint",
       sub: "Cleanliness, amenities, or comfort",
     },
     {
       id: "food",
       icon: "🍽️",
       title: "Food & Dining",
       sub: "Quality, order accuracy, or delivery",
     },
     {
       id: "general",
       icon: "⭐",
       title: "General Feedback",
       sub: "Suggestions or compliments",
     },
   ] as const;
 
   const urgencySelected = (u: "low" | "med" | "high") => urgency === u;
 
   return (
     <GuestScaffold>
       <header className="mb-4">
         <Link
           href="/"
           className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"
         >
           <span aria-hidden>‹</span> Home
         </Link>
       </header>
 
       <section className="mb-4">
         <h1 className={`font-serif text-[2rem] leading-tight ${t.title}`}>
           Share Your
           <br />
           <span className="text-gold">Feedback</span>
         </h1>
         <p className={`mt-1 text-sm ${t.muted}`}>We strive to make every stay perfect</p>
       </section>
 
       <h2 className={`mb-3 font-sans text-[11px] font-bold uppercase ${t.section}`}>
         Type of feedback
       </h2>
 
       <div className="space-y-3">
         {types.map((x) => {
           const selected = type === x.id;
           return (
             <button
               key={x.id}
               type="button"
               onClick={() => setType(x.id)}
               className={`flex w-full items-center gap-3 rounded-[18px] p-4 text-left transition ${
                 selected
                   ? dark
                     ? "border border-gold/40 bg-[rgba(200,169,106,0.10)]"
                     : "border border-gold/45 bg-[rgba(200,169,106,0.14)]"
                   : t.glass
               }`}
             >
               <div className="w-10 text-center text-2xl" aria-hidden>
                 {x.icon}
               </div>
               <div className="min-w-0 flex-1">
                 <p className={`text-sm font-semibold ${t.title}`}>{x.title}</p>
                 <p className={`mt-0.5 text-[11px] ${t.muted}`}>{x.sub}</p>
               </div>
               <span
                 className={`flex h-5 w-5 items-center justify-center rounded-full border transition ${
                   selected
                     ? "border-gold bg-gold"
                     : dark
                       ? "border-[rgba(200,169,106,0.22)]"
                       : "border-brown/25"
                 }`}
                 aria-hidden
               >
                 {selected ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
               </span>
             </button>
           );
         })}
       </div>
 
       <div className="mt-6">
         <div className={`rounded-[22px] p-4 ${t.glass}`}>
           <label className={`block text-[11px] font-bold uppercase ${t.section}`}>
             Your message
           </label>
           <textarea
             className={`mt-2 w-full resize-none rounded-2xl border px-4 py-3 text-sm outline-none transition focus:border-gold/60 ${t.input}`}
             rows={4}
             placeholder="Tell us what happened or how we can improve…"
           />
 
           <label className={`mt-4 block text-[11px] font-bold uppercase ${t.section}`}>
             How urgent is this?
           </label>
           <div className="mt-2 flex gap-2">
             {([
               ["low", "Can wait"],
               ["med", "Soon"],
               ["high", "Immediate"],
             ] as const).map(([u, label]) => (
               <button
                 key={u}
                 type="button"
                 onClick={() => setUrgency(u)}
                 className={`flex-1 rounded-2xl border px-3 py-2 text-xs font-semibold transition ${
                   urgencySelected(u)
                     ? "border-gold bg-gold text-white"
                     : dark
                       ? "border-[rgba(200,169,106,0.18)] bg-[rgba(16,16,16,0.35)] text-[#d1c4a8]"
                       : "border-[rgba(74,55,40,0.18)] bg-[rgba(255,255,255,0.55)] text-brown-muted"
                 }`}
               >
                 {label}
               </button>
             ))}
           </div>
 
           <button
             type="button"
             onClick={() => {
               setSubmitted(true);
               setTimeout(() => setSubmitted(false), 2500);
             }}
             className={`mt-4 w-full rounded-2xl px-4 py-3 text-sm font-semibold tracking-wide text-white transition active:opacity-90 ${
               submitted ? "bg-emerald-600" : "bg-gold"
             }`}
           >
             {submitted ? "✓ Feedback Submitted" : "Submit Feedback"}
           </button>
         </div>
       </div>
 
       <BottomNav />
     </GuestScaffold>
   );
 }
