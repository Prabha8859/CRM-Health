import Button from './Button';

const FilterBar = ({ 
  onSearch, 
  onFilter, 
  onSort,
  searchPlaceholder = 'Search...',
  filters = [],
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 flex gap-4 flex-wrap items-center ${className}`}>
      <input
        type="text"
        placeholder={searchPlaceholder}
        onChange={(e) => onSearch && onSearch(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 min-w-[200px]"
      />
      
      {filters.map((filter, idx) => (
        <select
          key={idx}
          onChange={(e) => onFilter && onFilter(filter.key, e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{filter.label}</option>
          {filter.options && filter.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ))}

      {onSort && (
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onSort()}
        >
          Sort
        </Button>
      )}
    </div>
  );
};

export default FilterBar;
