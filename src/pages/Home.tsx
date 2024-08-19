import React from "react";
import { PickMark } from "../components/PickMark";

type Marker = "X" | "O";
export const Home = () => {
  const [playerMarker, setMarker] = React.useState<Marker>("X");

  return (
    <div className="page-wrapper">
      <PickMark
        playerMarker={playerMarker}
        pickmarker={(marker: Marker) => setMarker(marker)}
      />
    </div>
  );
};
