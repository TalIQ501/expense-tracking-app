import type { IAllFilters } from "../../../shared/types/queryFilters";
import { useFilters } from "../hooks/useFilters";
import { useExpenseStore } from "../store/useExpenseStore";
import { BatchFilter } from "./BatchFilter";
import { BatchRadio } from "./BatchRadio";
import { DateInput } from "./DateInput";
import { ToggleButton } from "./ToggleButton";

const categories = [
  { value: "general", label: "General" },
  { value: "food", label: "Food" },
  { value: "transport", label: "Transport" },
  { value: "grocery", label: "Grocery" },
  { value: "stationary", label: "Stationary" },
  { value: "clothes", label: "Clothes" },
];

const pageSizes = [10, 15, 20, 25, 30, 50];

export const FilterForm = () => {
  const { filters, setFilters } = useFilters();
  const getExpenses = useExpenseStore((store) => store.fetchExpenses);

  const handleChange = <K extends keyof IAllFilters>(
    name: K,
    value: IAllFilters[K],
  ) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getExpenses(filters);
  };

  return (
    <div className="flex flex-col gap-6 p-6 border-r border-neutral-800">
      <p className="text-lg">Filters</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
        <ToggleButton
          value={filters["deleted"]}
          onChange={(val) => handleChange("deleted", val)}
        />
        <div className="flex flex-col gap-3">
          <BatchRadio
            label="Page Size"
            batch={pageSizes.map((size: number) => ({ value: size }))}
            selected={filters.page_size}
            onChange={(size) =>
              handleChange("page_size", size as IAllFilters["page_size"])
            }
          />
        </div>

        <hr className="border-neutral-800" />

        <BatchFilter
          label="Category"
          batch={categories}
          selected={filters.categories ?? []}
          onChange={(categories) => handleChange("categories", categories)}
        />
        <DateInput
          label="From Date"
          value={filters.date_from ?? ""}
          onChange={(val) => handleChange("date_from", val)}
        />
        <DateInput
          label="To Date"
          value={filters.date_to ?? ""}
          onChange={(val) => handleChange("date_to", val)}
        />

        <button
          type="submit"
          className="mt-auto w-full py-3 rounded-lg bg-gray-900 text-white text-sm font-semibold tracking-wide hover:bg-blue-50 hover:text-black transition-all duration-150 hover:-translate-y-px hover:shadow-lg hover:shadow-neutral-100/10 active:translate-y-0"
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
};
