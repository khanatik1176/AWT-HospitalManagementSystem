import * as crypto from 'crypto';

// Generate a secure random string
const generateSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

export const jwtSecrets = {
  secret: generateSecret(),
};