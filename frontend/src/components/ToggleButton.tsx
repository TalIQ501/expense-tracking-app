import { useState } from "react";

type ToggleButtonProps = {
  value: boolean | undefined;
  onChange: (value: boolean) => void;
  label?: string;
};

export const ToggleButton = ({ value, onChange }: ToggleButtonProps) => (
  <button
    role="switch"
    aria-checked={value}
    onClick={() => onChange?.(!value)}
    className={`relative w-16 h-[34px] rounded-full border-none
        cursor-pointer transition-colors duration-200
        ${value ? "bg-emerald-500" : "bg-gray-300"}`}
  >
    <span
      className={`absolute top-1 w-[26px] h-[26px] rounded-full
          bg-white shadow transition-all duration-200
          ${value ? "left-[34px]" : "left-1"}`}
    />
  </button>
);
