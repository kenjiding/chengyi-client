import { NextRequest } from 'next/server';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createResponse } from '@/lib/response';

const s3Client = new S3Client({
  region: process.env.AWS_CLOUD_REGION,
  credentials: {
    accessKeyId: process.env.AWS_CLOUD_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_CLOUD_SECRET_ACCESS_KEY!
  }
});

export async function POST(request: NextRequest) {
  try {
    // 获取上传的文件
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return createResponse(null, 400, '没有上传文件');
    }

    // 检查文件类型
    const originalExtension = file.name.split('.').pop()?.toLowerCase();
    if (originalExtension === 'webp') {
      return createResponse(null, 400, '不支持 WebP 格式，请上传 JPG 或 PNG 格式的图片');
    }

    // 生成唯一文件名
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 7);

    const newExtension =
      originalExtension === 'png' ? 'png' :
        originalExtension === 'jpeg' || originalExtension === 'jpg' ? 'jpg' :
          'jpg';

    const newFilename = `${timestamp}_${randomString}.${newExtension}`;

    // 将文件转换为 Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // S3 上传参数
    const uploadParams = {
      Bucket: process.env.AWS_CLOUD_S3_BUCKET_NAME!,
      Key: `images/${newFilename}`,
      Body: buffer,
      ContentType: file.type
    };

    // 上传到 S3
    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    // 构建永久可访问的 URL
    const fileUrl = `https://${process.env.AWS_CLOUD_S3_BUCKET_NAME}.s3.${process.env.AWS_CLOUD_REGION}.amazonaws.com/images/${newFilename}`;

    return createResponse(fileUrl);
  } catch (error) {
    console.error('文件上传失败:', error);
    return createResponse(null, 500, '文件上传失败');
  }
}