import { Card } from "@ui/components/ui";

type UserGuideComponent = React.FC;

const UserGuide: UserGuideComponent = () => {
  return (
    <Card
      isBlurred
      className="rounded-lg w-full overflow-y-auto bg-opacity-40 overflow-y-auto bg-[#184d67]"
    >
      <Card.Body className="flex flex-col space-y-4 px-4 py-5 sm:p-6 ">
        <div className="flex flex-col space-y-2 justify-between text-white">
          <h2 className="text-md underline">Placing Walls:</h2>
          <p className="text-sm">Drag to place walls on the grid.</p>

          <h2 className="text-md underline">Moving Start and End Points:</h2>
          <p className="text-sm">
            Click on either the start or end point, then move it to another
            cell.
          </p>

          <h2 className="text-md underline">Swapping Start and End Nodes:</h2>
          <p className="text-sm">
            Click on the start or end node, then click on the opposite node to
            swap their positions.
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserGuide;
