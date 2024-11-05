import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const AIOutput = pgTable('aiOutput', {
    id: serial('id').primaryKey(),
    formData: text('formData').notNull(),
    aiResponse: text('aiResponse'),
    templateSlug: varchar('templateSlug').notNull(),
    createdBy: varchar('createdBy'), 
    createdAt: timestamp('createdAt').defaultNow().notNull(),
});
