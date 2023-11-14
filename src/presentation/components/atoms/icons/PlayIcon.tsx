import React from "react";

type PlayIconProps = React.SVGProps<SVGSVGElement>;
type PlayIconComponent = React.FC<PlayIconProps>;

const PlayIcon: PlayIconComponent = (props) => {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M8 5v14l11-7z" />
    </svg>
  );
};

export default PlayIcon;
