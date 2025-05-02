import { 
  pgTable, 
  serial, 
  varchar,
  timestamp,
} from 'drizzle-orm/pg-core';

// 用户表
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  email: varchar('email', { length: 100 }),
  avatar: varchar('avatar', { length: 255 }),
  roles: varchar('roles', { length: 1000 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});


// 定义类型
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;