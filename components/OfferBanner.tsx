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
      <div className="flex items-center justify-center gap-2">
        <span>Успейте открыть пробную неделю</span>
        <div className="flex items-center gap-2 ml-4">
          <div className="w-3.5 h-3.5 bg-star-yellow rounded-sm"></div>
          <div className="flex items-center gap-1.5">
            <span className="text-star-yellow font-bold text-4xl">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-star-yellow font-bold text-4xl">:</span>
            <span className="text-star-yellow font-bold text-4xl">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
          </div>
          <div className="w-3.5 h-3.5 bg-star-yellow rounded-sm"></div>
        </div>
      </div>
    </div>
  );
}
