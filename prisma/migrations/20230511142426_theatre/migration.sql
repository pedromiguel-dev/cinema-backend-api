-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Seat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accessibility" BOOLEAN NOT NULL,
    "theatreId" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Seat_theatreId_fkey" FOREIGN KEY ("theatreId") REFERENCES "Theatre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Seat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Seat" ("accessibility", "id", "theatreId", "userId") SELECT "accessibility", "id", "theatreId", "userId" FROM "Seat";
DROP TABLE "Seat";
ALTER TABLE "new_Seat" RENAME TO "Seat";
CREATE TABLE "new_Theatre" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "sessionId" TEXT,
    CONSTRAINT "Theatre_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Theatre" ("id", "name", "sessionId") SELECT "id", "name", "sessionId" FROM "Theatre";
DROP TABLE "Theatre";
ALTER TABLE "new_Theatre" RENAME TO "Theatre";
CREATE UNIQUE INDEX "Theatre_sessionId_key" ON "Theatre"("sessionId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
