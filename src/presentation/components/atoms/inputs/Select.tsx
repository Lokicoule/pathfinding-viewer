import { useState } from "react";

type SelectProps = {
  options: string[];
  placeholder?: string;
  disabled?: boolean;
};

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "",
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-[30rem]" onClick={() => setIsOpen(false)}>
      <button
        disabled={disabled}
        onClick={toggleOpen}
        className={`flex w-full items-center justify-between rounded bg-white p-2 ring-1 ring-gray-300 ${
          isOpen && "ring-blue-600"
        }`}
      >
        <span>{selectedOption || placeholder}</span>
        <i className="fas fa-chevron-down text-xl"></i>
      </button>

      {isOpen && (
        <ul className="z-2 absolute mt-1 w-full rounded bg-gray-50 ring-1 ring-gray-300">
          {options.map((option) => (
            <li
              key={option}
              className="cursor-pointer select-none p-2 hover:bg-gray-200"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
