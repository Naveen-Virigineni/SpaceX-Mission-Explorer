// src/components/Filters.tsx

// A reusable Toggle Switch component for our filters
const ToggleSwitch = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (isChecked: boolean) => void; }) => (
  <label className="flex items-center cursor-pointer">
    <div className="relative">
      <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <div className={`block w-12 h-6 rounded-full transition-colors ${checked ? 'bg-blue-500' : 'bg-slate-300'}`}></div>
      <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? 'transform translate-x-6' : ''}`}></div>
    </div>
    <div className="ml-3 text-slate-600 font-medium">{label}</div>
  </label>
);

interface FilterProps {
  availableYears: string[];
  selectedYear: string;
  onYearChange: (year: string) => void;
  isSuccessOnly: boolean;
  onSuccessChange: (isChecked: boolean) => void;
  isFavoritesOnly: boolean;
  onFavoritesChange: (isChecked: boolean) => void;
}

const Filters: React.FC<FilterProps> = ({
  availableYears,
  selectedYear,
  onYearChange,
  isSuccessOnly,
  onSuccessChange,
  isFavoritesOnly,
  onFavoritesChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-6">
      {/* Year Dropdown */}
      <div className="w-full md:w-auto">
        <label htmlFor="year-select" className="block text-sm font-medium text-slate-700 mb-1">
          Year
        </label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="All">All years</option>
          {availableYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Toggles */}
      <div className="flex items-center gap-6 pt-2">
        <ToggleSwitch
          label="Successful only"
          checked={isSuccessOnly}
          onChange={onSuccessChange}
        />
        <ToggleSwitch
          label="Show favorites"
          checked={isFavoritesOnly}
          onChange={onFavoritesChange}
        />
      </div>
    </div>
  );
};

export default Filters;