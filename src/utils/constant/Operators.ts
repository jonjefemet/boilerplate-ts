const Operators = {
  EQUAL: '=',
  NOT_EQUAL: '!=',
  GT: '>',
  LT: '<',
  CONTAINS: 'CONTAINS',
  NOT_CONTAINS: 'NOT_CONTAINS',
} as const;

type Operators = (typeof Operators)[keyof typeof Operators];

export { Operators };
