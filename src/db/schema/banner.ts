import { pgTable, serial, varchar, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

export const banners = pgTable('banners', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  subtitle: varchar('subtitle', { length: 255 }),
  type: varchar('type', { length: 10 }).notNull(),
  order: integer('order').default(0),
  buttonText: varchar('button_text', { length: 50 }),
  buttonLink: varchar('button_link', { length: 255 }),
  src: varchar('src', { length: 255 }),
  description: text('description'),
  media: varchar('media', { length: 255 }).notNull(),
  status: varchar('status', { length: 10 }).notNull().default('active'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});