interface BatchFilterItem {
  value: string;
  label: string;
}

interface BatchFilterProps<T extends BatchFilterItem> {
  label: string;
  batch: T[];
  selected: string[];
  onChange: (value: string[]) => void;
}

export const BatchFilter = <T extends BatchFilterItem>({
  label,
  batch,
  selected,
  onChange,
}: BatchFilterProps<T>) => {
  const toggle = (value: string) => {
    const action = selected.includes(value)
      ? selected.filter((c) => c !== value)
      : [...selected, value];
    onChange(action);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[10px] tracking-widest text-neutral-500">{label}</p>
      <div className="flex flex-col gap-1">
        {batch.map((item) => {
          const checked = selected.includes(item.value);
          return (
            <label
              key={item.value}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 border
                ${checked ? "bg-red-600 text-white border-neutral-700" : "border-transparent hover:bg-blue-50"}`}
            >
              <input
                type="checkbox"
                value={item.value}
                checked={checked}
                onChange={() => toggle(item.value)}
                className="hidden"
              />
              <span
                className={`w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 transition-all duration-150
                  ${checked ? "bg-neutral-200 border-neutral-200" : "border-neutral-600"}`}
              >
                {checked && (
                  <svg
                    className="w-2.5 h-2.5 text-neutral-900"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M1.5 8.5L8.5 1.5M1.5 1.5L8.5 8.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </span>
              <span
                className={`text-sm font-medium transition-colors duration-150
                ${checked ? "line-through decoration-neutral-500" : "hover:text-neutral-200"}`}
              >
                {item.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
