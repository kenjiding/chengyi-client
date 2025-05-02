import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// 定义环境变量对象的类型
interface EnvObject {
  [key: string]: string;
}

// 函数：加载 .env 文件并返回对象
function loadEnvToObject(envPath: string = '.env'): EnvObject {
  try {
    // 解析 .env 文件到对象
    const envContent = fs.readFileSync(path.resolve(process.cwd(), envPath), 'utf8');
    const envConfig = dotenv.parse(envContent);

    // 将解析后的变量转换为对象
    const envObject: EnvObject = {};
    for (const key in envConfig) {
      envObject[key] = envConfig[key];
    }

    return envObject;
  } catch (error) {
    console.error('Error loading .env file:', error instanceof Error ? error.message : error);
    return {};
  }
}

// 导出函数
export default loadEnvToObject;