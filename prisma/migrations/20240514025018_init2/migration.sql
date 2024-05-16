/*
  Warnings:

  - You are about to drop the column `admitsReceived` on the `Mentor` table. All the data in the column will be lost.
  - You are about to drop the column `undergraduateGPA` on the `Mentor` table. All the data in the column will be lost.
  - Added the required column `underGradDegree` to the `Mentor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `underGradInstitution` to the `Mentor` table without a default value. This is not possible if the table is not empty.
  - Made the column `postGraduateDegree` on table `Mentor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postGraduateInstitution` on table `Mentor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `programName` on table `Mentor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `universityName` on table `Mentor` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mentor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "currentLocation" TEXT NOT NULL,
    "currentStatus" TEXT NOT NULL,
    "postGraduateInstitution" TEXT NOT NULL,
    "postGraduateDegree" TEXT NOT NULL,
    "programName" TEXT NOT NULL,
    "universityName" TEXT NOT NULL,
    "underGradInstitution" TEXT NOT NULL,
    "underGradDegree" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Mentor" ("createdAt", "currentLocation", "currentStatus", "gender", "id", "name", "postGraduateDegree", "postGraduateInstitution", "programName", "universityName", "updatedAt") SELECT "createdAt", "currentLocation", "currentStatus", "gender", "id", "name", "postGraduateDegree", "postGraduateInstitution", "programName", "universityName", "updatedAt" FROM "Mentor";
DROP TABLE "Mentor";
ALTER TABLE "new_Mentor" RENAME TO "Mentor";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
