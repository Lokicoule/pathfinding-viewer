type StopIconProps = React.SVGProps<SVGSVGElement>;
type StopIconComponent = React.FC<StopIconProps>;

const StopIcon: StopIconComponent = (props) => {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M6 6h12v12H6z" />
    </svg>
  );
};

export default StopIcon;
