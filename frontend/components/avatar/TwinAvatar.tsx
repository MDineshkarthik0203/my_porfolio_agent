"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type AvatarState = "idle" | "listening" | "processing" | "speaking";

interface TwinAvatarProps {
  state?: AvatarState;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  onClick?: () => void;
  showStatusBadge?: boolean;
}

export const TwinAvatar: React.FC<TwinAvatarProps> = ({
  state = "idle",
  size = "md",
  className,
  onClick,
  showStatusBadge = true,
}) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
    xl: "w-48 h-48",
  };

  const ringClasses = {
    idle: "border-border shadow-sm",
    listening: "border-accent ring-4 ring-accent/30 animate-pulse",
    processing: "border-amber-400 ring-4 ring-amber-400/30 animate-spin",
    speaking: "border-primary ring-4 ring-primary/40 animate-pulse",
  };

  const statusLabel = {
    idle: "Digital Twin Ready",
    listening: "Listening...",
    processing: "Thinking...",
    speaking: "Speaking...",
  };

  const statusColor = {
    idle: "bg-emerald-500",
    listening: "bg-accent animate-ping",
    processing: "bg-amber-400 animate-bounce",
    speaking: "bg-primary animate-pulse",
  };

  return (
    <div className={cn("relative flex flex-col items-center group cursor-pointer", className)} onClick={onClick}>
      {/* Outer Glow Halo for speaking or listening */}
      {(state === "speaking" || state === "listening") && (
        <div
          className={cn(
            "absolute inset-0 rounded-full blur-xl opacity-60 transition-all",
            state === "speaking" ? "bg-primary/40 scale-125" : "bg-accent/40 scale-110"
          )}
        />
      )}

      {/* Main Avatar Frame */}
      <div
        className={cn(
          "relative rounded-full overflow-hidden border-2 transition-all duration-300 bg-surface",
          sizeClasses[size],
          ringClasses[state]
        )}
      >
        <Image
          src="/dinesh-portrait.png"
          alt="M Dinesh Karthik AI Twin"
          fill
          className="object-cover object-top filter brightness-105 group-hover:scale-105 transition-transform duration-300"
          sizes="192px"
          priority
        />
      </div>

      {/* Status indicator dot */}
      {showStatusBadge && (
        <div className="absolute -bottom-1 right-2 flex items-center justify-center">
          <span className={cn("w-3.5 h-3.5 rounded-full border-2 border-background", statusColor[state])} />
        </div>
      )}
    </div>
  );
};
