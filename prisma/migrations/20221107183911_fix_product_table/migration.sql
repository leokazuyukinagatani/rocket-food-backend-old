-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "categoryId" TEXT,
    "userId" TEXT,
    "imageId" TEXT,
    CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "products_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_products" ("categoryId", "description", "id", "imageId", "name", "price", "userId") SELECT "categoryId", "description", "id", "imageId", "name", "price", "userId" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");
CREATE UNIQUE INDEX "products_categoryId_key" ON "products"("categoryId");
CREATE UNIQUE INDEX "products_userId_key" ON "products"("userId");
CREATE UNIQUE INDEX "products_imageId_key" ON "products"("imageId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
