import * as crypto from 'crypto';

export async function generatePassword(pw: string) {
  const salt = crypto.randomBytes(64).toString('hex');

  const finalpassword = crypto
    .pbkdf2Sync(pw, salt, 100000, 64, 'sha512')
    .toString('hex');

  return {
    salt,
    password: finalpassword,
  };
}

export async function checkPassword(pw: string, salt: string) {
  return crypto.pbkdf2Sync(pw, salt, 100000, 64, 'sha512').toString('hex');
}

export const isDevEnv = process.env.DEVELOPMENT;
