import { useFilters } from "../hooks/useFilters";

export const FilterForm = () => {
  const { filters, setFilters } = useFilters();

  const handleSubmit = () => {
    
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="font-semibold">Page Size</label>
            <select name="pageSize" value={filters.page_size}>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  )
};
