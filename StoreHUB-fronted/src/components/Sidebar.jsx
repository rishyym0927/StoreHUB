import React, { useState } from 'react';
import { Filter } from 'lucide-react';

const Sidebar = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    framework: [],
    type: [],
    age: []
  });

  const filterSections = [
    {
      key: 'framework',
      title: 'Framework',
      options: ['React', 'Vue', 'Angular', 'Svelte', 'Solid']
    },
    {
      key: 'type',
      title: 'Component Type',
      options: ['Button', 'Input', 'Card', 'Modal', 'Navigation']
    },
    {
      key: 'age',
      title: 'Age',
      options: ['New', 'Old', 'Trending']
    }
  ];

  const toggleFilter = (sectionKey, option) => {
    setSelectedFilters(prev => ({
      ...prev,
      [sectionKey]: prev[sectionKey].includes(option)
        ? prev[sectionKey].filter(item => item !== option)
        : [...prev[sectionKey], option]
    }));
  };

  return (
    <div className="h-full pt-16 pb-6 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center mb-6 bg-white border border-1 border-black text-black  p-3 rounded-lg">
          <Filter className="mr-2" />
          <h2 className="text-lg font-semibold">Sort & Filter</h2>
        </div>
      
        {filterSections.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="text-black/70 mb-3 font-semibold text-lg border-b pb-2">
              {section.title}
            </h3>
            <div className="space-y-2">
              {section.options.map((option, optIdx) => (
                <FilterOption
                  key={optIdx}
                  label={option}
                  isSelected={selectedFilters[section.key].includes(option)}
                  onToggle={() => toggleFilter(section.key, option)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FilterOption = ({ label, isSelected, onToggle }) => (
  <div
    className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg transition-colors duration-200 hover:bg-black/5"
    onClick={onToggle}
  >
    <div
      className={`
        w-5 h-5 rounded border-2 flex items-center justify-center
        ${isSelected ? 'bg-black border-black' : 'border-black/30 bg-transparent'}
      `}
    >
      {isSelected && (
        <svg
          className="w-3 h-3 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </div>
    <span className={`transition-colors duration-200 ${isSelected ? 'text-black font-medium' : 'text-black/60'}`}>
      {label}
    </span>
  </div>
);

export default Sidebar;