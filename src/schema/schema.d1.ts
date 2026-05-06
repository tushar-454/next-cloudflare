import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const categories = sqliteTable("categories", {
    category_id: integer("category_id").primaryKey({ autoIncrement: true }),
    category_name: text("category_name"),
    description: text("description"),
});

export const customers = sqliteTable("customers", {
    customer_id: integer("customer_id").primaryKey({ autoIncrement: true }),
    customer_name: text("customer_name"),
    contact_name: text("contact_name"),
    address: text("address"),
    city: text("city"),
    postal_code: text("postal_code"),
    country: text("country"),
});

export const products = sqliteTable("products", {
    product_id: integer("product_id").primaryKey({ autoIncrement: true }),
    product_name: text("product_name"),
    category_id: integer("category_id").references(
        () => categories.category_id,
    ),
    unit: text("unit"),
    price: real("price"),
});

export const orders = sqliteTable("orders", {
    order_id: integer("order_id").primaryKey({ autoIncrement: true }),
    customer_id: integer("customer_id").references(() => customers.customer_id),
    order_date: text("order_date"),
});

export const order_details = sqliteTable("order_details", {
    order_detail_id: integer("order_detail_id").primaryKey({
        autoIncrement: true,
    }),
    order_id: integer("order_id").references(() => orders.order_id),
    product_id: integer("product_id").references(() => products.product_id),
    quantity: integer("quantity"),
});
