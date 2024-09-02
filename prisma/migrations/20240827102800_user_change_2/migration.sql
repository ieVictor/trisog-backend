/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pwd` on the `User` table. All the data in the column will be lost.
  - Added the required column `id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "tourId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "average" REAL NOT NULL,
    "services" INTEGER NOT NULL,
    "locations" INTEGER NOT NULL,
    "amenities" INTEGER NOT NULL,
    "prices" INTEGER NOT NULL,
    "food" INTEGER NOT NULL,
    "room" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Review_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour" ("_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("_id", "amenities", "average", "createdAt", "food", "locations", "overview", "prices", "room", "services", "tourId", "userId") SELECT "_id", "amenities", "average", "createdAt", "food", "locations", "overview", "prices", "room", "services", "tourId", "userId" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "img" TEXT NOT NULL DEFAULT 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fuser_1077114&psig=AOvVaw1b3JoWVAn6L08MHef4iMTR&ust=1724833633305000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKCP447glIgDFQAAAAAdAAAAABAJ'
);
INSERT INTO "new_User" ("email", "img", "username") SELECT "email", "img", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
