CREATE TABLE `categories` (
	`category_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category_name` text,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `customers` (
	`customer_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`customer_name` text,
	`contact_name` text,
	`address` text,
	`city` text,
	`postal_code` text,
	`country` text
);
--> statement-breakpoint
CREATE TABLE `order_details` (
	`order_detail_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`order_id` integer,
	`product_id` integer,
	`quantity` integer,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`order_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`customer_id` integer,
	`order_date` text,
	FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `products` (
	`product_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_name` text,
	`category_id` integer,
	`unit` text,
	`price` real,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`) ON UPDATE no action ON DELETE no action
);
