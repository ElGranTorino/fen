type IPiece = 'r' | 'n' | 'b' | 'q' | 'k' | 'p' | 'R' | 'N' | 'B' | 'Q' | 'K' | 'P';

type IMoveTurn = 'b' | 'w';

interface ICastlingRights{
  long: boolean;
  short: boolean;
}

interface IGameState {
  board: string[][];
  castling: {
    white: ICastlingRights;
    black: ICastlingRights;
  };
  turn: 'b' | 'w';
  enPassant: null | string;
  movesWithoutCapture: number;
  upcomingMove: number;
}

class Fen {
  public static parse(expression: string): IGameState {
    if (!expression) {
      throw new Error("FEN string expression is required");
    }

    const [board, turn, castling, enPassant, movesWithoutCapture, upcomingMove]: string[] =
      expression.split(" ");
    const game: IGameState = {
      board: board
        .split("/")
        .map((row) => row.split("").map((cell) => (/\d/.test(cell) ? "" : cell))),
      castling: {
        white: {
          long: castling.includes("Q"),
          short: castling.includes("K"),
        },
        black: {
          long: castling.includes("q"),
          short: castling.includes("k"),
        },
      },
      turn: turn,
      enPassant: enPassant === "-" ? null : enPassant,
      movesWithoutCapture: Number(movesWithoutCapture),
      upcomingMove: Number(upcomingMove),
    };

    return game;
  }
}