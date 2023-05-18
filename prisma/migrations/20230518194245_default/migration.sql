-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startSession" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endSession" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ticketPrice" REAL NOT NULL,
    "is3D" BOOLEAN NOT NULL,
    "movieId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Session_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("createdAt", "endSession", "id", "is3D", "movieId", "startDate", "startSession", "ticketPrice", "updatedAt") SELECT "createdAt", "endSession", "id", "is3D", "movieId", "startDate", "startSession", "ticketPrice", "updatedAt" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
