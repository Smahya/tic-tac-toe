/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../components/Button";
import { MarkerX, MarkerO, Redo } from "../components/Svgs";
import { Marker, PlayerType, State } from "../types/utils";
import { Card } from "../components/Card";
import { useGameState } from "../hooks/useGameState";
import { usePlay } from "../hooks/usePlay";
import { TakesRound } from "../components/Alerts/TakesRound";
import { GameTied } from "../components/Alerts/Tie";
import { RestartGame } from "../components/Alerts/Restart";
import React from "react";

export const Game = () => {
  const [restart, setRestart] = React.useState(false);
  const { state, playerMarker, playWith, dispatch } = useGameState();
  const { dispatchPlay, resetBoard, isTie } = usePlay(
    state,
    dispatch,
    playerMarker,
    playWith
  );

  return (
    <div className="page-wrapper gap-5">
      <TopControls whoseTurn={state.whoseTurn} setRestart={setRestart} />
      {/* BOARD START */}
      <div className="grid content-start gap-5">
        {state?.boards.map((board: any, row: number) => {
          return (
            <div key={row} className="grid grid-cols-3 gap-5">
              {board.map((boardItem: Marker | number, column: number) => {
                return (
                  <button
                    disabled={boardItem !== 0}
                    onClick={() => dispatchPlay(row, column, state.whoseTurn)}
                    key={column}
                    className="flex items-center justify-center bg-semi-dark-navy shadow-[0px_8px_0_0_#10212A] py-4 px-6 rounded-lg w-[140px] h-[140px]"
                  >
                    {boardItem === "X" && <MarkerX size={64} />}
                    {boardItem === "O" && <MarkerO size={64} />}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
      {/* BOARD END */}

      <BottomControls
        playerMarker={playerMarker}
        playWith={playWith}
        state={state}
      />
      {isTie ? <GameTied resetBoard={resetBoard} /> : null}
      {state.roundWinner ? (
        <TakesRound
          playerMarker={playerMarker}
          winner={state.roundWinner}
          resetBoard={resetBoard}
        />
      ) : null}
      {restart ? (
        <RestartGame cancel={() => setRestart(false)} resetBoard={resetBoard} />
      ) : null}
    </div>
  );
};

const TopControls = ({
  whoseTurn,
  setRestart,
}: {
  whoseTurn: Marker;
  setRestart: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-center gap-1">
        <MarkerX />
        <MarkerO />
      </div>
      <div className="flex items-center justify-center gap-3 bg-semi-dark-navy shadow-[0px_4px_0_0_#10212A] h-[52px] rounded-md w-[140px] -ml-3">
        {whoseTurn === "X" ? (
          <MarkerX fill={"#A8BFC9"} size={20} />
        ) : (
          <MarkerO fill={"#A8BFC9"} size={20} />
        )}

        <p className="heading-extra-small text-silver">TURN</p>
      </div>
      <Button variant="silver" size="md" onClick={() => setRestart(true)}>
        <Redo />
      </Button>
    </div>
  );
};

const BottomControls = ({
  playerMarker,
  playWith,
  state,
}: {
  playerMarker: Marker;
  playWith: PlayerType;
  state: State;
}) => {
  return (
    <div className="grid grid-cols-3 gap-5">
      <Card type="teal" className="min-h-[72px]">
        <p className="text-center text-dark-navy">{playerMarker}(YOU)</p>
        <p className="text-lg text-center text-dark-navy font-bold">
          {state.scores[playerMarker]}
        </p>
      </Card>
      <Card type="silver">
        <p className="text-center text-dark-navy">TIES</p>
        <p className="text-lg text-center text-dark-navy font-bold">
          {state.scores["T"]}
        </p>
      </Card>
      <Card type="yellow">
        <p className="text-center text-dark-navy">
          {playerMarker === "X" ? "O" : "X"}({playWith})
        </p>
        <p className="text-lg text-center text-dark-navy font-bold">
          {state.scores[playerMarker === "X" ? "O" : "X"]}
        </p>
      </Card>
    </div>
  );
};
