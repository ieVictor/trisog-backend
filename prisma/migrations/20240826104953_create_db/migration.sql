-- CreateTable
CREATE TABLE "Tour" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "initialDate" DATETIME NOT NULL,
    "finalDate" DATETIME NOT NULL,
    "maxPeople" INTEGER NOT NULL,
    "minAge" INTEGER NOT NULL,
    "rating" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Review" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "tourId" TEXT NOT NULL,
    "services" INTEGER NOT NULL,
    "locations" INTEGER NOT NULL,
    "amenities" INTEGER NOT NULL,
    "prices" INTEGER NOT NULL,
    "food" INTEGER NOT NULL,
    "room" INTEGER NOT NULL,
    CONSTRAINT "Review_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour" ("_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CategoryToTour" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CategoryToTour_A_fkey" FOREIGN KEY ("A") REFERENCES "Category" ("_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CategoryToTour_B_fkey" FOREIGN KEY ("B") REFERENCES "Tour" ("_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToTour_AB_unique" ON "_CategoryToTour"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToTour_B_index" ON "_CategoryToTour"("B");
