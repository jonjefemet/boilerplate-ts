const ExceptionCategory = {
  UNKNOWN: 'UNKNOWN',
  DOMAIN: 'DOMAIN',
  APPLICATION: 'APPLICATION',
  INFRASTRUCTURE: 'INFRASTRUCTURE',
} as const;

type ExceptionCategory =
  (typeof ExceptionCategory)[keyof typeof ExceptionCategory];

export { ExceptionCategory };
