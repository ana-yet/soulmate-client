const FloatingLabelInput = ({
  label,
  name,
  type = "text",
  register,
  validation,
  errors,
  icon,
}) => (
  <div className="relative">
    <input
      id={name}
      type={type}
      {...register(name, validation)}
      placeholder=" "
      className="block w-full px-4 py-3 pl-12 text-base text-txt bg-transparent rounded-lg border border-secondary/50 appearance-none dark:text-dark-text dark:border-dark-border focus:outline-none focus:ring-0 focus:border-accent peer"
    />
    <label
      htmlFor={name}
      className="absolute text-base text-txt/70 dark:text-dark-text-muted duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-background dark:bg-dark-secondary px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
    >
      {label}
    </label>
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
      {icon}
    </div>
    {errors[name] && (
      <p className="mt-1 text-xs text-accent">{errors[name].message}</p>
    )}
  </div>
);
export default FloatingLabelInput;
