import React, { useState } from 'react';

const DropdownMenu = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(options[0].value); // Default selected option

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="relative inline-block text-left">
      <select
        className="block w-full px-4 py-2 pr-6 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownMenu;
