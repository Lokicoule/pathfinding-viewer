type TooltipProps = React.PropsWithChildren<{
  text: string;
}>;
type TooltipComponent = React.FC<TooltipProps>;

const Tooltip: TooltipComponent = ({ text, children }) => {
  return (
    <div className="group flex relative">
      {children}
      <span
        className="group-hover:opacity-100 transition-opacity bg-gray-800 px-4 py-2 text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto w-max whitespace-nowrap"
      >
        {text}
      </span>
    </div>
  );
};

export default Tooltip;
