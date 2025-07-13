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
      className="block mb-1 text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
      <input
        id={name}
        type={type}
        {...register(name, validation)}
        {...rest}
        className={`w-full rounded-md border px-4 py-2 pr-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent ${
          icon ? "pl-10" : ""
        }`}
      />
    </div>
    {errors[name] && (
      <p className="text-xs text-red-500 mt-1">{errors[name].message}</p>
    )}
  </div>
);

export default FormInput;
