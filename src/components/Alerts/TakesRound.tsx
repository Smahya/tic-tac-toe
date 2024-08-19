import { Marker } from "../../types/utils";
import { Button } from "../Button";
import { Popup } from "../Popup";
import { MarkerX, MarkerO } from "../Svgs";
import cx from "classnames";

export const TakesRound = ({
  winner,
  resetBoard,
  playerMarker,
}: {
  winner: Marker;
  resetBoard: () => void;
  playerMarker: Marker;
}) => {
  const themes = {
    X: {
      className: "!text-light-blue",
      size: 46,
    },
    O: {
      className: "!text-light-yellow",
      size: 46,
    },
  };
  return (
    <Popup>
      <div className="flex flex-col items-center gap-4 mt-8">
        <h4 className="text-silver text-2xl capitalize font-bold">
          {playerMarker === winner ? "YOU WON" : "OH NO YOU LOST THE ROUND"}
        </h4>
        <div className="flex items-center gap-4">
          <div>
            {winner === "X" ? (
              <MarkerX size={themes[winner].size} />
            ) : (
              <MarkerO size={themes[winner].size} />
            )}
          </div>
          <h2 className={cx("heading-lg", themes[winner].className)}>
            TAKES THE ROUND
          </h2>
        </div>
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
