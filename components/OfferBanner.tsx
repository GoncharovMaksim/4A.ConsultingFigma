"use client";

import { useState, useEffect } from "react";

interface OfferBannerProps {
  timer: number;
  timerBlink: boolean;
  formatTime: (s: number) => string;
}

export default function OfferBanner({
  timer,
  timerBlink,
  formatTime,
}: OfferBannerProps) {
  return (
    <div className="offer-banner mb-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <span>Успейте открыть пробную неделю</span>
        <div className="flex items-center gap-2">
          {/* Left star */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-star-yellow"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <div className="flex items-center gap-1.5">
            <span
              className={`text-star-yellow font-bold text-4xl transition-all duration-200 ${
                timer <= 30 && timerBlink ? "opacity-50" : ""
              }`}
            >
              {formatTime(timer)}
            </span>
          </div>
          {/* Right star */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-star-yellow"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
