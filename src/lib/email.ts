import nodemailer from 'nodemailer';
console.log('process.env.SMTP_USER: ', process.env.SMTP_USER);

// 创建邮件传输器
export const emailTransporter = nodemailer.createTransport({
  host: 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});