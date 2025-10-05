"use client";

import { useState } from "react";
import Image from "next/image";
import MobilePricingCard from "@/components/MobilePricingCard";
import OfferBanner from "@/components/OfferBanner";
import GuaranteeCard from "@/components/GuaranteeCard";
import AttentionCard from "@/components/AttentionCard";

export default function MobileLayout() {
  const [selectedPlan, setSelectedPlan] = useState("forever");
  const [isAgreed, setIsAgreed] = useState(false);

  const pricingPlans = [
    {
      id: "forever",
      title: "Навсегда",
      price: "5990 ₽",
      oldPrice: "18 990 ₽",
      description: "Всегда быть в форме",
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
      discount: "-50%",
      isPopular: false,
      isSelected: selectedPlan === "3months",
    },
    {
      id: "1month",
      title: "1 месяц",
      price: "990 ₽",
      oldPrice: "1690 ₽",
      description: "Получить первые результаты",
      discount: "-40%",
      isPopular: false,
      isSelected: selectedPlan === "1month",
    },
    {
      id: "1week",
      title: "1 неделя",
      price: "690 ₽",
      oldPrice: "1690 ₽",
      description: "Чтобы просто начать",
      discount: "-30%",
      isPopular: false,
      isSelected: selectedPlan === "1week",
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Background Image */}
      <div className="relative w-full h-64">
        <Image
          src="/images/freepik-export-20240531103402atHS-7b8d36.png"
          alt="Fitness background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 -mt-32">
        {/* Offer Banner */}
        <OfferBanner />

        {/* Title */}
        <div className="text-center mb-8 px-4">
          <h1 className="text-2xl font-bold text-text-primary">
            Выбери подходящий для себя тариф
          </h1>
        </div>

        {/* Pricing Cards */}
        <div className="px-4 mb-8">
          <div className="space-y-4">
            {pricingPlans.map((plan) => (
              <MobilePricingCard
                key={plan.id}
                plan={plan}
                onClick={() => setSelectedPlan(plan.id)}
              />
            ))}
          </div>
        </div>

        {/* Attention Card */}
        <div className="px-4 mb-8">
          <AttentionCard />
        </div>

        {/* Guarantee Card */}
        <div className="px-4 mb-8">
          <GuaranteeCard />
        </div>

        {/* Privacy Policy and Button */}
        <div className="px-4 mb-8">
          <div className="flex items-start gap-3 mb-6">
            <button
              onClick={() => setIsAgreed(!isAgreed)}
              className={`w-7 h-7 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                isAgreed
                  ? "bg-accent border-accent"
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
            <span className="text-text-gray text-xs leading-tight">
              Я согласен с офертой рекуррентных платежей и Политикой
              конфиденциальности
            </span>
          </div>

          <button
            className="btn-primary w-full mb-6 text-lg py-4"
            disabled={!isAgreed}
          >
            Купить
          </button>

          <p className="text-text-muted text-xs leading-tight">
            Нажимая кнопку «Купить», Пользователь соглашается на разовое
            списание денежных средств для получения пожизненного доступа к
            приложению. Пользователь соглашается, что данные кредитной/дебетовой
            карты будут сохранены для осуществления покупок дополнительных услуг
            сервиса в случае желания пользователя.
          </p>
        </div>
      </div>
    </div>
  );
}
