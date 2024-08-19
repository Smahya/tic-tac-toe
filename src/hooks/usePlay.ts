import React, { Dispatch, useCallback } from "react";
import { Action, Marker, State } from "../types/utils";
import { getDeepCopy } from "../utils/helpers";
import { getWinner } from "../store/game-state";

export const usePlay = (
  state: State,
  dispatch: Dispatch<Action>,
  playerMarker: Marker,
  playWith: string
) => {
  const boardMap = React.useMemo(() => {
    const stateBoardMap: Record<string, Marker | 0> = {};
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        stateBoardMap[`${i},${j}`] = state.boards[i][j] as Marker | 0;
      }
    }
    return stateBoardMap;
  }, [state.boards]);

  const [remainingCellsArr, remainingCells] = React.useMemo(() => {
    const cells: string[] = Object.entries(boardMap)
      .filter(([, cell]) => cell === 0)
      .map(([key]) => key);
    return [cells, cells.length];
  }, [boardMap]);

  function resetBoard() {
    dispatch({ type: "RESET_BOARD" });
  }
  const updateScore = React.useCallback(
    (marker: Marker | "T") => {
      dispatch({ type: "UPDATE_SCORE", payload: { marker, playOver: true } });
    },
    [dispatch]
  );

  function playMove(
    board: State["boards"],
    coordinate: string,
    marker: Marker
  ) {
    const [row, col] = coordinate.split(",");
    board[+row][+col] = marker;
    return board;
  }

  const dispatchPlay = useCallback(
    (row: number, col: number, playerMarker: Marker) => {
      if (state.playOver) return;

      dispatch({
        type: "UPDATE_BOARD",
        payload: { row, col, value: playerMarker },
      });
    },
    [dispatch, state]
  );

  const tryPlayBestMove = useCallback(
    (
      playerMarker: Marker,
      activePlayerMarker: Marker,
      playedInitial = false
    ) => {
      let played = playedInitial;
      Object.entries(boardMap).forEach(([key, value]) => {
        if (played) return;
        if (value !== 0) return;

        const [r, c] = key.split(",");
        const mockBoard = getDeepCopy(state.boards);
        const mockBoardWithPlayerMarker = playMove(
          mockBoard,
          key,
          playerMarker
        );

        const isPlayerWin = getWinner(mockBoardWithPlayerMarker);

        if (isPlayerWin === playerMarker) {
          dispatchPlay(+r, +c, activePlayerMarker);
          played = true;
        }
      });
      return played;
    },
    [boardMap, state.boards, dispatchPlay]
  );

  // CPU PLAY LOGIC START
  React.useEffect(() => {
    let timeout: number;
    const cpuMarker = playerMarker === "X" ? "O" : "X";

    if (playWith === "CPU" && state.whoseTurn === cpuMarker) {
      timeout = setTimeout(() => {
        let played = false;
        played = tryPlayBestMove(cpuMarker, cpuMarker);
        played = tryPlayBestMove(playerMarker, cpuMarker, played);

        if (!played && remainingCells > 0) {
          const coordinates = remainingCellsArr;
          const randomKey =
            coordinates[Math.floor(Math.random() * coordinates.length)];
          const [r, c] = randomKey.split(",");
          dispatchPlay(+r, +c, cpuMarker);
        }
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [
    state.whoseTurn,
    playWith,
    playerMarker,
    state.boards,
    boardMap,
    tryPlayBestMove,
    dispatchPlay,
    remainingCells,
    remainingCellsArr,
  ]);
  // CPU PLAY LOGIC END

  // COMPUTED
  const isTie = React.useMemo(() => {
    const tied = remainingCells === 0 && !getWinner(state.boards);
    if (tied) {
      updateScore("T");
    }
    return tied;
  }, [remainingCells, state.boards, updateScore]);

  return {
    boardMap,
    isTie,
    updateScore,
    dispatchPlay,
    resetBoard,
  };
};
