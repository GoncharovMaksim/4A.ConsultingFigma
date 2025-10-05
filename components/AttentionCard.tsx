export default function AttentionCard() {
  return (
    <div className="bg-bg-tertiary rounded-2xl p-5">
      <div className="flex items-start gap-2">
        {/* Alert Icon */}
        <div className="flex-shrink-0">
          <div className="w-6 h-6 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-accent"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full"></div>
          </div>
        </div>

        {/* Text */}
        <p className="text-text-primary text-base leading-relaxed">
          Следуя плану на 3 месяца и более, люди получают в 2 раза лучший
          результат, чем за 1 месяц
        </p>
      </div>
    </div>
  );
}
