import { randomBytes } from 'crypto';

export function secureRandom(): number {
  const randomHex = randomBytes(4).toString('hex');

  const randomInt = parseInt(randomHex, 16);

  return randomInt / 0xffffffff;
}

export const randomIntNumber = ({
  min = 1,
  max = 0xffffffff,
}: {
  min?: number;
  max: number;
}) => {
  return (
    Math.floor(
      (parseInt(randomBytes(4).toString('hex'), 16) / 0xffffffff) *
        (max - min + 1),
    ) + min
  );
};
