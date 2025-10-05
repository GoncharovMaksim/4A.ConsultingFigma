"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PricingCard from "@/components/PricingCard";
import MobilePricingCard from "@/components/MobilePricingCard";
import OfferBanner from "@/components/OfferBanner";
import GuaranteeCard from "@/components/GuaranteeCard";
import AttentionCard from "@/components/AttentionCard";

// Тип для тарифа с сервера
interface TariffApi {
  id: string;
  period: string;
  price: number;
  full_price: number;
  is_best: boolean;
  text: string;
}

export default function Home() {
  const [tariffs, setTariffs] = useState<TariffApi[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isAgreed, setIsAgreed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [blink, setBlink] = useState(true);
  const [timer, setTimer] = useState(120); // 2 минуты в секундах
  const [timerBlink, setTimerBlink] = useState(false);
  const [showDiscount, setShowDiscount] = useState(true);
  const [showCheckboxError, setShowCheckboxError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((b) => !b);
    }, 600); // скорость мигания
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchTariffs() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://t-core.fit-hub.pro/Test/GetTariffs");
        if (!res.ok) throw new Error("Ошибка загрузки тарифов");
        const data: TariffApi[] = await res.json();
        setTariffs(data);
        // По умолчанию выбираем тариф с is_best: true
        const best = data.find((t) => t.is_best);
        setSelectedPlan(best ? best.id : data[0]?.id || null);
      } catch (e: any) {
        setError(e?.message || "Ошибка");
      } finally {
        setLoading(false);
      }
    }
    fetchTariffs();
  }, []);

  // Таймер обратного отсчёта
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Мигание таймера при < 30 сек
  useEffect(() => {
    if (timer > 30) return;
    const blinkInterval = setInterval(() => {
      setTimerBlink((b) => !b);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, [timer]);

  // Форматирование времени
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  // Преобразуем тарифы для карточек
  const pricingPlans = tariffs.map((t) => ({
    id: t.id,
    title: t.period,
    price: showDiscount ? t.price + " ₽" : t.full_price + " ₽",
    oldPrice: showDiscount ? t.full_price + " ₽" : "",
    description: t.text,
    mobileDescription: t.text,
    discount:
      showDiscount && t.full_price > t.price
        ? `-${Math.round(100 - (t.price / t.full_price) * 100)}%`
        : "",
    isPopular: t.is_best,
    isSelected: selectedPlan === t.id,
  }));

  const featuredPlan = pricingPlans.find((p) => p.isPopular);
  const otherPlans = pricingPlans.filter((p) => !p.isPopular);

  useEffect(() => {
    if (timer === 0) {
      setShowDiscount(false);
    }
  }, [timer]);

  const handleBuyClick = () => {
    if (!isAgreed) {
      setShowCheckboxError(true);
      setTimeout(() => setShowCheckboxError(false), 1200);
      return;
    }
    // Здесь может быть логика покупки
  };

  if (loading) {
    return <div className="text-center py-20">Загрузка тарифов...</div>;
  }
  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* OfferBanner с таймером */}
      <OfferBanner
        timer={timer}
        timerBlink={timerBlink}
        formatTime={formatTime}
      />

      {/* Page title over both columns */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 pt-6">
        <h1 className="text-2xl lg:text-5xl font-bold text-text-primary text-center">
          Выбери подходящий для себя <span className="text-accent">тариф</span>
        </h1>
      </div>

      {/* Картинка для мобильной версии */}
      <div className="lg:hidden max-w-7xl mx-auto px-6 pt-4">
        <div
          className="relative w-full overflow-hidden rounded-6xl"
          style={{ aspectRatio: "380/767" }}
        >
          <Image
            src="/images/freepik-export-20240531103402atHS-7b8d36.png"
            alt="Fitness"
            fill
            className="object-cover"
            priority
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-bg-primary" />
        </div>
      </div>

      {/* Layout: image left on desktop, top on mobile */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 pt-6 pb-8 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
        {/* Image block только для десктопа */}
        <div className="hidden lg:block order-1 lg:order-none">
          <div
            className="relative w-full overflow-hidden rounded-6xl"
            style={{ aspectRatio: "380/767" }}
          >
            <Image
              src="/images/freepik-export-20240531103402atHS-7b8d36.png"
              alt="Fitness"
              fill
              className="object-cover"
              priority
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-bg-primary" />
          </div>
        </div>

        {/* Right column content */}
        <div>
          {/* Title moved above grid */}
          <div className="mb-4" />

          {/* Pricing Cards - Desktop */}
          <div className="hidden lg:block mb-10">
            {/* Featured card full width on desktop */}
            {featuredPlan && (
              <div className="mb-6">
                <PricingCard
                  plan={featuredPlan}
                  isFeatured
                  onClick={() => setSelectedPlan(featuredPlan.id)}
                  showDiscount={showDiscount}
                />
              </div>
            )}

            {/* Other cards in 3 columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {otherPlans.map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  onClick={() => setSelectedPlan(plan.id)}
                  showDiscount={showDiscount}
                />
              ))}
            </div>
          </div>

          {/* Pricing Cards - Mobile */}
          <div className="lg:hidden mb-8">
            <div className="space-y-4">
              {pricingPlans.map((plan) => (
                <MobilePricingCard
                  key={plan.id}
                  plan={{
                    ...plan,
                    description: plan.mobileDescription,
                  }}
                  onClick={() => setSelectedPlan(plan.id)}
                  showDiscount={showDiscount}
                />
              ))}
            </div>
          </div>

          {/* Attention Card */}
          <div className="mb-8 lg:mb-10">
            <AttentionCard />
          </div>

          {/* Guarantee Card moved below grid on desktop */}

          {/* Privacy Policy and Button */}
          <div className="mb-8 lg:mb-10">
            <div className="flex items-start gap-3 mb-6 lg:mb-8">
              <button
                onClick={() => setIsAgreed(!isAgreed)}
                className={`w-7 h-7 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                  isAgreed
                    ? "bg-accent border-accent"
                    : showCheckboxError
                    ? "bg-bg-tertiary border-red-500 animate-pulse"
                    : "bg-bg-tertiary border-gray-500"
                }`}
              >
                {isAgreed && (
                  <svg
                    className="w-4 h-4 text-bg-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
              <span className="text-text-gray text-xs">
                Я согласен с офертой рекуррентных платежей и Политикой
                конфиденциальности
              </span>
            </div>

            <button
              onClick={handleBuyClick}
              className={`btn-primary w-full lg:w-[352px] mb-6 text-lg py-4 transition-all duration-200 ${
                blink ? "brightness-125" : "brightness-75"
              }`}
              disabled={!isAgreed}
            >
              Купить
            </button>

            <p className="text-text-muted text-xs leading-tight">
              Нажимая кнопку «Купить», Пользователь соглашается на разовое
              списание денежных средств для получения пожизненного доступа к
              приложению. Пользователь соглашается, что данные
              кредитной/дебетовой карты будут сохранены для осуществления
              покупок дополнительных услуг сервиса в случае желания
              пользователя.
            </p>
          </div>
        </div>
      </div>

      {/* Full-width Guarantee under image/text grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 pb-12">
        <GuaranteeCard />
      </div>
    </div>
  );
}
