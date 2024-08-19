import React from "react";
import { reducerFn } from "../store/game-state";
import { useSearchParams } from "react-router-dom";
import { Marker, PlayerType, State } from "../types/utils";

export const useGameState = () => {
  const [params] = useSearchParams();

  const computedInitialState = React.useMemo(() => {
    return {
      ...initialState,
      opponent: params.get("playWith") as PlayerType,
    } as State;
  }, [params]);
  const [state, dispatch] = React.useReducer(reducerFn, computedInitialState);

  // PARAMS FROM FIRST PAGE START
  const playerMarker = React.useMemo(() => {
    return params.get("playerMarker") as Marker;
  }, [params]); // playerMarker can be "X" or "O"

  const playWith = React.useMemo(() => {
    return params.get("playWith") as PlayerType;
  }, [params]); // playWith can be "CPU" or "PLAYER"
  // PARAMS FROM FIRST PAGE END

  return {
    state,
    playerMarker,
    playWith,
    dispatch,
  };
};

export const initialState = {
  whoseTurn: "X" as Marker,
  boards: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  scores: { X: 0, O: 0, T: 0 },
  playOver: false,
  gameOver: false,
  isTie: false,
  roundWinner: null,
  restart: false,
};
