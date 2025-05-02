
import { NextResponse } from 'next/server'

export interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

export const createResponse = <T>(data: T, code = 200, message = 'success') => {
  return NextResponse.json({
    code,
    data,
    message
  })
}