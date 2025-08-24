import { MOCK_CONVERSATIONS } from "../Constants/MockDataMessages"
import { Avatar, Card, SectionHeader } from "../Utils/helper"


export const Participants = ({activeId}: {activeId: string}) => {
  return (
    <Card>
    <div className="border-t border-zinc-200/60 dark:border-white/10">
    <SectionHeader title="Participants" />
    <div className="p-3 space-y-2">
    {MOCK_CONVERSATIONS.filter(c => c.id === activeId || c.isGroup).slice(0,4).map((c) => (
    <div key={c.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60">
    <Avatar name={c.name} />
    <div className="min-w-0">
    <p className="text-sm font-medium truncate">{c.name}</p>
    <p className="text-xs opacity-60">{c.isGroup ? "Member" : "1:1"}</p>
    </div>
    </div>
    ))}
    </div>
    </div>
    </Card>
  )
}
