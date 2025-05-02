import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// const DATABASE_URL = 'postgresql://postgres.wjkktnzmosijlsaldzao:Chengyi123456&@aws-0-eu-central-1.pooler.supabase.com:6543/postgres' || 'localhost';
const DATABASE_URL = 'postgresql://root:Chengyi123456&@chengyi-server.chogc8iyy9og.eu-central-1.rds.amazonaws.com:5432/chengyi' || 'localhost';
// const DATABASE_URL = 'postgresql://root:123456@localhost/chengyi';

// 同步初始化数据库连接
const client = postgres(DATABASE_URL, {
  ssl: { 
    rejectUnauthorized: false
  },
  // 建议添加连接池配置
  idle_timeout: 30,
  max_lifetime: 60 * 5
})

// 直接导出初始化完成的drizzle实例
export const db = drizzle(client, { schema })

export async function getDb() {
  const client = postgres(DATABASE_URL, {
    ssl: { 
      rejectUnauthorized: false
    },
    // 建议添加连接池配置
    idle_timeout: 30,
    max_lifetime: 60 * 5
  })
  return drizzle(client, { schema })
}

// 可选：添加连接健康检查
// client`
//   SELECT 1 AS db_test
// `
//   .then(() => console.log('✅ Database connection successful'))
//   .catch(err => {
//     console.error('❌ Database connection failed:', err)
//     process.exit(1) // 生产环境建议更优雅的退出方式
//   })