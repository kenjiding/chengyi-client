// @/db/schema.ts
import { 
  pgTable, 
  serial, 
  text, 
  timestamp, 
  varchar,
  pgEnum,
  boolean
} from 'drizzle-orm/pg-core';

export const newsTypeEnum = pgEnum('news_type', ['news', 'event']);

export const news = pgTable('news', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  imageUrl: varchar('image_url', { length: 500 }),
  videoUrl: varchar('video_url', { length: 500 }),
  type: newsTypeEnum('type').default('news'),
  publishDate: timestamp('publish_date').defaultNow(),
  top: boolean('top').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// 定义类型
export type News = typeof news.$inferSelect;
export type NewInsert = typeof news.$inferInsert;