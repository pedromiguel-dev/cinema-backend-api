/*
  Warnings:

  - You are about to drop the column `Duration` on the `Movies` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 90,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Movies" ("createdAt", "description", "id", "image", "title", "updatedAt") SELECT "createdAt", "description", "id", "image", "title", "updatedAt" FROM "Movies";
DROP TABLE "Movies";
ALTER TABLE "new_Movies" RENAME TO "Movies";
CREATE UNIQUE INDEX "Movies_title_key" ON "Movies"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
