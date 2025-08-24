export const MOCK_CONVERSATIONS = [
    { id: "c1", name: "Luna Banks", isGroup: false, last: "Catch up today?", unread: 2 },
    { id: "c2", name: "Product Squad", isGroup: true, last: "Standup moved to 10:30", unread: 0 },
    { id: "c3", name: "Hudson Miles", isGroup: false, last: "Sent the doc.", unread: 0 },
    { id: "c4", name: "Design Guild", isGroup: true, last: "New tokens proposal", unread: 5 },
    ];
    
    
    export const MOCK_MESSAGES: Record<string, Array<{ id: string; from: string; text: string; at: string }>> = {
    c1: [
    { id: "m1", from: "Luna", text: "Yes, let’s catch up today!", at: "09:41" },
    { id: "m2", from: "You", text: "How’s your day been?", at: "09:42" },
    { id: "m3", from: "Luna", text: "Very nice, and yours?", at: "09:43" },
    ],
    c2: [{ id: "m1", from: "Eden", text: "Standup moved to 10:30.", at: "08:05" }],
    c3: [{ id: "m1", from: "Hudson", text: "Sent the doc.", at: "Yesterday" }],
    c4: [{ id: "m1", from: "Mali", text: "New tokens proposal in Figma.", at: "09:20" }],
    };