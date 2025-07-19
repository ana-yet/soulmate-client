import { HiOutlineSearch } from "react-icons/hi";

const FilterSidebar = ({ filters, setFilters }) => {
  const divisions = [
    "Dhaka",
    "Chattogram",
    "Rangpur",
    "Barisal",
    "Khulna",
    "Mymensingh",
    "Sylhet",
  ];

  return (
    <div className="space-y-6 min-h-full ">
      <div>
        <label className="text-sm font-semibold text-txt dark:text-dark-text">
          Search by ID or Keyword
        </label>
        <div className="relative mt-2">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Enter ID or keyword..."
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                search: e.target.value,
                page: 1,
              }))
            }
            className="w-full rounded-lg border border-secondary/50 bg-background py-2 pl-10 pr-4 text-txt dark:bg-dark-secondary dark:border-dark-border dark:text-dark-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-txt dark:text-dark-text">
          Age Range
        </label>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.ageMin}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                ageMin: e.target.value,
                page: 1,
              }))
            }
            className="w-full rounded-lg border border-secondary/50 bg-background p-2 text-txt dark:bg-dark-secondary dark:border-dark-border dark:text-dark-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <span className="text-txt/70 dark:text-dark-text-muted">-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.ageMax}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                ageMax: e.target.value,
                page: 1,
              }))
            }
            className="w-full rounded-lg border border-secondary/50 bg-background p-2 text-txt dark:bg-dark-secondary dark:border-dark-border dark:text-dark-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-txt dark:text-dark-text">
          Gender
        </label>
        <div className="flex gap-4 mt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value=""
              checked={filters.gender === ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  gender: e.target.value,
                  page: 1,
                }))
              }
              className="h-4 w-4 text-accent focus:ring-accent"
            />
            <span className="text-txt dark:text-dark-text">All</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={filters.gender === "Male"}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  gender: e.target.value,
                  page: 1,
                }))
              }
              className="h-4 w-4 text-accent focus:ring-accent"
            />
            <span className="text-txt dark:text-dark-text">Male</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={filters.gender === "Female"}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  gender: e.target.value,
                  page: 1,
                }))
              }
              className="h-4 w-4 text-accent focus:ring-accent"
            />
            <span className="text-txt dark:text-dark-text">Female</span>
          </label>
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-txt dark:text-dark-text">
          Permanent Division
        </label>
        <select
          value={filters.division}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              division: e.target.value,
              page: 1,
            }))
          }
          className="w-full mt-2 rounded-lg border border-secondary/50 bg-background p-2 text-txt dark:bg-dark-secondary dark:border-dark-border dark:text-dark-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        >
          <option value="">All Divisions</option>
          {divisions.map((div) => (
            <option key={div} value={div}>
              {div}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;
