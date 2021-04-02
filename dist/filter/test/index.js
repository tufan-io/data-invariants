"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const __1 = require("..");
ava_1.default(`exclusion patterns`, (t) => {
    const data = {
        deep: {
            active: true,
            children: [
                {
                    lastActive: Date.now() - Math.random() * 24 * 3600 * 100,
                    name: "john",
                },
                {
                    lastActive: Date.now() - Math.random() * 24 * 3600 * 100,
                    name: "alice",
                },
            ],
            id: 1,
        },
        key: `Invariant Key`,
        signature: Math.random(),
        timestamp: Date.now(),
    };
    const variantFilters = [`!**/timestamp`, `!**/signature`, `!**/lastActive`];
    t.snapshot(__1.filter(data, variantFilters));
});
ava_1.default(`exclusion and inclusion patterns`, (t) => {
    const data = {
        deep: {
            active: true,
            children: [
                {
                    lastActive: Date.now() - Math.random() * 24 * 3600 * 100,
                    name: "john",
                },
                {
                    lastActive: Date.now() - Math.random() * 24 * 3600 * 100,
                    name: "alice",
                },
            ],
            id: 1,
        },
        key: `Invariant Key`,
        signature: Math.random(),
        timestamp: Date.now(),
    };
    const variantFilters = [
        `**`,
        `!**/timestamp`,
        `!**/signature`,
        `!**/lastActive`,
    ];
    t.snapshot(__1.filter(data, variantFilters));
});
ava_1.default(`array exclusion`, (t) => {
    const data = {
        deep: {
            active: true,
            children: ["john", "alice"],
            id: 1,
        },
        key: `Invariant Key`,
        signature: Math.random(),
        timestamp: Date.now(),
    };
    const variantFilters = [
        `**`,
        `!**/0`,
        `!**/timestamp`,
        `!**/signature`,
        `!**/lastActive`,
    ];
    t.snapshot(__1.filter(data, variantFilters));
});
ava_1.default(`unsupported type`, (t) => {
    const data = {
        deep: {
            active: true,
            children: [
                {
                    lastActive: Date.now() - Math.random() * 24 * 3600 * 100,
                    name: `john`,
                },
                {
                    lastActive: Date.now() - Math.random() * 24 * 3600 * 100,
                    name: `alice`,
                },
            ],
            fun: () => { },
            id: 1,
        },
        key: `Invariant Key`,
        signature: Math.random(),
        timestamp: Date.now(),
    };
    const variantFilters = [`!**/timestamp`, `!**/signature`, `!**/lastActive`];
    t.throws(() => __1.filter(data, variantFilters), {
        message: "unsupported data type Function at /deep/fun",
    });
});
//# sourceMappingURL=index.js.map