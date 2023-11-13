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

const CardBody: CardSectionComponent = ({ children, ...props }) => {
  return <div className={`px-4 py-5 sm:p-6 ${props}`}>{children}</div>;
};

const CardHeader: CardSectionComponent = ({ children, ...props }) => {
  return <div className={`px-4 py-5 sm:p-6 ${props}`}>{children}</div>;
};

const CardFooter: CardSectionComponent = ({ children, ...props }) => {
  return <div className={`px-4 py-5 sm:p-6 ${props}`}>{children}</div>;
};

const Card: CardComponent = ({ isBlurred, children, ...props }) => {
  return (
    <div
      className={`relative rounded-b-lg shadow-lg overflow-hidden ${
        isBlurred ? "blur-bg" : ""
      } ${props.className || ""}`}
    >
      <div className="relative">{children}</div>
    </div>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
