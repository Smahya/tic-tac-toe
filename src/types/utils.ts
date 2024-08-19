export type Marker = "X" | "O";
export type PlayerType = "CPU" | "PLAYER";

export type Action =
  | { type: "CHANGE_TURN"; payload: Marker }
  | {
      type: "UPDATE_SCORE";
      payload: { marker: Marker | "T"; playOver: boolean };
    }
  | {
      type: "UPDATE_BOARD";
      payload: { row: number; col: number; value: string };
    }
  | { type: "RESET_BOARD"; payload: Marker }
  | { type: "RESTART_GAME"; payload: Marker };

export type State = {
  whoseTurn: Marker;
  boards: (string | number)[][];
  scores: { X: number; O: number; T: number };
  opponent: PlayerType;
  playOver: boolean;
  gameOver: boolean;
  isTie: boolean;
  roundWinner: Marker | null;
  restart: boolean;
};
