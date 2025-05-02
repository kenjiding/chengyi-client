import { emailTransporter } from '@/lib/email';

export const inquiryHandle = async (data: {
  products: any[];
  name: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  message?: string;
}) => {
    // 验证必填字段
    if (!data.name || !data.email || !data.phone) {
      throw new Error('缺少必填信息');
    }

    // 邮件选项
    const mailOptions = {
      from: '13610307032@163.com',
      to: [
        'kenjiding807@gmail.com',
        '872570730@qq.com',
        'anna@chengyiauto.cn',
        'alissa@chengyiauto.cn',
      ],
      subject: `新的产品咨询 - 来自 ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .container {
              background-color: white;
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              padding: 30px;
            }
            .header {
              background-color: #4a90e2;
              color: white;
              text-align: center;
              padding: 15px;
              border-radius: 10px 10px 0 0;
            }
            .content {
              margin-top: 20px;
            }
            .info-item {
              margin-bottom: 15px;
              border-bottom: 1px solid #eee;
              padding-bottom: 10px;
            }
            .info-item strong {
              color: #4a90e2;
              display: inline-block;
              width: 100px;
            }
            .products-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            .products-table th {
              background-color: #f4f4f4;
              border: 1px solid #ddd;
              padding: 10px;
              text-align: left;
            }
            .products-table td {
              border: 1px solid #ddd;
              padding: 10px;
            }
            .footer {
              margin-top: 20px;
              text-align: center;
              color: #888;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>新的产品咨询</h1>
            </div>
            
            <div class="content">
              <div class="info-item">
                <strong>姓名</strong> ${data.name}
              </div>
              <div class="info-item">
                <strong>邮箱</strong> ${data.email}
              </div>
              <div class="info-item">
                <strong>电话</strong> ${data.phone}
              </div>
              ${data.whatsapp ? `
                <div class="info-item">
                  <strong>WhatsApp</strong> ${data.whatsapp}
                </div>
              ` : ''}
              ${data.message ? `
                <div class="info-item">
                  <strong>附加消息</strong> ${data.message}
                </div>
              ` : ''}
            </div>
    
            ${data.products.length > 0 ? `
              <table class="products-table">
                <thead>
                  <tr>
                    <th>产品名称</th>
                    <th>数量</th>
                  </tr>
                </thead>
                <tbody>
                  ${data.products.map(item => `
                    <tr>
                      <td>${item.product.name}</td>
                      <td>${item.quantity}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            ` : ''}
    
            <div class="footer">
              此邮件由系统自动发送，请勿直接回复
            </div>
          </div>
        </body>
        </html>
      `
    };
    // 发送邮件
    await emailTransporter.sendMail(mailOptions);
}