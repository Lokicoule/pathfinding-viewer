import { Children, cloneElement } from "react";
import { concat } from "../../../utils/string";

type TooltipProps = React.HTMLAttributes<HTMLDivElement> & {
  text: string;
};

type TooltipComponent = React.FC<TooltipProps>;

const Tooltip: TooltipComponent = ({ text, children, ...props }) => {
  const child = Children.only(children) as React.ReactElement;

  return cloneElement(child, {
    className: concat("tooltip-container", child.props.className),
    ...props,
    children: [
      child.props.children,
      <span key="tooltip" className="tooltip">
        {text}
      </span>,
    ],
  });
};

export default Tooltip;
