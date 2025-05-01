"use client";

interface AvailabilityFilterProps {
  selected: string;
  onChange: (availability: string) => void;
}

const AvailabilityFilter = ({
  selected,
  onChange,
}: AvailabilityFilterProps) => {
  const options = [
    { value: "In stock", label: "In Stock" },
    { value: "Out of stock", label: "Out of Stock" },
  ];

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            type="radio"
            id={`availability-${option.value}`}
            name="availability"
            value={option.value}
            checked={selected === option.value}
            onChange={() => onChange(option.value)}
            className="h-4 w-4 text-red-600 focus:ring-red-500"
          />
          <label
            htmlFor={`availability-${option.value}`}
            className="ml-2 text-sm text-gray-700 cursor-pointer"
          >
            {option.label}
          </label>
        </div>
      ))}
      {selected && (
        <button
          onClick={() => onChange("")}
          className="text-xs text-red-600 hover:text-red-700 mt-1"
        >
          Clear availability filter
        </button>
      )}
    </div>
  );
};

export default AvailabilityFilter;
