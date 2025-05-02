import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { createResponse } from '@/lib/response';
import { getDb } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { generateToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const db = await getDb();
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return createResponse(null, 400, 'username and password are required');
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1)
      .execute();

    if (!user) {
      return createResponse(null, 401, 'User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return createResponse(null, 401, 'Invalid password');
    }

    const token = await generateToken({ 
      userId: user.id, 
      email: user.email,
      username: user.username 
    });

    const response = createResponse({ token, userInfo: {
      ...user,
      password: null,
    } }, 200, 'Login successful');

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400 // 24 hours
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return createResponse(null, 500, 'Internal server error');
  }
}