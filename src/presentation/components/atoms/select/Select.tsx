type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;
type SelectComponent = React.FC<SelectProps>;

const Select: SelectComponent = ({ children, ...props }) => {
  return (
    <select
      {...props}
      /* select {
  border-radius: 8px;
  border: 1px solid transparent;
  background-color: transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.25s;
}
select:hover {
  border-color: #646cff;
}
select:focus,
select:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}*/

      className="rounded-lg border-transparent bg-transparent px-3 py-2 
      font-medium cursor-pointer transition-colors
       hover:bg-gradient-to-r from-rose-200 hover:to-teal-200
      disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </select>
  );
};

export default Select;
