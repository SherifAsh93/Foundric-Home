import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  decimal,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
// owners table
export const owners = pgTable("owners", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  storeName: text("store_name").notNull(),
  email: text("email").unique(),
  phoneNumber: text("phone_number").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// customers table
export const customers = pgTable("customers", {
  id: text("id").primaryKey(), // Clerk user ID
  name: text("name").notNull(),
  email: text("email").unique(),
  phoneNumber: text("phone_number").notNull(),
  address: text("address").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// products table
export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  ownerId: text("owner_id")
    .notNull()
    .references(() => owners.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  category: text("category").notNull(), // "Dressing room" | "Master bedroom" | "Kids room" | "Dinning room with buffet and 6 or 8 chairs" | "Sofas" | "Sofas tables" | "Side tables" | "Doors" | "Cladding"
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  size: text("size").notNull(),
  color: text("color").notNull(),
  quantity: integer("quantity").notNull().default(0),
  images: text("images").array(), // Array of image URLs
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

// orders table
export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerId: text("customer_id")
    .notNull()
    .references(() => customers.id, { onDelete: "cascade" }),
  ownerId: text("owner_id")
    .notNull()
    .references(() => owners.id, { onDelete: "cascade" }),
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  quantity: integer("quantity").notNull(),
  size: text("size").notNull(),
  color: text("color").notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"), // pending, confirmed, shipped, delivered, cancelled
  notes: text("notes"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

// Relations
// Owner can have many products and many orders
export const ownersRelations = relations(owners, ({ many }) => ({
  products: many(products), // Owner owns multiple products
  orders: many(orders), // Owner receives multiple orders from customers
}));

// Customer can have many orders
export const customersRelations = relations(customers, ({ many }) => ({
  orders: many(orders), // Customer places multiple orders
}));

// Product belongs to one owner and can have many orders
export const productsRelations = relations(products, ({ one, many }) => ({
  owner: one(owners, {
    fields: [products.ownerId],
    references: [owners.id],
  }), // Each product belongs to one owner
  orders: many(orders), // Product can be ordered by multiple customers
}));

// Order belongs to one customer, one owner, and one product
export const ordersRelations = relations(orders, ({ one }) => ({
  customer: one(customers, {
    fields: [orders.customerId],
    references: [customers.id],
  }), // Each order is placed by one customer
  owner: one(owners, {
    fields: [orders.ownerId],
    references: [owners.id],
  }), // Each order goes to one product owner
  product: one(products, {
    fields: [orders.productId],
    references: [products.id],
  }), // Each order is for one specific product
}));
// type inference to make it easier to work with to use each table as a type for insert and select
export type Owner = typeof owners.$inferSelect;
export type NewOwner = typeof owners.$inferInsert;

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
