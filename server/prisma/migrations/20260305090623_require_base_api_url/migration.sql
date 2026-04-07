/*
  Warnings:

  - Made the column `baseApiUrl` on table `Panel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Panel" ALTER COLUMN "baseApiUrl" SET NOT NULL,
ALTER COLUMN "baseApiUrl" SET DEFAULT '';
