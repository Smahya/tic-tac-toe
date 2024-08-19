import { Button } from "../Button";
import { Popup } from "../Popup";

export const GameTied = ({ resetBoard }: { resetBoard: () => void }) => {
  return (
    <Popup>
      <div className="grid place-content-center gap-4 mt-10">
        <h2 className="heading-lg">ROUND TIED</h2>
        <div className="flex gap-4">
          <Button size="md" variant="silver" onClick={resetBoard}>
            QUIT
          </Button>
          <Button size="md" variant="yellow" onClick={resetBoard}>
            NEXT ROUND
          </Button>
        </div>
      </div>
    </Popup>
  );
};
