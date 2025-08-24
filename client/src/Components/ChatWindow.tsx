import { Send, Settings } from "lucide-react";
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from "../Constants/MockDataMessages";
import { Avatar, Card, cx, IconButton } from "../Utils/helper";

export function ChatWindow({ convoId }: { convoId: string }) {
    const messages = MOCK_MESSAGES[convoId] || [];
    const convo = MOCK_CONVERSATIONS.find(c => c.id === convoId)!;
    return (
    <Card className="h-full flex flex-col">
    <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200/60 dark:border-white/10">
    <div className="flex items-center gap-3">
    <Avatar name={convo.name} />
    <div>
    <p className="font-semibold">{convo.name}</p>
    <p className="text-xs opacity-70">{convo.isGroup ? "Group chat" : "Direct message"}</p>
    </div>
    </div>
    <div className="flex items-center gap-2">
    <IconButton icon={Settings} label="Channel Settings" />
    </div>
    </div>
    
    
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
    {messages.map((m) => (
    <MessageBubble key={m.id} from={m.from} text={m.text} at={m.at} mine={m.from === "You"} />
    ))}
    </div>
    
    
    <div className="px-4 pb-4">
    <MessageInput />
    </div>
    </Card>
    );
    }
    
    
    export function MessageBubble({ from, text, at, mine }: { from: string; text: string; at: string; mine?: boolean }) {
    return (
    <div className={cx("flex w-full", mine ? "justify-end" : "justify-start")}>
    <div className={cx(
    "max-w-[72%] rounded-2xl px-4 py-2 text-sm shadow-sm",
    mine
    ? "bg-indigo-500 text-white rounded-tr-sm"
    : "bg-white/80 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-white/10 rounded-tl-sm"
    )}>
    {!mine && <p className="text-[10px] opacity-70 mb-0.5">{from}</p>}
    <p>{text}</p>
    <div className={cx("text-[10px] mt-1", mine ? "opacity-90" : "opacity-60")}>{at}</div>
    </div>
    </div>
    );
    }
    
    
    export function MessageInput() {
    return (
    <div className="flex items-center gap-2 px-3 py-2 bg-white/70 dark:bg-zinc-800/70 rounded-2xl border border-zinc-200/60 dark:border-white/10">
    <button className="px-2 py-1 rounded-lg text-xs border border-zinc-200/60 dark:border-white/10 hover:bg-white/60 dark:hover:bg-zinc-700/60">+
    </button>
    <input className="flex-1 bg-transparent outline-none text-sm" placeholder="Write a message…" />
    <button className="p-2 rounded-xl hover:bg-white/70 dark:hover:bg-zinc-700/70" title="Send">
    <Send className="w-5 h-5" />
    </button>
    </div>
    );
    }