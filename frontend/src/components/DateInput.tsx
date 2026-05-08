type DateInputProps = {
  value: string; // "YYYY-MM-DD"
  onChange: (value: string) => void;
  label?: string;
  min?: string;
  max?: string;
};

export const DateInput = ({
  value,
  onChange,
  label,
  min,
  max,
}: DateInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-neutral-400">{label}</label>}
      <input
        type="date"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg
          border border-neutral-800
          focus:outline-none focus:border-neutral-600
          transition-colors duration-150"
      />
    </div>
  );
};
