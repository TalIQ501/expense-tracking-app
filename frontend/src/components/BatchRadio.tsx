interface BaseBatchRadioProps {
  value: string | number;
  label?: string;
}

interface BatchRadioProps<T extends BaseBatchRadioProps> {
  label: string;
  batch: T[];
  selected: T["value"];
  onChange: (value: T["value"]) => void;
}

export const BatchRadio = <T extends BaseBatchRadioProps>({
  label,
  batch,
  selected,
  onChange,
}: BatchRadioProps<T>) => (
  <div className="flex flex-col gap-3">
    <p className="">{label}</p>
    <div className="grid grid-cols-3 gap-1.5">
      {batch.map((item) => (
        <button
          key={item.value}
          onClick={() => onChange(item.value)}
          className={`py-2 rounded-md text-xs transition-all duration-150 border
            ${
              selected === item.value
                ? "bg-neutral-100 border-neutral-100 font-semibold"
                : "border-gray-200 dark:bg-gray-900 text-white hover:bg-blue-50 hover:border-neutral-600 hover:text-neutral-600 font-semibold"
            }
          `}
        >
          {item.label ?? item.value}
        </button>
      ))}
    </div>
  </div>
);
