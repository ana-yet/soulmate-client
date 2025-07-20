const PremiumBadge = ({ subscriptionType }) =>
  subscriptionType === "premium" ? (
    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-utility/10 text-utility dark:bg-utility/20">
      Premium
    </span>
  ) : null;
export default PremiumBadge;
