import { useState } from "react";
import { ChatWindow } from "./ChatWindow";
import LeftSidebar from "./LeftSidebar";
import { RightPanel } from "./RightPanel";
import { MOCK_CONVERSATIONS } from "../Constants/MockDataMessages";
import { Participants } from "./Participants";

export function Shell() {
    const [activeId, setActiveId] = useState(MOCK_CONVERSATIONS[0].id);
    
    
    return (
    <div className="p-3 md:p-6">
    <div className="grid grid-cols-4 lg:grid-cols-[320px,1fr,320px] gap-3 md:gap-4">
    <LeftSidebar activeId={activeId} onSelect={setActiveId} />
    <div className="col-span-2">
    <ChatWindow convoId={activeId} />
    </div>
    <div className="col-span-1">
    <Participants activeId={activeId} />
    </div>
    <div className="col-span-4">
    <RightPanel activeId={activeId} />
    </div>
    </div>
    </div>
    );
    }