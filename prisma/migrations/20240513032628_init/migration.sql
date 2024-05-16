-- CreateTable
CREATE TABLE "Mentee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "currentLocation" TEXT NOT NULL,
    "currentStatus" TEXT NOT NULL,
    "undergraduateGPA" REAL NOT NULL,
    "classRank" INTEGER,
    "greTotalScore" INTEGER,
    "greQuantitative" INTEGER,
    "greVerbal" INTEGER,
    "greAWA" REAL,
    "toeflTotalScore" INTEGER,
    "toeflSpeaking" INTEGER,
    "toeflWriting" INTEGER,
    "toeflReading" INTEGER,
    "toeflListening" INTEGER,
    "resumeLink" TEXT,
    "sopLink" TEXT,
    "lorsLink" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Academic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "institutionName" TEXT NOT NULL,
    "degreeName" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "minor" TEXT,
    "gpa" REAL NOT NULL,
    "menteeId" INTEGER NOT NULL,
    CONSTRAINT "Academic_menteeId_fkey" FOREIGN KEY ("menteeId") REFERENCES "Mentee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CourseWork" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "courseName" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "academicId" INTEGER NOT NULL,
    CONSTRAINT "CourseWork_academicId_fkey" FOREIGN KEY ("academicId") REFERENCES "Academic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Publication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "journalName" TEXT NOT NULL,
    "link" TEXT,
    "menteeId" INTEGER,
    "mentorId" INTEGER,
    CONSTRAINT "Publication_menteeId_fkey" FOREIGN KEY ("menteeId") REFERENCES "Mentee" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Publication_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CoCurricular" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "organisation" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "menteeId" INTEGER NOT NULL,
    CONSTRAINT "CoCurricular_menteeId_fkey" FOREIGN KEY ("menteeId") REFERENCES "Mentee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExtraCurricular" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "organisation" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "menteeId" INTEGER NOT NULL,
    CONSTRAINT "ExtraCurricular_menteeId_fkey" FOREIGN KEY ("menteeId") REFERENCES "Mentee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProfessionalExp" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "companyName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "awardsRecognition" TEXT,
    "numberOfPromotions" INTEGER,
    "menteeId" INTEGER,
    "mentorId" INTEGER,
    CONSTRAINT "ProfessionalExp_menteeId_fkey" FOREIGN KEY ("menteeId") REFERENCES "Mentee" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ProfessionalExp_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Mentor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "currentLocation" TEXT NOT NULL,
    "currentStatus" TEXT NOT NULL,
    "undergraduateGPA" REAL,
    "postGraduateInstitution" TEXT,
    "postGraduateDegree" TEXT,
    "admitsReceived" TEXT,
    "programName" TEXT,
    "universityName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
