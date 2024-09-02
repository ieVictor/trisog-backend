-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tour" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "price" REAL NOT NULL,
    "initialDate" DATETIME NOT NULL,
    "finalDate" DATETIME NOT NULL,
    "maxPeople" INTEGER NOT NULL,
    "minAge" INTEGER NOT NULL,
    "rating" REAL NOT NULL DEFAULT 0
);
INSERT INTO "new_Tour" ("_id", "city", "country", "finalDate", "initialDate", "latitude", "longitude", "maxPeople", "minAge", "overview", "price", "rating", "title") SELECT "_id", "city", "country", "finalDate", "initialDate", "latitude", "longitude", "maxPeople", "minAge", "overview", "price", "rating", "title" FROM "Tour";
DROP TABLE "Tour";
ALTER TABLE "new_Tour" RENAME TO "Tour";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
