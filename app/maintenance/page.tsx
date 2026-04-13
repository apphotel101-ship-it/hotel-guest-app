 "use client";
 
 import Link from "next/link";
 import { useState } from "react";
 import { BottomNav } from "../../components/BottomNav";
 import { GuestScaffold } from "../../components/GuestScaffold";
 import { useGuestTheme } from "../../components/GuestThemeProvider";
 
 export default function MaintenancePage() {
   const { dark } = useGuestTheme();
   const [cat, setCat] = useState<string | null>(null);
   const [priority, setPriority] = useState<"low" | "med" | "high" | null>(null);
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
 
   const categories = [
     { id: "ac", icon: "❄️", label: "AC / Heating" },
     { id: "lighting", icon: "💡", label: "Lighting" },
     { id: "plumbing", icon: "🚰", label: "Plumbing" },
     { id: "wifi", icon: "📺", label: "TV / WiFi" },
     { id: "lock", icon: "🔒", label: "Door / Lock" },
     { id: "window", icon: "🪟", label: "Window" },
     { id: "bathroom", icon: "🛁", label: "Bathroom" },
     { id: "electrical", icon: "🔌", label: "Electrical" },
     { id: "furniture", icon: "🪑", label: "Furniture" },
   ] as const;
 
   const priClass = (p: "low" | "med" | "high") => {
     if (priority !== p) return "";
     if (p === "low") return "border-emerald-500/50 bg-emerald-500/15 text-emerald-200";
     if (p === "med") return "border-amber-500/50 bg-amber-500/15 text-amber-200";
     return "border-red-500/50 bg-red-500/15 text-red-200";
   };
 
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
           Maintenance
         </h1>
         <p className={`mt-1 text-sm ${t.muted}`}>Report an issue in Room 412</p>
       </header>
 
       <h2 className={`mb-3 font-sans text-[11px] font-bold uppercase ${t.section}`}>
         Issue category
       </h2>
 
       <div className="grid grid-cols-3 gap-3">
         {categories.map((c) => {
           const selected = cat === c.id;
           return (
             <button
               key={c.id}
               type="button"
               onClick={() => setCat(c.id)}
               className={`rounded-[18px] p-3 text-center transition ${
                 selected
                   ? dark
                     ? "border border-gold/40 bg-[rgba(200,169,106,0.10)]"
                     : "border border-gold/45 bg-[rgba(200,169,106,0.14)]"
                   : t.glass
               }`}
             >
               <div className="text-2xl" aria-hidden>
                 {c.icon}
               </div>
               <p className={`mt-2 text-[11px] font-semibold leading-snug ${t.title}`}>
                 {c.label}
               </p>
             </button>
           );
         })}
       </div>
 
       <div className="mt-6">
         <h2 className={`mb-3 font-sans text-[11px] font-bold uppercase ${t.section}`}>
           Details
         </h2>
 
         <div className={`rounded-[22px] p-4 ${t.glass}`}>
           <label className={`block text-[11px] font-bold uppercase ${t.section}`}>
             Describe the issue
           </label>
           <textarea
             className={`mt-2 w-full resize-none rounded-2xl border px-4 py-3 text-sm outline-none transition focus:border-gold/60 ${t.input}`}
             rows={3}
             placeholder="Please describe what's wrong..."
           />
 
           <label className={`mt-4 block text-[11px] font-bold uppercase ${t.section}`}>
             Priority
           </label>
           <div className="mt-2 flex gap-2">
             {([
               ["low", "Low"],
               ["med", "Medium"],
               ["high", "Urgent"],
             ] as const).map(([p, label]) => (
               <button
                 key={p}
                 type="button"
                 onClick={() => setPriority(p)}
                 className={`flex-1 rounded-2xl border px-3 py-2 text-xs font-semibold transition ${
                   dark
                     ? "border-[rgba(200,169,106,0.18)] bg-[rgba(16,16,16,0.35)] text-[#d1c4a8]"
                     : "border-[rgba(74,55,40,0.18)] bg-[rgba(255,255,255,0.55)] text-brown-muted"
                 } ${priClass(p)}`}
               >
                 {label}
               </button>
             ))}
           </div>
 
           <label className={`mt-4 block text-[11px] font-bold uppercase ${t.section}`}>
             Preferred time
           </label>
           <input
             className={`mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:border-gold/60 ${t.input}`}
             placeholder="e.g. After 2 PM, Any time…"
           />
 
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
             {submitted ? "✓ Request Submitted" : "Submit Request"}
           </button>
         </div>
       </div>
 
       <BottomNav />
     </GuestScaffold>
   );
 }
