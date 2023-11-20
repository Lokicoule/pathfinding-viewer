type ButtonVariant = "default" | "underline" | "base";

type ButtonProps = React.PropsWithChildren<
  {
    variant?: ButtonVariant;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>;

const UNDERLINE_BUTTON_CLASS = `
  px-4 py-2 rounded-t-sm hover:text-[#3b5360] font-primary text-sm text-white
  bg-no-repeat bg-bottom bg-[length:100%_6px] hover:bg-[length:100%_100%]
  transition-[background-size] duration-300 ease-in-out 
`;

const DEFAULT_BUTTON_CLASS = `
  w-full text-center 
  shadow-lg rounded-lg px-5 py-2.5 
  text-white font-primary text-sm
  bg-[#184d67] bg-opacity-70 hover:bg-opacity-30
  transition duration-300 ease-in-out 
`;

const DISABLED_BUTTON_CLASS = `
  opacity-50 pointer-events-none cursor-not-allowed
`;

const getButtonClass = (variant: ButtonVariant) => {
  switch (variant) {
    case "base":
      return "";
    case "underline":
      return UNDERLINE_BUTTON_CLASS;
    case "default":
    default:
      return DEFAULT_BUTTON_CLASS;
  }
};

const buildButtonClass = (
  variant: ButtonVariant,
  disabled: boolean,
  className?: string
) => {
  const buttonClass = getButtonClass(variant);
  const disabledClass = disabled ? DISABLED_BUTTON_CLASS : "";
  return `${buttonClass} ${disabledClass} ${className ?? ""}`;
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "default",
  disabled = false,
  ...props
}) => {
  const buttonClass = buildButtonClass(variant, disabled, className);

  return (
    <button className={buttonClass} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
