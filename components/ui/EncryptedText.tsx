"use client";

import React, { useState, useEffect, useRef } from "react";

interface EncryptedTextProps {
    text: string;
    encryptedClassName?: string;
    revealedClassName?: string;
    revealDelayMs?: number;
    trigger?: boolean;
    onRevealComplete?: () => void;
}

const charsSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|;:,.<>?/~";

export function EncryptedText({
    text,
    encryptedClassName = "text-neutral-500",
    revealedClassName = "text-white",
    revealDelayMs = 50,
    trigger = false,
    onRevealComplete
}: EncryptedTextProps) {
    const [displayText, setDisplayText] = useState("");
    const [revealedCount, setRevealedCount] = useState(0);
    const hasTriggeredRef = useRef(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const onCompleteRef = useRef(onRevealComplete);
    useEffect(() => {
        onCompleteRef.current = onRevealComplete;
    }, [onRevealComplete]);

    // Initial load: render fully encrypted text
    useEffect(() => {
        if (!trigger) {
            const encrypted = text
                .split("")
                .map((char) => {
                    if (char === " ") return " ";
                    return charsSet.charAt(Math.floor(Math.random() * charsSet.length));
                })
                .join("");
            setDisplayText(encrypted);
            setRevealedCount(0);
            hasTriggeredRef.current = false;
            return;
        }

        if (hasTriggeredRef.current) return;
        hasTriggeredRef.current = true;

        let currentReveal = 0;

        intervalRef.current = setInterval(() => {
            if (currentReveal >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setDisplayText(text);
                setRevealedCount(text.length);
                onCompleteRef.current?.();
                return;
            }

            const result = text
                .split("")
                .map((char, index) => {
                    if (index < currentReveal) {
                        return char;
                    }
                    if (char === " ") return " ";
                    return charsSet.charAt(Math.floor(Math.random() * charsSet.length));
                })
                .join("");

            setDisplayText(result);
            currentReveal += 1;
            setRevealedCount(currentReveal);
        }, revealDelayMs);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text, trigger, revealDelayMs]);

    return (
        <span className="font-mono" style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
            {displayText.split("").map((char, index) => {
                const isReal = index < revealedCount;
                return (
                    <span
                        key={index}
                        className={isReal ? revealedClassName : encryptedClassName}
                    >
                        {char}
                    </span>
                );
            })}
        </span>
    );
}

export default EncryptedText;
