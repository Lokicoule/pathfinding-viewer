type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;
type CheckboxComponent = React.FC<CheckboxProps>;

const Checkbox: CheckboxComponent = ({ children, ...props }) => {
  return (
    <label className="flex items-center space-x-2">
      <input {...props} type="checkbox" className="rounded-lg cursor-pointer" />
      <span className="text-white">{children}</span>
    </label>
  );
};

export default Checkbox;
