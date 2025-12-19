import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getAvailableActions, isCheck, isCheckMate, type Board, type Hand, type Piece } from "../lib/Shogi";

const OA = { type: "歩", player: "white" } satisfies Piece;
const OK = { type: "玉", player: "white" } satisfies Piece;

const OG = { type: "金", player: "white" } satisfies Piece;

const MKing = { type: "玉", player: "black" } satisfies Piece;

const MR = { type: "竜", player: "black" } satisfies Piece;
const MC = { type: "香", player: "black" } satisfies Piece;

const MG = { type: "金", player: "black" } satisfies Piece;
const MA = { type: "歩", player: "black" } satisfies Piece;
const MN = { type: "桂", player: "white" } satisfies Piece;

const MH = { type: "飛", player: "black" } satisfies Piece;
const OH = { type: "飛", player: "white" } satisfies Piece;
const EK = { type: "角", player: "white" } satisfies Piece;
const MK = { type: "角", player: "black" } satisfies Piece;
const hand = {
    black: { 桂: 0, 飛: 0, 角: 0, 金: 0, 銀: 0, 香: 0, 歩: 0 },
    white: { 桂: 0, 飛: 0, 角: 0, 金: 0, 銀: 0, 香: 0, 歩: 0 },
} satisfies Hand;
describe("SolverTest", () => {
    beforeAll(() => {});

    afterAll(() => {});

    it("王手チェック - TRUE 1", () => {
        const expectBoard = [
            [null, OK, null, null, null, null, null, null, null],
            [null, MH, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
        ] satisfies Board;
        const res = isCheck(expectBoard, "black", false);
        expect(res).toBe(true);
    });

    it("王手チェック - TRUE 2", () => {
        const expectBoard = [
            [null, OK, null, null, null, null, null, null, null],
            [null, null, MK, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
        ] satisfies Board;
        const res = isCheck(expectBoard, "black", false);
        expect(res).toBe(true);
    });

    it("王手チェック - FALSE 1", () => {
        const expectBoard = [
            [null, OK, null, null, null, null, null, null, null],
            [null, MK, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
        ] satisfies Board;
        const res = isCheck(expectBoard, "black", false);
        expect(res).toBe(false);
    });

    it("王手チェック - FALSE 2", () => {
        const expectBoard = [
            [null, null, MH, null, null, null, null, null, null],
            [null, MK, null, null, null, null, null, null, null],
            [null, OK, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
        ] satisfies Board;
        const res = isCheck(expectBoard, "black", false);
        expect(res).toBe(false);
    });
    it("着手可能手チェック1", () => {
        const expectBoard = [
            [null, null, MH, null, null, null, null, null, null],
            [null, MK, null, null, null, null, null, null, null],
            [null, OK, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
        ] satisfies Board;
        const res = getAvailableActions(expectBoard, "black", hand);
        const expected = [
            { from: [0, 2], to: [0, 0], pieceType: "飛" },
            { from: [0, 2], to: [0, 1], pieceType: "飛" },
            { from: [0, 2], to: [0, 3], pieceType: "飛" },
            { from: [0, 2], to: [0, 4], pieceType: "飛" },
            { from: [0, 2], to: [0, 5], pieceType: "飛" },
            { from: [0, 2], to: [0, 6], pieceType: "飛" },
            { from: [0, 2], to: [0, 7], pieceType: "飛" },
            { from: [0, 2], to: [0, 8], pieceType: "飛" },
            { from: [0, 2], to: [1, 2], pieceType: "飛" },
            { from: [0, 2], to: [2, 2], pieceType: "飛" },
            { from: [0, 2], to: [0, 0], pieceType: "竜" },
            { from: [0, 2], to: [0, 1], pieceType: "竜" },
            { from: [0, 2], to: [0, 3], pieceType: "竜" },
            { from: [0, 2], to: [0, 4], pieceType: "竜" },
            { from: [0, 2], to: [0, 5], pieceType: "竜" },
            { from: [0, 2], to: [0, 6], pieceType: "竜" },
            { from: [0, 2], to: [0, 7], pieceType: "竜" },
            { from: [0, 2], to: [0, 8], pieceType: "竜" },
            { from: [0, 2], to: [1, 2], pieceType: "竜" },
            { from: [0, 2], to: [2, 2], pieceType: "竜" },

            { from: [0, 2], to: [3, 2], pieceType: "飛" },
            { from: [0, 2], to: [4, 2], pieceType: "飛" },
            { from: [0, 2], to: [5, 2], pieceType: "飛" },
            { from: [0, 2], to: [6, 2], pieceType: "飛" },
            { from: [0, 2], to: [7, 2], pieceType: "飛" },
            { from: [0, 2], to: [8, 2], pieceType: "飛" },

            { from: [1, 1], to: [0, 0], pieceType: "角" },
            { from: [1, 1], to: [2, 0], pieceType: "角" },
            { from: [1, 1], to: [2, 2], pieceType: "角" },
            { from: [1, 1], to: [0, 0], pieceType: "馬" },
            { from: [1, 1], to: [2, 0], pieceType: "馬" },
            { from: [1, 1], to: [2, 2], pieceType: "馬" },

            { from: [1, 1], to: [3, 3], pieceType: "角" },
            { from: [1, 1], to: [4, 4], pieceType: "角" },
            { from: [1, 1], to: [5, 5], pieceType: "角" },
            { from: [1, 1], to: [6, 6], pieceType: "角" },
            { from: [1, 1], to: [7, 7], pieceType: "角" },
            { from: [1, 1], to: [8, 8], pieceType: "角" },
        ];
        console.log(res);
        expect(res).toEqual(expect.arrayContaining(expected));

        expect(res).toHaveLength(expected.length);
    });
    it("着手可能手チェック2", () => {
        const expectBoard = [
            [null, null, null, null, null, null, null, null, null],
            [null, OK, null, null, null, null, null, null, null],
            [null, OH, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, MH, null, EK, null, null, null, null, null],
            [null, MKing, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
        ] satisfies Board;
        const res = getAvailableActions(expectBoard, "black", hand);
        const expected = [
            { from: [4, 1], to: [3, 1], pieceType: "飛" },
            { from: [4, 1], to: [2, 1], pieceType: "飛" },
            { from: [4, 1], to: [2, 1], pieceType: "竜" },
            { from: [5, 1], to: [4, 0], pieceType: "玉" },
            { from: [5, 1], to: [5, 0], pieceType: "玉" },
            { from: [5, 1], to: [6, 0], pieceType: "玉" },
            { from: [5, 1], to: [4, 2], pieceType: "玉" },
            { from: [5, 1], to: [6, 2], pieceType: "玉" },
        ];
        console.log(res);

        expect(res).toHaveLength(expected.length);
        expect(res).toEqual(expect.arrayContaining(expected));
    });

    it("着手可能手チェック3", () => {
        const expectBoard = [
            [null, null, null, null, null, null, null, null, null],
            [null, OK, null, null, null, null, null, null, null],
            [null, OH, EK, null, null, null, null, null, null],
            [null, null, MA, null, null, null, null, null, null],
            [null, MH, EK, EK, null, null, null, null, null],
            [null, MKing, null, OG, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, MC, MC, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
        ] satisfies Board;
        const res = getAvailableActions(expectBoard, "black", hand);
        const expected = [
            { from: [4, 1], to: [3, 1], pieceType: "飛" },
            { from: [4, 1], to: [2, 1], pieceType: "飛" },
            { from: [4, 1], to: [2, 1], pieceType: "竜" },
            { from: [5, 1], to: [4, 0], pieceType: "玉" },
            { from: [5, 1], to: [5, 0], pieceType: "玉" },
            { from: [5, 1], to: [6, 0], pieceType: "玉" },
            { from: [5, 1], to: [4, 2], pieceType: "玉" },
            { from: [5, 1], to: [6, 2], pieceType: "玉" },
        ];
        console.log(res);

        expect(res).toHaveLength(expected.length);
        expect(res).toEqual(expect.arrayContaining(expected));
    });
    it("詰みチェック1", () => {
        const expectBoard = [
            [null, OK, null, null, null, null, null, null, null],
            [null, MG, null, null, null, null, null, null, null],
            [null, MA, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
        ] satisfies Board;
        const res = isCheckMate(expectBoard, "white", []);
        const expected = true;
        expect(res).toEqual(expected);
    });
    it("詰みチェック2", () => {
        const expectBoard = [
            [null, OA, null, null, null, null, null, null, null],
            [null, OK, OG, MR, null, null, null, null, null],
            [null, null, MK, null, null, null, null, null, null],
            [null, MG, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [MC, null, null, null, null, null, null, null, null],
        ] satisfies Board;
        const res = isCheckMate(expectBoard, "white", []);
        const expected = true;
        expect(res).toEqual(expected);
    });
    it("詰みチェック3", () => {
        const expectBoard = [
            [null, MG, null, null, null, null, null, null, null],
            [null, OK, OG, MR, null, null, null, null, null],
            [null, null, MK, null, null, null, null, null, null],
            [null, MG, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [MC, null, null, null, null, null, null, null, null],
        ] satisfies Board;
        const res = isCheckMate(expectBoard, "white", []);
        const expected = false;
        expect(res).toEqual(expected);
    });

    it("詰みチェック4", () => {
        const expectBoard = [
            [null, OG, null, MN, null, null, null, null, null],
            [null, OK, OG, MR, null, null, null, null, null],
            [null, null, MK, null, null, null, null, null, null],
            [null, MG, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [MC, null, null, null, null, null, null, null, null],
        ] satisfies Board;
        const res = isCheckMate(expectBoard, "white", []);
        const expected = false;
        expect(res).toEqual(expected);
    });
});
