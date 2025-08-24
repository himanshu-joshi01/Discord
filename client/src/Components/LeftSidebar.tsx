import { Plus, Search } from "lucide-react";
import { Avatar, Card, cx, SectionHeader } from "../Utils/helper";
import { MOCK_CONVERSATIONS } from "../Constants/MockDataMessages";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function LeftSidebar({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
    return (
    <Card className="h-full flex flex-col">
    <SectionHeader title="Chats" right={<button className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"><Plus className="w-3 h-3"/>New</button>} />
    
    
    <div className="p-3">
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 dark:bg-zinc-800/70 border border-zinc-200/60 dark:border-white/10">
    <Search className="w-4 h-4 opacity-70" />
    <input className="bg-transparent outline-none text-sm w-full" placeholder="Search people, groups" />
    </div>
    </div>
    
    
    <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-1">
    {MOCK_CONVERSATIONS.map((c) => (
    <button
    key={c.id}
    onClick={() => onSelect(c.id)}
    className={cx(
    "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left",
    activeId === c.id
    ? "bg-indigo-500/10 border border-indigo-500/30"
    : "hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70 border border-transparent"
    )}
    >
    <Avatar name={c.name} />
    <div className="min-w-0">
    <div className="flex items-center gap-2">
    <p className="font-medium truncate">{c.name}</p>
    {c.isGroup && (
    <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-200/70 dark:bg-zinc-700/70">Group</span>
    )}
    {c.unread > 0 && (
    <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500 text-white">
    {c.unread}
    </span>
    )}
    </div>
    <p className="text-xs opacity-70 truncate">{c.last}</p>
    </div>
    </button>
    ))}
    </div>
    
    
    <div className="p-3 border-t border-zinc-200/60 dark:border-white/10">
    <ThemeSwitcher />
    </div>
    </Card>
    );
    }