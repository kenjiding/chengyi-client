import * as jose from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'chengyi-server-key');
const alg = 'HS256';

export const getKey = async () => {
  const key = await crypto.subtle.importKey(
    'raw',
    secret,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
  return key;
};

export const generateToken = async (payload: any) => {
  const key = await getKey();
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key);
};

export const verifyToken = async (token: string) => {
  const key = await getKey();
  return await jose.jwtVerify(token, key);
};