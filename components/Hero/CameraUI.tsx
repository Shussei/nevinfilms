"use client";

import { useEffect, useState } from "react";

interface Props {
    isRecording: boolean;
}

function formatTime(seconds: number) {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
}

export default function CameraUI({ isRecording }: Props) {
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (!isRecording) return;

        const interval = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isRecording]);

    return (
        <>
            <div className="camera-ui">
                <div className={`rec-dot ${!isRecording ? "stopped" : ""}`} />
                <div className="rec-text">
                    {isRecording ? "REC" : "STOP"}
                </div>
                <div className="timecode">{formatTime(time)}</div>
            </div>

            <div className="camera-frame" />
        </>
    );
}