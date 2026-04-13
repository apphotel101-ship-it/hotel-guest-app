 "use client";
 
 import { createContext, useContext, useMemo, useState } from "react";
 
 type GuestThemeContextValue = {
   dark: boolean;
   toggleTheme: () => void;
 };
 
 const GuestThemeContext = createContext<GuestThemeContextValue | null>(null);
 
 export function GuestThemeProvider({ children }: { children: React.ReactNode }) {
   const [dark, setDark] = useState(false);
 
   const value = useMemo<GuestThemeContextValue>(
     () => ({
       dark,
       toggleTheme: () => setDark((d) => !d),
     }),
     [dark],
   );
 
   return (
     <GuestThemeContext.Provider value={value}>
       {children}
     </GuestThemeContext.Provider>
   );
 }
 
 export function useGuestTheme() {
   const ctx = useContext(GuestThemeContext);
   if (!ctx) {
     throw new Error("useGuestTheme must be used within GuestThemeProvider");
   }
   return ctx;
 }
