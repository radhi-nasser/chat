import * as argon2 from 'argon2';

export const getPasswordHash = (password: string): Promise<string> => {
  return argon2.hash(password);
};

export const verifyPassword = (
  hashedPassword: string | null,
  password: string | null,
): Promise<boolean> => {
  if (hashedPassword === null || password === null) {
    return Promise.resolve(false);
  }
  return argon2.verify(hashedPassword, password);
};
