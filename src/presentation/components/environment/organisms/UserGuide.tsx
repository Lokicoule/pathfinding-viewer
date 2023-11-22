import { Card } from "@ui/components/ui";

type UserGuideComponent = React.FC;

const UserGuide: UserGuideComponent = () => {
  return (
    <Card
      isBlurred
      className="rounded-lg w-full overflow-y-auto bg-opacity-40 overflow-y-auto bg-[#184d67]"
    >
      <Card.Header className="flex flex-col px-4 py-5 sm:p-6">
        <h1 className="text-lg font-semibold text-white text-center font-primary">
          Hint!
        </h1>
      </Card.Header>
      <Card.Body className="flex flex-col space-y-5 px-6 pb-6">
        <div className="flex flex-col space-y-6 justify-around text-white text-justify">
          <span className="flex flex-col space-y-2 ">
            <h2 className="text-md underline">Placing Walls:</h2>
            <p className="text-sm">Drag to place walls on the grid.</p>
          </span>
          <span className="flex flex-col space-y-2">
            <h2 className="text-md underline">Moving Start and End Points:</h2>
            <p className="text-sm">
              Click on either the start or end point, then move it to another
              cell.
            </p>
          </span>
          <span className="flex flex-col space-y-2">
            <h2 className="text-md underline">Swapping Start and End Nodes:</h2>
            <p className="text-sm">
              Click on the start or end node, then click on the opposite node to
              swap their positions.
            </p>
          </span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserGuide;
