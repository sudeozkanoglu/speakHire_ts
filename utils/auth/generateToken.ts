import { SignJWT } from 'jose';
import { createSecretKey } from 'crypto';

export const generateToken = async (id: string, userType: string) => {
  const secret = createSecretKey(Buffer.from(process.env.JWT_SECRET!));

  const token = await new SignJWT({ id, userType })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(secret);

  return token;
};