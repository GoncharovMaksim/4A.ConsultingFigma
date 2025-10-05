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
  showDiscount?: boolean;
}

export default function PricingCard({
  plan,
  onClick,
  isFeatured = false,
  showDiscount = true,
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
        <div
          className={`absolute top-0 left-8 md:left-12 lg:left-16 z-10 transition-opacity duration-700 ${
            showDiscount && plan.discount
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-sale-red text-text-primary font-gilroy font-medium text-lg px-2 py-1 rounded-br-md">
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
              <div className="flex flex-col items-end gap-0.5 md:gap-1">
                <div className="text-5xl font-semibold text-accent whitespace-nowrap leading-none">
                  {plan.price}
                </div>
                <span
                  className={`text-text-old-price text-xl line-through decoration-[1px] decoration-text-old-price transition-opacity duration-700 ${
                    showDiscount && plan.oldPrice
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  {plan.oldPrice}
                </span>
              </div>
            </div>

            {/* Right: description */}
            <div className="md:max-w-xl md:ml-4 text-left">
              <p className="text-text-primary text-base leading-relaxed">
                {plan.description}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col text-center">
            {/* Title and Price */}
            <div className="mb-8">
              <h3 className="text-2xl font-medium text-text-primary mb-2">
                {plan.title}
              </h3>
              <div className="flex flex-col items-center gap-0.5">
                <div className="text-5xl font-semibold text-accent">
                  {plan.price}
                </div>
                <div className="relative">
                  <span
                    className={`text-text-old-price text-xl line-through decoration-[1px] decoration-text-old-price transition-opacity duration-700 ${
                      showDiscount && plan.oldPrice
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    {plan.oldPrice}
                  </span>
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
