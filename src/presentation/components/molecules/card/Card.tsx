type CardProps = React.PropsWithChildren<
  {
    isBlurred?: boolean;
  } & React.HTMLAttributes<HTMLDivElement>
>;

type CardSectionProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>;
type CardSectionComponent = React.FC<CardSectionProps>;

type CardComponent = React.FC<CardProps> & {
  Header: CardSectionComponent;
  Body: CardSectionComponent;
  Footer: CardSectionComponent;
};

const CardHeader: CardSectionComponent = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
};

const CardBody: CardSectionComponent = ({ children, className, ...props }) => {
  return (
    <div className={`${className} flex-grow`} {...props}>
      {children}
    </div>
  );
};

const CardFooter: CardSectionComponent = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
};

const Card: CardComponent = ({ isBlurred, children, ...props }) => {
  return (
    <div
      className={`relative shadow-lg overflow-hidden flex flex-col ${
        isBlurred ? "blur-bg" : ""
      } ${props.className || ""}`}
    >
      <div className="relative flex flex-col">{children}</div>
    </div>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
