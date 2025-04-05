declare const Operator: {
    readonly EQUAL: "=";
    readonly NOT_EQUAL: "!=";
    readonly GT: ">";
    readonly LT: "<";
    readonly CONTAINS: "CONTAINS";
    readonly NOT_CONTAINS: "NOT_CONTAINS";
};
type Operator = (typeof Operator)[keyof typeof Operator];
export { Operator };
