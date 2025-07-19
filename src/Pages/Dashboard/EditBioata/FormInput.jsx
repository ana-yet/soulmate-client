import React from "react";

const FormInput = ({
  label,
  name,
  type = "text",
  register,
  validation = {},
  errors,
  icon,
  ...rest
}) => (
  <div>
    <label
      htmlFor={name}
      className="block mb-1 text-sm font-medium text-txt/80 dark:text-dark-text-muted"
    >
      {label}
    </label>
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
          {icon}
        </span>
      )}
      <input
        id={name}
        type={type}
        {...register(name, validation)}
        {...rest}
        className={`w-full rounded-lg border border-secondary/50 bg-background px-4 py-2.5 pr-4 text-sm text-txt placeholder-txt/50 focus:outline-none focus:ring-1 focus:ring-accent dark:bg-dark-secondary dark:border-dark-border dark:text-dark-text dark:placeholder-dark-text-muted ${
          icon ? "pl-10" : "pl-4"
        }`}
      />
    </div>
    {errors[name] && (
      <p className="text-xs text-red-500 mt-1">{errors[name].message}</p>
    )}
  </div>
);

export default FormInput;
