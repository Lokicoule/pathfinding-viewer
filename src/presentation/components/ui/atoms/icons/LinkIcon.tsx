type LinkIconProps = React.SVGProps<SVGSVGElement>;
type LinkIconComponent = React.FC<LinkIconProps>;

const LinkIcon: LinkIconComponent = (props) => {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M19 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM5 6h14v12H5V6z"
      />
      <path
        fill="currentColor"
        d="M17.59 10.59L16 9l-6 6 6 6 1.59-1.59L13.17 15H21v-2h-7.83l4.42-4.41z"
      />
    </svg>
  );
};

export default LinkIcon;
