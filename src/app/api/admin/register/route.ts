// app/api/auth/register/route.ts
import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { createResponse } from '@/lib/response';
import { getDb } from '@/db';
import { users, type NewUser } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, email, avatar } = body;

    // 验证请求数据
    if (!username || !password) {
      return createResponse(null, 400, 'Username and password are required');
    }
    const db = await getDb();
    // 验证用户名是否已存在
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1)
      .execute();

    if (existingUser.length > 0) {
      return createResponse(null, 409, 'Username already exists');
    }

    // 如果提供了邮箱，检查邮箱是否已被使用
    if (email) {
      const existingEmail = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1)
        .execute();

      if (existingEmail.length > 0) {
        return createResponse(null, 409, 'Email already exists');
      }
    }

    // 密码加密
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 准备用户数据
    const newUser: NewUser = {
      username,
      password: hashedPassword,
      email: email || null,
      avatar: avatar || null,
    };

    // 插入用户数据并获取插入的用户
    const result = await db
      .insert(users)
      .values(newUser)
      .returning({
        id: users.id,
        username: users.username,
        email: users.email,
        avatar: users.avatar,
        createdAt: users.createdAt,
      })
      .execute();

    const createdUser = result[0];

    return createResponse(
      createdUser,
      201,
      'User registered successfully'
    );

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof Error) {
      return createResponse(null, 500, error.message);
    }
    
    return createResponse(null, 500, 'Internal server error');
  }
}