declare const OrderTypes: {
    readonly ASC: "asc";
    readonly DESC: "desc";
    readonly NONE: "none";
};
type OrderTypes = (typeof OrderTypes)[keyof typeof OrderTypes];
export { OrderTypes };
