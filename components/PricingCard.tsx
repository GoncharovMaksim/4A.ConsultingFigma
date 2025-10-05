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

interface PricingCardProps {
  plan: PricingPlan;
  onClick: () => void;
  isFeatured?: boolean;
}

export default function PricingCard({
  plan,
  onClick,
  isFeatured = false,
}: PricingCardProps) {
  return (
    <div className="relative h-full">
      {/* Card */}
      <div
        className={`card relative h-full cursor-pointer transition-all duration-300 hover:scale-105 ${
          plan.isSelected ? "card-selected" : ""
        }`}
        onClick={onClick}
      >
        {/* Popular Badge (inside card to scale together) */}
        {plan.isPopular && (
          <div className="absolute -top-2 -right-2 z-10">
            <span className="bg-accent text-bg-primary font-medium text-lg px-3 py-1 rounded-lg">
              хит!
            </span>
          </div>
        )}

        {/* Discount Badge (inside card to scale together) */}
        <div className="absolute top-0 left-8 md:left-12 lg:left-16 z-10">
          <div className="bg-sale-red text-text-primary font-gilroy font-medium text-lg px-2 py-1 rounded-b-md">
            {plan.discount}
          </div>
        </div>
        {isFeatured ? (
          <div className="flex h-full flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left: title/prices */}
            <div className="text-left">
              <h3 className="text-2xl font-medium text-text-primary mb-2">
                {plan.title}
              </h3>
              <div className="flex items-baseline gap-4">
                <div className="text-5xl font-semibold text-accent whitespace-nowrap leading-none">
                  {plan.price}
                </div>
                <div className="relative">
                  <span className="text-text-old-price text-xl line-through whitespace-nowrap">
                    {plan.oldPrice}
                  </span>
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-text-old-price transform -translate-y-1/2"></div>
                </div>
              </div>
            </div>

            {/* Right: description */}
            <p className="text-text-primary text-base leading-relaxed md:text-right md:max-w-xl">
              {plan.description}
            </p>
          </div>
        ) : (
          <div className="flex h-full flex-col text-center">
            {/* Title and Price */}
            <div className="mb-8">
              <h3 className="text-2xl font-medium text-text-primary mb-2">
                {plan.title}
              </h3>
              <div className="flex flex-col items-center gap-2">
                <div className="text-5xl font-semibold text-accent">
                  {plan.price}
                </div>
                <div className="relative">
                  <span className="text-text-old-price text-xl line-through">
                    {plan.oldPrice}
                  </span>
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-text-old-price transform -translate-y-1/2"></div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="mt-auto text-left text-text-primary text-base leading-relaxed">
              {plan.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
