export default function GuaranteeCard() {
  return (
    <div className="bg-bg-secondary border border-gray-500 rounded-2xl p-5">
      <div className="text-center">
        {/* Guarantee Tag */}
        <div className="inline-flex items-center gap-2.5 bg-bg-tertiary border border-accent-green rounded-3xl px-7 py-4 mb-3">
          <span className="text-accent-green font-medium text-2xl">
            гарантия возврата 30 дней
          </span>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-2xl leading-relaxed max-w-4xl mx-auto">
          Мы уверены, что наш план сработает для тебя и ты увидишь видимые
          результаты уже через 4 недели! Мы даже готовы полностью вернуть твои
          деньги в течение 30 дней с момента покупки, если ты не получишь
          видимых результатов.
        </p>
      </div>
    </div>
  );
}
