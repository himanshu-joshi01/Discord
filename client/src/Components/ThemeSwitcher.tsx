import { Palette } from "lucide-react";
import { THEMES } from "../Context/ThemeProvider";
import { useTheme } from "../Hooks/USETheme";
import { cx } from "../Utils/helper";

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    return (
        <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-medium"><Palette className="w-4 h-4" /> Theme</div>
            <div className="flex gap-1">
                {THEMES.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={cx(
                            "px-2 h-8 rounded-lg border text-xs",
                            theme === t.id
                                ? "bg-indigo-500 text-white border-indigo-500"
                                : "bg-white/60 dark:bg-zinc-800/60 border-zinc-200/60 dark:border-white/10"
                        )}
                    >
                        {t.name}
                    </button>
                ))}
            </div>
        </div>
    );
}