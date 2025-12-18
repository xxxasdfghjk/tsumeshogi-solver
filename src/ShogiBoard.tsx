import React, { useState } from "react";
import type { Board, Player, Piece, PIECE_NAMES, PieceType } from "./lib/Shogi";

const TsumeShogiBoard: React.FC = () => {
    const [board, setBoard] = useState<Board>(
        Array(9)
            .fill(null)
            .map(() => Array(9).fill(null))
    );
    const [contextMenu, setContextMenu] = useState<{
        x: number;
        y: number;
        row: number;
        col: number;
    } | null>(null);

    const handleCellRightClick = (e: React.MouseEvent, row: number, col: number) => {
        e.preventDefault();
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            row,
            col,
        });
    };

    const handlePlacePiece = (type: PieceType, player: Player) => {
        if (!contextMenu) return;

        const newBoard = board.map((row) => [...row]);
        newBoard[contextMenu.row][contextMenu.col] = { type, player };
        setBoard(newBoard);
        setContextMenu(null);
    };

    const handleRemovePiece = () => {
        if (!contextMenu) return;

        const newBoard = board.map((row) => [...row]);
        newBoard[contextMenu.row][contextMenu.col] = null;
        setBoard(newBoard);
        setContextMenu(null);
    };

    const handleClickOutside = () => {
        setContextMenu(null);
    };

    const renderPiece = (piece: Piece | null) => {
        if (!piece) return null;

        return (
            <div
                className={`absolute inset-0 flex items-center justify-center text-2xl font-bold ${
                    piece.player === "black" ? "text-gray-900" : "text-red-600"
                }`}
                style={{
                    transform: piece.player === "white" ? "rotate(180deg)" : "none",
                }}
            >
                {piece.type}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 mx-auto" onClick={handleClickOutside}>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">詰将棋 盤面入力</h1>

                <div className="flex justify-center mb-4">
                    <div className="bg-amber-100 p-4 rounded-lg shadow-lg">
                        <div className="flex mb-2">
                            {[9, 8, 7, 6, 5, 4, 3, 2, 1].map((num) => (
                                <div
                                    key={num}
                                    className="w-14 h-8 flex items-center justify-center text-sm font-semibold"
                                >
                                    {num}
                                </div>
                            ))}
                        </div>

                        <div className="flex">
                            <div className="flex flex-col mr-2">
                                {["一", "二", "三", "四", "五", "六", "七", "八", "九"].map((num) => (
                                    <div
                                        key={num}
                                        className="w-8 h-14 flex items-center justify-center text-sm font-semibold"
                                    >
                                        {num}
                                    </div>
                                ))}
                            </div>

                            <div className="inline-block border-2 border-gray-800">
                                {board.map((row, rowIndex) => (
                                    <div key={rowIndex} className="flex">
                                        {row.map((piece, colIndex) => (
                                            <div
                                                key={`${rowIndex}-${colIndex}`}
                                                className="w-14 h-14 border border-gray-600 bg-amber-50 relative cursor-pointer hover:bg-amber-100"
                                                onContextMenu={(e) => handleCellRightClick(e, rowIndex, colIndex)}
                                            >
                                                {renderPiece(piece)}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center text-sm text-gray-600">マス目を右クリックして駒を配置してください</div>
            </div>

            {contextMenu && (
                <div
                    className="fixed bg-white border border-gray-300 rounded-lg shadow-xl z-50 py-2"
                    style={{
                        left: contextMenu.x,
                        top: contextMenu.y,
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">駒を選択</div>

                    <div className="px-2 py-1">
                        <div className="text-xs font-semibold text-gray-600 px-2 py-1">先手（黒）</div>
                        <div className="grid grid-cols-2 gap-1">
                            {PIECE_NAMES.map((piece) => (
                                <button
                                    key={`black-${piece.type}`}
                                    className="px-3 py-2 text-sm hover:bg-gray-100 rounded text-left"
                                    onClick={() => handlePlacePiece(piece.type, "black")}
                                >
                                    {piece.type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="px-2 py-1">
                        <div className="text-xs font-semibold text-gray-600 px-2 py-1">後手（赤）</div>
                        <div className="grid grid-cols-2 gap-1">
                            {PIECE_NAMES.map((piece) => (
                                <button
                                    key={`white-${piece.type}`}
                                    className="px-3 py-2 text-sm hover:bg-gray-100 rounded text-left text-red-600"
                                    onClick={() => handlePlacePiece(piece.type, "white")}
                                >
                                    {piece.type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="border-t mt-2 pt-2 px-2">
                        <button
                            className="w-full px-3 py-2 text-sm hover:bg-gray-100 rounded text-left text-gray-700"
                            onClick={handleRemovePiece}
                        >
                            駒を削除
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TsumeShogiBoard;
