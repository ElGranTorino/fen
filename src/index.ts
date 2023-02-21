type IPiece = 'r' | 'n' | 'b' | 'q' | 'k' | 'p' | 'R' | 'N' | 'B' | 'Q' | 'K' | 'P' | string;

interface ICastlingRights{
  long: boolean;
  short: boolean;
}

interface IGameState {
  board: Array<Array<string>>;
  castling: {
    white: ICastlingRights;
    black: ICastlingRights;
  };
  turn: string;
  enPassant: null | string;
  movesWithoutCapture: number;
  upcomingMove: number;
}

class Fen {
  public static parse(expression: string): IGameState {
    if (!expression) {
      throw new Error("FEN string expression is required");
    }

    const [
      board, 
      turn, 
      castling, 
      enPassant, 
      movesWithoutCapture, 
      upcomingMove
    ] = expression.split(" ");

    const game: IGameState = {
      board: board
        .split("/")
        .map((row: string) => row.split("").map((cell): IPiece => (/\d/.test(cell) ? "" : cell))),
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

export default Fen