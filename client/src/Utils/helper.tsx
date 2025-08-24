export function cx(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}


export function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
    return (
        <div className={cx(
            "rounded-2xl shadow-sm border border-white/10 bg-white/60 backdrop-blur-sm dark:bg-zinc-800/60",
            "dark:border-white/10 dark:shadow-black/10",
            className
        )}>{children}</div>
    );
}


export function IconButton({
    icon: Icon,
    label,
    active,
    onClick,
}: {
    icon: React.ComponentType<any>;
    label: string;
    active?: boolean;
    onClick?: () => void;
}) {
    return (
        <button
            onClick={onClick}
            title={label}
            className={cx(
                "flex items-center gap-2 px-3 h-10 rounded-xl border text-sm",
                "border-zinc-200/70 dark:border-white/10",
                active
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "bg-white/60 dark:bg-zinc-800/60 hover:bg-white/80 dark:hover:bg-zinc-700/70"
            )}
        >
            <Icon className="w-4 h-4" />
            <span className="hidden md:block">{label}</span>
        </button>
    );
}


export function SectionHeader({ title, right }: { title: string; right?: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200/60 dark:border-white/10">
            <h2 className="text-sm font-semibold tracking-wide uppercase opacity-70">{title}</h2>
            {right}
        </div>
    );
}


export function Avatar({ name }: { name: string }) {
    const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
    return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white grid place-items-center text-xs font-bold" aria-hidden>
    {initials}
    </div>
    );
    }