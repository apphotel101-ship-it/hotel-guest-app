 "use client";
 
 import Link from "next/link";
 import { BottomNav } from "../../components/BottomNav";
 import { GuestScaffold } from "../../components/GuestScaffold";
 import { useGuestTheme } from "../../components/GuestThemeProvider";
 
 export default function NotificationsPage() {
   const { dark } = useGuestTheme();
 
   const t = dark
     ? {
         title: "text-white",
         muted: "text-[#d1c4a8]",
         card:
           "border border-[rgba(200,169,106,0.18)] bg-[rgba(22,22,22,0.5)] backdrop-blur-lg",
         unread: "bg-[rgba(200,169,106,0.10)] border-gold/25",
         divider: "border-[rgba(200,169,106,0.16)]",
       }
     : {
         title: "text-brown",
         muted: "text-brown-muted",
         card:
           "border border-[rgba(74,55,40,0.12)] bg-[rgba(255,255,255,0.58)] backdrop-blur-lg",
         unread: "bg-[rgba(200,169,106,0.14)] border-gold/35",
         divider: "border-[rgba(74,55,40,0.12)]",
       };
 
   const items = [
     {
       unread: true,
       icon: "🍝",
       title: "Your order is on the way",
       body: "Pasta Carbonara + Lemonade · ETA 8 min",
       time: "12 min ago",
     },
     {
       unread: true,
       icon: "⭐",
       title: "Welcome back, Mr. Sharma!",
       body: "Your Deluxe Suite is ready. Enjoy your stay.",
       time: "2 hrs ago",
     },
     {
       unread: false,
       icon: "🛎️",
       title: "Extra towels delivered",
       body: "Your request has been fulfilled.",
       time: "2 hrs ago",
     },
     {
       unread: false,
       icon: "🔧",
       title: "Maintenance scheduled",
       body: "AC inspection tomorrow at 10 AM.",
       time: "3 hrs ago",
     },
     {
       unread: false,
       icon: "🍸",
       title: "Happy Hour at Meridian Bar",
       body: "Cocktails at 50% off — today 4–6 PM.",
       time: "5 hrs ago",
     },
   ] as const;
 
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
           Notifications
         </h1>
         <p className={`mt-1 text-sm ${t.muted}`}>2 unread</p>
       </header>
 
       <div className={`overflow-hidden rounded-[22px] ${t.card}`}>
         {items.map((n, idx) => (
           <div
             key={`${n.title}-${idx}`}
             className={`flex gap-3 px-4 py-3.5 ${
               idx > 0 ? `border-t ${t.divider}` : ""
             } ${n.unread ? t.unread : ""}`}
           >
             <div
               className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                 n.unread ? "bg-gold" : "bg-transparent"
               }`}
               aria-hidden
             />
             <div
               className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                 dark ? "bg-[rgba(200,169,106,0.1)]" : "bg-[rgba(200,169,106,0.12)]"
               }`}
               aria-hidden
             >
               <span className="text-lg">{n.icon}</span>
             </div>
             <div className="min-w-0">
               <p className={`text-sm font-semibold ${t.title}`}>{n.title}</p>
               <p className={`mt-0.5 text-xs ${t.muted}`}>{n.body}</p>
               <p className={`mt-1 text-[10px] ${t.muted}`}>{n.time}</p>
             </div>
           </div>
         ))}
       </div>
 
       <BottomNav />
     </GuestScaffold>
   );
 }
