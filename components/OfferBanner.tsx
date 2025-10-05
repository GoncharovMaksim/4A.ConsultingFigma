"use client";

import { useState, useEffect } from "react";

export default function OfferBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 15,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
            <span className="text-star-yellow font-bold text-4xl">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-star-yellow font-bold text-4xl">:</span>
            <span className="text-star-yellow font-bold text-4xl">
              {String(timeLeft.minutes).padStart(2, "0")}
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
