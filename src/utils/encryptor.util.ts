import { compare, hash } from 'bcrypt';
import { createHash } from 'crypto';

export class Encryptor {
  private static saltRounds = 10;

  static validate(str: string, str2: string): Promise<boolean> {
    return compare(str, str2);
  }

  static async hash(str: string, algorithm?: 'md5' | 'sha1'): Promise<string> {
    if (algorithm) {
      return createHash(algorithm).update(str).digest('hex');
    } else {
      return hash(str, this.saltRounds);
    }
  }
}
