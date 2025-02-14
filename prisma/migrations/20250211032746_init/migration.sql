-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "transcription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
