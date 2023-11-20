import Button from "./Button";

type ToggleButtonProps = React.PropsWithChildren<
  {
    isActive: boolean;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>;

const ToggleButton: React.FC<ToggleButtonProps> = ({
  children,
  isActive,
  ...props
}) => (
  <Button
    variant="base"
    className={`text-white hover:text-white border border-white hover:bg-neutral-100 hover:bg-opacity-30
      font-medium text-sm py-2.5 text-center border-opacity-25
      ${
        isActive
          ? "bg-neutral-100 bg-opacity-50 text-neutral-700 rounded-sm"
          : "mx-2 "
      }`}
    {...props}
  >
    {children}
  </Button>
);

export default ToggleButton;
