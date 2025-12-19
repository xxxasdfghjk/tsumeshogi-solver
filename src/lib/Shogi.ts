export type PieceType =
    | "玉"
    | "飛"
    | "角"
    | "金"
    | "銀"
    | "桂"
    | "香"
    | "歩"
    | "竜"
    | "馬"
    | "成銀"
    | "成桂"
    | "成香"
    | "と";
export type Player = "black" | "white"; // 先手・後手
export type HandPieceType = "飛" | "角" | "金" | "銀" | "桂" | "香" | "歩";
export type HandPiece = { [K in Extract<PieceType, HandPieceType>]: number };

export interface Piece {
    type: PieceType;
    player: Player;
}

export type Board = [
    [
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null
    ],
    [
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null
    ],
    [
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null
    ],
    [
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null
    ],
    [
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null
    ],
    [
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null
    ],
    [
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null
    ],
    [
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null
    ],
    [
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null,
        Piece | null
    ]
];

export const INITIAL_BOARD: Board = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
];

const copyBoard = (board: Board): Board => {
    const newBoard: Board = getNullBoard();
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            newBoard[i][j] = board[i][j];
        }
    }
    return newBoard;
};

const getNullBoard = (): Board => {
    return [
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
    ] satisfies Board;
};

export type Hand = {
    black: HandPiece;
    white: HandPiece;
};

/**
 * turnPlayerが詰んでいるかどうかを判定する
 * @param board
 * @param turnPlayer
 * @returns
 */
export const isCheckMate = (board: Board, turnPlayer: Player, hand: HandPieceType[]): boolean => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== null && board[i][j]!.player === turnPlayer) {
                const moves = getAvailableMoves(board, turnPlayer, [i, j], true);
                if (moves.length > 0) {
                    return false;
                }
            }
            if (board[i][j] === null) {
                const puts = getAvailablePuts(board, turnPlayer, [i, j], hand);
                if (puts.length > 0) {
                    return false;
                }
            }
        }
    }

    return true;
};

export const getAvailableMoves = (
    board: Board,
    player: Player,
    coordinate: [number, number],
    checkCheck: boolean = false,
    onlyCheck: boolean = false
) => {
    if (board[coordinate[0]][coordinate[1]] === null || board[coordinate[0]][coordinate[1]]!.player !== player) {
        return [];
    }
    const piece = board[coordinate[0]][coordinate[1]]?.type;
    const availableMoves: [number, number][] = [];

    switch (piece) {
        case "玉":
            availableMoves.push([coordinate[0] - 1, coordinate[1] - 1]);
            availableMoves.push([coordinate[0] - 1, coordinate[1]]);
            availableMoves.push([coordinate[0] - 1, coordinate[1] + 1]);
            availableMoves.push([coordinate[0], coordinate[1] - 1]);
            availableMoves.push([coordinate[0], coordinate[1] + 1]);
            availableMoves.push([coordinate[0] + 1, coordinate[1] - 1]);
            availableMoves.push([coordinate[0] + 1, coordinate[1]]);
            availableMoves.push([coordinate[0] + 1, coordinate[1] + 1]);
            // 王の移動ロジック
            break;
        case "竜":
        case "飛":
            // 左
            for (let i = coordinate[1] - 1; i >= 0; i--) {
                const y = coordinate[0];
                const x = i;
                if (board[y][x] === null) {
                    availableMoves.push([y, x]);
                } else {
                    if (board[y][x]!.player !== player) {
                        availableMoves.push([y, x]);
                    }
                    break;
                }
            }

            // 上
            for (let i = coordinate[0] - 1; i >= 0; i--) {
                const y = i;
                const x = coordinate[1];
                if (board[y][x] === null) {
                    availableMoves.push([y, x]);
                } else {
                    if (board[y][x]!.player !== player) {
                        availableMoves.push([y, x]);
                    }
                    break;
                }
            }
            // 下
            for (let i = coordinate[0] + 1; i <= 8; i++) {
                const y = i;
                const x = coordinate[1];
                if (board[y][x] === null) {
                    availableMoves.push([y, x]);
                } else {
                    if (board[y][x]!.player !== player) {
                        availableMoves.push([y, x]);
                    }
                    break;
                }
            }

            // 右
            for (let i = coordinate[1] + 1; i <= 8; i++) {
                const y = coordinate[0];
                const x = i;
                if (board[y][x] === null) {
                    availableMoves.push([y, x]);
                } else {
                    if (board[y][x]!.player !== player) {
                        availableMoves.push([y, x]);
                    }
                    break;
                }
            }
            if (piece === "竜") {
                availableMoves.push([coordinate[0] - 1, coordinate[1] - 1]);
                availableMoves.push([coordinate[0] - 1, coordinate[1] + 1]);
                availableMoves.push([coordinate[0] + 1, coordinate[1] - 1]);
                availableMoves.push([coordinate[0] + 1, coordinate[1] + 1]);
            }
            break;
        case "馬":
        case "角":
            // 左上
            for (let i = 1; ; i++) {
                const y = coordinate[0] - i;
                const x = coordinate[1] - i;
                if (y < 0 || x < 0) break;
                if (board[y][x] === null) {
                    availableMoves.push([y, x]);
                } else {
                    if (board[y][x]!.player !== player) {
                        availableMoves.push([y, x]);
                    }
                    break;
                }
            }
            // 右上
            for (let i = 1; ; i++) {
                const y = coordinate[0] - i;
                const x = coordinate[1] + i;
                if (y < 0 || x < 0 || y > 8 || x > 8) break;
                if (board[y][x] === null) {
                    availableMoves.push([y, x]);
                } else {
                    if (board[y][x]!.player !== player) {
                        availableMoves.push([y, x]);
                    }
                    break;
                }
            }

            // 左下
            for (let i = 1; ; i++) {
                const y = coordinate[0] + i;
                const x = coordinate[1] - i;
                if (y < 0 || x < 0 || y > 8 || x > 8) break;
                if (board[y][x] === null) {
                    availableMoves.push([y, x]);
                } else {
                    if (board[y][x]!.player !== player) {
                        availableMoves.push([y, x]);
                    }
                    break;
                }
            }
            // 右下
            for (let i = 1; ; i++) {
                const y = coordinate[0] + i;
                const x = coordinate[1] + i;
                if (y < 0 || x < 0 || y > 8 || x > 8) break;
                if (board[y][x] === null) {
                    availableMoves.push([y, x]);
                } else {
                    if (board[y][x]!.player !== player) {
                        availableMoves.push([y, x]);
                    }
                    break;
                }
            }
            if (piece === "馬") {
                availableMoves.push([coordinate[0], coordinate[1] - 1]);
                availableMoves.push([coordinate[0], coordinate[1] + 1]);
                availableMoves.push([coordinate[0] + 1, coordinate[1]]);
                availableMoves.push([coordinate[0] - 1, coordinate[1]]);
            }

            break;
        case "金":
        case "成桂":
        case "成香":
        case "と":
        case "成銀":
            if (player === "black") {
                availableMoves.push([coordinate[0] - 1, coordinate[1] - 1]);
                availableMoves.push([coordinate[0] - 1, coordinate[1] + 1]);
            } else {
                availableMoves.push([coordinate[0] + 1, coordinate[1] - 1]);
                availableMoves.push([coordinate[0] + 1, coordinate[1] + 1]);
            }
            availableMoves.push([coordinate[0] - 1, coordinate[1]]);
            availableMoves.push([coordinate[0] + 1, coordinate[1]]);
            availableMoves.push([coordinate[0], coordinate[1] - 1]);
            availableMoves.push([coordinate[0], coordinate[1] + 1]);
            break;
        case "銀":
            if (player === "black") {
                availableMoves.push([coordinate[0] - 1, coordinate[1]]);
            } else {
                availableMoves.push([coordinate[0] + 1, coordinate[1]]);
            }
            availableMoves.push([coordinate[0] - 1, coordinate[1] - 1]);
            availableMoves.push([coordinate[0] - 1, coordinate[1] + 1]);
            availableMoves.push([coordinate[0] + 1, coordinate[1] - 1]);
            availableMoves.push([coordinate[0] + 1, coordinate[1] + 1]);
            break;
        case "桂":
            if (player === "black") {
                availableMoves.push([coordinate[0] - 2, coordinate[1] - 1]);
                availableMoves.push([coordinate[0] - 2, coordinate[1] + 1]);
            } else {
                availableMoves.push([coordinate[0] + 2, coordinate[1] - 1]);
                availableMoves.push([coordinate[0] + 2, coordinate[1] + 1]);
            }
            break;
        case "香":
            if (player === "black") {
                for (let i = coordinate[0] - 1; i >= 0; i--) {
                    if (board[i][coordinate[1]] === null) {
                        availableMoves.push([i, coordinate[1]]);
                    } else {
                        if (board[i][coordinate[1]]?.player !== player) {
                            availableMoves.push([i, coordinate[1]]);
                        }
                        break;
                    }
                }
            } else {
                for (let i = coordinate[0] + 1; i <= 8; i++) {
                    if (board[i][coordinate[1]] === null) {
                        availableMoves.push([i, coordinate[1]]);
                    } else {
                        if (board[i][coordinate[1]]?.player !== player) {
                            availableMoves.push([i, coordinate[1]]);
                        }
                        break;
                    }
                }
            }
            break;
        case "歩":
            if (player === "black") {
                availableMoves.push([coordinate[0] - 1, coordinate[1]]);
            } else {
                availableMoves.push([coordinate[0] + 1, coordinate[1]]);
            }
            break;
        default:
            break;
    }

    return availableMoves
        .flatMap((coordinate) => {
            return getPromoteOption(piece!, player, coordinate).map((e) => ({ coordinate, type: e }));
        })
        .filter(({ coordinate: [y, x], type }) => {
            if (y < 0 || y > 8 || x < 0 || x > 8) {
                return false;
            } else if (board[y][x] !== null && board[y][x]!.player === player) {
                return false;
            }

            if (checkCheck === true) {
                const gameBoard = copyBoard(board);
                const movingPiece = { type: type.type, player };
                gameBoard[coordinate[0]][coordinate[1]] = null;
                gameBoard[y][x] = movingPiece;
                const oppo = player === "black" ? "white" : "black";
                // 相手の視点で王手状態になっている => 着手不能
                return !isCheck(gameBoard, oppo, false) && (!onlyCheck || isCheck(gameBoard, player, false));
            } else {
                if (onlyCheck) {
                    const gameBoard = copyBoard(board);
                    const movingPiece = gameBoard[coordinate[0]][coordinate[1]];
                    gameBoard[coordinate[0]][coordinate[1]] = null;
                    gameBoard[y][x] = movingPiece;
                    return isCheck(gameBoard, player, false);
                }
                return true;
            }
        });
};

export const getAvailablePuts = (
    board: Board,
    player: Player,
    coordinate: [number, number],
    hand: HandPieceType[],
    option?: { onlyCheck?: boolean }
): PieceType[] => {
    if (board[coordinate[0]][coordinate[1]] !== null) {
        return [];
    }
    const filteredHand = hand.filter((e) => {
        if ((player === "black" && coordinate[0] === 0) || (player === "white" && coordinate[0] === 8)) {
            return e !== "歩" && e !== "香" && e !== "桂";
        } else if ((player === "black" && coordinate[0] === 1) || (player === "white" && coordinate[0] === 7)) {
            return e !== "桂";
        } else {
            return true;
        }
    });
    return filteredHand.filter((e) => {
        const gameBoard = copyBoard(board);
        gameBoard[coordinate[0]][coordinate[1]] = { type: e, player };
        const oppo = player === "black" ? "white" : "black";
        // 相手の視点で王手状態になっている => 着手不能
        const onlyCheckCondition = option?.onlyCheck ? isCheck(gameBoard, player, false) : true;
        return !isCheck(gameBoard, oppo, false) && onlyCheckCondition;
    });
};

export const isCheck = (board: Board, turnPlayer: Player, recursive: boolean = true) => {
    const nullBoard = getNullBoard();
    let kingPosition: [number, number] | null = null;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== null && board[i][j]!.player === turnPlayer) {
                const moves = getAvailableMoves(board, turnPlayer, [i, j], recursive);
                for (const [y, x] of moves.map((e) => e.coordinate)) {
                    nullBoard[y][x] = { type: "玉", player: turnPlayer };
                }
            }
            if (board[i][j] !== null && board[i][j]!.type === "玉" && board[i][j]!.player !== turnPlayer) {
                kingPosition = [i, j];
            }
        }
    }
    if (kingPosition === null) return false;
    else {
        return nullBoard[kingPosition[0]][kingPosition[1]] !== null;
    }
};

export const printBoard = (board: Board) => {
    for (let i = 0; i < 9; i++) {
        const str = board[i].reduce((prev, cur) => prev + ` ${cur?.type ?? "＃"}`, "");
        console.log(str);
    }
};

export const solveTsumeshogi = (
    board: Board,
    turnPlayer: Player,
    hand: Hand,
    maxDepth: number,
    currentDepth: number = 0
): History[] | false => {
    const availableHand = Object.entries(hand[turnPlayer])
        .filter((e) => e[1] > 0)
        .map(([key]) => key) as HandPieceType[];
    const actions = getAvailableActions(board, turnPlayer, hand, turnPlayer === "black");

    if (turnPlayer === "white" && isCheckMate(board, turnPlayer, availableHand)) {
        console.log("checkMate!");
        printBoard(board);
        return [[{ from: [-1, -1], to: [-1, -1], pieceType: "玉" }]];
    }
    if (currentDepth > maxDepth) {
        return false;
    }
    console.log(currentDepth);
    printBoard(board);

    console.log(actions);

    let next: History[] | false = false;
    let lastHistory: History[] | null = null;

    for (const action of actions) {
        const newBoard = copyBoard(board);
        const newHand =
            action.from === "hand"
                ? turnPlayer === "black"
                    ? {
                          black: {
                              ...hand.black,
                              ...{
                                  [action.pieceType as HandPieceType]:
                                      hand.black[action.pieceType as HandPieceType] - 1,
                              },
                          },
                          white: hand.white,
                      }
                    : {
                          black: hand.black,
                          white: {
                              ...hand.white,
                              ...{
                                  [action.pieceType as HandPieceType]:
                                      hand.white[action.pieceType as HandPieceType] - 1,
                              },
                          },
                      }
                : { black: { ...hand.black }, white: { ...hand.white } };

        if (action.from === "hand") {
            newBoard[action.to[0]][action.to[1]] = { type: action.pieceType, player: turnPlayer };
        } else {
            newBoard[action.from[0]][action.from[1]] = null;
            if (newBoard[action.to[0]][action.to[1]] !== null) {
                const type = newBoard[action.to[0]][action.to[1]]!.type;
                newHand[turnPlayer][originMap[type] as HandPieceType] += 1;
            }
            newBoard[action.to[0]][action.to[1]] = { type: action.pieceType, player: turnPlayer };
        }

        if (turnPlayer === "black" && !isCheck(newBoard, turnPlayer, false)) {
            continue;
        }
        if (turnPlayer === "black") {
            next = solveTsumeshogi(newBoard, "white", newHand, maxDepth, currentDepth + 1);
            if (next !== false) {
                if (lastHistory === null) {
                    lastHistory = [];
                }
                const newHistory = next.map((e) => [action, ...e]) as History[];
                lastHistory = [...lastHistory, ...newHistory];
            }
        } else {
            next = solveTsumeshogi(newBoard, "black", newHand, maxDepth, currentDepth + 1);

            if (next === false) {
                console.log("falseddddddddddd");
                console.log(action);
                printBoard(board);
                return false;
            }
            if (lastHistory === null) {
                lastHistory = [];
            }
            const newHistory = next.map((e) => [action, ...e]) as History[];
            lastHistory = [...lastHistory, ...newHistory];
        }
    }
    console.log("lastHistory---");
    console.log(lastHistory);
    if (lastHistory === null) return false;
    return lastHistory;
};

export type Action = {
    from: [number, number] | "hand";
    to: [number, number];
    pieceType: PieceType;
    promoted?: boolean;
};
export type History = Action[];

export const getAvailableActions = (board: Board, player: Player, hand: Hand, onlyCheck: boolean = false) => {
    const availableHand = Object.entries(hand[player])
        .filter((e) => e[1] > 0)
        .map(([key]) => key) as HandPieceType[];
    const actions: Action[] = [];

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== null && board[i][j]!.player === player) {
                const moves = getAvailableMoves(board, player, [i, j], true, onlyCheck);

                actions.push(
                    ...moves.map(({ type, coordinate }) => ({
                        from: [i, j] as [number, number],
                        to: coordinate as [number, number],
                        pieceType: type.type,
                        promoted: type.promoted,
                    }))
                );
            }
            if (board[i][j] === null) {
                const puts = getAvailablePuts(board, player, [i, j], availableHand, { onlyCheck: onlyCheck });
                actions.push(
                    ...puts.map((pieceType) => ({
                        from: "hand" as const,
                        to: [i, j] as [number, number],
                        pieceType: pieceType,
                    }))
                );
            }
        }
    }
    return actions;
};

export const PIECE_NAMES: { type: PieceType; promoted?: boolean }[] = [
    { type: "玉", promoted: false },
    { type: "飛", promoted: false },
    { type: "角", promoted: false },
    { type: "金", promoted: false },
    { type: "銀", promoted: false },
    { type: "桂", promoted: false },
    { type: "香", promoted: false },
    { type: "歩", promoted: false },
    { type: "竜", promoted: false },
    { type: "馬", promoted: true },
    { type: "成銀", promoted: true },
    { type: "成桂", promoted: true },
    { type: "成香", promoted: true },
    { type: "と", promoted: true },
];
const originMap = {
    玉: "玉",
    飛: "飛",
    角: "角",
    金: "金",
    銀: "銀",
    桂: "桂",
    香: "香",
    歩: "歩",
    竜: "飛",
    馬: "角",
    成銀: "銀",
    成桂: "桂",
    成香: "香",
    と: "歩",
};
type PieceTypeWithPromoted = { type: PieceType; promoted: boolean };
export const getPromoteOption = (
    type: PieceType,
    player: Player,
    coordinates: [number, number]
): PieceTypeWithPromoted[] => {
    switch (type) {
        case "桂":
            if (player === "black" && coordinates[0] === 2) {
                return [
                    { type: "成桂", promoted: true },
                    { type: "桂", promoted: false },
                ];
            } else if (player === "black" && coordinates[0] <= 1) {
                return [{ type: "成桂", promoted: true }];
            } else if (player === "white" && coordinates[0] === 6) {
                return [
                    { type: "成桂", promoted: true },
                    { type: "桂", promoted: false },
                ];
            } else if (player === "white" && coordinates[0] >= 7) {
                return [{ type: "成桂", promoted: true }];
            } else {
                return [{ type: "桂", promoted: false }];
            }
        case "歩":
            if (player === "black" && coordinates[0] === 0) {
                return [{ type: "と", promoted: true }];
            } else if (player === "black" && coordinates[0] <= 2) {
                return [
                    { type: "と", promoted: true },
                    { type: "歩", promoted: false },
                ];
            } else if (player === "white" && coordinates[0] === 8) {
                return [{ type: "と", promoted: true }];
            } else if (player === "white" && coordinates[0] >= 6) {
                return [
                    { type: "と", promoted: true },
                    { type: "歩", promoted: false },
                ];
            } else {
                return [{ type: "歩", promoted: false }];
            }
            break;
        case "香":
            if (player === "black" && coordinates[0] === 0) {
                return [{ type: "成香", promoted: true }];
            } else if (player === "black" && coordinates[0] <= 2) {
                return [
                    { type: "成香", promoted: true },
                    { type: "香", promoted: false },
                ];
            } else if (player === "white" && coordinates[0] === 8) {
                return [{ type: "成香", promoted: true }];
            } else if (player === "white" && coordinates[0] >= 6) {
                return [
                    { type: "成香", promoted: true },
                    { type: "香", promoted: false },
                ];
            } else {
                return [{ type: "香", promoted: false }];
            }
        case "角":
            if (player === "black" && coordinates[0] <= 2) {
                return [
                    { type: "馬", promoted: true },
                    { type: "角", promoted: false },
                ];
            } else if (player === "white" && coordinates[0] >= 6) {
                return [
                    { type: "馬", promoted: true },
                    { type: "角", promoted: false },
                ];
            } else {
                return [{ type: "角", promoted: false }];
            }
        case "飛":
            if (player === "black" && coordinates[0] <= 2) {
                return [
                    { type: "竜", promoted: true },
                    { type: "飛", promoted: false },
                ];
            } else if (player === "white" && coordinates[0] >= 6) {
                return [
                    { type: "竜", promoted: true },
                    { type: "飛", promoted: false },
                ];
            } else {
                return [{ type: "飛", promoted: false }];
            }

            break;
        case "銀":
            if (player === "black" && coordinates[0] <= 2) {
                return [
                    { type: "成銀", promoted: true },
                    { type: "銀", promoted: false },
                ];
            } else if (player === "white" && coordinates[0] >= 6) {
                return [
                    { type: "成銀", promoted: true },
                    { type: "銀", promoted: false },
                ];
            } else {
                return [{ type: "銀", promoted: false }];
            }
        default:
            return [{ type, promoted: false }];
    }
};

export const convertKanji = (num: number) => {
    switch (num) {
        case 1:
            return "一";
        case 2:
            return "二";
        case 3:
            return "三";
        case 4:
            return "四";
        case 5:
            return "五";
        case 6:
            return "六";
        case 7:
            return "七";
        case 8:
            return "八";
        case 9:
            return "九";
        default:
            return "エラー";
    }
};

export const convertHistoryToSeries = (history: History): string[] => {
    const res: string[] = [];
    for (let i = 0; i < history.length; i++) {
        if (history[i].to[0] < 0) {
            continue;
        }
        if (i != 0 && history[i - 1].to[0] === history[i].to[0] && history[i - 1].to[1] === history[i].to[1]) {
            res.push(`同${history[i].pieceType}`);
        } else {
            res.push(
                `${9 - history[i].to[1]}${convertKanji(history[i].to[0] + 1)}${
                    history[i].promoted ? originMap[history[i].pieceType] : history[i].pieceType
                }${history[i].promoted ? "成" : ""}`
            );
        }
    }
    return res;
};
