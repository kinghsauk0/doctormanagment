import * as crypto from 'crypto';

export function md5(input: string): string {
    const randomBits = crypto.randomBytes(64).toString('hex');
    const inputWithRandomBits = input + randomBits;
    return crypto
      .createHash('md5')
      .update(inputWithRandomBits)
      .digest('hex')
      .toString();
  }