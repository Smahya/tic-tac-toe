import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { MarkerX, MarkerO } from "./Svgs";
import cx from "classnames";
type Marker = "X" | "O";

export const PickMark = ({
  playerMarker,
  pickmarker,
}: {
  playerMarker: Marker;
  pickmarker: (marker: Marker) => void;
}) => {
  const navigate = useNavigate();

  function goToGame(playWith: "CPU" | "PLAYER") {
    navigate(`/game?playWith=${playWith}&playerMarker=${playerMarker}`);
  }
  return (
    <div className="grid gap-4 content-center">
      <div className="flex items-center justify-center gap-1">
        <MarkerX />
        <MarkerO />
      </div>
      <div className="grid gap-4 bg-semi-dark-navy rounded-lg p-6">
        <p className="heading-extra-small text-center">PICK PLAYER 1'S MARK</p>

        <PickPlayerButtons
          pickmarker={pickmarker}
          playerMarker={playerMarker}
        />
        <p className="text-silver text-center">REMEMBER : X GOES FIRST</p>
      </div>
      <div className="grid gap-4">
        <Button block onClick={() => goToGame("CPU")}>
          NEW GAME VS(CPU)
        </Button>
        <Button block variant="teal" onClick={() => goToGame("PLAYER")}>
          NEW GAME VS(PLAYER)
        </Button>
      </div>
    </div>
  );
};

const PickPlayerButtons = ({
  playerMarker,
  pickmarker,
}: {
  playerMarker: Marker;
  pickmarker: (marker: Marker) => void;
}) => {
  return (
    <div className="grid grid-cols-2 h-[72px] bg-dark-navy p-2 rounded-lg">
      <button
        type="button"
        className={cx("flex items-center justify-center rounded-lg", {
          "bg-silver": playerMarker === "X",
        })}
        onClick={() => pickmarker("X")}
      >
        <MarkerX fill={playerMarker === "X" ? "#1A2A33" : "#A8BFC9"} />
      </button>
      <button
        className={cx("flex items-center justify-center rounded-lg", {
          "bg-silver": playerMarker === "O",
        })}
        type="button"
        onClick={() => pickmarker("O")}
      >
        <MarkerO fill={playerMarker === "O" ? "#1A2A33" : "#A8BFC9"} />
      </button>
    </div>
  );
};
