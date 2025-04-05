"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPositiveNumber = exports.calculatePercentageAmount = exports.formatDecimal = void 0;
const formatDecimal = (number) => {
    const result = Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 2,
    }).formatToParts(number);
    const fraction = result.find((x) => x.type == 'fraction');
    return fraction
        ? +(Math.floor(number) + '.' + fraction.value.substring(0, 2))
        : Math.floor(number);
};
exports.formatDecimal = formatDecimal;
const calculatePercentageAmount = (value, percentage) => {
    return value * (percentage / 100);
};
exports.calculatePercentageAmount = calculatePercentageAmount;
const isPositiveNumber = (value) => value > 0;
exports.isPositiveNumber = isPositiveNumber;
//# sourceMappingURL=Number.js.map