import { initialState } from "../hooks/useGameState";
import { Action, State } from "../types/utils";

export function getWinner(boards: State["boards"]) {
  const winArrays = [
    ["0,0", "0,1", "0,2"],
    ["1,0", "1,1", "1,2"],
    ["2,0", "2,1", "2,2"],
    ["0,0", "1,1", "2,2"],
    ["0,2", "1,1", "2,0"],
    ["0,0", "1,0", "2,0"],
    ["0,1", "1,1", "2,1"],
    ["0,2", "1,2", "2,2"],
  ];
  for (let i = 0; i < winArrays.length; i++) {
    const winArray = winArrays[i];
    const winX = getWin(winArray, boards, "X");
    const winO = getWin(winArray, boards, "O");

    if (winX) return "X";
    if (winO) return "O";
  }

  return null;
}

function getWin(
  winArray: string[],
  boards: State["boards"],
  player: "X" | "O"
) {
  for (let j = 0; j < winArray.length; j++) {
    const row = winArray[j].split(",")[0];
    const col = winArray[j].split(",")[1];
    const value = boards[+row][+col];
    if (value !== player) {
      return false;
    }
  }
  return true;
}

export const reducerFn = (state: State, action: Action): State => {
  let newBoards: State["boards"];
  let winner: "X" | "O" | null;
  switch (action.type) {
    case "CHANGE_TURN":
      return {
        ...state,
        whoseTurn: action.payload,
      };
    case "UPDATE_SCORE":
      return {
        ...state,
        scores: {
          ...state.scores,
          [action.payload.marker]: state.scores[action.payload.marker] + 1,
        },
        playOver: action.payload.playOver,
      };
    case "RESET_BOARD":
      return {
        ...state,
        boards: state.boards.map((row) => row.map(() => 0)),
        roundWinner: null,
        playOver: false,
        gameOver: false,
        isTie: false,
        whoseTurn: action.payload,
      };
    case "RESTART_GAME":
      return {
        ...state,
        ...initialState,
        whoseTurn: action.payload,
      };
    case "UPDATE_BOARD":
      newBoards = state.boards.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (
            rowIndex === action.payload.row &&
            colIndex === action.payload.col
          ) {
            return action.payload.value;
          }
          return cell;
        })
      );
      winner = getWinner(newBoards);
      if (winner) {
        return {
          ...state,
          boards: newBoards,
          scores: {
            ...state.scores,
            [winner]: state.scores[winner] + 1,
          },
          playOver: true,
          roundWinner: winner,
        };
      }

      return {
        ...state,
        boards: newBoards,
        whoseTurn: state.whoseTurn === "X" ? "O" : "X",
      };
    default:
      return state;
  }
};
