const Operator = {
  EQUAL: '=',
  NOT_EQUAL: '!=',
  GT: '>',
  LT: '<',
  CONTAINS: 'CONTAINS',
  NOT_CONTAINS: 'NOT_CONTAINS',
} as const;

type Operator = (typeof Operator)[keyof typeof Operator];

export { Operator };
