type PauseIconProps = React.SVGProps<SVGSVGElement>;
type PauseIconComponent = React.FC<PauseIconProps>;

const PauseIcon: PauseIconComponent = (props) => {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M6 4h4v16H6zm8 0h4v16h-4z" />
    </svg>
  );
};

export default PauseIcon;
