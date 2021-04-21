'use strict';

import crypto from 'crypto';
class PasswordUtils {
  private readonly DIGEST = 'sha512';
  private readonly ITERATIONS = 100000;
  private readonly KEY_LEN = 64;
  private readonly SALT_BYTES = 256 / 8;

  /**
   * Create password hash
   * @param password
   */
  async createHash (password: string): Promise<string> {
    return this.createHashHex(password);
  }

  /**
   * Check password against a hash
   * @param password
   * @param hash
   */
  async check (password: string, hash: string): Promise<boolean> {
    if (!hash || hash.indexOf(':') === -1) {
      return false;
    }
    const p = hash.split(':');

    if (p.length === 3) {
      const newHash = await this.createHashHex(password, p[1], +p[2]);
      return newHash === hash;
    }

    return false;
  }

  /**
   * Create hash hex
   * @param password
   * @param salt
   * @param iterations
   */
  async createHashHex (password: string, salt: string = this.getSaltHex(), iterations: number = this.ITERATIONS): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, +iterations, this.KEY_LEN, this.DIGEST, (err, derivedKey) => {
        if (err) {
          reject(err);
        } else {
          resolve([derivedKey.toString('hex'), salt, +iterations].join(':'));
        }
      });
    });
  }

  /**
   * Get salt hex
   */
  getSaltHex () {
    return crypto.randomBytes(this.SALT_BYTES).toString('hex');
  }
}

const passwordUtils = new PasswordUtils();
export {
  passwordUtils
};
