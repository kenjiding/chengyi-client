import { NextRequest, NextResponse } from 'next/server';
import { inquiryHandle } from './service';

// 邮件配置接口
interface InquiryData {
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  message?: string;
  products: Array<{
    product: any;
    quantity: number;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const data: InquiryData = await request.json();

    // 验证必填字段
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json(
        { error: '缺少必填信息' }, 
        { status: 400 }
      );
    }

    await inquiryHandle(data);

    return NextResponse.json(
      { message: '咨询提交成功' }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('邮件发送失败:', error);
    return NextResponse.json(
      { error: '提交咨询失败，请稍后重试' }, 
      { status: 500 }
    );
  }
}