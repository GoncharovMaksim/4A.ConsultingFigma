"use client";

import { useState } from "react";
import Image from "next/image";
import PricingCard from "@/components/PricingCard";
import MobilePricingCard from "@/components/MobilePricingCard";
import OfferBanner from "@/components/OfferBanner";
import GuaranteeCard from "@/components/GuaranteeCard";
import AttentionCard from "@/components/AttentionCard";

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState("forever");
  const [isAgreed, setIsAgreed] = useState(false);

  const pricingPlans = [
    {
      id: "forever",
      title: "Навсегда",
      price: "5990 ₽",
      oldPrice: "18 990 ₽",
      description:
        "Для тех, кто хочет всегда быть в форме и поддерживать здоровье",
      mobileDescription: "Всегда быть в форме",
      discount: "-70%",
      isPopular: true,
      isSelected: selectedPlan === "forever",
    },
    {
      id: "3months",
      title: "3 месяца",
      price: "1990 ₽",
      oldPrice: "3990 ₽",
      description: "Привести тело в порядок",
      mobileDescription: "Привести тело в порядок",
      discount: "-50%",
      isPopular: false,
      isSelected: selectedPlan === "3months",
    },
    {
      id: "1month",
      title: "1 месяц",
      price: "990 ₽",
      oldPrice: "1690 ₽",
      description: "Чтобы получить первые результаты",
      mobileDescription: "Получить первые результаты",
      discount: "-40%",
      isPopular: false,
      isSelected: selectedPlan === "1month",
    },
    {
      id: "1week",
      title: "1 неделя",
      price: "690 ₽",
      oldPrice: "990 ₽",
      description: "Чтобы просто начать",
      mobileDescription: "Чтобы просто начать",
      discount: "-30%",
      isPopular: false,
      isSelected: selectedPlan === "1week",
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      <OfferBanner />

      {/* Layout: image left on desktop, top on mobile */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-16 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
        {/* Image block */}
        <div className="order-1 lg:order-none">
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
          {/* Title */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-text-primary">
              Выбери подходящий для себя тариф
            </h1>
          </div>

          {/* Pricing Cards - Desktop */}
          <div className="hidden md:block mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pricingPlans.map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  onClick={() => setSelectedPlan(plan.id)}
                />
              ))}
            </div>
          </div>

          {/* Pricing Cards - Mobile */}
          <div className="md:hidden mb-8">
            <div className="space-y-4">
              {pricingPlans.map((plan) => (
                <MobilePricingCard
                  key={plan.id}
                  plan={{
                    ...plan,
                    description: plan.mobileDescription,
                  }}
                  onClick={() => setSelectedPlan(plan.id)}
                />
              ))}
            </div>
          </div>

          {/* Attention Card */}
          <div className="mb-8 md:mb-10">
            <AttentionCard />
          </div>

          {/* Guarantee Card */}
          <div className="mb-8 md:mb-10">
            <GuaranteeCard />
          </div>

          {/* Privacy Policy and Button */}
          <div className="mb-8 md:mb-10">
            <div className="flex items-start md:items-center gap-3 mb-6 md:mb-8">
              <button
                onClick={() => setIsAgreed(!isAgreed)}
                className={`w-7 h-7 md:w-8 md:h-8 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  isAgreed
                    ? "bg-accent border-accent"
                    : "bg-bg-tertiary border-gray-500"
                }`}
              >
                {isAgreed && (
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-bg-primary"
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
              <span className="text-text-gray text-xs md:text-sm">
                Я согласен с офертой рекуррентных платежей и Политикой
                конфиденциальности
              </span>
            </div>

            <button
              className="btn-primary w-full mb-6 md:mb-8 text-lg md:text-xl py-4 md:py-5"
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
    </div>
  );
}
