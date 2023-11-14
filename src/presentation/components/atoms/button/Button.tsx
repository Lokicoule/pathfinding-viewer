type ButtonVariant = "default" | "underline";

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
           px-4 py-2 rounded-t-sm  font-semibold hover:text-gray-600
           bg-no-repeat bg-bottom bg-[length:100%_6px] transition-[background-size] duration-300 ease-in-out hover:bg-[length:100%_100%]  ${
             className || ""
           }`}
        >
          {children}
        </button>
      );
    default:
      return (
        <button
          {...props}
          onClick={onClick}
          className={`px-4 py-2 rounded-lg text-white ${className || ""}`}
        >
          {children}
        </button>
      );
  }
};

export default Button;
