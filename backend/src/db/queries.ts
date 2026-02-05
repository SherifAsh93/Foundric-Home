import { db } from "./index";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/singlestore/driver";
import {
  owners,
  customers,
  products,
  orders,
  type Owner,
  type Customer,
  type Product,
  type Order,
  type NewOwner,
  type NewCustomer,
  type NewProduct,
  type NewOrder,
} from "./schema";

//  Insert Functions
export const createOwner = async (data: NewOwner) => {
  // Insert Owner
  const [owner] = await db.insert(owners).values(data).returning();
  return owner;
};

export const createCustomer = async (data: NewCustomer) => {
  // Insert Customer
  const [customer] = await db.insert(customers).values(data).returning();
  return customer;
};

export const createProduct = async (data: NewProduct) => {
  // Insert Product
  const [product] = await db.insert(products).values(data).returning();
  return product;
};

export const createOrder = async (data: NewOrder) => {
  // Insert Order
  const [order] = await db.insert(orders).values(data).returning();
  return order;
};

// Get Functions
export const getOwner = async (id: string) => {
  // Get Owner
  const owner = await db.select().from(owners).where(eq(owners.id, id));
  return owner;
};

export const getCustomer = async (id: string) => {
  // Get Customer
  const customer = await db
    .select()
    .from(customers)
    .where(eq(customers.id, id));
  return customer;
};

export const getProduct = async (id: string) => {
  // Get Product
  const product = await db.select().from(products).where(eq(products.id, id));
  return product;
};

export const getOrder = async (id: string) => {
  // Get Order
  const order = await db.select().from(orders).where(eq(orders.id, id));
  return order;
};

// Update Functions
export const updateOwner = async (id: string, data: Partial<NewOwner>) => {
  // Update Owner
  const [owner] = await db
    .update(owners)
    .set(data)
    .where(eq(owners.id, id))
    .returning();
  return owner;
};

export const updateCustomer = async (
  id: string,
  data: Partial<NewCustomer>,
) => {
  // Update Customer
  const [customer] = await db
    .update(customers)
    .set(data)
    .where(eq(customers.id, id))
    .returning();
  return customer;
};

export const updateProduct = async (id: string, data: Partial<NewProduct>) => {
  // Update Product
  const [product] = await db
    .update(products)
    .set(data)
    .where(eq(products.id, id))
    .returning();
  return product;
};

export const updateOrder = async (id: string, data: Partial<NewOrder>) => {
  // Update Order
  const [order] = await db
    .update(orders)
    .set(data)
    .where(eq(orders.id, id))
    .returning();
  return order;
};

// Upsert Functions
export const upsertOwner = async (data: NewOwner) => {
  // Upsert Owner
  const [owner] = await db
    .insert(owners)
    .values(data)
    .onConflictDoUpdate({
      target: owners.id,
      set: data,
    })
    .returning();
  return owner;
};

export const upsertCustomer = async (data: NewCustomer) => {
  // Upsert Customer
  const [customer] = await db
    .insert(customers)
    .values(data)
    .onConflictDoUpdate({
      target: customers.id,
      set: data,
    })
    .returning();
  return customer;
};

export const upsertProduct = async (data: NewProduct) => {
  // Upsert Product
  const [product] = await db
    .insert(products)
    .values(data)
    .onConflictDoUpdate({
      target: products.id,
      set: data,
    })
    .returning();
  return product;
};

export const upsertOrder = async (data: NewOrder) => {
  // Upsert Order
  const [order] = await db
    .insert(orders)
    .values(data)
    .onConflictDoUpdate({
      target: orders.id,
      set: data,
    })
    .returning();
  return order;
};
