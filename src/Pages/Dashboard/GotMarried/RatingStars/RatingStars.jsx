const RatingStars = ({ value, onChange }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => onChange(star)}
        className={`text-2xl ${
          value >= star
            ? "text-utility"
            : "text-secondary/30 dark:text-dark-text-muted"
        }`}
      >
        ★
      </button>
    ))}
  </div>
);
export default RatingStars;
