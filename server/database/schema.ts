import { int, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    id: int("id").primaryKey({autoIncrement: true})
})