import React, { useState } from "react";

type Option = {
  value: string;
  label: string;
  default?: boolean;
};

type SelectProps = {
  options: Option[];
  onOptionSelect: (option: Option) => void;
};

const withOpenClose = (Component: React.FC<SelectProps>) => {
  return (props: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
      <div onBlur={handleClose}>
        <button onClick={handleOpen}>Toggle</button>
        {isOpen && <Component {...props} />}
      </div>
    );
  };
};

const Select: React.FC<SelectProps> = ({ options, onOptionSelect }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options.find((option) => option.default) || options[0]
  );

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onOptionSelect(option);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
        aria-haspopup="listbox"
        aria-expanded="true"
      >
        {selectedOption && (
          <span className="flex items-center">
            <span className="ml-3 block truncate">{selectedOption.label}</span>
          </span>
        )}
      </button>
      <ul
        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        role="listbox"
      >
        {options.map((option, index) => (
          <li
            key={index}
            className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"
            role="option"
            onClick={() => handleOptionClick(option)}
          >
            <div className="flex items-center">
              <span className="font-normal ml-3 block">{option.label}</span>
            </div>
            {selectedOption === option && (
              <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withOpenClose(Select);
