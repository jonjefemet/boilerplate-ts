"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomIntNumber = void 0;
exports.secureRandom = secureRandom;
const crypto_1 = require("crypto");
function secureRandom() {
    const randomHex = (0, crypto_1.randomBytes)(4).toString('hex');
    const randomInt = parseInt(randomHex, 16);
    return randomInt / 0xffffffff;
}
const randomIntNumber = ({ min = 1, max = 0xffffffff, }) => {
    return (Math.floor((parseInt((0, crypto_1.randomBytes)(4).toString('hex'), 16) / 0xffffffff) *
        (max - min + 1)) + min);
};
exports.randomIntNumber = randomIntNumber;
//# sourceMappingURL=Random.js.map