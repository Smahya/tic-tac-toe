import { Button } from "../Button";
import { Popup } from "../Popup";

export const RestartGame = ({
  resetBoard,
  cancel,
}: {
  resetBoard: () => void;
  cancel: () => void;
}) => {
  return (
    <Popup>
      <div className="grid place-content-center gap-4 mt-10">
        <h2 className="heading-lg">RESTART GAME?</h2>
        <div className="flex gap-4">
          <Button size="md" variant="silver" onClick={cancel}>
            NO CANCEL
          </Button>
          <Button
            size="md"
            variant="yellow"
            onClick={() => {
              resetBoard();
              cancel();
            }}
          >
            YES, RESTART
          </Button>
        </div>
      </div>
    </Popup>
  );
};
