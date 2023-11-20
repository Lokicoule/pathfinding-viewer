type SidebarContentProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement> & {
    position?: "left" | "right";
  }
>;
type SidebarContentComponent = React.FC<SidebarContentProps>;

const POSITION_LEFT_CLASS = "pl-4";
const POSITION_RIGHT_CLASS = "pr-4";

function factory(position: "left" | "right") {
  switch (position) {
    case "left":
      return POSITION_LEFT_CLASS;
    case "right":
      return POSITION_RIGHT_CLASS;
  }
}

const SidebarContent: SidebarContentComponent = ({
  children,
  className,
  position = "left",
  ...props
}) => {
  const positionClass = factory(position);

  return (
    <div
      className={`w-full flex mx-auto py-4 ${positionClass} ${className}`}
      {...props}
    >
      <div className="w-full flex flex-col items-center  md:justify-center space-y-3">
        {children}
      </div>
    </div>
  );
};

export default SidebarContent;
