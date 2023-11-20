type ButtonVariant = "default" | "underline" | "leftline";

type ButtonProps = React.PropsWithChildren<
  {
    variant?: ButtonVariant;
  } & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;

type ButtonComponent = React.FC<ButtonProps>;

const Button: ButtonComponent = ({
  children,
  className,
  onClick,
  variant = "default",
  ...props
}) => {
  switch (variant) {
    case "underline":
      return (
        <button
          {...props}
          onClick={onClick}
          className={`
          disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed
           px-4 py-2 rounded-t-sm hover:text-[#3b5360] text-primary text-sm
           bg-no-repeat bg-bottom bg-[length:100%_6px] transition-[background-size] duration-300 ease-in-out hover:bg-[length:100%_100%]  ${
             className || ""
           }`}
        >
          {children}
        </button>
      );
    case "leftline":
      return (
        <button
          {...props}
          onClick={onClick}
          className={`
          rounded-sm  font-semibold hover:text-[#3b5360]
           bg-no-repeat bg-right bg-[length:100%_0px] transition-[background-size] duration-300 ease-in-out hover:bg-[length:100%_100%]  ${
             className || ""
           }`}
        >
          {children}
        </button>
      );
    default:
      return (
        <button {...props} onClick={onClick} className={`${className}`}>
          {children}
        </button>
      );
  }
};

export default Button;
