-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "image_id" TEXT NOT NULL,
    CONSTRAINT "products_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ingredients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image_id" TEXT NOT NULL,
    CONSTRAINT "ingredients_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "product_ingredient" (
    "fk_id_product" INTEGER NOT NULL,
    "fk_id_ingredient" INTEGER NOT NULL,

    PRIMARY KEY ("fk_id_product", "fk_id_ingredient"),
    CONSTRAINT "product_ingredient_fk_id_product_fkey" FOREIGN KEY ("fk_id_product") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "product_ingredient_fk_id_ingredient_fkey" FOREIGN KEY ("fk_id_ingredient") REFERENCES "ingredients" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "product_category" (
    "fk_id_product" INTEGER NOT NULL,
    "fk_id_category" INTEGER NOT NULL,

    PRIMARY KEY ("fk_id_product", "fk_id_category"),
    CONSTRAINT "product_category_fk_id_product_fkey" FOREIGN KEY ("fk_id_product") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "product_category_fk_id_category_fkey" FOREIGN KEY ("fk_id_category") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "favorites" (
    "fk_id_user" INTEGER NOT NULL,
    "fk_id_product" INTEGER NOT NULL,

    PRIMARY KEY ("fk_id_user", "fk_id_product"),
    CONSTRAINT "favorites_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "favorites_fk_id_product_fkey" FOREIGN KEY ("fk_id_product") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image_data" BLOB NOT NULL,
    "image_type" TEXT NOT NULL,
    "image_name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_name_key" ON "ingredients"("name");
