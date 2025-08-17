const FormField = ({
  label,
  name,
  type = "text",
  icon: Icon,
  register,
  errors,
  required = false,
  rows,
  placeholder,
  disabled = false,
  ...rest
}) => {
  const fieldClass = `w-full rounded-lg border border-secondary/50 bg-background py-2.5
    ${Icon ? "pl-10" : "pl-4"} pr-4 font-primary text-txt
    dark:bg-dark-secondary dark:border-dark-border dark:text-dark-text
    focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-60 disabled:cursor-not-allowed`;

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-txt/80 dark:text-dark-text-muted">
          {label} {required && <span className="text-accent">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary dark:text-dark-text-muted" />
        )}
        {type === "textarea" ? (
          <textarea
            {...register(name, {
              required: required && `${label} is required`,
            })}
            rows={rows || 4}
            placeholder={placeholder}
            className={fieldClass}
            disabled={disabled}
            {...rest}
          />
        ) : (
          <input
            type={type}
            {...register(name, {
              required: required && `${label} is required`,
            })}
            placeholder={placeholder}
            className={fieldClass}
            disabled={disabled}
            {...rest}
          />
        )}
      </div>
      {errors?.[name] && (
        <p className="text-xs text-accent">{errors[name].message}</p>
      )}
    </div>
  );
};
export default FormField;
