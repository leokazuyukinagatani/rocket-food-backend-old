/*
  Warnings:

  - You are about to drop the column `createdAt` on the `permissions` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_permissions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_permissions" ("description", "id", "name") SELECT "description", "id", "name" FROM "permissions";
DROP TABLE "permissions";
ALTER TABLE "new_permissions" RENAME TO "permissions";
CREATE UNIQUE INDEX "permissions_name_key" ON "permissions"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
