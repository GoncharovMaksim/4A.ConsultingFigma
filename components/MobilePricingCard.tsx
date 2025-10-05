"use client";

interface PricingPlan {
  id: string;
  title: string;
  price: string;
  oldPrice: string;
  description: string;
  discount: string;
  isPopular: boolean;
  isSelected: boolean;
}

interface MobilePricingCardProps {
  plan: PricingPlan;
  onClick: () => void;
}

export default function MobilePricingCard({
  plan,
  onClick,
}: MobilePricingCardProps) {
  return (
    <div className="relative">
      {/* Card */}
      <div
        className={`card relative cursor-pointer transition-all duration-300 ${
          plan.isSelected ? "card-selected" : ""
        }`}
        onClick={onClick}
      >
        {/* Popular Badge (inside card) */}
        {plan.isPopular && (
          <div className="absolute -top-2 -right-2 z-10">
            <span className="bg-accent text-bg-primary font-medium text-sm px-2 py-1 rounded">
              хит!
            </span>
          </div>
        )}

        {/* Discount Badge (inside card) */}
        <div className="absolute top-0 right-12 z-10">
          <div className="bg-sale-red text-text-primary font-gilroy font-medium text-sm px-2 py-1 rounded-br-sm">
            {plan.discount}
          </div>
        </div>
        <div className="flex items-center justify-between">
          {/* Left side - Title and Price */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-1">
                  {plan.title}
                </h3>
                <div className="flex flex-col items-end mb-2">
                  <div className="text-3xl font-semibold text-accent">
                    {plan.price}
                  </div>
                  <div className="relative w-full flex justify-end">
                    <span className="text-text-old-price text-sm line-through decoration-[1px] decoration-text-old-price">
                      {plan.oldPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Description */}
          <div className="flex-1 text-right">
            <p className="text-text-primary text-sm leading-relaxed">
              {plan.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
