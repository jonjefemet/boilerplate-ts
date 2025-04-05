const OrderTypes = {
  ASC: 'asc',
  DESC: 'desc',
  NONE: 'none',
} as const;

type OrderTypes = (typeof OrderTypes)[keyof typeof OrderTypes];

export { OrderTypes };
