 "use client";
 
 import type { ReactNode } from "react";
import { useGuestTheme } from "./GuestThemeProvider";
import { FloatingCartButton } from "./FloatingCartButton";
 
 const ASSETS = {
   bgLight: "/images/bg-light.png",
   bgDark: "/images/bg-dark.png",
 } as const;
 
 export function GuestScaffold({
   children,
   withBottomPadding = true,
 }: {
   children: ReactNode;
   withBottomPadding?: boolean;
 }) {
   const { dark } = useGuestTheme();
 
   return (
     <div
       className={`relative min-h-dvh transition-all duration-300 ease-in-out ${
         dark ? "text-[#f5f0e6]" : "text-brown"
       }`}
       style={{
         backgroundImage: `url(${dark ? ASSETS.bgDark : ASSETS.bgLight})`,
         backgroundSize: "cover",
         backgroundPosition: "center",
       }}
     >
       <div
         className={`mx-auto flex min-h-dvh w-full max-w-[420px] flex-col px-4 pt-3 sm:px-5 sm:pt-4 md:max-w-[480px] md:shadow-2xl ${
           withBottomPadding ? "pb-36 sm:pb-40" : "pb-6"
         }`}
       >
         {children}
       </div>
      <FloatingCartButton />
     </div>
   );
 }
