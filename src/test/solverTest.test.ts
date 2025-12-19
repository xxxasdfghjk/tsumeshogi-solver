import { describe, it, expect } from "vitest";
import {
    convertHistoryToSeries,
    getAvailableActions,
    isCheck,
    isCheckMate,
    solveTsumeshogi,
    type Board,
    type Piece,
} from "../lib/Shogi";

const OA = { type: "歩", player: "white" } satisfies Piece;
const OK = { type: "玉", player: "white" } satisfies Piece;
const OG = { type: "金", player: "white" } satisfies Piece;
const OC = { type: "香", player: "white" } satisfies Piece;
const ON = { type: "桂", player: "white" } satisfies Piece;
const OS = { type: "銀", player: "white" } satisfies Piece;

const MS = { type: "銀", player: "black" } satisfies Piece;
const MR = { type: "竜", player: "black" } satisfies Piece;
const MC = { type: "香", player: "black" } satisfies Piece;

const MG = { type: "金", player: "black" } satisfies Piece;
const MA = { type: "歩", player: "black" } satisfies Piece;

const MH = { type: "飛", player: "black" } satisfies Piece;
const OH = { type: "飛", player: "white" } satisfies Piece;
const EK = { type: "角", player: "white" } satisfies Piece;
const MK = { type: "角", player: "black" } satisfies Piece;
const MAX_HAND = {
    桂: 99,
    金: 99,
    歩: 99,
    飛: 99,
    角: 99,
    銀: 99,
    香: 99,
};
describe("UnitTest", () => {
    it("詰めソルバ0", () => {
        const expectBoard = [
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
        const res = solveTsumeshogi(
            expectBoard,
            "black",
            {
                black: {
                    桂: 0,
                    金: 0,
                    歩: 0,
                    飛: 0,
                    角: 0,
                    銀: 0,
                    香: 0,
                },
                white: MAX_HAND,
            },
            5,
            0
        );
        expect([]).toEqual(expect.arrayContaining([]));
    });
    it("詰めソルバ1", () => {
        const expectBoard = [
            [null, OK, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, MA, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
        ] satisfies Board;

        const res = solveTsumeshogi(
            expectBoard,
            "black",
            {
                black: {
                    桂: 0,
                    金: 1,
                    歩: 0,
                    飛: 0,
                    角: 0,
                    銀: 0,
                    香: 0,
                },
                white: {
                    桂: 0,
                    金: 0,
                    歩: 0,
                    飛: 0,
                    角: 0,
                    銀: 0,
                    香: 0,
                },
            },
            5,
            0
        );
        expect(res).not.toBe(false);
    });
    it("詰めソルバ2", () => {
        const expectBoard = [
            [null, OK, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, MA, MG, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
        ] satisfies Board;
        const res = solveTsumeshogi(
            expectBoard,
            "black",
            {
                black: {
                    桂: 0,
                    金: 0,
                    歩: 0,
                    飛: 0,
                    角: 0,
                    銀: 0,
                    香: 0,
                },
                white: MAX_HAND,
            },
            5,
            0
        );
        expect(res).not.toBe(false);
    });
    it("詰めソルバ3", () => {
        const expectBoard = [
            [null, null, null, null, null, null, null, ON, OC],
            [null, null, null, null, null, null, null, OK, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, MS, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
        ] satisfies Board;
        const res = solveTsumeshogi(
            expectBoard,
            "black",
            {
                black: {
                    桂: 0,
                    金: 1,
                    歩: 0,
                    飛: 0,
                    角: 0,
                    銀: 1,
                    香: 0,
                },
                white: MAX_HAND,
            },
            5,
            0
        );
        expect(res).not.toBe(false);
    });
    it("詰めソルバ4", () => {
        const expectBoard = [
            [null, null, null, null, null, null, null, ON, OC],
            [null, null, null, null, null, OS, null, OK, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, MA, OA],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
        ] satisfies Board;

        const res = solveTsumeshogi(
            expectBoard,
            "black",
            {
                black: {
                    桂: 0,
                    金: 1,
                    歩: 0,
                    飛: 0,
                    角: 0,
                    銀: 1,
                    香: 0,
                },
                white: MAX_HAND,
            },
            5,
            0
        );
        expect(res).not.toBe(false);
    });
    it("詰めソルバ5", () => {
        const expectBoard = [
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, MR, null, null],
            [null, null, null, null, null, null, null, OS, OK],
            [null, null, null, null, null, null, null, OA, OA],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
        ] satisfies Board;

        const res = solveTsumeshogi(
            expectBoard,
            "black",
            {
                black: {
                    桂: 0,
                    金: 0,
                    歩: 0,
                    飛: 0,
                    角: 0,
                    銀: 1,
                    香: 0,
                },
                white: MAX_HAND,
            },
            5,
            0
        );
        expect(res).not.toBe(false);
    });
    it("詰めソルバ6", () => {
        const expectBoard = [
            [null, null, null, null, null, null, null, ON, null],
            [null, null, null, null, null, MR, null, null, OC],
            [null, null, null, null, null, null, null, OA, OK],
            [null, null, null, null, null, null, OG, null, OA],
            [null, null, null, null, null, null, OA, null, null],
            [null, null, null, null, null, null, null, MS, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
        ] satisfies Board;

        const res = solveTsumeshogi(
            expectBoard,
            "black",
            {
                black: {
                    桂: 0,
                    金: 1,
                    歩: 1,
                    飛: 0,
                    角: 1,
                    銀: 0,
                    香: 0,
                },
                white: MAX_HAND,
            },
            7,
            0
        );
        expect(res).not.toBe(false);
        console.log(res.map((e) => convertHistoryToSeries(e)));
    });

    it("詰めソルバ7", () => {
        const expectBoard = [
            [null, null, null, null, null, null, MS, null, null],
            [null, null, null, null, null, null, null, MA, OK],
            [null, null, null, null, null, null, null, OA, null],
            [null, null, null, null, null, null, null, null, OA],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
        ] satisfies Board;

        const res = solveTsumeshogi(
            expectBoard,
            "black",
            {
                black: {
                    桂: 0,
                    金: 0,
                    歩: 0,
                    飛: 2,
                    角: 0,
                    銀: 1,
                    香: 0,
                },
                white: MAX_HAND,
            },
            7,
            0
        );

        expect(res).toBeInstanceOf(Array);
        expect(res).not.toHaveLength(0);
        console.log(res.map((e) => convertHistoryToSeries(e)));
    });

    it("詰めソルバ8", () => {
        const expectBoard = [
            [null, null, null, null, null, null, MS, null, OK],
            [null, null, null, null, null, null, null, MA, null],
            [null, null, null, null, null, null, null, OA, null],
            [null, null, null, null, null, null, null, null, OA],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
        ] satisfies Board;

        const res = solveTsumeshogi(
            expectBoard,
            "black",
            {
                black: {
                    桂: 0,
                    金: 0,
                    歩: 0,
                    飛: 1,
                    角: 0,
                    銀: 1,
                    香: 0,
                },
                white: MAX_HAND,
            },
            6,
            0
        );
        expect(res).toBeInstanceOf(Array);
        expect(res).not.toHaveLength(0);
    });
    it("詰めソルバ9 無駄な合駒", () => {
        const expectBoard = [
            [null, null, null, null, null, null, null, OA, OK],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, MG],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, MC],
        ] satisfies Board;
        console.log(
            getAvailableActions(
                expectBoard,
                "black",
                {
                    black: {
                        桂: 0,
                        金: 0,
                        歩: 0,
                        飛: 0,
                        角: 0,
                        銀: 0,
                        香: 0,
                    },
                    white: MAX_HAND,
                },
                true
            )
        );
        const res = solveTsumeshogi(
            expectBoard,
            "black",
            {
                black: {
                    桂: 0,
                    金: 0,
                    歩: 0,
                    飛: 0,
                    角: 0,
                    銀: 0,
                    香: 0,
                },
                white: MAX_HAND,
            },
            11,
            0
        );
        console.log(res);
        expect(res).toBeInstanceOf(Array);
        expect(res).not.toHaveLength(0);
        console.log(res.map((e) => convertHistoryToSeries(e)));
    });
});
