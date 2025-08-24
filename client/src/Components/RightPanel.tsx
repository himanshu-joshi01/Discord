import { useState } from "react";
import { Card, IconButton, SectionHeader } from "../Utils/helper";
import { Mic, MicOff, MonitorPause, MonitorUp, Phone, PhoneOff, Video, VideoOff } from "lucide-react";

export function RightPanel({ activeId }: { activeId: string }) {
    const [voiceOn, setVoiceOn] = useState(false);
    const [videoOn, setVideoOn] = useState(false);
    const [sharing, setSharing] = useState(false);
    
    
    return (
    <Card className="h-full grid grid-rows-[auto_auto_1fr]">
    <SectionHeader title="Call Controls" />
    <div className="p-3 flex flex-wrap gap-2">
    <IconButton
    icon={voiceOn ? Mic : MicOff}
    label={voiceOn ? "Mute" : "Unmute"}
    active={voiceOn}
    onClick={() => setVoiceOn(v => !v)}
    />
    <IconButton
    icon={videoOn ? Video : VideoOff}
    label={videoOn ? "Video On" : "Video Off"}
    active={videoOn}
    onClick={() => setVideoOn(v => !v)}
    />
    <IconButton
    icon={sharing ? MonitorPause : MonitorUp}
    label={sharing ? "Stop Share" : "Share Screen"}
    active={sharing}
    onClick={() => setSharing(v => !v)}
    />
    <IconButton icon={Phone} label="Start Call" />
    <IconButton icon={PhoneOff} label="End" />
    </div>

    </Card>
    );
    }