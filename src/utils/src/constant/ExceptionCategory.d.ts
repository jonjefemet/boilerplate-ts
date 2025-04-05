declare const ExceptionCategory: {
    readonly UNKNOWN: "UNKNOWN";
    readonly DOMAIN: "DOMAIN";
    readonly APPLICATION: "APPLICATION";
    readonly INFRASTRUCTURE: "INFRASTRUCTURE";
};
type ExceptionCategory = (typeof ExceptionCategory)[keyof typeof ExceptionCategory];
export { ExceptionCategory };
