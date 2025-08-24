import { createContext, useEffect, useMemo, useState } from "react";

export const THEMES = [
{ id: "light", name: "Light", classes: "bg-zinc-50 text-zinc-900" },
{ id: "dark", name: "Dark", classes: "bg-zinc-900 text-zinc-100" },
{ id: "amoled", name: "AMOLED", classes: "bg-black text-zinc-100" },
{ id: "solar", name: "Solar", classes: "bg-amber-50 text-stone-900" },
] as const;


type ThemeId = typeof THEMES[number]["id"];


type ThemeContextType = {
theme: ThemeId;
setTheme: (t: ThemeId) => void;
};


export const ThemeContext = createContext<ThemeContextType | null>(null);


export function ThemeProvider({ children }: { children: React.ReactNode }) {
const [theme, setTheme] = useState<ThemeId>(() => {
const fromLS = typeof window !== "undefined" && localStorage.getItem("chat-theme");
return (fromLS as ThemeId) || "dark";
});


useEffect(() => {
if (typeof window === "undefined") return;
localStorage.setItem("chat-theme", theme);
}, [theme]);


const value = useMemo(() => ({ theme, setTheme }), [theme]);
const themeClasses = THEMES.find(t => t.id === theme)?.classes || THEMES[1].classes;


return (
<ThemeContext.Provider value={value}>
<div className={`min-h-screen ${themeClasses} transition-colors duration-300`}>{children}</div>
</ThemeContext.Provider>
);
}