import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { createResponse } from '@/lib/response';
import { verifyToken } from '@/lib/jwt';
import { getWhitelist } from '@/configs/api_whitelist';

const PRE_PATH = '/api/admin';
const whitelist = getWhitelist();

const intlMiddleware = createIntlMiddleware(routing);

const authMiddleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  if (whitelist.some(path => pathname.startsWith(PRE_PATH + path))) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get('authorization');
  
  if (!authHeader?.startsWith('Bearer ')) {
    if (pathname.startsWith('/api/')) {
      return createResponse(null, 401, 'Authentication required');
    }
    return NextResponse.next();
  }

  const [, token] = authHeader.split(' ');

  try {
    const { payload } = await verifyToken(token);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('user', JSON.stringify(payload));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('Token verification error:', error);
    if (pathname.startsWith('/api/')) {
      return createResponse(null, 401, 'Invalid token');
    }
    return NextResponse.next();
  }
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api')) {
    return authMiddleware(request);
  }

  const authResponse = await authMiddleware(request);
  
  if (authResponse && authResponse.status !== 200) {
    return authResponse;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!_next|_vercel|.*\\..*).*)' 
  ]
};